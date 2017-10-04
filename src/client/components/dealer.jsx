import React from "react";
import { browserHistory } from "react-router";
import { connect } from "react-redux";

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
            {this.props.cars.map(v => <Car key={v.vin_number} data={v} />)}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    cars: state.cars
  };
};

export default connect(mapStateToProps)(Dealer);
