import { ViewStream } from "spyne";
import CreativeCommonsTmpl from "./templates/creative-commonts.tmpl.html";
export class CcAttrView extends ViewStream {
  constructor(props = {}) {
    props.id = "cc-attr";
    props.template = CreativeCommonsTmpl;
    super(props);
  }

  addActionListeners() {
    // return nested array(s)
    return [];
  }

  broadcastEvents() {
    // return nested array(s)
    return [];
  }

  onRendered() {}
}
