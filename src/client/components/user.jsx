import React from "react";
import { browserHistory } from "react-router";
import { connect } from "react-redux";

import Car from "./car";
import Banner from "./banner";

import userStyles from "../styles/user.css";
import sectionStyles from "../styles/section.css";
import "../styles/skeleton.css";
import "../styles/custom.css";

import mazdaImg from "../images/mazda.png";
import mazdaRedImg from "../images/mazda-red.png";

/*
 * Demostrates a simple pure functional component
 */
class UserView extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Banner className={"user-banner"} title={"User View"} />
        <button
          onClick={() => {
            browserHistory.push("/history");
          }}
          className={`${userStyles.history}`}
        >
          History
        </button>
        <div className={`${userStyles.userView} ${sectionStyles["flex-container"]}`}>
          {/* Cars List Section */}
          <div className={`${sectionStyles["cars-list"]} ${sectionStyles["flex-item"]}`}>
            {this.props.cars.map(v => <Car key={v.vin_number} data={v} />)}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    cars: state.cars
  };
};

export default connect(mapStateToProps)(UserView);
