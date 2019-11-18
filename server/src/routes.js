const user_view = require('./views/user_view');

function bindRoutes(app) {
  app.use("/user", user_view)
}

module.exports = bindRoutes;
