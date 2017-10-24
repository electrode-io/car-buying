import React from "react";
import PropTypes from "prop-types";
import negotiationStyles from "../styles/negotiation.css";

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
                <span className={negotiationStyles["vehicle-info-text-comments"]} key={key}>
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

VehicleInfoBlock.propTypes = {
  data: PropTypes.object,
  infoData: PropTypes.shape({
    vin_number: PropTypes.string,
    actual_price: PropTypes.string,
    customer_id: PropTypes.number,
    status: PropTypes.string
  })
};

export default VehicleInfoBlock;
