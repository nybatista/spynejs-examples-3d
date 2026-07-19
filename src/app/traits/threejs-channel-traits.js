import { SpyneTrait, ChannelPayloadFilter } from "spyne";

export class ThreejsChannelTraits extends SpyneTrait {
  constructor(context) {
    let traitPrefix = "threejsChannel$";
    super(context, traitPrefix);
  }

  static threejsChannel$GetThreejsAction(str) {
    const hash = {
      CHANNEL_UI_MOUSEDOWN_EVENT: "CHANNEL_THREEJS_START_ANIMATION_EVENT",
      CHANNEL_UI_MOUSEUP_EVENT: "CHANNEL_THREEJS_END_ANIMATION_EVENT",
      CHANNEL_UI_TOUCHSTART_EVENT: "CHANNEL_THREEJS_START_ANIMATION_EVENT",
      CHANNEL_UI_TOUCHEND_EVENT: "CHANNEL_THREEJS_END_ANIMATION_EVENT",
      CHANNEL_WINDOW_WHEEL_EVENT: "CHANNEL_THREEJS_START_ANIMATION_EVENT",
    };

    return hash[str];
  }

  static threejsChannel$OnMouseEvent(e) {
    let { action } = e.clone();
    action = this.threejsChannel$GetThreejsAction(action);

    this.sendChannelPayload(action, {});
  }

  static threejsChannel$AddUIChannel() {
    const arrActions = [
      "CHANNEL_UI_MOUSEDOWN_EVENT",
      "CHANNEL_UI_MOUSEUP_EVENT",
      "CHANNEL_UI_TOUCHSTART_EVENT",
      "CHANNEL_UI_TOUCHEND_EVENT",
    ];
    const pred = (str) => arrActions.indexOf(str) >= 0;
    const uiPayloadFilter = new ChannelPayloadFilter("#threejs", {
      action: pred,
    });
    const ui$ = this.getChannel("CHANNEL_UI", uiPayloadFilter);

    ui$.subscribe(this.threejsChannel$OnMouseEvent.bind(this));

    this.getChannel(
      "CHANNEL_WINDOW",
      new ChannelPayloadFilter({ action: "CHANNEL_WINDOW_WHEEL_EVENT" }),
    ).subscribe(this.threejsChannel$OnMouseEvent.bind(this));
  }
}
