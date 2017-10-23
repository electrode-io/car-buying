"use strict";
/*eslint-env es6*/
const plugin = {};
const fs = require("fs");
const path = require("path");
const HTTP_CREATED = 201;
const HTTP_ISE = 500;
const _ = require("lodash");

/* eslint-disable no-console, consistent-return */
plugin.register = function(server, options, next) {
  server.route({
    method: "GET",
    path: "/transactions",
    handler: (request, reply) => {
      fs.readFile(path.resolve("data", "transactions.json"), "utf8", (err, data) => {
        if (err) {
          console.log("Transactions READ ERROR");
          return reply();
        }
        return reply(JSON.parse(data));
      });
    }
  });

  server.route({
    method: "GET",
    path: "/get-negotiations",
    handler: (request, reply) => {
      fs.readFile(path.resolve("data", "transactions.json"), "utf8", (err, data) => {
        if (err) {
          console.log("Transactions READ ERROR");
          return reply();
        }
        const parsedData = JSON.parse(data);
        const found = _.filter(parsedData, { status: "NEGOTIATION" });
        if (!_.isEmpty(found)) {
          return reply(found);
        } else {
          return reply();
        }
      });
    }
  });

  server.route({
    method: "POST",
    path: "/create-transaction",
    handler: (request, reply) => {
      fs.readFile(path.resolve("data", "transactions.json"), "utf8", (readErr, data) => {
        if (readErr) {
          console.log("Transactions READ ERROR");
          return reply("Transactions UPDATE ERROR");
        }
        const parsedData = JSON.parse(data);
        const payload = request.payload;
        payload.id = Date.now();
        parsedData.push(payload);

        fs.writeFile(
          path.join(process.cwd(), "data/transactions.json"),
          JSON.stringify(parsedData),
          "utf-8",
          writeErr => {
            if (writeErr) {
              return reply("Write Error").code(HTTP_ISE);
            } else {
              return reply(payload).code(HTTP_CREATED);
            }
          }
        );
      });
    }
  });

  server.route({
    method: "PUT",
    path: "/update-transaction",
    handler: (request, reply) => {
      fs.readFile(path.resolve("data", "transactions.json"), "utf8", (readErr, data) => {
        if (readErr) {
          console.log("Transactions READ ERROR");
          return reply("Transactions UPDATE ERROR");
        }
        const parsedData = JSON.parse(data);
        const found = _.find(parsedData, { id: request.payload.id });
        if (!_.isEmpty(found)) {
          fs.writeFile(
            path.join(process.cwd(), "data/transactions.json"),
            JSON.stringify(parsedData),
            "utf-8",
            writeErr => {
              if (writeErr) {
                return reply("Write Error").code(HTTP_ISE);
              } else {
                return reply("created").code(HTTP_CREATED);
              }
            }
          );
        } else {
          return reply("error").code(HTTP_CREATED);
        }
      });
    }
  });

  server.route({
    method: "PUT",
    path: "/update-negotiation",
    handler: (request, reply) => {
      fs.readFile(path.resolve("data", "transactions.json"), "utf8", (readErr, data) => {
        if (readErr) {
          console.log("Transactions READ ERROR");
          return reply("Transactions UPDATE ERROR");
        }
        const parsedData = JSON.parse(data);
        const found = _.find(parsedData, {
          id: request.payload.id,
          status: "NEGOTIATION"
        });

        if (!_.isEmpty(found)) {
          if (request.payload.comments) {
            found.comments = request.payload.comments;
          }
          if (request.payload.status) {
            found.status = request.payload.status;
          }
          fs.writeFile(
            path.join(process.cwd(), "data/transactions.json"),
            JSON.stringify(parsedData),
            "utf-8",
            writeErr => {
              if (writeErr) {
                return reply("Write Error").code(HTTP_ISE);
              } else {
                return reply(found).code(HTTP_CREATED);
              }
            }
          );
        } else {
          return reply("error").code(HTTP_CREATED);
        }
      });
    }
  });

  next();
};

plugin.register.attributes = {
  name: "transactionsPlugin",
  version: "0.0.1"
};

module.exports = plugin;
