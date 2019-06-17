import {SpyneTrait} from 'spyne';
import {HomePageView} from '../components/page-home/home-page-view';
import {ProfilesPageView} from '../components/page-profiles/profiles-page-view';
import {AboutPageView} from '../components/page-about/about-page-view';
import {Page404} from '../components/page-404/page-404';

export class PageTraits extends SpyneTrait {

  constructor(context) {
    let traitPrefix = "pageTrait$";
    super(context, traitPrefix);
  }

  static pageTrait$GetPageClass(pageId='home'){
    const classHashObj = {
      'home' : HomePageView,
      'profiles' : ProfilesPageView,
      'about' :  AboutPageView,
      '404' : Page404
    };
    return classHashObj[pageId];
  }

  static pageTrait$OnPageChangeBindToDispose(){
    return  ['CHANNEL_PAGE_ROUTE_EVENT', 'disposeViewStream'];
  }

  static pageTrait$InitPage(){
    this.addChannel("CHANNEL_PAGE_ROUTE");

  }

}