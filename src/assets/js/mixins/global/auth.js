import LogoutMixin from '../logout.js';
import NotificationMixins from './notification.js'

export default {

    mixins: [ LogoutMixin, NotificationMixins ],
    
    computed: {
		user() {
			return this.$store.state.user.details;
		},

        authenticated() {
            return this.$store.state.user.auth;
        },
    },

    methods: {
        authenticate() {
			axios.get(this.routes['api.doctor.home'])
				.then(response => {

					/* Store in vuex */
					this.$store.commit('user/set', response.data.doctor);
					this.$store.commit('user/setLinkedPatients', response.data.linked_patients);
					this.$store.commit('user/setPatientCount', response.data.patient_count);					
					this.$store.commit('user/setPatientRecords', response.data.patient_records);
					this.$store.commit('user/setPoints', response.data.reward_points);
					this.$store.commit('user/setMostPurchased', response.data.most_purchased);
					this.$store.commit('user/setPageItem', response.data.myhealth_item.pageItems);

					this.$store.commit('rewards/appendItems', response.data.rewards);
					this.$store.commit('rewards/appendCategories', response.data.reward_categories);
					this.$store.commit('rewards/appendRedeemed', response.data.redeemed);

					this.$store.commit('articles/setRandom', response.data.articles);
					this.$store.commit('articles/setCount', response.data.article_count);
					this.$store.commit('api/setKey', response.data.opentok_key);						
					localStorage.setItem("user", JSON.stringify(response.data.doctor));

					if(this.isCordova) {
						this.setupPushNotif();
					}					
					
				})
				.catch(error => {
					console.log(error);
                    // At this point user token is expired
                    this.clearAuthentication();
					this.$PRXRouter().goTo('login');
				});
		},
    }
}