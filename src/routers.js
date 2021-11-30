const apiRouters = (app) => {
    // api routers
    app.use("/api/panValidate", require('./api/panValidate'));
   }

module.exports = {
    apiRouters
}