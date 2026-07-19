import { DomElement } from "spyne";
import CreativeCommonsTmpl from "./templates/creative-commonts.tmpl.html";

export class CreativeCommonsDomEl extends DomElement {
  constructor(props = {}) {
    props.id = "cc-attr";
    props.template = CreativeCommonsTmpl;
    super(props);
  }
}
