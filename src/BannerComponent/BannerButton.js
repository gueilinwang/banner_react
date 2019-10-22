import React, { Component } from "react";
class BannerButton extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let button =
      this.props.buttonText.class === "btn"
        ? "btn"
        : `btn ${this.props.buttonText.class}`;
    let buttonContent = this.props.buttonText.closeText;

    if (this.props.buttonClass === 3 || this.props.buttonClass === 4) {
      button = button + " " + "down";
      buttonContent = this.props.buttonText.openText; //展開
    }
    return (
      <button className={button} onClick={this.props.onClick}>
        {buttonContent}
      </button>
    );
  }
}

export default BannerButton;
