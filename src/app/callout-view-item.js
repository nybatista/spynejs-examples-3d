import {ViewStream} from 'spyne';

export class CalloutViewItem extends ViewStream {

  constructor(props = {}) {
     props.class = props.data.classStr;
     props.tagName='article';
     props.animateIn=true;
     props.animateOut=true;
     props.template=document.querySelector('#callout-item');
     super(props);

  }

  addActionListeners() {
    // return nexted array(s)
    return [
      ['CHANNEL_THREEJS_ANGLE_CHANGE_EVENT', 'disposeViewStream']

    ];
  }

  onRendered() {
    this.addChannel("CHANNEL_THREEJS");

  }

}