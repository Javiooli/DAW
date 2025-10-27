from datetime import datetime, date

# Data i hora actuals
data_hora_actual = datetime.now()
print("Data i hora actuals:", data_hora_actual)

# Tipus de variable retornada
print("Tipus de variable:", type(data_hora_actual))

# Creació d'una data amb el constructor datetime
data_personalitzada_datetime = datetime(2025, 10, 23, 14, 30, 0)
print("Data personalitzada amb datetime:", data_personalitzada_datetime)

# Creació d'una data amb el constructor date
data_personalitzada_date = date(2025, 10, 23)
print("Data personalitzada amb date:", data_personalitzada_date)

# Data d'avui amb la funció date
data_avui = date.today()
print("Data d'avui:", data_avui)

# Transformació a format europeu (dd/mm/YYYY)
data_europea = data_avui.strftime("%d/%m/%Y")
print("Data en format europeu:", data_europea)
