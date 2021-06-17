from flask import Flask
from flask import request
from flask_json import FlaskJSON, JsonError, json_response, as_json
import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestRegressor

import pickle



app = Flask(__name__)
FlaskJSON(app)


@app.route('/') # TODO: INIT!
def hello_world():
    return 'Hello World!'


# PARAS: cost, rooms, area, type,bedrooms, baths,garage,etage,balconyOrTerrace, garden, kitchen, guest_toilet, lift, basement, no_stairs_access
# in order = area,balconyOrTerrace,basement,baths,bedrooms,cost,etage,garage,garden,guest_toilet,kitchen,lift,no_stairs_access,rooms,type

# /Users/maik/Downloads/model.sav
def retrievePrediction():
    loaded_model = pickle.load(open('/Users/maik/Downloads/model.sav', 'rb'))
    return 0


@app.route('/api', methods=["GET"])
def jsonData():
    # retrievePrediction()
    area = request.args.get('area')
    balconyOrTerrace = request.args.get('balconyOrTerrace')  # balcony == 0, terrace == 1
    basement = request.args.get('basement')
    baths = request.args.get('baths')
    bedrooms = request.args.get('bedrooms')
    #cost = request.args.get('cost')
    etage = request.args.get('etage')
    garage = request.args.get('garage')
    garden = request.args.get('garden')
    guest_toilet = request.args.get('guest_toilet')
    kitchen = request.args.get('kitchen')
    lift = request.args.get('lift')
    no_stairs_access = request.args.get('no_stairs_access')
    rooms = request.args.get('rooms')
    type = request.args.get('type')
    #127.0.0.1:5000/api?area=42.42&balconyOrTerrace=1&basement=1&baths=2&bedrooms=2&cost=133742&etage=2&garage=1&garden=1&guest_toilet=0&kitchen=1&lift=0&no_stairs_access=0&rooms=3.5&type=Dachgeschoss

    return 1
    # https://www.codegrepper.com/code-examples/python/check+32+or+64+bit+python
    # return json_response(area=area, balconyOrTerrace=balconyOrTerrace, basement=basement, baths=baths,
    #                      bedrooms=bedrooms, etage=etage, garage=garage, garden=garden,
    #                      guest_toilet=guest_toilet, kitchen=kitchen, lift=lift, no_stairs_access=no_stairs_access,
    #                      rooms=rooms, type=type)


if __name__ == '__main__':
    app.run()
