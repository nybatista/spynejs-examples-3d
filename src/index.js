import "./scss/main.scss";

import { SpyneApp } from "spyne";
import { ChannelThreejs } from "channels/channel-threejs.js";
import { AppView } from "./app/app-view.js";

const config = {
  debug: true,
  channels: {
    WINDOW: {
      listenForScroll: true,
      listenForWheel: true,
      debounceMSTimeForResize: 24,
      debounceMSTimeForScroll: 24,
    },
  },
};

SpyneApp.init(config);
new AppView().appendToDom(document.body);

SpyneApp.registerChannel(new ChannelThreejs());

// Conditionally load additional dev tools
if (process.env.NODE_ENV === "development") {
  import("./dev-tools.js");
}

//"Vespa 50 Special" (https://skfb.ly/6Zx6S) by danilo2222255 is licensed under Creative Commons Attribution (http://creativecommons.org/licenses/by/4.0/).a
