<template>
	<v-app>
		<top-navigation></top-navigation>
		<PRXProgressLoader></PRXProgressLoader>
		<v-content>

			<v-container fill-height pa-0 align-baseline>
				<router-view :key="$route.fullPath"></router-view>
			</v-container>

			<bottom-navigation></bottom-navigation>

			<PRXAlert></PRXAlert>
			<PRXDialogLoader></PRXDialogLoader>
			<PRXToast></PRXToast>
		</v-content>
	    <template v-if="enableOpenTawk">
		    <v-btn
		      	color="#3A823E"
		      	dark
		      	medium
		      	fixed
		      	bottom
		      	right
		      	fab
		      	style="bottom: 76px;"
		      	@click="openTawk"
		    >
		      	<v-icon>forum</v-icon>
		    </v-btn>
		</template>
		
		<Loader
		:loading="loading"
		></Loader>

	</v-app>
</template>

<script type="text/javascript">

import Loader from '@/components/Loader';
import TopNavigation from './partials/TopNavigation.vue'
import BottomNavigation from './partials/BottomNavigation.vue'
import NetworkMixin from './assets/js/mixins/network.js';

export default {


	computed: {
		fetchUrl() {
			return this.$PRXConfig().api.url + '/api/doctor/config/fetch';
		},

		loader() {
			return this.$PRX.dialogLoader;
		},

	    enableOpenTawk() {
	      if(!this.$PRXRouter().isOnRoute('login') && !this.$PRXRouter().isOnRoute('chats')) {
	        return true;
	      }
	      return false;
	    },

	},

	data() {
		return {
			loading: false
		}
	},

	beforeMount() {
		window.axios.defaults.headers.common['Authorization'] = window.localStorage.getItem('authToken');
	},

	mounted () {
		this.fetch();
		this.hideHeader();

		window.axios.defaults.headers.common['Authorization'] = window.localStorage.getItem('authToken');
	},

	methods: {
		fetch() {
			// this.loading = true;
			axios.post(this.fetchUrl)
				.then(response => {
					const data = response.data;

					this.loading = false;

					this.$store.commit('api/set', data.routes);
					this.$store.commit('pageItems/setTerms', data.terms_and_condition);
					this.$store.commit('pageItems/setPrivacy', data.privacy);
					this.setItem('routes', data.routes);
					this.setItem('specializations', data.specializations);

					/* Auth mixin checker if token is not expired */
					this.authenticate();

				}).catch(err => {
					this.loading = false;
					this.$PRX.alert.error('Please turn on network connectivity', 'Network Error', 'options');
				})
		},
		hideHeader() {
	      $(document).ready(function() {
	        $('.qr-btn').click(function() {
	           $(".top-nav").addClass("hide");
	        });
	        $('.close-qr').click(function() {
	           $(".top-nav").removeClass("hide");
	        });
	      });
	    },
	    openTawk() {
	      var url = 'https://tawk.to/chat/5d919aa26c1dde20ed041bf5/default/?$_tawk_popout=true';
	      var options = 'hidden=no,location=no';
	      const browser = cordova.InAppBrowser.open(url, '_blank', options);
	    }
	},

	mixins: [ NetworkMixin ],


	components: {
		'top-navigation': TopNavigation,
		'bottom-navigation': BottomNavigation,
		Loader
	}
}
</script>
