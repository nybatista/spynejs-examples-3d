import { ViewStream } from "spyne";
import { CalloutTraits } from "traits/callout-traits.js";

export class CalloutView extends ViewStream {
  constructor(props = {}) {
    props.tagName = "section";
    props.id = "callout-holder";
    props.traits = [CalloutTraits];
    props.channels = ["CHANNEL_THREEJS"];
    super(props);
  }

  addActionListeners() {
    return [
      ["CHANNEL_THREEJS_ANGLE_CHANGE_EVENT", "callout$OnAngleChangeEvent"],
    ];
  }
}
