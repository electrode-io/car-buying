import React from "react";
import PropTypes from "prop-types";

import ReplyBlock from "./reply-block";
import VehicleInfoBlock from "./vehicle-info-block";
import { FaCheckCircle } from "react-icons/lib/fa";

import "../styles/skeleton.css";
import "../styles/custom.css";
import "../styles/user.css";
import "../styles/modal.css";
import negotiationStyles from "../styles/negotiation.css";

class AcceptedBlock extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={negotiationStyles.expectation}>
        <FaCheckCircle className={negotiationStyles.acceptedIcon} />
        Dealer Accepted
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
      return <ReplyBlock data={this.props.transData} parent={this.props.parent} />;
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
            <UserTransReplyBlock transData={this.props.data} parent={this.props.parent} />
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

UserTransReplyBlock.propTypes = {
  transData: PropTypes.shape({
    status: PropTypes.string
  }),
  parent: PropTypes.string
};

export default Negotiation;
