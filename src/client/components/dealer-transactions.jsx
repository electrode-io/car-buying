import React from "react";
import { browserHistory } from "react-router";

import Car from "./car";
import Negotiation from "./negotiation-box";
import Banner from "./banner";

import "../styles/skeleton.css";
import "../styles/custom.css";
import sectionStyles from "../styles/section.css";
import dealerStyles from "../styles/dealer.css";

import mazdaImg from "../images/mazda.png";
import mazdaRedImg from "../images/mazda-red.png";

class DealerTransactions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      negotiations: [
        {
          id: 1,
          actual_price: "$25,915",
          vin_number: "1234567890",
          comments: "Offerring 22000 as per KBB",
          customer_id: "3",
          dealer_name: "Walmart Carmart",
          status: "true"
        }
      ]
    };
  }

  componentDidMount() {
    fetch("/get-negotiations")
      .then(response => {
        if (response.status >= 400) {
          throw new Error("Bad response from server");
        }
        response.json().then(negotiations => {
          this.setState({ negotiations });
        });
      })
      .catch(err => {
        console.log("Error Fetching Transactions", err);
      });
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
            {this.state.negotiations.map(v => <Negotiation key={v.id} data={v} parent="Dealer" />)}
          </div>
        </div>
      </div>
    );
  }
}

export default DealerTransactions;
