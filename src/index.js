import Vue from 'vue';

import App from './components/Terminal.vue';

export default class JSTerminal {
    constructor(element) {
        this.attachToElement(element);
    }

    attachToElement(element) {
        new Vue({
            render: createElement => createElement(App)
        }).$mount(element);
    }
};