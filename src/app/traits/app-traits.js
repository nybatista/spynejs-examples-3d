import { SpyneTrait } from "spyne";
import { CreativeCommonsDomEl } from "components/creative-commons-dom-el.js";
import { CalloutView } from "components/callout-view.js";
import { ThreejsView } from "components/threejs-view.js";

export class AppTraits extends SpyneTrait {
  constructor(context) {
    let traitPrefix = "app$";
    super(context, traitPrefix);
  }

  static app$AddThreejsView() {
    this.props.el.appendChild(new CreativeCommonsDomEl().render());
    this.appendView(new CalloutView());
    this.appendView(new ThreejsView());
  }
}
