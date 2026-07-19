import { Channel } from "spyne";
import { ThreejsChannelTraits } from "traits/threejs-channel-traits.js";

export class ChannelThreejs extends Channel {
  constructor(name, props = {}) {
    name = "CHANNEL_THREEJS";
    props.traits = [ThreejsChannelTraits];
    super(name, props);
  }

  onRegistered() {
    this.threejsChannel$AddUIChannel();
  }

  addRegisteredActions() {
    return [
      "CHANNEL_THREEJS_ANGLE_CHANGE_EVENT",
      "CHANNEL_THREEJS_START_ANIMATION_EVENT",
      "CHANNEL_THREEJS_END_ANIMATION_EVENT",
    ];
  }

  onViewStreamInfo(vsPayload) {
    let { action, payload } = vsPayload.clone();
    this.sendChannelPayload(action, payload);
  }
}
