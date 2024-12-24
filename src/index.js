import {SpyneApp, ViewStream} from 'spyne';
import {ChannelThreejs} from './app/channel-threejs';
import {AppView} from './app/app-view';

const config2 = {debug:true};
//const spyneApp = new SpyneApp(config)
const config = {"debug":true,"channels":{"WINDOW":{"listenForScroll":true,"listenForWheel":true}}}
SpyneApp.init(config);
new AppView();

SpyneApp.registerChannel(new ChannelThreejs());
