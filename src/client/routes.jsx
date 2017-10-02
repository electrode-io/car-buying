import React from "react";
import { Router, Route } from "react-router";
import Home from "./components/home";
import User from "./components/user";
import Dealer from "./components/dealer";
import CarDetails from "./components/car-details";
import TransactionHistory from "./components/transaction-history";
import DealerTransactions from "./components/dealer-transactions";

export const routes = (
  <Router>
    <Route path="/" component={Home} />
    <Route path="/user" component={User} />
    <Route path="/dealer" component={Dealer} />
    <Route path="/car-details" component={CarDetails} />
    <Route path="/history" component={TransactionHistory} />
    <Route path="/dealer-transactions" component={DealerTransactions} />
  </Router>
);
