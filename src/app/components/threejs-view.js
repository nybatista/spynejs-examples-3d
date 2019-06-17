import {ViewStream} from 'spyne';
import {ThreejsTrait} from '../traits/threejs-trait';
import {AngleUtils} from '../../angle-utils';

export class ThreejsView extends ViewStream {

  constructor(props = {}) {
    props.id='threejs';
    props.traits = ThreejsTrait;
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

  onFrameUpdate(controlRads){
    let angle = this.props.angleUtils.checkAngle(controlRads);
    if (angle!==null){
      console.log('angle ',angle);
      let action = 'CHANNEL_THREEJS_ANGLE_CHANGE_ACTION';
      this.sendInfoToChannel("CHANNEL_THREEJS", angle, action);

    }

  }

  onRendered() {
    this.props.angleUtils = new AngleUtils();
    this.threejs$Initialize();
  }

}