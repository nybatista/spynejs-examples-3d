import { ViewStream } from "spyne";
import { CalloutViewItem } from "./callout-view-item.js";

export class CalloutView extends ViewStream {
  constructor(props = {}) {
    props.tagName = "section";
    props.id = "callout-holder";
    props.channels = ["CHANNEL_THREEJS"];
    super(props);
  }

  addActionListeners() {
    return [["CHANNEL_THREEJS_ANGLE_CHANGE_EVENT", "onAngleChangeEvent"]];
  }

  getTitle(str) {
    const titleHash = {
      left: "LEFT PROFILE",
      front: "FRONT VIEW",
      right: "RIGHT PROFILE",
      back: "CONTROLS VIEW",
    };
    return titleHash[str];
  }

  getListItems(str) {
    const itemsHash = {
      left: ["Halley", "Euler", "d'Alembert", "Clairaut", "Lagrange"],
      front: ["Category", "Anti-roll bar", "Axle", "Axle track", "Beam axle"],
      right: [
        "Multifuel",
        "Gasoline engine",
        "Hesselman engine",
        "HCCI engine",
        "Hot bulb engine",
      ],
      back: ["ET8 150", "GT 125", "GT 200", "GTS 250ie", "PX 125"],
    };
    return itemsHash[str];
  }

  getCalloutData(str) {
    let title = this.getTitle(str);
    let classStr = `details ${str}`;
    let items = this.getListItems(str);
    return { title, classStr, items };
  }

  onAngleChangeEvent(e) {
    let { angleName } = e.clone();
    let data = this.getCalloutData(angleName);
    this.appendView(new CalloutViewItem({ data }));
  }
}
