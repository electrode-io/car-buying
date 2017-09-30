import React from "react";
import { browserHistory } from "react-router";

import Car from "./car";
import Banner from "./banner";

import mazdaImg from "../images/mazda.png";
import mazdaRedImg from "../images/mazda-red.png";

import dealerStyles from "../styles/dealer.css";
import sectionStyles from "../styles/section.css";
import "../styles/skeleton.css";
import "../styles/custom.css";
import "../styles/banner.css";

class Dealer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cars: [
        {
          img: mazdaRedImg,
          vehicle_make: "Mazda",
          vehicle_model: "3",
          vehicle_year: "2014",
          vehicle_color: "red",
          actual_price: "$25,915",
          list_price: "$30,000",
          vin_number: "1234567890",
          vehicle_type: "Sedan"
        }
      ]
    };
  }

  componentDidMount() {
    fetch("/vehicles")
      .then(response => {
        if (response.status >= 400) {
          throw new Error("Bad response from server");
        }
        response.json().then(cars => {
          this.setState({ cars });
        });
      })
      .catch(err => {
        throw new Error("Error Fetching Vehicles", err);
      });
  }

  render() {
    return (
      <div>
        <Banner className={"dealer-banner"} title={"Dealer View"} />
        <div className={`${dealerStyles.dealerView} ${sectionStyles["flex-container"]}`}>
          {/* Filter Section */}
          <div className={`${dealerStyles.tabs} ${sectionStyles["flex-item"]}`}>
            <button
              className={dealerStyles.active}
              onClick={() => {
                browserHistory.push("/dealer");
              }}
            >
              Inventory
            </button>
            <br />
            <button
              onClick={() => {
                browserHistory.push("/dealer-transactions");
              }}
            >
              Transactions
            </button>
          </div>

          {/* Cars List Section */}
          <div className={`${sectionStyles["cars-list"]} ${sectionStyles["flex-item"]}`}>
            {this.state.cars.map(v => <Car key={v.vin_number} data={v} />)}
          </div>
        </div>
      </div>
    );
  }
}

export default Dealer;
