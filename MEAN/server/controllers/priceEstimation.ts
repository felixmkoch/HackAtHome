import BaseCtrl from "./base";
import {throwError} from "rxjs";

const fetch = require('node-fetch');

const knownZips = [81827, 80807, 81677, 81925, 80638, 81673, 80333, 81241, 80538,
  80993, 81477, 80689, 80992, 80469, 81735, 80639, 81545, 80939,
  81737, 80637, 81243, 81667, 80539, 81377, 80335, 81929, 81245,
  81476, 81249, 80805, 80686, 80796, 80687, 81739, 81247, 80803,
  80797, 81547, 81479, 80634, 81927, 80799, 80804, 81541, 81829,
  80802, 81549, 81679, 80769, 85757, 81675, 81345, 81475, 81825,
  81669, 80995, 80997, 81369, 80336, 85774, 81543, 81373, 80809,
  81671, 80636, 81375, 81379, 80337, 80339, 80798, 81371, 82110,
  80933, 80937, 80999, 80331, 81539, 80801, 80680, 85521, 82194,
  82031, 85221, 80935, 85716];

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
      const zipCode = transformStringToNumValues(requestBody.zipCode);
      console.log('zipCode: ', zipCode);

      console.log('requestBody: ', requestBody);
      const baseUrl = 'http://homestead.dynpc.net:5000/api?';
      //const requestUrl = 'http://homestead.dynpc.net:5000/api?area=90.42&balconyOrTerrace=1&basement=1&garage=1&garden=1&guest_toilet=0&lift=0&no_stairs_access=0&rooms=3.5'
      //let requestUrl = `http://homestead.dynpc.net:5000/api?area=${area}&balconyOrTerrace=${balconyOrTerrace}&basement=${basement}&garage=${garage}&garden=${garden}&guest_toilet=${guestToilet}&lift=${lift}&no_stairs_access=${noStairAccess}&rooms=${rooms}`
      var requestUrl;
      if (zipCode && zipCode != 0 && knownZips.includes(zipCode)) {
        requestUrl = `http://homestead.dynpc.net:5000/api/zip?area=${area}&balconyOrTerrace=${balconyOrTerrace}&basement=${basement}&garage=${garage}&garden=${garden}&guest_toilet=${guestToilet}&lift=${lift}&no_stairs_access=${noStairAccess}&rooms=${rooms}&zip=${zipCode}`
      } else {
        requestUrl = `http://homestead.dynpc.net:5000/api?area=${area}&balconyOrTerrace=${balconyOrTerrace}&basement=${basement}&garage=${garage}&garden=${garden}&guest_toilet=${guestToilet}&lift=${lift}&no_stairs_access=${noStairAccess}&rooms=${rooms}`
      }
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

const transformStringToNumValues = (input: string): number => {
  if (!input) return 0;
  if (typeof input === "string") {
    try {
      return parseInt(input)
    }
    catch (e) {
      return 0;
    }
  }
  else return input;
}

export default EstimationCtrl;
