import React from "react";
import { browserHistory } from "react-router";
import { connect } from "react-redux";

import Car from "./car";
import Negotiation from "./negotiation-box";
import Banner from "./banner";
import Filter from "./filter";

import "../styles/skeleton.css";
import "../styles/custom.css";
import sectionStyles from "../styles/section.css";
import dealerStyles from "../styles/dealer.css";

import mazdaImg from "../images/mazda.png";
import mazdaRedImg from "../images/mazda-red.png";

class DealerTransactions extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Banner className={"dealer-banner"} title={"Dealer Negotiations"} />
        <div className={`${dealerStyles.dealerView} ${sectionStyles["flex-container"]}`}>
          {/* Filter Section */}
          <div className={`${dealerStyles.tabs} ${sectionStyles["flex-item"]}`}>
            <button
              onClick={() => {
                browserHistory.push("/dealer");
              }}
            >
              Inventory
            </button>
            <button
              className={dealerStyles.active}
              onClick={() => {
                browserHistory.push("/dealer-transactions");
              }}
            >
              Transactions
            </button>
          </div>

          {/* Transactions List Section */}
          <div className={`${sectionStyles["cars-list"]} ${sectionStyles["flex-item"]}`}>
            {this.props.transactions.map(v => <Negotiation key={v.id} data={v} parent="Dealer" />)}
          </div>
          <div className={`${dealerStyles.tabs} ${sectionStyles["flex-item"]}`}>
            <p>
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
      return transactions.filter(t => t.status == "ACCEPTED");
    case "NEGOTIATION":
      return transactions.filter(t => t.status == "NEGOTIATION");
    default:
      return transactions;
  }
};

const mapStateToProps = state => {
  return {
    transactions: getVisibleTransactions(state.transactions, state.visibilityFilter)
  };
};

export default connect(mapStateToProps)(DealerTransactions);
