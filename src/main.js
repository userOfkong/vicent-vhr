import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import{postRequest} from "./utils/api";
import{postKeyValueRequest} from "./utils/api";
import{putRequest} from "./utils/api";
import{deleteRequest} from "./utils/api";
import{getRequest} from "./utils/api";
import{initMenu} from "./utils/menus";
import 'font-awesome/css/font-awesome.min.css'

Vue.prototype.postRequest=postRequest;
Vue.prototype.postKeyValueRequest=postKeyValueRequest;
Vue.prototype.putRequest=putRequest;
Vue.prototype.deleteRequest=deleteRequest;
Vue.prototype.getRequest=getRequest;

Vue.config.productionTip = false

Vue.use(ElementUI);

router.beforeEach((to,from,next)=>{
  // console.log(to);
  // console.log(from);
  // next();
  if (to.path=='/'){
    console.log(to)
    console.log(from)
    next();
  }else{
    initMenu(router,store);
    console.log(to)
    console.log(from)
    next();
  }
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
