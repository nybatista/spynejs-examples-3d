import "./scss/main.scss";

import { SpyneApp } from "spyne";
import { ChannelThreejs } from "channels/channel-threejs";
import { AppView } from "./app/app-view";
import { SpynePluginConsole } from "spyne-plugin-console";

const config = {
  debug: true,
  channels: {
    WINDOW: {
      listenForScroll: true,
      listenForWheel: true,
      debounceMSTimeForScroll: 24,
    },
  },
};

SpyneApp.init(config);
new AppView();

SpyneApp.registerChannel(new ChannelThreejs());

if (process.env.NODE_ENV === "development") {
  SpyneApp.registerPlugin(
    new SpynePluginConsole({ position: ["bottom", "right"], minimize: true }),
  );
}
//"Vespa 50 Special" (https://skfb.ly/6Zx6S) by danilo2222255 is licensed under Creative Commons Attribution (http://creativecommons.org/licenses/by/4.0/).a
