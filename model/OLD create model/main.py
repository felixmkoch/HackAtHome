import pandas as pd
import numpy as np

import sklearn_json as skljson
from sklearn.metrics import mean_absolute_percentage_error, mean_absolute_error

np.random.seed(0)
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from sklearn.impute import SimpleImputer

# cost, rooms, area, garage, balcony, garden, guest_toilet, lift, basement, no_stairs_access

# /home/server/Downloads/output.csv
file = pd.read_csv('output.csv')

#
# Choose the desired attributes for the mdel
#
file = file[["cost", "rooms", "area", "garage", "balconyOrTerrace", "garden", "guest_toilet", "lift", "basement", "no_stairs_access"]]

#
# Garage has some weird entries.
#
file["garage"] = file["garage"].replace("T", 1).replace("D", 1).replace("A", 1)

#
# First split into train and test set
#
X = file.drop('cost', axis=1)
y = file.cost

#
# Put useful information in missing entries
#
my_imputer = SimpleImputer()
X = pd.DataFrame(my_imputer.fit_transform(X))

#
# Split train and test set
#
train_X, val_X, train_y, val_y = train_test_split(X, y, random_state=0)

#
# Model : You can change it if you want to
#
model = RandomForestRegressor()

#
# Train model on part of the data and make predictions on parts of the val-data
#
model.fit(train_X, train_y)
predictions = model.predict(val_X)

#
# Error-Estimation
#
print('Absolute Percentage Error: ' + str(mean_absolute_percentage_error(val_y, predictions)))
print('Mean absolute Error: ' + str(mean_absolute_error(val_y, predictions)))

#
# Model to Json
#
filename = 'model.json'
skljson.to_json(model, filename)



