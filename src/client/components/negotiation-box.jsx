import React from "react";
import PropTypes from "prop-types";
import skeleton from "../styles/skeleton.css";
import custom from "../styles/custom.css";
import user from "../styles/user.css";
import negotiationStyles from "../styles/negotiation.css";
import Car from "./car";
import { connect } from "react-redux";
import * as FontAwesome from "react-icons/lib/fa";

class ReplyBlock extends React.Component {
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
    event.preventDefault();
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
    return (
      <div className={negotiationStyles["expectation"]}>
        <textarea
          value={this.state.replyText}
          onChange={this.handleComments}
          rows="4"
          cols="25"
          placeholder="Your reply here..."
        />
        <br />

        <button
          className={negotiationStyles.button}
          onClick={this.handleSubmit}
          disabled={this.props.data.status != "NEGOTIATION"}
        >
          Reply
        </button>
        <button
          className={negotiationStyles.button}
          onClick={this.handleAccept}
        >
          Accept Offer
        </button>
      </div>
    );
  }
}

class AcceptedBlock extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={negotiationStyles["expectation"]}>
        <FontAwesome.FaCheckCircle
          className={negotiationStyles["acceptedIcon"]}
        />
        Accepted
      </div>
    );
  }
}

class VehicleInfoBlock extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const CommentsBlock = props => {
      props = props.props;
      if (props.infoData.comments) {
        return (
          <div>
            <b>Comments</b>: <br />
            {props.infoData.comments.split("\n").map((item, key) => {
              return (
                <span
                  className={negotiationStyles["vehicle-info-text-comments"]}
                  key={key}
                >
                  {item}
                  <br />
                </span>
              );
            })}
          </div>
        );
      } else {
        return "";
      }
    };

    return (
      <div className={negotiationStyles["vehicle-info-text-content"]}>
        <b>VIN</b>: {this.props.infoData.vin_number}
        <br />
        <b>Price</b>: {this.props.infoData.actual_price}
        <br />
        <b>CustomerID</b>: {this.props.infoData.customer_id}
        <br />
        <b>Status</b>: {this.props.infoData.status}
        <br />
        <CommentsBlock props={this.props} />
      </div>
    );
  }
}

class UserTransReplyBlock extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const isAccepted = this.props.transData.status === "ACCEPTED";

    if (isAccepted) {
      return <AcceptedBlock />;
    } else {
      return (
        <ReplyBlock data={this.props.transData} parent={this.props.parent} />
      );
    }
  }
}

class Negotiation extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={negotiationStyles.negotiation}>
        <div className={negotiationStyles["vehicle-info"]}>
          <div className={negotiationStyles["vehicle-info-text"]}>
            <VehicleInfoBlock infoData={this.props.data} />
            <UserTransReplyBlock
              transData={this.props.data}
              parent={this.props.parent}
            />
          </div>
        </div>
        <hr />
      </div>
    );
  }
}

VehicleInfoBlock.propTypes = {
  data: PropTypes.object
};

Negotiation.propTypes = {
  data: PropTypes.object,
  parent: PropTypes.string
};

export default Negotiation;
