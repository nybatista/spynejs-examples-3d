import { ViewStream } from "spyne";
import { ThreejsView } from "components/threejs-view.js";
import { CalloutView } from "components/callout-view.js";
import { CcAttrView } from "components/cc-attr-view.js";

export class AppView extends ViewStream {
  constructor(props = {}) {
    props.el = document.querySelector("#app");
    super(props);
  }

  addThreejsView() {
    this.appendView(new CcAttrView());
    this.appendView(new CalloutView());
    this.appendView(new ThreejsView());
  }

  onRendered() {
    this.addThreejsView();
  }
}
