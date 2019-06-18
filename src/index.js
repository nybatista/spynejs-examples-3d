//import {css} from "./scss/main.scss";
import {SpyneApp, ViewStream, ChannelFetch, Channel} from 'spyne';
import {ChannelThreejs} from './app/channel-threejs';
import {ThreejsView} from './app/threejs-view';
import {AppView} from './app/app-view';
const config = {debug:true};

const spyneApp = new SpyneApp(config)


new AppView();

spyneApp.registerChannel(new ChannelThreejs());
