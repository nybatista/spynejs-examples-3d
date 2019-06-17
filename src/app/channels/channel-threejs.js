import {Channel} from 'spyne';

export class ChannelThreejs extends Channel {
  constructor(){
    const name = "CHANNEL_THREEJS";
    super(name,{})
  }

  onRegistered(){
    console.log('channel registered');
  }

  addRegisteredActions(){
    return [
      'CHANNEL_THREEJS_ANGLE_CHANGE_ACTION'
    ]

  }


  onViewStreamInfo(vsPayload){
    let {action, payload} = vsPayload.props();
    console.log('vs payload is ',action,payload);;
  }




}