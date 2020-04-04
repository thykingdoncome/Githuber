import Vue from 'vue';
import Router from 'vue-router';
import Readme from './components/Readme';
import Container from './components/Container';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'Container',
            component: Container
        },
        {
        path: '/readme/:username/:repo',
        name: 'Readme',
        component: Readme
    } ]
})