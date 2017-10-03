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
  let initialState = {};
  if (req.path === "/history") {
    initialState = {
      transactions: transactions
    };
  } else if (req.path === "/dealer-transactions") {
    initialState = {
      transactions: transactions
    };
  } else if (req.path === "/user") {
    initialState = {
      cars: vehicles
    };
  } else if (req.path === "/dealer") {
    initialState = {
      cars: vehicles
    };
  } else {
    initialState = {
      checkBox: { checked: false },
      number: { value: 999 }
    };
  }
  return createStore(rootReducer, initialState);
}
function createReduxStore(req, match) {
  // eslint-disable-line

  return Promise.all([
    // DO ASYNC THUNK ACTIONS HERE : store.dispatch(boostrapApp())
    readFileAsync(path.resolve("data", "transactions.json"))
      .then(JSON.parse)
      .catch(() => {
        return {};
      }),
    readFileAsync(path.resolve("data", "vehicles.json"))
      .then(JSON.parse)
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
