import {ViewStream} from 'spyne';
import ccATTRHTMLTmpl from './templates/cc-attr.tmpl.html';

export class CcAttrView extends ViewStream {

    constructor(props={}) {
        props.id = 'cc-attr';

        props.template = ccATTRHTMLTmpl;


        super(props);
    }

    addActionListeners() {
        // return nested array(s)
        return [];
    }

    broadcastEvents() {
        // return nested array(s)
        return [];
    }

    onRendered() {

    }

}

