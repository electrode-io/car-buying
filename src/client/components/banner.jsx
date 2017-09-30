import React from "react";
import skeleton from "../styles/skeleton.css";
import custom from "../styles/custom.css";
import user from "../styles/user.css";
import bannerStyles from "../styles/banner.css";

import { browserHistory } from "react-router";

class Banner extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={`${bannerStyles["anim-banner"]} ${bannerStyles[this.props.className]}`}>
        <div className={bannerStyles.title}>
          <h2>{this.props.title}</h2>
        </div>
        <div className={`${bannerStyles["anim-1"]} ${bannerStyles.slide}`} />
        <div className={`${bannerStyles["anim-2"]} ${bannerStyles.slide3}`} />
        <div className={`${bannerStyles["anim-3"]} ${bannerStyles.slide2}`} />
      </div>
    );
  }
}

Banner.propTypes = {
  className: React.PropTypes.string,
  title: React.PropTypes.string
};

export default Banner;
