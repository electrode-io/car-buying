import React from "react";
import skeleton from "../styles/skeleton.css";
import custom from "../styles/custom.css";
import user from "../styles/user.css";
import negotiationStyles from "../styles/negotiation.css";
import Car from "./car";

class Negotiation extends React.Component {
  constructor(props) {
    super(props);
    this.handleComments = this.handleComments.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
        comments:
          this.props.data.comments +
          "\n" +
          this.props.data.dealer_name +
          ": " +
          this.state.replyText
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
        status: true
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
            Comments: <br />
            {this.props.data.comments.split("\n").map((item, key) => {
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

            <button className={negotiationStyles.button} onClick={this.handleSubmit}>
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
  data: React.PropTypes.object
};

export default Negotiation;
