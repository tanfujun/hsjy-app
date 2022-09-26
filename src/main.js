import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

/*样式重置*/
import './assets/reset.less'
import './assets/adapter.less'

/*字体图标*/
// import 'font-awesome/css/font-awesome.css'


/*引入vantUI，导入所有组件*/
import Vant from 'vant';
import 'vant/lib/index.css';

Vue.use(Vant);

Vue.config.productionTip = false

new Vue({ 
    router,
    store,
    render: h => h(App)
}).$mount('#app')
