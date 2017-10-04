import React from "react";
import PropTypes from "prop-types";
import skeleton from "../styles/skeleton.css";
import custom from "../styles/custom.css";
import user from "../styles/user.css";
import negotiationStyles from "../styles/negotiation.css";
import Car from "./car";
import { connect } from "react-redux";

class Negotiation extends React.Component {
  constructor(props) {
    super(props);
    this.handleComments = this.handleComments.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleAccept = this.handleAccept.bind(this);
    this.state = {
      replyText: ""
    };
  }

  handleComments(event) {
    this.setState({
      replyText: event.target.value
    });
  }

  handleSubmit(event) {
    fetch("/update-negotiation", {
      credentials: "same-origin",
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        id: this.props.data.id,
        comments: this.props.data.comments + "\n" + this.props.parent + ": " + this.state.replyText
      })
    })
      .then(response => {
        if (response.status >= 400) {
          throw new Error("Bad response from server");
        }
        response.json().then(negotiation => {
          this.props.data.comments = negotiation.comments;
          this.setState({
            replyText: ""
          });
        });
      })
      .catch(err => {
        throw new Error("Error Updating Negotiation", err);
      });

    event.preventDefault();
  }

  handleAccept(event) {
    fetch("/update-negotiation", {
      credentials: "same-origin",
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        id: this.props.data.id,
        actual_price: this.props.data.actual_price,
        status: "ACCEPTED",
        comments: this.props.data.comments + "\n" + this.props.parent + ": " + "ACCEPTED OFFER"
      })
    })
      .then(response => {
        if (response.status >= 400) {
          throw new Error("Bad response from server");
        }
        response.json().then(negotiation => {
          this.props.data.comments = negotiation.comments;
          this.setState({
            replyText: ""
          });
        });
      })
      .catch(err => {
        throw new Error("Error Updating Negotiation", err);
      });

    event.preventDefault();
  }

  render() {
    return (
      <div className={negotiationStyles.negotiation}>
        <div className={negotiationStyles["vehicle-info"]}>
          <div className={negotiationStyles["vehicle-info-text"]}>
            VIN: {this.props.data.vin_number}
            <br />
            Price: {this.props.data.actual_price}
            <br />
            CustomerID: {this.props.data.customer_id}
            <br />
            Status: {this.props.data.status}
            <br />
            Comments: <br />
            {this.props.data.comments &&
              this.props.data.comments.split("\n").map((item, key) => {
                return (
                  <span key={key}>
                    {item}
                    <br />
                  </span>
                );
              })}
            <br />
          </div>

          <div className={negotiationStyles["expectation"]}>
            <span className={negotiationStyles["subtitle"]}>
              Reply <br />
            </span>
            <textarea
              value={this.state.replyText}
              onChange={this.handleComments}
              rows="4"
              cols="50"
            />
            <br />

            <button
              className={negotiationStyles.button}
              onClick={this.handleSubmit}
              disabled={this.props.data.status != "NEGOTIATION"}
            >
              Reply
            </button>
            <button className={negotiationStyles.button} onClick={this.handleAccept}>
              Accept Offer
            </button>
          </div>
        </div>
        <hr />
      </div>
    );
  }
}

Negotiation.propTypes = {
  data: PropTypes.object,
  parent: PropTypes.string
};

export default Negotiation;
