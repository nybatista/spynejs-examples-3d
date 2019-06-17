import {ViewStream} from 'spyne';
import {PageTraits} from '../../traits/page-traits';
import {ProfilesContentView} from './profiles-content-view';

export class ProfilesPageView extends ViewStream {

  constructor(props = {}) {
    props.tagName = 'article';
    props.id='page-profiles';
    props.class='page';
    props.traits = [PageTraits];
    super(props);
  }

  addActionListeners() {
    return [
      this.pageTrait$OnPageChangeBindToDispose()
    ];
  }


  afterRender() {
    this.pageTrait$InitPage();
    this.appendView(new ProfilesContentView());
  }

}