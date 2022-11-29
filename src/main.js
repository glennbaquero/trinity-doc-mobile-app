import './bootstrap.js'

import Vue from 'vue'
import vuetify from '@/plugins/vuetify'
import VueGraph from 'vue-graph'
// import VueCharts from 'vue-chartjs'
import Chartkick from 'vue-chartkick'
import Chart from 'chart.js'

import App from './App.vue'
import router from './router'
import store from './store'

import PRXVuetifyComponents from '@praxxys/vuetify-components'
import PRXVueUtils from '@praxxys/vue-utils'

import VeeValidate from 'vee-validate';

import InfiniteLoading from 'vue-infinite-loading';
import 'material-design-icons-iconfont/dist/material-design-icons.css';

import Vuesax from 'vuesax'
import 'vuesax/dist/vuesax.css'; //Vuesax styles

Vue.config.productionTip = false

Vue.use(PRXVuetifyComponents);
Vue.use(PRXVueUtils);

Vue.use(VeeValidate);
Vue.use(InfiniteLoading);
Vue.use(VueGraph);
Vue.use(Chartkick.use(Chart))

Vue.use(Vuesax, {
// options here
});

var app = {

	init () {
		if (window.hasOwnProperty('cordova')) {
			document.addEventListener('deviceready', this.on_deviceready.bind(this), false)
			Vue.prototype.$cordova = this
		} else {
			this.setup()
		}
	},

	on_deviceready () {
		this.setup();
		 cordova.plugins.backgroundMode.enable();
	},

	setup () {
		require('./assets/js/mixins/global')

		new Vue({
			vuetify,
			el: '#app',
			render: h => h(App),

			router,
			store,

			mounted () {
				this.init()
			},

			methods: {
				init () {
					this.navigate();
					if(this.isCordova) {
						this.setupPushNotif();
					}
				},

				navigate () {
					if(localStorage.authToken) {
					  this.$PRXRouter().goTo('home');
					  this.$store.commit('pageName/set', 'Home');
					} else {
						this.$PRXRouter().goTo('login');
					}
					// this.$router.replace({ name: 'login' })
				}
			}
		})
	}
}

app.init()
