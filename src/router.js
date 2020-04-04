import Vue from 'vue';
import Router from 'vue-router';
import Readme from './components/Readme';

Vue.use(Router);

export default new Router({
    routes: [{
        path: '/readme',
        name: 'Readme',
        component: Readme
    } ]
})