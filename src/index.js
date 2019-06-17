import {css} from "./scss/main.scss";
import {SpyneApp, ViewStream, ChannelFetch, Channel} from 'spyne';
import {ChannelThreejs} from './app/channels/channel-threejs';
import {ThreejsView} from './app/components/threejs-view';

const spyneApp = new SpyneApp({debug:true})




spyneApp.registerChannel(new ChannelThreejs());

var app = new ViewStream({el:document.querySelector('#app')});
app.appendView(new ThreejsView());






/*
import {MainView} from './app/components/main/main-view';
import {ChannelProfiles} from './app/channels/channel-profiles';
import {ChannelPageRoute} from './app/channels/channel-page-route';
import {ProfileTraits} from './app/traits/profile-trait';
const spyneApp = new SpyneApp({
  debug:true,
  channels: {
    ROUTE: {
      type: "slash",
      routes: {
        routePath: {
          routeName: 'pageId',
          home: '^$|index.html',
          about: 'about',
          profiles: {
            routePath: {
              routeName: 'profileId'
            }
          },
          404: ".*"
        }
      }
    }
  }
});

//window.history.scrollRestoration='manual';

const app = new MainView();
app.appendToDom(document.body);

let channelFetchProps = {
  url: "//assetscontainer.com/starter-app/random-users-main.json",
  mapFn: ProfileTraits.profileTraits$mapProfiles
};
spyneApp.registerChannel(new ChannelFetch("CHANNEL_USERS", channelFetchProps));
spyneApp.registerChannel(new ChannelProfiles());
spyneApp.registerChannel(new ChannelPageRoute());
*/
