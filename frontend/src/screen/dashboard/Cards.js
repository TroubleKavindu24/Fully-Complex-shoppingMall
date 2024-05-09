import React, { Component } from "react";
import pie from "../../images/pie.png";

export default class Cards extends Component {
  render() {
    return (
      <div style={{ color: "grey", marginTop: "15px", marginLeft: "-80px" }}>
        <div className="row">
          <div className="col-10">
            <h4>Sales Chart</h4>
            <img
              src="https://playfairdata.com/wp-content/uploads/2022/05/3-Ways-to-Make-Lovely-Line-Graphs-in-Tableau.GIF.gif"
              style={{
                height: "400px",
                width: "40%",
                marginTop: "15px",
                marginBottom: "15px",
              }}
            />
          </div>
          <div
            className="col"
            style={{ height: "30%", width: "10%", marginLeft: "-400px" }}
          >
            <h4>Item Summary</h4>
            <img src={pie} />
          </div>
        </div>
      </div>
    );
  }
}
