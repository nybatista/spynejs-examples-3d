import { ViewStream } from "spyne";
import { ThreejsTrait } from "traits/threejs-trait.js";
import { AngleUtils } from "./angle-utils.js";

export class ThreejsView extends ViewStream {
  constructor(props = {}) {
    props.id = "threejs";
    props.traits = ThreejsTrait;
    props.channels = ['CHANNEL_THREEJS'];
    props.animateScooter = true;
    super(props);
  }
  onFrameUpdate(controlRads) {
    let angle = this.props.angleUtils.checkAngle(controlRads);
    if (angle !== null) {
      let action = "CHANNEL_THREEJS_ANGLE_CHANGE_EVENT";
      //SEND INFO TO CHANNEL THREEEJS
      this.sendInfoToChannel("CHANNEL_THREEJS", angle, action);
    }
  }
  addActionListeners() {
    return [
      ["CHANNEL_THREEJS_START_ANIMATION_EVENT", "onStartAnimation"],
      ["CHANNEL_THREEJS_END_ANIMATION_EVENT", "onEndAnimation"],
    ];
  }

  broadcastEvents() {
    return [
      ["div", "mousedown"],
      ["div", "mouseup"],
      ["div", "touchstart"],
      ["div", "touchend"],
    ];
  }
  onStartAnimation() {
    this.props.animateScooter = true;
    this.props.animateFn();
  }
  onEndAnimation() {
    this.props.animateScooter = false;
  }

  onRendered() {
    this.props.angleUtils = new AngleUtils();
    this.threejs$OnLoad();
  }
}
