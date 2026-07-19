import { ViewStream } from "spyne";
import CalloutViewTmpl from "./templates/callout-view-item.tmpl.html";
export class CalloutViewItem extends ViewStream {
  constructor(props = {}) {
    props.class = props.data.classStr;
    props.tagName = "article";
    props.template = CalloutViewTmpl;
    props.channels = ["CHANNEL_THREEJS"];
    super(props);
  }

  addActionListeners() {
    return [["CHANNEL_THREEJS_ANGLE_CHANGE_EVENT", "disposeViewStream"]];
  }
}
