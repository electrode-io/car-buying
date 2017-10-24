import React from "react";
import PropTypes from "prop-types";

import modalStyles from "../styles/modal.css";

class Modal extends React.Component {
  render() {
    if (!this.props.show) {
      return null;
    }

    return (
      <div className={modalStyles.backdrop}>
        <div className={modalStyles.modalbox}>
          {this.props.children}
          <button className={modalStyles.footer} onClick={this.props.onClose}>
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
