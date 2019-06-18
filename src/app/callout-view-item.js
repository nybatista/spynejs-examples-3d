import {ViewStream} from 'spyne';

export class CalloutViewItem extends ViewStream {

  constructor(props = {}) {
     props.class = props.data.classStr;
     props.tagName='article';
     props.template=document.querySelector('#callout-item');
     super(props);

  }

  addActionListeners() {
    // return nexted array(s)
    return [
      ['CHANNEL_THREEJS_ANGLE_CHANGE_EVENT', 'disposeViewStream']

    ];
  }

  onDisposeCallout(){

  }

  broadcastEvents() {
    // return nexted array(s)
    return [];
  }

  onRendered() {
    this.addChannel("CHANNEL_THREEJS");

  }

}