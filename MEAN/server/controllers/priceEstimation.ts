import BaseCtrl from "./base";
import {throwError} from "rxjs";

const fetch = require('node-fetch');

class EstimationCtrl extends BaseCtrl {
  model: any;

  postEstimation = async (req, res) => {
    try {
      const requestBody = req.body;
      const area = transformNumberToNumValues(requestBody.size);
      const balconyOrTerrace = transformBooleanToNumValues(requestBody.balconyOrTerrace);
      const basement = transformBooleanToNumValues(requestBody.basement);
      const garage = transformNumberToNumValues(requestBody.garagePlaces);
      const garden = transformBooleanToNumValues(requestBody.garden);
      const guestToilet = transformBooleanToNumValues(requestBody.guestToilet);
      const lift = transformBooleanToNumValues(requestBody.lift);
      const noStairAccess = transformBooleanToNumValues(requestBody.noStairAccess);
      const rooms = transformNumberToNumValues(requestBody.rooms);

      console.log('requestBody: ', requestBody);
      const baseUrl = 'http://homestead.dynpc.net:5000/api?';
      //const requestUrl = 'http://homestead.dynpc.net:5000/api?area=90.42&balconyOrTerrace=1&basement=1&garage=1&garden=1&guest_toilet=0&lift=0&no_stairs_access=0&rooms=3.5'
      const requestUrl = `http://homestead.dynpc.net:5000/api?area=${area}&balconyOrTerrace=${balconyOrTerrace}&basement=${basement}&garage=${garage}&garden=${garden}&guest_toilet=${guestToilet}&lift=${lift}&no_stairs_access=${noStairAccess}&rooms=${rooms}`
      console.log('requestUrl: ', requestUrl);
      fetch(requestUrl)
        .then(res => res.text())
        .then(body => {
          try {
            const jsonResponse = JSON.parse(body);
            console.log('body: ', body)
            if (jsonResponse?.wert) {
              res.status(200).json({estimate: jsonResponse.wert});
            } else {
              res.status(400).json({error: 'No value returned'});
            }
          } catch (e) {
            res.status(400).json({error: e});
          }
        });
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }

}

const transformBooleanToNumValues = (input: boolean): number => {
  return input ? 1 : 0;
}

const transformNumberToNumValues = (input: number): number => {
  if (!input || typeof input !== "number") return 0;
  else return input;
}

export default EstimationCtrl;
