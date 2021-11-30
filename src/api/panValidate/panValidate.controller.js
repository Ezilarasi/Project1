const service = require('./panValidate.service');

const PAN_Validation = async function (req, res) {
    try{
        var result = await service.PAN_Validation(req)
        console.log(result);
        res.status(200).send("getPan");
    }catch(e){
        res.staus(400).send(e);
    }
}


module.exports = {
    PAN_Validation,
  
}