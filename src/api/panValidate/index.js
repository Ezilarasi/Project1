const express = require("express");
const routers = express.Router();
const controller = require('./panValidate.controller');

routers.post('/',controller.getPan);


module.exports = routers