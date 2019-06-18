import {ViewStream} from 'spyne';

export class CalloutView extends ViewStream {

  constructor(props = {}) {
    props.tagName='section';
    props.id='callout-holder';
    super(props);

  }

  addActionListeners() {
    // return nexted array(s)
    return [];
  }

  broadcastEvents() {
    // return nexted array(s)
    return [];
  }

  onRendered() {

  }

}