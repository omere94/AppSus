import appHeader from './cmps/app-header.js';
import appFooter from './cmps/app-footer.js';
import { router } from './router.js';

const options = {
    el: '#app',
    router,
    template: `
        <section>
            <app-header />
            <router-view />
            <app-footer />
        </section>
    `,
    components: {
        appHeader,
        appFooter
    }
};

const app = new Vue(options);