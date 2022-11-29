export default {
	methods: {
		clearAuthentication() {
			this.$store.commit('user/clearAuth');
			this.$store.commit('notifications/pageReset', 1);
			this.$store.commit('notifications/itemReset', []);
			window.localStorage.removeItem('authToken');
			window.localStorage.removeItem('user');			
			window.axios.defaults.headers.common['Authorization'] = null;
		},

	}
}