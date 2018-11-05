import Vue from 'vue'
import App from './App.vue'
import "nm/bootstrap/dist/css/bootstrap.min.css"
import "nm/bootstrap/dist/js/bootstrap.min.js"
//bootstrap4 need popper.js

new Vue({
  render: h => h(App)
}).$mount('#app')
