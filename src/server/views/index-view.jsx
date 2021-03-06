//
// This is the server side entry point for the React app.
//

import ReduxRouterEngine from "electrode-redux-router-engine";
import { routes } from "../../client/routes";
import { createStore } from "redux";
import rootReducer from "../../client/reducers";
import fs from "fs";
import path from "path";

const Promise = require("bluebird");
const readFileAsync = Promise.promisify(fs.readFile);

function storeInitializer(req, transactions, vehicles) {
  let initialState = {
    transactions: transactions,
    cars: vehicles,
    visibilityFilter: "SHOW_ALL"
  };
  return createStore(rootReducer, initialState);
}
function createReduxStore(req, match) {
  // eslint-disable-line

  return Promise.all([
    // DO ASYNC THUNK ACTIONS HERE : store.dispatch(boostrapApp())
    req.server
      .inject("/transactions")
      .then(res => {
        return JSON.parse(res.payload);
      })
      .catch(() => {
        return {};
      }),
    req.server
      .inject("/vehicles")
      .then(res => {
        return JSON.parse(res.payload);
      })
      .catch(() => {
        return {};
      })
  ]).then(([transactions, vehicles]) => storeInitializer(req, transactions, vehicles));
}

//
// This function is exported as the content for the webapp plugin.
//
// See config/default.json under plugins.webapp on specifying the content.
//
// When the Web server hits the routes handler installed by the webapp plugin, it
// will call this function to retrieve the content for SSR if it's enabled.
//
//

module.exports = req => {
  const app = (req.server && req.server.app) || req.app;
  if (!app.routesEngine) {
    app.routesEngine = new ReduxRouterEngine({ routes, createReduxStore });
  }

  return app.routesEngine.render(req);
};
