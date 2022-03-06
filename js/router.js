import homePage from './pages/home-page.js';
import keepApp from './apps/keep/pages/keep-app.js';
import emailApp from './apps/email/pages/email-app.js';
import emailDetails from './apps/email/cmps/email-details.js';
import emailCompose from './apps/email/cmps/email-compose.js';
import emailList from './apps/email/cmps/email-list.js';


const routes = [{
    path: '/',
    component: homePage
},
{
    path: '/email',
    component: emailApp,
    children: [{
        path: '/',
        component: emailList
    },
    {
        path: 'list',
        component: emailList
    },
    {
        path: 'compose',
        component: emailCompose
    },
    {
        path: 'compose/:emailId',
        component: emailCompose
    },
    {
        path: ':emailId',
        component: emailDetails
    }
    ]
},
{
    path: '/keep',
    component: keepApp
},
];

export const router = new VueRouter({ routes });