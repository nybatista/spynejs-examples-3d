import { ViewStream } from "spyne";
import { AppTraits } from "traits/app-traits.js";

export class AppView extends ViewStream {
  constructor(props = {}) {
    props.tagName = "main";
    props.traits = [AppTraits];
    props.id = "app";
    super(props);
  }

  onRendered() {
    this.app$AddThreejsView();
  }
}
