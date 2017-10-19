import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import skeleton from "../styles/skeleton.css";
import custom from "../styles/custom.css";
import user from "../styles/user.css";
import sectionStyles from "../styles/section.css";
import Car from "./car";
import Negotiation from "./negotiation-box";
import Banner from "./banner";
import { browserHistory } from "react-router";
import dealerStyles from "../styles/dealer.css";
import Filter from "./filter";

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
          className={`${user.listings}`}
        >
          Listings
        </button>
        <div className={`${user.userView} ${sectionStyles["flex-container"]}`}>
          {/* Transactions List Section */}
          <div className={`${sectionStyles["cars-list"]} ${sectionStyles["flex-item"]}`}>
            {this.props.transactions.map(v => <Negotiation key={v.id} data={v} parent="User" />)}
          </div>
          <div className={`${dealerStyles.tabs} ${sectionStyles["flex-item"]}`}>
            <p className={dealerStyles.filter}>
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
TransactionHistory.propTypes = {};

const mapStateToProps = state => {
  return {
    transactions: getVisibleTransactions(state.transactions, state.visibilityFilter)
  };
};

export default connect(mapStateToProps)(TransactionHistory);
