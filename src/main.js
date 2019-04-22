// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import './assets/css/reset.css'
import  VueQuillEditor from 'vue-quill-editor'
// require styles 引入样式
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
// import './assets/css/style.css'
//引入elementUi
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
//引入axios
import axios from 'axios';
Vue.prototype.$axios = axios;
//引入iview
import iView from 'iview'; // 导入组件库
import 'iview/dist/styles/iview.css'; // 导入样式
Vue.use(iView);
//引入layer
import layer from 'vue-layer';
Vue.prototype.$layer = layer(Vue);
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
})