import React from "react";
import { browserHistory } from "react-router";

import Car from "./car";
import Banner from "./banner";

import userStyles from "../styles/user.css";
import sectionStyles from "../styles/section.css";
import "../styles/skeleton.css";
import "../styles/custom.css";

import mazdaImg from "../images/mazda.png";
import mazdaRedImg from "../images/mazda-red.png";

/*
 * Demostrates a simple pure functional component
 */
class UserView extends React.Component {
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
          list_price: "30,000",
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
        <Banner className={"user-banner"} title={"User View"} />
        <button
          onClick={() => {
            browserHistory.push("/history");
          }}
          className={`${userStyles.history}`}
        >
          History
        </button>
        <div className={`${userStyles.userView} ${sectionStyles["flex-container"]}`}>
          {/* Cars List Section */}
          <div className={`${sectionStyles["cars-list"]} ${sectionStyles["flex-item"]}`}>
            {this.state.cars.map(v => <Car key={v.vin_number} data={v} />)}
          </div>
        </div>
      </div>
    );
  }
}

export default UserView;
