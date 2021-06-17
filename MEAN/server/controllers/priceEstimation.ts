import BaseCtrl from "./base";

const fetch = require('node-fetch');

class EstimationCtrl extends BaseCtrl {
  model: any;

  postEstimation = async (req, res) => {
    try {
      const requestBody = req.body;
      console.log('requestBody: ', requestBody);
      /*
      fetch('https://github.com/')
        .then(res => res.text())
        .then(body => console.log(body));
       */
      res.status(200).json({estimate: 142000});
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }

}

export default EstimationCtrl;
