import { ViewStream } from "spyne";
import { ThreejsTraits } from "traits/threejs-traits.js";
import { AngleUtils } from "traits/utils/angle-utils.js";

export class ThreejsView extends ViewStream {
  constructor(props = {}) {
    props.id = "threejs";
    props.traits = ThreejsTraits;
    props.channels = ["CHANNEL_THREEJS", "CHANNEL_WINDOW"];
    props.animateScooter = true;
    super(props);
  }

  addActionListeners() {
    return [
      ["CHANNEL_THREEJS_START_ANIMATION_EVENT", "threejs$OnStartAnimation"],
      ["CHANNEL_THREEJS_END_ANIMATION_EVENT", "threejs$OnEndAnimation"],
      ["CHANNEL_WINDOW_RESIZE_EVENT", "threejs$onWindowResize"],
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

  onRendered() {
    this.props.angleUtils = new AngleUtils();
    this.threejs$OnLoad();
  }
}
