import os
import pickle
import io
import base64

import numpy as np
import pandas as pd
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.metrics import confusion_matrix
from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# ── Càrrega de models i preprocessors ────────────────────────────────────────

def load_models():
    models_dir = os.path.join(BASE_DIR, 'models')
    prep = pickle.load(open(os.path.join(models_dir, 'preprocessors.pkl'), 'rb'))
    nb   = pickle.load(open(os.path.join(models_dir, 'naive_bayes.pkl'),    'rb'))
    dt   = pickle.load(open(os.path.join(models_dir, 'decision_tree.pkl'),  'rb'))
    knn_model, scaler_knn   = pickle.load(open(os.path.join(models_dir, 'knn.pkl'),           'rb'))
    perc_model, scaler_perc = pickle.load(open(os.path.join(models_dir, 'perceptron.pkl'),    'rb'))
    nn_model, scaler_nn     = pickle.load(open(os.path.join(models_dir, 'neural_network.pkl'),'rb'))
    return prep, nb, dt, (knn_model, scaler_knn), (perc_model, scaler_perc), (nn_model, scaler_nn)

prep, nb_model, dt_model, (knn_model, scaler_knn), (perc_model, scaler_perc), (nn_model, scaler_nn) = load_models()

def parse_cr(cr):
    if pd.isna(cr): return np.nan
    if isinstance(cr, str) and '/' in cr:
        n, d = cr.split('/')
        return float(n) / float(d)
    return float(cr)

def simplify_type(t):
    if pd.isna(t): return 'unknown'
    t = t.lower()
    for cat in ['humanoid','undead','beast','dragon','fiend','construct',
                'monstrosity','aberration','elemental','fey','giant','plant','ooze','celestial']:
        if cat in t: return cat
    return 'other'

def load_dataset():
    df = pd.read_csv(os.path.join(BASE_DIR, 'data', 'dnd_monsters.csv'))
    df['cr'] = df['cr'].apply(parse_cr)
    df['type_simple'] = df['type'].apply(simplify_type)
    stat_cols = ['str', 'dex', 'con', 'int', 'wis', 'cha']
    df_clean = df.dropna(subset=['cr','ac','hp'] + stat_cols).copy()
    df_clean = df_clean.drop_duplicates(subset=['name'])
    df_clean['is_legendary'] = df_clean['legendary'].notna().astype(int)
    def cr_bracket(cr):
        if cr <= 4: return 'Fàcil'
        elif cr <= 10: return 'Mitjà'
        else: return 'Difícil'
    df_clean['cr_bracket'] = df_clean['cr'].apply(cr_bracket)
    return df, df_clean

df_raw, df_clean = load_dataset()

def fig_to_b64(fig):
    buf = io.BytesIO()
    fig.savefig(buf, format='png', bbox_inches='tight', dpi=90)
    buf.seek(0)
    encoded = base64.b64encode(buf.read()).decode('utf-8')
    plt.close(fig)
    return encoded

# ── Rutes ─────────────────────────────────────────────────────────────────────

@app.route('/')
def index():
    sample = df_raw.head(10).fillna('—').to_dict(orient='records')
    stats = {
        'total': len(df_raw),
        'clean': len(df_clean),
        'types': df_clean['type_simple'].nunique(),
        'max_cr': int(df_clean['cr'].max()),
        'legendary': int(df_clean['is_legendary'].sum()),
    }
    return render_template('index.html', sample=sample, stats=stats,
                           columns=list(df_raw.columns))

@app.route('/eda')
def eda():
    return render_template('eda.html')

@app.route('/models')
def models_page():
    return render_template('models.html')

@app.route('/api/predict', methods=['POST'])
def predict():
    data = request.json
    model_name = data.get('model')
    stat_cols = ['str', 'dex', 'con', 'int', 'wis', 'cha']

    try:
        cr  = float(data.get('cr', 5))
        ac  = float(data.get('ac', 14))
        hp  = float(data.get('hp', 80))
        str_ = float(data.get('str', 15))
        dex  = float(data.get('dex', 12))
        con  = float(data.get('con', 14))
        int_ = float(data.get('int', 8))
        wis  = float(data.get('wis', 11))
        cha  = float(data.get('cha', 9))
    except (ValueError, TypeError):
        return jsonify({'error': 'Valors invàlids'}), 400

    result = {}

    if model_name == 'naive_bayes':
        feats = np.array([[cr, ac, hp, str_, dex, con, int_, wis, cha]])
        pred = nb_model.predict(feats)[0]
        proba = nb_model.predict_proba(feats)[0]
        label = prep['le_type'].inverse_transform([pred])[0]
        top3 = sorted(zip(prep['le_type'].classes_, proba), key=lambda x: -x[1])[:3]
        result = {
            'prediction': label,
            'probabilities': [{'label': l, 'prob': round(float(p)*100, 1)} for l, p in top3]
        }

    elif model_name == 'decision_tree':
        feats = np.array([[ac, hp, str_, dex, con, int_, wis, cha]])
        pred = dt_model.predict(feats)[0]
        proba = dt_model.predict_proba(feats)[0]
        label = prep['le_bracket'].inverse_transform([pred])[0]
        result = {
            'prediction': label,
            'probabilities': [{'label': prep['le_bracket'].inverse_transform([i])[0],
                               'prob': round(float(p)*100, 1)}
                              for i, p in enumerate(proba)]
        }

    elif model_name == 'knn':
        feats = np.array([[ac, hp, str_, dex, con, int_, wis, cha]])
        feats_sc = scaler_knn.transform(feats)
        pred = knn_model.predict(feats_sc)[0]
        proba = knn_model.predict_proba(feats_sc)[0]
        label = prep['le_bracket'].inverse_transform([pred])[0]
        result = {
            'prediction': label,
            'probabilities': [{'label': prep['le_bracket'].inverse_transform([i])[0],
                               'prob': round(float(p)*100, 1)}
                              for i, p in enumerate(proba)]
        }

    elif model_name == 'perceptron':
        feats = np.array([[cr, ac, hp, str_, dex, con, int_, wis, cha]])
        feats_sc = scaler_perc.transform(feats)
        pred = perc_model.predict(feats_sc)[0]
        result = {'prediction': 'Llegendari' if pred == 1 else 'No llegendari'}

    elif model_name == 'neural_network':
        feats = np.array([[cr, ac, hp, str_, dex, con, int_, wis, cha]])
        feats_sc = scaler_nn.transform(feats)
        pred = nn_model.predict(feats_sc)[0]
        proba = nn_model.predict_proba(feats_sc)[0]
        label = prep['le_size'].inverse_transform([pred])[0]
        result = {
            'prediction': label,
            'probabilities': [{'label': prep['le_size'].inverse_transform([i])[0],
                               'prob': round(float(p)*100, 1)}
                              for i, p in enumerate(proba)]
        }
    else:
        return jsonify({'error': 'Model desconegut'}), 400

    return jsonify(result)

@app.route('/api/chart/<chart_name>')
def get_chart(chart_name):
    img_path = os.path.join(BASE_DIR, 'static', 'img', f'{chart_name}.png')
    if not os.path.exists(img_path):
        return jsonify({'error': 'Gràfic no trobat'}), 404
    with open(img_path, 'rb') as f:
        encoded = base64.b64encode(f.read()).decode('utf-8')
    return jsonify({'image': encoded})

@app.route('/api/dataset')
def dataset_api():
    page = int(request.args.get('page', 1))
    per_page = 20
    search = request.args.get('search', '').lower()
    df_filtered = df_raw
    if search:
        mask = df_raw.apply(lambda row: search in str(row).lower(), axis=1)
        df_filtered = df_raw[mask]
    total = len(df_filtered)
    start = (page - 1) * per_page
    records = df_filtered.iloc[start:start+per_page].fillna('—').to_dict(orient='records')
    return jsonify({'data': records, 'total': total, 'page': page, 'per_page': per_page})

if __name__ == '__main__':
    app.run(debug=True, port=5000)
