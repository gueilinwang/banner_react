import React, { Component } from "react";
import imgURL from "./imgs/1200x380.png";
import BannerButton from "./BannerButton";

class Banner extends Component {
  constructor(props) {
    super(props);
    const {
      openAtStart,
      autoToggle,
      button,
      className,
      transition,
      whenTransition
    } = props.setting;
    this.state = {
      openAtStart,
      autoToggle,
      button,
      className,
      transition,
      whenTransition,
      nowState: 1, //1:opened 2:opening 3:closed 4:closing
      interval: null
    };

    this.toggleBanner = this.toggleBanner.bind(this);
    this.cloneObj = this.cloneObj.bind(this);
    this.extendObj = this.extendObj.bind(this);
    this.decideClass = this.decideClass.bind(this);
    this.transEnd = this.transEnd.bind(this);
    this.autoBanner = this.autoBanner.bind(this);
    this.openBanner = this.openBanner.bind(this);
    this.closeBanner = this.closeBanner.bind(this);
  }

  toggleBanner() {
    let { nowState, transition, whenTransition } = this.state;
    if (!transition) {
      if (nowState === 1) {
        this.setState(state => {
          return { nowState: 3 };
        });
      } else if (nowState === 3) {
        this.setState(state => {
          return { nowState: 1 };
        });
      }
    } else {
      if (nowState === 1) {
        this.setState(state => {
          return { nowState: 4, interval: setInterval(whenTransition, 100) };
        });
      } else if (nowState === 3) {
        this.setState(state => {
          return { nowState: 2, interval: setInterval(whenTransition, 100) };
        });
      }
    }
  }
  transEnd() {
    let { nowState, interval } = this.state;
    if (nowState === 4) {
      this.setState({ nowState: 3, interval: clearInterval(interval) });
    } else if (nowState === 2) {
      this.setState({ nowState: 1, interval: clearInterval(interval) });
    }
  }
  autoBanner(time) {
    setTimeout(this.toggleBanner, time);
  }
  decideClass() {
    let { className, nowState, transition } = this.state;
    let bannerClass = "banner";

    if (transition) {
      bannerClass = bannerClass.concat(" transition");
    }
    switch (nowState) {
      case 1:
        bannerClass =
          className.opened === "opened"
            ? bannerClass.concat(" opened")
            : bannerClass.concat(" opened", " ", className.opened);
        break;
      case 2:
        bannerClass =
          className.opening === "opening"
            ? bannerClass.concat(" opening")
            : bannerClass.concat(" opening", " ", className.opening);
        break;
      case 3:
        bannerClass =
          className.closed === "closed"
            ? bannerClass.concat(" closed")
            : bannerClass.concat(" closed", " ", className.closed);
        break;
      case 4:
        bannerClass =
          className.closing === "closing"
            ? bannerClass.concat(" closing")
            : bannerClass.concat(" closing", " ", className.closing);
        break;
      default:
        break;
    }
    return bannerClass;
  }
  cloneObj(oldObj) {
    //複製物件方法
    if (typeof oldObj !== "object") return oldObj;
    if (oldObj === null) return oldObj;
    let newObj = new Object();
    for (let i in oldObj) {
      newObj[i] = this.cloneObj(oldObj[i]);
    }
    return newObj;
  }
  extendObj() {
    //拓展物件
    var args = arguments;
    if (args.length < 2) return;
    var temp = this.cloneObj(args[0]); //调用複製物件方法
    for (let n = 1; n < args.length; n++) {
      for (let i in args[n]) {
        temp[i] = args[n][i];
      }
    }

    return temp;
  }
  openBanner() {
    if (this.state.nowState === 3) {
      this.toggleBanner();
    } else return;
  }
  closeBanner() {
    if (this.state.nowState === 1) {
      this.toggleBanner();
    } else return;
  }

  componentDidMount() {
    let temp = this.extendObj(Banner.defaultProps.setting, this.props.setting);

    this.setState(state => {
      return {
        openAtStart: temp.openAtStart,
        autoToggle: temp.autoToggle,
        button: temp.button,
        className: temp.className,
        transition: temp.transition,
        whenTransition: temp.whenTransition
      };
    });
    if (!temp.openAtStart) {
      this.setState({ nowState: 3 });
    }
    if (temp.autoToggle) {
      let time = typeof temp.autoToggle === "boolean" ? 0 : temp.autoToggle;
      this.autoBanner(time);
    }
  }

  render() {
    return (
      <div className={this.decideClass()}>
        <a className="wrap" href="#" onTransitionEnd={this.transEnd}>
          <img
            className="img"
            src={imgURL}
            title="輸入廣告促銷說明文字"
            alt="輸入廣告促銷說明文字"
          />
        </a>
        <BannerButton
          buttonClass={this.state.nowState}
          buttonText={this.state.button}
          onClick={this.toggleBanner}
        />
      </div>
    );
  }
}
Banner.defaultProps = {
  setting: {
    openAtStart: true,
    autoToggle: false,
    button: {
      closeText: "收合", // [string]
      openText: "展開", // [string]
      class: "btn" // [string]
    },
    className: {
      closed: "closed", // [string]
      closing: "closing", // [string]
      opened: "opened", // [string]
      opening: "opening" // [string]
    },
    transition: true,
    whenTransition: function() {
      console.log("whenTransition");
    }
  }
};
export default Banner;
