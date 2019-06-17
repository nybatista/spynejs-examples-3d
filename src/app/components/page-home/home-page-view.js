import {ViewStream} from 'spyne';
import {PageTraits} from '../../traits/page-traits';

export class HomePageView extends ViewStream {

  constructor(props = {}) {
    props.tagName = 'article';
    props.id='page-home-page';
    props.class='page';
    props.traits = PageTraits;
    props.template = require('./templates/home.tmpl.html');
    super(props);
    this.props.pageId='home';
  }

  addActionListeners() {
    return [
      this.pageTrait$OnPageChangeBindToDispose()
    ];

  }

  broadcastEvents() {
    return [
        ['.btn', 'click']
    ];
  }

  afterRender() {
    this.pageTrait$InitPage();

  }

}