import React from "react";
import { ReactRouter, browserHistory } from "react-router";
import "../styles/normalize.css";
import "../styles/raleway.css";
import skeleton from "../styles/skeleton.css";
import custom from "../styles/custom.css";
import electrodePng from "../images/electrode.png";

export default () => (
  <div className={custom.container}>
    <section className={custom.header}>
      <h2 className={skeleton.title}>Hello from Electrode Workshop</h2>
      <h4 className={skeleton.title}>Please select your role:</h4>

      <div>
        <button
          className={`${custom.user} ${custom.roleButton}`}
          onClick={() => {
            browserHistory.push("/user");
          }}
        >
          Buyer
        </button>
        <button
          className={`${custom.dealer} ${custom.roleButton}`}
          onClick={() => {
            browserHistory.push("/dealer");
          }}
        >
          Dealer
        </button>
      </div>
    </section>
  </div>
);
