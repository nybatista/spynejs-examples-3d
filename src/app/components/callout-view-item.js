import { ViewStream } from "spyne";

export class CalloutViewItem extends ViewStream {
  constructor(props = {}) {
    props.class = props.data.classStr;
    props.tagName = "article";
    props.template = `<div class="content">
                      <header class="icon {{classStr}}"></header>
                      <h2>{{title}}</h2>
                      <ul>
                        {{#items}}
                        <li>{{.*}}</li>
                        {{/items}}
                      </ul>
                    </div>
                    `;
    props.channels = ["CHANNEL_THREEJS"];
    super(props);
  }

  addActionListeners() {
    return [["CHANNEL_THREEJS_ANGLE_CHANGE_EVENT", "disposeViewStream"]];
  }
}
