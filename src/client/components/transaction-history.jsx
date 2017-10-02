import React from "react";
import skeleton from "../styles/skeleton.css";
import custom from "../styles/custom.css";
import user from "../styles/user.css";
import sectionStyles from "../styles/section.css";
import Car from "./car";
import Negotiation from "./negotiation-box";
import Banner from "./banner";
import { browserHistory } from "react-router";
import dealerStyles from "../styles/dealer.css";
//import AcceptedNegotiation from "./accepted-negotiation";

function NegotiationFilter(props) {
  let data = props && props.data;
  if (data.status == true) {
    //return <AcceptedNegotiation key={data.id} data={data} />;
  } else {
    return <Negotiation key={data.id} data={data} parent="User" />;
  }
}

class TransactionHistory extends React.Component {
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
    fetch("/transactions")
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
            {this.state.negotiations.map(v => <NegotiationFilter key={v.id} data={v} />)}
          </div>
        </div>
      </div>
    );
  }
}

TransactionHistory.propTypes = {};

export default TransactionHistory;
