"use strict";

const defaultListenPort = 3000;

const portFromEnv = () => {
  const x = parseInt(process.env.PORT, 10);
  /* istanbul ignore next */
  return x !== null && !isNaN(x) ? x : defaultListenPort;
};

module.exports = {
  plugins: {
    inert: {
      enable: true
    },
    electrodeStaticPaths: {
      enable: true,
      options: {
        pathPrefix: "dist"
      }
    },
    "server/plugins/pwa": {
      module: "./{{env.APP_SRC_DIR}}/server/plugins/pwa"
    },
    webapp: {
      module: "electrode-react-webapp/lib/hapi",
      options: {
        pageTitle: "car-buying",
        paths: {
          "/{args*}": {
            content: {
              module: "./{{env.APP_SRC_DIR}}/server/views/index-view"
            }
          }
        }
      }
    },
    "./server/plugins/vehicles": {
      module: "./{{env.APP_SRC_DIR}}server/plugins/vehicles"
    },
    "./server/plugins/transactions": {
      module: "./{{env.APP_SRC_DIR}}server/plugins/transactions"
    }
  },
  connections: {
    default: {
      host: process.env.HOST,
      address: process.env.HOST_IP || "0.0.0.0",
      port: portFromEnv(),
      routes: {
        cors: true
      },
      state: {
        ignoreErrors: true
      }
    }
  }
};
