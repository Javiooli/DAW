from transformers import pipeline

text=""
model = pipeline("summarization", model="facebook/bart-large-cnn")