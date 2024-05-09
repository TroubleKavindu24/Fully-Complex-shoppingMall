import React, { Component } from "react";

export default class Footer extends Component {
  render() {
    return (
      <div>
        <footer class="bg-dark text-center text-white">
          <div class="text-center p-3" style={{ backgroundColor: "black" }}>
            © 2024 Copyright:
            <a class="text-white" href="https://mdbootstrap.com/">
              Innovative Trade Plaza Mall
            </a>
          </div>
        </footer>
      </div>
    );
  }
}
