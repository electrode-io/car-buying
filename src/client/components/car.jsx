import React from "react";
import { browserHistory } from "react-router";

import "../styles/skeleton.css";
import "../styles/custom.css";
import "../styles/dealer.css";
import sectionStyles from "../styles/section.css";
import carStyles from "../styles/car.css";

import mazdaImg from "../images/mazda.png";
import mazdaRedImg from "../images/mazda-red.png";
import blackMerc from "../images/black-c300.jpg";
import blueMerc from "../images/blue-c300.jpg";
import blueCivic from "../images/hondacivic-blue.jpg";

class Car extends React.Component {
  render() {
    this.props = this.props && this.props.data;
    if (!this.props.img) {
      let color = this.props.vehicle_color.toLowerCase();
      let name = this.props.vehicle_make.toLowerCase();
      let img = "";
      switch (name) {
        case "mazda":
          switch (color) {
            case "red":
              img = mazdaRedImg;
              break;
            default:
              img = mazdaImg;
          }
          break;
        case "mercedes":
          switch (color) {
            case "black":
              img = blackMerc;
              break;
            case "blue":
              img = blueMerc;
              break;
            default:
              img = blackMerc;
          }
          break;
        case "honda":
          img = blueCivic;
          break;
        default:
          img = blackMerc;
      }
      this.props.img = img;
    }

    return (
      <section className={`${carStyles["car"]} ${sectionStyles["flex-container"]}`}>
        {/* Right Car Image */}
        <img className={`${carStyles["car-img"]}`} src={this.props.img} />

        {/* Middle Car Details */}
        <div className={`${carStyles["car-info"]}`}>
          <span className={`${carStyles["car-title"]}`}>
            Used {this.props.vehicle_year} {this.props.vehicle_make} {this.props.vehicle_model}
          </span>
          <br />
          Vehicle Type: {this.props.vehicle_type}
          <br />
          Exterior Color: {this.props.vehicle_color}
          <br />
          VIN: {this.props.vin_number}
        </div>

        {/* Right Car Price */}
        <div className={`${carStyles["car-price"]}`}>
          <span className={`${carStyles["car-price-sale"]}`}>
            Sale Price: {this.props.actual_price}
          </span>
          <br />
          List Price: {this.props.list_price}
          <br />
          <button
            onClick={() => {
              browserHistory.push({
                pathname: "/car-details",
                state: this.props
              });
            }}
          >
            Details
          </button>
        </div>
      </section>
    );
  }
}

Car.propTypes = {
  img: React.PropTypes.string,
  vehicle_make: React.PropTypes.string,
  vehicle_model: React.PropTypes.string,
  vehicle_year: React.PropTypes.string,
  vehicle_color: React.PropTypes.string,
  actual_price: React.PropTypes.string,
  list_price: React.PropTypes.string,
  vin_number: React.PropTypes.string
};

export default Car;
