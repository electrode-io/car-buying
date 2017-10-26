"use strict";
/*eslint-env es6*/
const plugin = {};
const http = require("http");
const querystring = require("querystring");

/* eslint-disable no-console, consistent-return */
plugin.register = (server, options, next) => {
  server.route({
    method: "GET",
    path: "/transactions",
    handler: (request, reply) => {
      let options = {
        host: "localhost",
        path: "/transactions",
        port: "8000"
      };

      const req = http.get(options, (res) => {
        const bodyChunks = [];
        res
          .on("data", (chunk) => {
            bodyChunks.push(chunk);
          })
          .on("end", () => {
            const body = Buffer.concat(bodyChunks);
            const results = JSON.parse(body);
            return reply(results);
          });
      });

      req.on("error", (e) => {
        console.log(`ERROR: ${e.message}`);
        return reply(`ERROR: ${e.message}`);
      });
    }
  });

  server.route({
    method: "GET",
    path: "/get-negotiations",
    handler: (request, reply) => {
      let options = {
        host: "localhost",
        path: "/get-negotiations",
        port: "8000"
      };

      const req = http.get(options, (res) => {
        const bodyChunks = [];
        res
          .on("data", (chunk) => {
            bodyChunks.push(chunk);
          })
          .on("end", () => {
            const body = Buffer.concat(bodyChunks);
            const results = JSON.parse(body);
            return reply(results);
          });
      });
      req.on("error", (e) => {
        console.log(`ERROR: ${e.message}`);
        return reply(`ERROR: ${e.message}`);
      });
    }
  });

  server.route({
    method: "POST",
    path: "/create-transaction",
    handler: (request, reply) => {
      const postData = querystring.stringify({
        customer_id: request.payload.customer_id,
        vin_number: request.payload.vin_number,
        actual_price: request.payload.actual_price,
        status: request.payload.status,
        comments: request.payload.comments
      });
      let options = {
        host: "localhost",
        path: "/create-transaction",
        port: "8000",
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "Content-Length": Buffer.byteLength(postData)
        }
      };

      const req = http.request(options, (res) => {
        const bodyChunks = [];
        res
          .on("data", (chunk) => {
            bodyChunks.push(chunk);
          })
          .on("end", () => {
            const body = Buffer.concat(bodyChunks);
            const results = JSON.parse(body);
            return reply(results);
          });
      });

      req.on("error", (e) => {
        console.log(`ERROR: ${e.message}`);
        return reply(`ERROR: ${e.message}`);
      });

      req.write(postData);
      req.end();
    }
  });

  server.route({
    method: "PUT",
    path: "/update-negotiation",
    handler: (request, reply) => {
      //get from id and postData from request
      const postData = querystring.stringify({
        id: request.payload.id,
        comments: request.payload.comments,
        status: request.payload.status
      });

      let options = {
        host: "localhost",
        path: `/transactions`,
        port: "8000",
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "Content-Length": Buffer.byteLength(postData)
        }
      };

      const req = http.request(options, res => {
        const bodyChunks = [];
        res
          .on("data", (chunk) => {
            bodyChunks.push(chunk);
          })
          .on("end", () => {
            const body = Buffer.concat(bodyChunks);
            const results = JSON.parse(body);
            return reply(results);
          });
      });

      req.on("error", (e) => {
        console.log(`ERROR: ${e.message}`);
        return reply(`ERROR: ${e.message}`);
      });
      req.write(postData);
      req.end();
    }
  });

  next();
};

plugin.register.attributes = {
  name: "transactionsPlugin",
  version: "0.0.1"
};

module.exports = plugin;
