import React from "react";
import PropTypes from "prop-types";
import skeleton from "../styles/skeleton.css";
import custom from "../styles/custom.css";
import user from "../styles/user.css";
import sectionStyles from "../styles/section.css";
import carDetails from "../styles/car-details.css";
import { connect } from "react-redux";

class CarDetails extends React.Component {
  constructor(props) {
    super(props);
    this.handleComments = this.handleComments.bind(this);
    this.handlePrice = this.handlePrice.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.EmailDealer = this.EmailDealer.bind(this);
    this.VehicleInfo = this.VehicleInfo.bind(this);
    this.state = {
      commentBox: "",
      expectedPrice: "",
      sentMessage: ""
    };
  }
  handleComments(event) {
    this.setState({
      commentBox: event.target.value
    });
  }
  handlePrice(event) {
    this.setState({
      expectedPrice: event.target.value
    });
  }

  handleSubmit(event) {
    fetch("/create-transaction", {
      credentials: "same-origin",
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        customer_id: 1,
        vin_number: this.props.vin_number,
        actual_price: this.state.expectedPrice,
        status: "NEGOTIATION",
        comments: "Customer : " + this.state.commentBox
      })
    })
      .then(response => {
        if (response.status >= 400) {
          throw new Error("Bad response from server");
        }
        response.json().then(negotiation => {
          this.setState({
            sentMessage: negotiation,
            commentBox: "",
            actualPrice: ""
          });
        });
      })
      .catch(err => {
        throw new Error("Error Updating Negotiation", err);
      });

    event.preventDefault();
  }

  VehicleInfo() {
    const imgSection = this.props.img_name
      ? <img src={require(`../images/${this.props.img_name}`)} />
      : "";
    return (
      <div className={`${carDetails["car-details-info"]}`}>
        <h4>
          {this.props.vehicle_year} {this.props.vehicle_make}{" "}
          {this.props.vehicle_model}
        </h4>

        <div className={carDetails["info-left"]}>
          VIN#: {this.props.vin_number}
          <br />
          Vehicle Type: {this.props.vehicle_type}
          <br />
          Mileage: {this.props.mileage}
          <br />
          Exterior color: {this.props.vehicle_color}
          <br />
        </div>
        <div className={carDetails["info-right"]}>
          ${this.props.list_price}
        </div>
        <hr />
        {imgSection}
      </div>
    );
  }

  EmailDealer() {
    return (
      <div className={`${carDetails["contact-dealer"]}`}>
        <table>
          <tbody>
            <tr>
              <th>Email Dealer</th>
            </tr>
            <tr>
              <td>
                Hello, I would like to learn more about this{" "}
                {this.props.vehicle_year} {this.props.vehicle_make}{" "}
                {this.props.vehicle_model}.
              </td>
            </tr>
            <tr>
              <td>
                Expected Price:{" "}
                <input
                  type="number"
                  value={this.state.expectedPrice}
                  onChange={this.handlePrice}
                />
              </td>
            </tr>
            <tr>
              <td>
                Comments: <br />
                <textarea
                  value={this.state.commentBox}
                  onChange={this.handleComments}
                  rows="4"
                  cols="50"
                  placeholder="Add your personal message"
                />
              </td>
            </tr>
          </tbody>
        </table>
        <button onClick={this.handleSubmit}>Contact Dealer</button>
      </div>
    );
  }

  render() {
    this.props = this.props.location.state || {};
    return (
      <div
        className={`${carDetails["car-details"]} ${sectionStyles[
          "flex-container"
        ]}`}
      >
        <this.VehicleInfo />
        <this.EmailDealer />
      </div>
    );
  }
}

CarDetails.propTypes = {
  img: PropTypes.string,
  vehicle_make: PropTypes.string,
  vehicle_model: PropTypes.string,
  vehicle_year: PropTypes.string,
  vehicle_color: PropTypes.string,
  actual_price: PropTypes.string,
  list_price: PropTypes.string,
  vin_number: PropTypes.string
};

export default CarDetails;
