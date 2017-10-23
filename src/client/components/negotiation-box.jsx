import React from "react";
import PropTypes from "prop-types";

import Modal from "./modal-box";
import { FaCheckCircle } from "react-icons/lib/fa";

import "../styles/skeleton.css";
import "../styles/custom.css";
import "../styles/user.css";
import "../styles/modal.css";
import negotiationStyles from "../styles/negotiation.css";

/* eslint-disable no-magic-numbers */
class ReplyBlock extends React.Component {
  constructor(props) {
    super(props);
    this.handleComments = this.handleComments.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleAccept = this.handleAccept.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.handleOnClose = this.handleOnClose.bind(this);
    this.state = {
      replyText: "",
      isOpen: false,
      handleType: ""
    };
  }

  toggleModal(type) {
    this.setState({
      isOpen: !this.state.isOpen,
      handleType: type
    });
  }

  handleOnClose() {
    this.toggleModal("");
    window.location.reload();
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
        comments: `${this.props.data.comments}\n${this.props.parent}: ${this
          .state.replyText}`
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
          this.toggleModal("reply");
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
        comments: `${this.props.data.comments}\n${this.props
          .parent}: ACCEPTED OFFER`
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
          this.toggleModal("accept");
        });
      })
      .catch(err => {
        throw new Error("Error Updating Negotiation", err);
      });

    event.preventDefault();
  }

  render() {
    const ModalContent = props => {
      const type = props.type;
      if (type === "reply") {
        return <p>You've successfully sent a message to the dealer!</p>;
      } else if (type === "accept") {
        return <p>Congratulations! You've successfully accepted the offer.</p>;
      } else {
        return "";
      }
    };
    return (
      <div className={negotiationStyles.expectation}>
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
          disabled={
            this.props.data.status !== "NEGOTIATION" || !this.state.replyText
          }
        >
          Reply
        </button>
        <button
          className={negotiationStyles.button}
          onClick={this.handleAccept}
        >
          Accept Offer
        </button>
        <Modal
          show={this.state && this.state.isOpen}
          onClose={this.handleOnClose}
        >
          <ModalContent type={this.state && this.state.handleType} />
        </Modal>
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
      <div className={negotiationStyles.expectation}>
        <FaCheckCircle className={negotiationStyles.acceptedIcon} />
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
              if (item.trim() === "Customer:" || item.trim() === "Dealer:") {
                item = `${item.trim()} N/A`;
              }

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

ReplyBlock.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.number,
    comments: PropTypes.string,
    actual_price: PropTypes.string,
    status: PropTypes.string
  }),
  parent: PropTypes.string
};

VehicleInfoBlock.propTypes = {
  data: PropTypes.object,
  infoData: PropTypes.shape({
    vin_number: PropTypes.string,
    actual_price: PropTypes.string,
    customer_id: PropTypes.number,
    status: PropTypes.string
  })
};

Negotiation.propTypes = {
  data: PropTypes.object,
  parent: PropTypes.string
};

UserTransReplyBlock.propTypes = {
  transData: PropTypes.shape({
    status: PropTypes.string
  }),
  parent: PropTypes.string
};

export default Negotiation;
