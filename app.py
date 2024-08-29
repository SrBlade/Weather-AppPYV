from flask import Flask, jsonify, request
import requests
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Habilitar CORS para todas las rutas

# Ruta principal para verificar que el servidor funciona
@app.route('/')
def home():
    return "Weather App Backend with Flask"

# Ruta para obtener los datos del clima
@app.route('/weather', methods=['GET'])
def get_weather():
    city = request.args.get('city')  # Corregido aquí
    if not city:
        return jsonify({'error': 'City parameter is missing'}), 400

    apiKey = '43d5caaf1d5eaad15c4796f64b3ccee3'
    api_url = f'http://api.openweathermap.org/data/2.5/weather?q={city}&units=metric&appid={apiKey}'

    response = requests.get(api_url)
    if response.status_code != 200:
        return jsonify({'error': 'City not found'}), 404

    data = response.json()
    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True, host='127.0.0.1')
