import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { browserHistory } from "react-router";

import Negotiation from "./negotiation-box";
import Banner from "./banner";
import Filter from "./filter";

import "../styles/skeleton.css";
import "../styles/custom.css";
import CarBuyingStyles from "../styles/car-buying.css";

class TransactionHistory extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Banner className={"user-banner"} title={"User Transactions"} />
        <button
          onClick={() => {
            browserHistory.push("/user");
          }}
          className={`${CarBuyingStyles.listings}`}
        >
          Listings
        </button>
        <div className={`${CarBuyingStyles.userView} ${CarBuyingStyles["flex-container"]}`}>
          {/* Transactions List Section */}
          <div className={`${CarBuyingStyles["cars-list"]} ${CarBuyingStyles["flex-item"]}`}>
            {this.props.transactions.map(v => (
              <Negotiation key={v.id} data={v} parent="Customer" />
            ))}
          </div>
          <div className={`${CarBuyingStyles.tabs} ${CarBuyingStyles["flex-item"]}`}>
            <p className={CarBuyingStyles.filter}>
              Show: <Filter filter="SHOW_ALL">All</Filter>
              {", "}
              <Filter filter="NEGOTIATION">Negotiations</Filter>
              {", "}
              <Filter filter="ACCEPTED">Accepted</Filter>
            </p>
          </div>
        </div>
      </div>
    );
  }
}

const getVisibleTransactions = (transactions, filter) => {
  switch (filter) {
    case "SHOW_ALL":
      return transactions;
    case "ACCEPTED":
      return transactions.filter(t => t.status === "ACCEPTED");
    case "NEGOTIATION":
      return transactions.filter(t => t.status === "NEGOTIATION");
    default:
      return transactions;
  }
};

TransactionHistory.propTypes = {
  transactions: PropTypes.array
};

const mapStateToProps = state => {
  return {
    transactions: getVisibleTransactions(state.transactions, state.visibilityFilter)
  };
};

export default connect(mapStateToProps)(TransactionHistory);
