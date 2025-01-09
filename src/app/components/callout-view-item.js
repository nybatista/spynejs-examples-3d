import { ViewStream } from "spyne";
import CalloutItemTmpl from './templates/callout-item.tmpl.html';

export class CalloutViewItem extends ViewStream {
  constructor(props = {}) {
    props.class = props.data.classStr;
    props.tagName = "article";
    props.template = CalloutItemTmpl;
    super(props);
  }

  addActionListeners() {
    return [["CHANNEL_THREEJS_ANGLE_CHANGE_EVENT", "disposeViewStream"]];
  }

  onRendered() {
    this.addChannel("CHANNEL_THREEJS");
  }
}
