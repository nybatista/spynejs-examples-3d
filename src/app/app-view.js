import {ViewStream} from 'spyne';
import {ThreejsView} from './threejs-view';
import {CalloutView} from './callout-view';

export class AppView extends ViewStream {
  constructor(props={}){
    props.el = document.querySelector('#app')
    super(props);
  }


  addThreejsView(){
    this.appendView(new CalloutView());
    this.appendView(new ThreejsView());

  }

  onRendered(){
    this.addThreejsView();
  }




}