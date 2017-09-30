import React from "react";
import skeleton from "../styles/skeleton.css";
import custom from "../styles/custom.css";
import user from "../styles/user.css";
import sectionStyles from "../styles/section.css";
import carDetails from "../styles/car-details.css";
import { connect } from "react-redux";

import mazdaImg from "../images/mazda.png";

class CarDetails extends React.Component {
  constructor(props) {
    super(props);
    this.handleComments = this.handleComments.bind(this);
    this.handlePrice = this.handlePrice.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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

  render() {
    this.props = this.props.location.state || {};
    return (
      <div className={`${carDetails["car-details"]} ${sectionStyles["flex-container"]}`}>
        <div className={`${carDetails["car-details-info"]}`}>
          <h4>
            {this.props.vehicle_year} {this.props.vehicle_make} {this.props.vehicle_model}
          </h4>

          <div className={carDetails["info-left"]}>
            Exterior color: {this.props.vehicle_color}
            <br />
            31,498 miles<br />
            VIN: {this.props.vin_number}
            <br />
            <span className={carDetails.location}>for Sale in Pleasanton, CA</span>
          </div>
          <div className={carDetails["info-right"]}>${this.props.list_price}</div>
          <hr />
          <img src={this.props.img} />
        </div>

        <div className={`${carDetails["contact-dealer"]}`}>
          <table>
            <tbody>
              <tr>
                <th>Email Dealer</th>
              </tr>
              <tr>
                <td>
                  Hello, I would like to learn more about this {this.props.vehicle_year}{" "}
                  {this.props.vehicle_make} {this.props.vehicle_model}.
                </td>
              </tr>
              <tr>
                <td>
                  Expected Price:
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
              <tr>
                <td>
                  <button onClick={this.handleSubmit}>Contact Dealer</button>
                </td>
              </tr>
              <tr>
                <td>
                  <span>{this.state.sentMessage.comments}</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

CarDetails.propTypes = {
  img: React.PropTypes.string,
  vehicle_make: React.PropTypes.string,
  vehicle_model: React.PropTypes.string,
  vehicle_year: React.PropTypes.string,
  vehicle_color: React.PropTypes.string,
  actual_price: React.PropTypes.string,
  list_price: React.PropTypes.string,
  vin_number: React.PropTypes.string
};

export default CarDetails;
