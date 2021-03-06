import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { actionCreators } from "./store";
import {
  BackTopWrapper
} from "./style";

class BackTop extends PureComponent {
  render() {
    const { scrollShow } = this.props;
    return scrollShow ? <BackTopWrapper onClick={this.handleBackTop}>ToTop</BackTopWrapper> : null
  }

  componentDidMount() {
    this.bindEvents();
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.props.changeScrollShow);
  }

  handleBackTop() {
    let distance =  window.scrollY;
    let step = distance / 10; //每步的距离
    (function jump() {
      if (distance > 0) {
        distance -= step;
        window.scrollTo(0, distance);
        return setTimeout(jump, 16);
      }
    })();
  }

  bindEvents() {
    window.addEventListener("scroll", this.props.changeScrollShow);
  }
}

const mapState = (state) => ({
  scrollShow: state.getIn(["backTop", "scrollShow"])
})

const mapDispatch = (dispatch) => ({
  changeScrollShow() {
    let scrollTop = document.documentElement.scrollTop;
    if(scrollTop > 100) {
      dispatch(actionCreators.scrollToTop(true));
    } else {
      dispatch(actionCreators.scrollToTop(false));
    }
  }
})

export default connect(mapState, mapDispatch)(BackTop);