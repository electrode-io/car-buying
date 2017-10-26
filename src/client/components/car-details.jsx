import React from "react";
import PropTypes from "prop-types";

import Modal from "./modal-box";

import "../styles/skeleton.css";
import "../styles/custom.css";
import CarBuyingStyles from "../styles/car-buying.css";

/* eslint-disable no-magic-numbers */
class CarDetails extends React.Component {
  constructor(props) {
    super(props);
    this.handleComments = this.handleComments.bind(this);
    this.handlePrice = this.handlePrice.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.EmailDealer = this.EmailDealer.bind(this);
    this.VehicleInfo = this.VehicleInfo.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.handleOnClose = this.handleOnClose.bind(this);
    this.state = {
      commentBox: "",
      expectedPrice: "",
      sentMessage: "",
      isOpen: false
    };
  }

  toggleModal() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  handleOnClose() {
    this.toggleModal();
    window.location.reload();
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
        comments: `Customer: ${this.state.commentBox}`
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
            actualPrice: "",
            expectedPrice: ""
          });
          this.toggleModal();
        });
      })
      .catch(err => {
        throw new Error("Error Updating Negotiation", err);
      });

    event.preventDefault();
  }

  VehicleInfo() {
    const imgSection = this.props.img_name ? (
      <img src={require(`../images/${this.props.img_name}`)} />
    ) : (
      ""
    );
    return (
      <div className={`${CarBuyingStyles["car-details-info"]}`}>
        <h4>
          {this.props.vehicle_year} {this.props.vehicle_make} {this.props.vehicle_model}
        </h4>

        <div className={CarBuyingStyles["info-left"]}>
          <b>VIN#</b>: {this.props.vin_number}
          <br />
          <b>Vehicle Type</b>: {this.props.vehicle_type}
          <br />
          <b>Mileage</b>: {this.props.mileage}
          <br />
          <b>Exterior color</b>: {this.props.vehicle_color}
          <br />
        </div>
        <div className={CarBuyingStyles["info-right"]}>${this.props.list_price}</div>
        <hr />
        {imgSection}
      </div>
    );
  }

  EmailDealer() {
    return (
      <div className={`${CarBuyingStyles["contact-dealer"]}`}>
        <table>
          <tbody>
            <tr>
              <th>
                <h4>Email Dealer</h4>
              </th>
            </tr>
            <tr>
              <td>
                Hello, I would like to learn more about this {this.props.vehicle_year}{" "}
                {this.props.vehicle_make} {this.props.vehicle_model}.
              </td>
            </tr>
            <tr>
              <td>
                Expected Price:{" "}
                <input type="number" value={this.state.expectedPrice} onChange={this.handlePrice} />
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
                  placeholder="Please add your personal message"
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
      <div className={`${CarBuyingStyles["car-details"]} ${CarBuyingStyles["flex-container"]}`}>
        <this.VehicleInfo />
        <this.EmailDealer />
        <Modal show={this.state.isOpen} onClose={this.handleOnClose}>
          You've successfully sent a message to the dealer!
        </Modal>
      </div>
    );
  }
}

CarDetails.propTypes = {
  img: PropTypes.string,
  img_name: PropTypes.string,
  vehicle_make: PropTypes.string,
  vehicle_model: PropTypes.string,
  vehicle_year: PropTypes.string,
  vehicle_type: PropTypes.string,
  vehicle_color: PropTypes.string,
  actual_price: PropTypes.string,
  list_price: PropTypes.string,
  vin_number: PropTypes.string,
  mileage: PropTypes.string,
  location: PropTypes.object
};

export default CarDetails;
