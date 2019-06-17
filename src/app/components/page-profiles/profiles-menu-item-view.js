import {ViewStream} from 'spyne';

export class ProfilesMenuItemView extends ViewStream {
  constructor(props = {}) {
    props.tagName = 'li';
    props.class = `profile-item-${props.data.profileId} profile-num-${props.data.profileNum}`;
    props.dataset = {
      channel: "ROUTE",
      profileId: props.data.profileId
    };
    props.template = require('./templates/profiles-menu-item.tmpl.html');
    super(props);

  }

  addActionListeners() {
    // return nexted array(s)
    return [];
  }

  broadcastEvents() {
    // return nexted array(s)
    return [
        ['li', 'click']
    ];
  }

  afterRender() {

  }

}