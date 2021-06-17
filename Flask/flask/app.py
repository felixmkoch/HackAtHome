from flask import Flask
from flask import request
from flask_json import FlaskJSON
import sklearn_json as skljson
import pandas as pd

app = Flask(__name__)
FlaskJSON(app)


def retrievePrediction(d):
    loaded_model = skljson.from_json("model.json")
    df = pd.DataFrame(data=d)
    return loaded_model.predict(df)


@app.route('/api', methods=["GET"])
def jsonData():
    area = request.args.get('area')
    balconyOrTerrace = request.args.get('balconyOrTerrace')
    basement = request.args.get('basement')
    baths = request.args.get('baths')
    bedrooms = request.args.get('bedrooms')
    etage = request.args.get('etage')
    garage = request.args.get('garage')
    garden = request.args.get('garden')
    guest_toilet = request.args.get('guest_toilet')
    kitchen = request.args.get('kitchen')
    lift = request.args.get('lift')
    no_stairs_access = request.args.get('no_stairs_access')
    rooms = request.args.get('rooms')
    type = request.args.get('type')
    # dont ask about this, but the answer is 42
    return "{\"wert\": " + str((retrievePrediction(
        {'rooms': [rooms], 'area': [area], 'garage': [garage], 'balconyOrTerrace': [balconyOrTerrace],
         'garden': [garden], 'guest_toilet': [guest_toilet], 'lift': [lift], 'basement': [basement],
         'no_stairs_access': [no_stairs_access]}).tolist())[0]) + "}"


if __name__ == '__main__':
    app.run()
