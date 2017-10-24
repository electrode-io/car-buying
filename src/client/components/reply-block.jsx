import React from "react";
import PropTypes from "prop-types";

import Modal from "./modal-box";
import negotiationStyles from "../styles/negotiation.css";

const HTTP_BAD_REQUEST = 400;

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
        comments: `${this.props.data.comments}\n${this.props.parent}: ${this.state.replyText}`
      })
    })
      .then(response => {
        if (response.status >= HTTP_BAD_REQUEST) {
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
        comments: `${this.props.data.comments}\n${this.props.parent}: ACCEPTED OFFER`
      })
    })
      .then(response => {
        if (response.status >= HTTP_BAD_REQUEST) {
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
          disabled={this.props.data.status !== "NEGOTIATION" || !this.state.replyText}
        >
          Reply
        </button>
        {this.props.parent === "Dealer" ? (
          <button className={negotiationStyles.button} onClick={this.handleAccept}>
            Accept Offer
          </button>
        ) : null}
        <Modal show={this.state && this.state.isOpen} onClose={this.handleOnClose}>
          <ModalContent type={this.state && this.state.handleType} />
        </Modal>
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

export default ReplyBlock;
