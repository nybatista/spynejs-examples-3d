import { SpyneTrait } from "spyne";
import { CalloutViewItem } from "components/callout-view-item.js";

export class CalloutTraits extends SpyneTrait {
  constructor(context) {
    let traitPrefix = "callout$";
    super(context, traitPrefix);
  }

  callout$GetTitle(str) {
    const titleHash = {
      left: "LEFT PROFILE",
      front: "FRONT VIEW",
      right: "RIGHT PROFILE",
      back: "CONTROLS VIEW",
    };
    return titleHash[str];
  }

  callout$GetListItems(str) {
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

  callout$GetCalloutData(str) {
    let title = this.callout$GetTitle(str);
    let classStr = `details ${str}`;
    let items = this.callout$GetListItems(str);
    return { title, classStr, items };
  }

  callout$OnAngleChangeEvent(e) {
    let { angleName } = e.clone();
    let data = this.callout$GetCalloutData(angleName);
    this.appendView(new CalloutViewItem({ data }));
  }
}
