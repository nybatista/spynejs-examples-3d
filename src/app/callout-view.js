import {ViewStream} from 'spyne';
import {CalloutViewItem} from './callout-view-item';

export class CalloutView extends ViewStream {

  constructor(props = {}) {
    props.tagName='section';
    props.id='callout-holder';
    //props.template=document.querySelector('#callout-item');
    super(props);

  }

  addActionListeners() {
    // return nexted array(s)
    return [
        ['CHANNEL_THREEJS_ANGLE_CHANGE_EVENT', 'onAngleChangeEvent']
    ];
  }

  getCalloutData(str){
    let title = String(str).toUpperCase();
    let classStr = `details ${str}`;

    return {title,classStr};

  }

  onAngleChangeEvent(e){
    let {angleName} = e.props();
    let data = this.getCalloutData(angleName);
    this.appendView(new CalloutViewItem({data}));
    console.log("ANGlE CHANGE EVENT",{angleName, data});
  }

  broadcastEvents() {
    // return nexted array(s)
    return [];
  }

  onRendered() {
    this.addChannel("CHANNEL_THREEJS");
  }

}