import {SpyneApp, ViewStream} from 'spyne';
import {ChannelThreejs} from './app/channel-threejs';
import {AppView} from './app/app-view';

const config = {debug:true};
//const spyneApp = new SpyneApp(config)

SpyneApp.init(config);
new AppView();

SpyneApp.registerChannel(new ChannelThreejs());
