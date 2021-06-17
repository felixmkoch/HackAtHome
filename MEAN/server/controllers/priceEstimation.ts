import BaseCtrl from "./base";

class EstimationCtrl extends BaseCtrl {
  model: any;

  postEstimation = async (req, res) => {
    try {
      const requestBody = req.body;
      console.log('requestBody: ', requestBody);
      res.status(200).json();
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }

}

export default EstimationCtrl;
