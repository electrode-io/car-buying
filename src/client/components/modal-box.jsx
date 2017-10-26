import React from "react";
import PropTypes from "prop-types";

import CarBuyingStyles from "../styles/car-buying.css";

class Modal extends React.Component {
  render() {
    if (!this.props.show) {
      return null;
    }

    return (
      <div className={CarBuyingStyles.backdrop}>
        <div className={CarBuyingStyles.modalbox}>
          {this.props.children}
          <button className={CarBuyingStyles.footer} onClick={this.props.onClose}>
            Close
          </button>
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  show: PropTypes.bool,
  children: PropTypes.node
};

export default Modal;
