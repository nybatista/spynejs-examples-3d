import {Channel, ChannelPayloadFilter} from 'spyne';

export class ChannelThreejs extends Channel {
  constructor(){
    const name = "CHANNEL_THREEJS";
    super(name,{})
  }


  getThreejsAction(str){
    const hash = {
      CHANNEL_UI_MOUSEDOWN_EVENT: "CHANNEL_THREEJS_START_ANIMATION_EVENT",
      CHANNEL_UI_MOUSEUP_EVENT: "CHANNEL_THREEJS_END_ANIMATION_EVENT"
    };

    return hash[str];

  }

  onMouseEvent(e){
    let {action} = e.props();
    action = this.getThreejsAction(action);
    this.sendChannelPayload(action, {});

  }


  addUIChannel(){

    const arrActions = ['CHANNEL_UI_MOUSEDOWN_EVENT', 'CHANNEL_UI_MOUSEUP_EVENT'];
    const pred = (str)=>arrActions.indexOf(str)>=0;
    const uiPayloadFilter = new ChannelPayloadFilter('#threejs', {action:pred});
    const ui$ = this.getChannel('CHANNEL_UI', uiPayloadFilter);

    ui$.subscribe(this.onMouseEvent.bind(this));;
  }

  onRegistered(){
    this.addUIChannel();
  }

  addRegisteredActions(){
    return [
      'CHANNEL_THREEJS_ANGLE_CHANGE_EVENT',
        'CHANNEL_THREEJS_START_ANIMATION_EVENT',
        'CHANNEL_THREEJS_END_ANIMATION_EVENT'
    ]

  }


  onViewStreamInfo(vsPayload){
    let {action, payload} = vsPayload.props();
    this.sendChannelPayload(action, payload);
  }




}