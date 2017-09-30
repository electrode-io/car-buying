import React from "react";
import { Router, Route } from "react-router";
import Home from "./components/home";
import User from "./components/user";
import Dealer from "./components/dealer";
import CarDetails from "./components/car-details";

export const routes = (
  <Router>
    <Route path="/" component={Home} />
    <Route path="/user" component={User} />
    <Route path="/dealer" component={Dealer} />
    <Route path="/car-details" component={CarDetails} />
  </Router>
);
