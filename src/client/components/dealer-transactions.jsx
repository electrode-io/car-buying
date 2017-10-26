import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import Negotiation from "./negotiation-box";
import Banner from "./banner";
import Filter from "./filter";

import "../styles/skeleton.css";
import "../styles/custom.css";
import CarBuyingStyles from "../styles/car-buying.css";

class DealerTransactions extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Banner className={"dealer-banner"} title={"Dealer Negotiations"} />
        <div className={`${CarBuyingStyles.dealerView} ${CarBuyingStyles["flex-container"]}`}>
          {/* Transactions List Section */}
          <div className={`${CarBuyingStyles["cars-list"]} ${CarBuyingStyles["flex-item"]}`}>
            {this.props.transactions.map(v => <Negotiation key={v.id} data={v} parent="Dealer" />)}
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

const mapStateToProps = state => {
  return {
    transactions: getVisibleTransactions(state.transactions, state.visibilityFilter)
  };
};

DealerTransactions.propTypes = {
  transactions: PropTypes.array
};

export default connect(mapStateToProps)(DealerTransactions);
