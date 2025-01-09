import { Channel, ChannelPayloadFilter } from "spyne";

export class ChannelThreejs extends Channel {
  constructor(name, props = {}) {
    name = "CHANNEL_THREEJS";
    super(name, props);
  }

  getThreejsAction(str) {
    const hash = {
      CHANNEL_UI_MOUSEDOWN_EVENT: "CHANNEL_THREEJS_START_ANIMATION_EVENT",
      CHANNEL_UI_MOUSEUP_EVENT: "CHANNEL_THREEJS_END_ANIMATION_EVENT",
      CHANNEL_UI_TOUCHSTART_EVENT: "CHANNEL_THREEJS_START_ANIMATION_EVENT",
      CHANNEL_UI_TOUCHEND_EVENT: "CHANNEL_THREEJS_END_ANIMATION_EVENT",
      CHANNEL_WINDOW_WHEEL_EVENT: "CHANNEL_THREEJS_START_ANIMATION_EVENT",
    };

    return hash[str];
  }

  onMouseEvent(e) {
    let { action } = e.clone();
    action = this.getThreejsAction(action);

    this.sendChannelPayload(action, {});
  }

  addUIChannel() {
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

    ui$.subscribe(this.onMouseEvent.bind(this));

    this.getChannel(
      "CHANNEL_WINDOW",
      new ChannelPayloadFilter({ action: "CHANNEL_WINDOW_WHEEL_EVENT" }),
    ).subscribe(this.onMouseEvent.bind(this));
  }

  onRegistered() {
    this.addUIChannel();
  }

  addRegisteredActions() {
    return [
      "CHANNEL_THREEJS_ANGLE_CHANGE_EVENT",
      "CHANNEL_THREEJS_START_ANIMATION_EVENT",
      "CHANNEL_THREEJS_END_ANIMATION_EVENT",
    ];
  }

  onViewStreamInfo(vsPayload) {
    console.log("PAYLOAD IS ", vsPayload);
    let { action, payload } = vsPayload.clone();
    this.sendChannelPayload(action, payload);
  }
}
