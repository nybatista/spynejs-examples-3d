import {ViewStream} from 'spyne';

export class ProfileItemView extends ViewStream {

  constructor(props = {}) {
    props.id='profile-item-view';
    props.class=`profile-item ${props.data.profileId}`;
    props.animInClass = 'reveal';
    props.template=require('./templates/profile-item.tmpl.html');
    super(props);
  }

  addActionListeners() {
    return [
        ['CHANNEL_PROFILES_MENU_EVENT', 'disposeViewStream']
    ];
  }

  broadcastEvents() {
    return [];
  }

  afterRender() {
    this.addChannel('CHANNEL_PROFILES');
   this.props.el$.addAnimClass('reveal');
  }

}