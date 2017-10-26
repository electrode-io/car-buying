"use strict";

const fs = require("fs");
const path = require("path");
let http = require("http");
let querystring = require("querystring");

const plugin = {};

/* eslint-disable no-console */

plugin.register = function(server, options, next) {
  server.route({
    method: "GET",
    path: "/vehicles",
    handler: (request, reply) => {
      let options = {
        host: "localhost",
        path: "/vehicles",
        port: "8000"
      };

      let req = http.get(options, function(res) {
        let bodyChunks = [];
        res
          .on("data", function(chunk) {
            bodyChunks.push(chunk);
          })
          .on("end", function() {
            let body = Buffer.concat(bodyChunks);
            let results = JSON.parse(body);
            return reply(results);
          });
      });

      req.on("error", function(e) {
        console.log("ERROR: " + e.message);
        return reply("ERROR:" + e.message);
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
