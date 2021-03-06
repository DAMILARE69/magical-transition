import React, { Children } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

import { addClasses, canAnimate, resetClassList } from "./utils";

class MagicalTransition extends React.Component {
  static propTypes = {
    children: PropTypes.node,
    name: PropTypes.exact({
      beforeEnter: PropTypes.string,
      entering: PropTypes.string,
      beforeLeave: PropTypes.string,
      leaving: PropTypes.string,
    }),
    disableOnRender: PropTypes.bool,
    delay: PropTypes.number,
    duration: PropTypes.number.isRequired,
  };

  static defaultProps = {
    children: null,
    name: {
      beforeEnter: "before-enter",
      entering: "entering",
      beforeLeave: "before-leave",
      leaving: "leaving",
    },
    duration: 500,
    delay: 0,
  };

  state = {
    children: this.props.disableOnRender ? this.props.children : null,
  };

  animationTimer;
  delayTimer;
  isAnimating = false;
  raf;

  waitForNode = (callback) => {
    if (!this) return;

    const node = ReactDOM.findDOMNode(this);

    if (node) {
      callback(node);
    } else {
      this.raf = requestAnimationFrame(() => {
        this.waitForNode(callback);
      });
    }
  };

  clearTimers = () => {
    cancelAnimationFrame(this.raf);
    clearTimeout(this.animationTimer);
    clearTimeout(this.delayTimer);
    this.isAnimating = false;
  };

  animateIn = () => {
    if (!canAnimate()) {
      this.setState({ children: this.props.children });
      return;
    }

    this.clearTimers();
    this.isAnimating = true;

    this.delayTimer = setTimeout(() => {
      this.setState({ children: this.props.children }, () => {
        const { name } = this.props;

        this.waitForNode((node) => {
          resetClassList(node, name);
          addClasses(node, name.beforeEnter);

          this.raf = requestAnimationFrame(() => {
            this.raf = requestAnimationFrame(() => {
              addClasses(node, name.entering);
            });
          });

          this.animationTimer = setTimeout(() => {
            resetClassList(node, name);
            this.isAnimating = false;
            this.setState({});
          }, this.props.duration);
        });
      });
    }, this.props.delay);
  };

  animateOut = () => {
    if (!canAnimate()) {
      this.setState({ children: this.props.children });
      return;
    }

    const node = ReactDOM.findDOMNode(this);
    const { name } = this.props;

    if (!node) return;

    this.clearTimers();
    this.isAnimating = true;

    this.delayTimer = setTimeout(() => {
      resetClassList(node, name);
      addClasses(node, name.beforeLeave);

      this.raf = requestAnimationFrame(() => {
        addClasses(node, name.leaving);
      });

      this.animationTimer = setTimeout(() => {
        this.isAnimating = false;
        this.setState({ children: this.props.children });
      }, this.props.duration);
    }, this.props.delay);
  };

  componentDidMount() {
    if (this.props.children && !this.props.disableOnRender) {
      this.raf = requestAnimationFrame(() => {
        this.animateIn();
      });
    }
  }

  componentWillUnmount() {
    this.clearTimers();
  }

  componentDidUpdate(prevProps) {
    const newChildren = Children.toArray(this.props.children);
    const oldChildren = Children.toArray(prevProps.children);

    if (newChildren.length !== oldChildren.length) {
      if (newChildren.length) {
        this.animateIn();
      } else {
        this.animateOut();
      }
    } else if (
      this.props.children !== this.state.children &&
      !this.isAnimating
    ) {
      this.setState({ children: this.props.children });
    }
  }

  render() {
    return this.state.children;
  }
}

export default MagicalTransition;
