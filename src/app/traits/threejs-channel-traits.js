import { SpyneTrait, ChannelPayloadFilter } from "spyne";
import {
  debounceTime,
  distinctUntilChanged,
  map,
  merge,
  share} from "rxjs";

export class ThreejsChannelTraits extends SpyneTrait {
  constructor(context) {
    let traitPrefix = "threejsChannel$";
    super(context, traitPrefix);
  }


  static threejsChannel$OnMouseEvent(e) {
    const startThreeJsAnim = /(START|DOWN)/.test(e.action);
    this.threejsChannel$SendChannelPayload(startThreeJsAnim);
  }

  static threejsChannel$SendChannelPayload(startThreeJsAnim = true){
    const action = startThreeJsAnim ?
        "CHANNEL_THREEJS_START_ANIMATION_EVENT" :
        "CHANNEL_THREEJS_END_ANIMATION_EVENT";

    this.sendChannelPayload(action, {});
  }

  static threejsChannel$AddUIChannel() {
    const arrActions = [
      "CHANNEL_UI_MOUSEDOWN_EVENT",
      "CHANNEL_UI_MOUSEUP_EVENT",
      "CHANNEL_UI_TOUCHSTART_EVENT",
      "CHANNEL_UI_TOUCHEND_EVENT",
    ];
    const pred = (str) => arrActions.indexOf(str) >= 0;
    const uiPayloadFilter = new ChannelPayloadFilter("#threejs", {
      action: pred,
    });
    const ui$ = this.getChannel("CHANNEL_UI", uiPayloadFilter);

    ui$.subscribe(this.threejsChannel$OnMouseEvent.bind(this));

    // Wheel events have no natural release gesture, so wheel activity is
    // derived as a boolean STATE stream: every wheel event maps to true,
    // 400ms of wheel quiet maps to false, and distinctUntilChanged emits
    // only the transitions — one true per burst, one false per quiet.
    // The stream's value is the argument SendChannelPayload expects, so
    // the subscriber is the sender itself. share() keeps a single channel
    // subscription feeding both branches of the merge.
    const wheel$ = this.getChannel(
        "CHANNEL_WINDOW",
        new ChannelPayloadFilter({
          action: "CHANNEL_WINDOW_WHEEL_EVENT",
        }),
    ).pipe(share());

    const wheelActivity$ = merge(
        wheel$.pipe(map(() => true)),
        wheel$.pipe(
            debounceTime(400),
            map(() => false),
        ),
    ).pipe(distinctUntilChanged());

    wheelActivity$.subscribe(
        this.threejsChannel$SendChannelPayload.bind(this),
    );
  }
}
