import {Channel, ChannelPayloadFilter} from 'spyne';
import {FilterTraits} from '../traits/filter-traits';


export class ChannelPageRoute extends Channel {

  constructor(name, props = {}) {
    name = "CHANNEL_PAGE_ROUTE";
    props.sendCachedPayload = false;
    props.traits = FilterTraits;
    super(name, props);
  }

  onChannelInitialized() {
    const pagePayloadFilter = this.filters$PageChangeFilter();
    this.getChannel('CHANNEL_ROUTE', pagePayloadFilter)
    .subscribe(this.onPageRouteChanged.bind(this));
  }

  onPageRouteChanged(e){
    let {routeData} = e.props();
    const action = "CHANNEL_PAGE_ROUTE_EVENT";
    this.sendChannelPayload(action ,routeData);
  }

  addRegisteredActions() {
    return [
      "CHANNEL_PAGE_ROUTE_EVENT"
    ];
  }


}