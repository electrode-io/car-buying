import React from "react";
import PropTypes from "prop-types";
import skeleton from "../styles/skeleton.css";
import custom from "../styles/custom.css";
import user from "../styles/user.css";
import negotiationStyles from "../styles/negotiation.css";
import Car from "./car";
import { connect } from "react-redux";
import * as FontAwesome from "react-icons/lib/fa";

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
        comments:
          this.props.data.comments +
          "\n" +
          this.props.parent +
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
        status: "ACCEPTED",
        comments:
          this.props.data.comments +
          "\n" +
          this.props.parent +
          ": " +
          "ACCEPTED OFFER"
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
    function AcceptedBlock() {
      return (
        <div className={negotiationStyles["expectation"]}>
          <FontAwesome.FaCheckCircle
            className={negotiationStyles["acceptedIcon"]}
          />
          Accepted
        </div>
      );
    }

    function ReplyBlock(props) {
      props = props.replyData;
      return (
        <div className={negotiationStyles["expectation"]}>
          <textarea
            value={props.state.replyText}
            onChange={props.handleComments}
            rows="4"
            cols="25"
            placeholder="Message to dealer here..."
          />
          <br />

          <button
            className={negotiationStyles.button}
            onClick={props.handleSubmit}
            disabled={props.props.data.status != "NEGOTIATION"}
          >
            Reply
          </button>
          <button
            className={negotiationStyles.button}
            onClick={props.handleAccept}
          >
            Accept Offer
          </button>
        </div>
      );
    }

    function UserTransReplyBlock(props) {
      props = props.transData;
      const isAccepted = props.props.data.status === "ACCEPTED";

      if (isAccepted) {
        return <AcceptedBlock />;
      } else {
        return <ReplyBlock replyData={props} />;
      }
    }

    function VehicleInfoBlock(props) {
      return (
        <div className={negotiationStyles["vehicle-info-text-content"]}>
          VIN: {props.infoData.data.vin_number}
          <br />
          Price: {props.infoData.data.actual_price}
          <br />
          CustomerID: {props.infoData.data.customer_id}
          <br />
          Status: {props.infoData.data.status}
          <br />
          Comments: <br />
          {props.infoData.data.comments &&
            props.infoData.data.comments.split("\n").map((item, key) => {
              return (
                <span key={key}>
                  {item}
                  <br />
                </span>
              );
            })}
        </div>
      );
    }

    return (
      <div className={negotiationStyles.negotiation}>
        <div className={negotiationStyles["vehicle-info"]}>
          <div className={negotiationStyles["vehicle-info-text"]}>
            <VehicleInfoBlock infoData={this.props} />
            <UserTransReplyBlock transData={this} />
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
