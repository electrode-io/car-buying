import React from "react";
import { browserHistory } from "react-router";
import PropTypes from "prop-types";

import "../styles/skeleton.css";
import "../styles/custom.css";
import "../styles/dealer.css";
import sectionStyles from "../styles/section.css";
import carStyles from "../styles/car.css";

class Car extends React.Component {
  render() {
    this.props = this.props && this.props.data;

    return (
      <section
        className={`${carStyles.car} ${sectionStyles["flex-container"]}`}
      >
        {/* Left Car Image */}
        <img
          className={`${carStyles["car-img"]}`}
          src={require(`../images/${this.props.img_name}`)}
        />

        {/* Middle Car Details */}
        <div className={`${carStyles["car-info"]}`}>
          <div className={`${carStyles["left-align-wrapper"]}`}>
            <span className={`${carStyles["car-title"]}`}>
              Used {this.props.vehicle_year} {this.props.vehicle_make}{" "}
              {this.props.vehicle_model}
            </span>
            <br />
            <b>Vehicle Type</b>: {this.props.vehicle_type}
            <br />
            <b>Mileage</b>: {this.props.mileage}
            <br />
            <b>Exterior color</b>: {this.props.vehicle_color}
            <br />
            <b>Location</b>: {this.props.vehicle_location}
            <br />
          </div>
        </div>

        {/* Right Car Price */}
        <div className={`${carStyles["car-price"]}`}>
          <div className={`${carStyles["left-align-wrapper"]}`}>
            <span className={`${carStyles["car-price-sale"]}`}>
              Sale Price: ${this.props.actual_price}
            </span>
            <br />
            List Price: ${this.props.list_price}
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
        </div>
      </section>
    );
  }
}

Car.propTypes = {
  data: PropTypes.object,
  img: PropTypes.string,
  vehicle_make: PropTypes.string,
  vehicle_model: PropTypes.string,
  vehicle_year: PropTypes.string,
  vehicle_color: PropTypes.string,
  actual_price: PropTypes.string,
  list_price: PropTypes.string,
  vin_number: PropTypes.string,
  vehicle_location: PropTypes.string,
  mileage: PropTypes.string,
  img_name: PropTypes.string,
  vehicle_type: PropTypes.string
};

export default Car;
