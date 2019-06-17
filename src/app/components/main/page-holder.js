import {ViewStream} from 'spyne';
import {PageTraits} from '../../traits/page-traits';
import {FilterTraits} from '../../traits/filter-traits';

export class PageHolderView extends ViewStream {

  constructor(props = {}) {
    props.id='page-holder';
    props.tagName='section';
    props.traits = [FilterTraits, PageTraits];
    super(props);
  }

  addActionListeners() {
    return [
      ['CHANNEL_PAGE_ROUTE_EVENT', 'onPageEvent']
    ];
  }

  onPageEvent(e){
    let {pageId} = e.props();
    const PageClass = this.pageTrait$GetPageClass(pageId);
    this.appendView(new PageClass());
  }

  broadcastEvents() {
    return [

    ];
  }

  afterRender() {
   this.addChannel("CHANNEL_PAGE_ROUTE");
  }

}