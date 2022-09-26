import Vue from 'vue'
import VueRouter from 'vue-router'

import News from '../views/news/index'
import Detail from '../views/news/detail'

import Knowledge from '../views/knowledge/index'
import Page from '../views/knowledge/page'
import PageList from '../views/knowledge/pagelist'

import Profile from '../views/my/index'
import Setting from '../views/my/setting'
import Password from '../views/my/password'
import Collect from '../views/my/collect'; 
import MyExams from '../views/my/myexams'
import ExamInfo from '../views/my/examinfo'

import Comments from '../views/my/comments';

import Login from '../views/login/index'
import Register from '../views/register/index'

import NotFound from '../views/notfound/index'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        redirect: '/home',
        meta: {
            auth: false,
        }
    },

    {
        path: '/home',
        name: 'home',
        component: News,
        meta: {
            auth: false,
        }
    },


    {
        path: '/news',
        name: 'news',
        component: News,
        meta: {
            auth: false,
        }
    },

    {
        path: '/detail/:id',
        name: 'detail',
        component: Detail,

        meta: {
            auth: false,
        }
    },

    {
        path: '/knowledge',
        name: 'knowledge',
        component: Knowledge,
        meta: {
            auth: false,
        }
    },

    {
        path: '/page/list',
        name: 'pagelist',
        component: PageList,
        meta: {
            auth: false,
        }
    },

    {
        path: '/page/:id',
        name: 'page',
        component: Page,
        meta: {
            auth: false,
        }
    },


    {
        path: '/profile',
        name: 'profile',
        component: Profile,
        meta: {
            auth: true,
        }
    },

    {
        path: '/show/collects',
        name: 'collect',
        component: Collect,
        meta: {
            auth: true,
        }
    },

    {
        path: '/show/myexams',
        name: 'myexams',
        component: MyExams,
        meta: {
            auth: true,
        }
    },

    {
        path: '/show/examinfo/:id',
        name: 'examinfo',
        component: ExamInfo,
        meta: {
            auth: true,
        }
    },

    {
        path: '/show/comments',
        name: 'comments',
        component: Comments,
        meta: {
            auth: true,
        }
    },



    {
        path: '/login',
        name: 'login',
        component: Login,
        meta: {
            auth: false,
        }
    },

    {
        path: '/register',
        name: 'register',
        component: Register,
        meta: {
            auth: false,
        }
    },

    {
        path: '/setting',
        name: 'setting',
        component: Setting,
        meta: {
            auth: true,
        }
    },

    {
        path: '/password',
        name: 'password',
        component: Password,
        meta: {
            auth: true,
        }
    },


    // 404页面，定义在最底部
    {
        path: '*',
        name: 'notfound',
        component: NotFound,
        meta: {
            auth: false,
        }
    }

]

const router = new VueRouter({
    linkActiveClass: 'tab-active',
    routes
})

router.beforeEach((to, from, next) => {

    // 判断用户是否登录
    if (to.path != '/login' && to.meta.auth && !localStorage.getItem('token')) {
        next('/login');
        return;

    } else if (to.path == '/login' && localStorage.getItem('token')) {
        next(from);
        return;
    } else {
        next();
    }

})

export default router
