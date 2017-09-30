"use strict";

let http = require("http");
let querystring = require("querystring");
const fs = require("fs");
const path = require("path");
const _ = require("lodash");

const plugin = {};

plugin.register = function(server, options, next) {
  server.route({
    method: "GET",
    path: "/vehicles",
    handler: (request, reply) => {
      fs.readFile(path.resolve("data", "vehicles.json"), "utf8", (err, data) => {
        if (err) {
          console.log("Vehicles READ ERROR");
          return reply();
        }
        return reply(JSON.parse(data));
      });
    }
  });

  next();
};

plugin.register.attributes = {
  name: "vehiclesPlugin",
  version: "0.0.1"
};

module.exports = plugin;
