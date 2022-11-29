<template>
<v-container class="pa-5 notif-holder">
 <v-row class="no-gutters pb-12">
	<v-col cols="12" class="pa-0">
		<p class="bold color-pr2">All Notification</p>
	</v-col>
	<v-col v-for="(notification, key) in notifications" :key="key" cols="12" class="px-0 py-2">
		<v-card class="elevation-3 notif-card notif-unread" @click="showNotification(notification, key)">
			<v-row class="notif-card__inner">
				<v-col cols="3" class="align-c px-0 patient-col">
					<div class="vertical-parent">
						<div class="vertical-align">
							<div class="icon-holder fill-green mx-auto">
								<v-img :src="$PRXConfig().staticUrl('icons/loyalty.svg')" class="mx-auto icons" width="15px" height="15px"></v-img>
							</div>
						</div>
					</div>
				</v-col>
				<v-col cols="9 px-0 notif-col">
					<div class="vertical-parent">
						<div class="vertical-align">
							<p class="mb-0 bold notif-name">{{ notification.data['title']}}</p>
							<p class="mb-0 bold notif-desc" v-html="notification.data['message']"></p>
						</div>
					</div>
				</v-col>
			</v-row>
			<div class="notif-dot" v-if="!notification.read_at"></div>
		</v-card>
	</v-col>
 </v-row>
	<Dialog 
		:item="notification"
		:show="show" 
		@close="show = false"
	></Dialog>
	<v-col cols="12" class="text-center products-card__holder">
		<infinite-loading spinner="waveDots" :identifier="infiniteId" @infinite="infiniteHandler" ref="infiniteLoading">
			<div slot="no-more"></div>
			<div slot="no-results">No records found</div>
		</infinite-loading>
	</v-col>	
</v-container>
</template>
<script>

import Dialog from '@/components/Dialog';
import { bus } from '@/assets/js/EventBus.js';

export default {
	data: () => ({
		infiniteId: +new Date(),
		show: false,
		notification: {
			message: null
		}
	}),

	components: { Dialog },

	computed: {
		notifications() {
			return this.$store.state.notifications.items;
		},

		page() {
			return this.$store.state.notifications.page;
		},
	},

	filters: {
		title(value) {
			return JSON.parse(value).title;
		},

		message(value) {
			return JSON.parse(value).message;
		}
	},

	methods: {
		infiniteHandler($state) {
			axios.get(this.routes['api.doctor.notifications'], { params: {page: this.page} })
				.then(({data}) => {
					var response = data.data;
					if(response.data.length) {
						setTimeout(() => {
							this.$store.commit('notifications/pageIncrement', 1);
							this.$store.commit('notifications/append', response.data);
							$state.loaded();
						}, 500);
					} else {
						$state.complete();
					}
				});
		},

		showNotification(notification, key) {
			var data = {
				id: notification.id
			}
			this.notification.message = notification.data['message'];
			this.notification.title = notification.data['title'];
			this.show = true;

			axios.post(this.routes['api.doctor.notification.read'], data)
				.then(response => {
					this.$store.commit('notificationReceive/set', 'Received!');
					this.$store.state.notifications.items[key].read_at = moment();
					bus.$emit("recount");
				});
		}
	}
}
</script>