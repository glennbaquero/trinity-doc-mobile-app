<template>
	<div>
		<!-- Top Navigation -->
		<v-app-bar app
			color="#fff"
			dark
			dense
			class="m-padding-tb top-nav"
			v-show="!$PRXRouter().isOnRoute('login') && !$PRXRouter().isOnRoute('forgot-password') && !$PRXRouter().isOnRoute('signup') && !$PRXRouter().isOnRoute('profile') "
			:class="{ 'hdr-bg__prfl':this.$PRXRouter().isOnRoute('profile') }"
			>
			<v-row>
				<v-col cols="3">
					<div class="vertical-parent">
						<div class="vertical-align">
							<v-btn width="37px" color="white" class="elevation-0" @click="viewProfile()">
								<v-img :src="renderImage" class="mx-auto profile" width="37px" height="37px"></v-img>
							</v-btn>
						</div>
					</div>
				</v-col>
				<v-col cols="6">
					<div class="vertical-parent">
						<div class="vertical-align">
							<h1 class="frm-title clr-black align-c">{{ pageName }}</h1>
						</div>
					</div>
				</v-col>
				<v-col cols="3"> 
					<!-- ADD active on notif class to display the round notification  -->
					<v-row>
						<v-col cols="7" class="">
							<div class="notif-holder align-r">
								<div class="vertical-parent">
									<div class="vertical-align">
										<i class="fas fa-bell mb-2 clr-gray notif" :class="notificationCount > 0 ? 'active' : ''" @click="viewAllNotification()">
											<div class="notif-number">
												<div class="vertical-parent">
													<div class="vertical-align">
														<p class="mb-0">{{ notificationCount }}</p>
													</div>
												</div>
											</div>
										</i>
									</div>
								</div>
							</div>
						</v-col>
						<v-col cols="5" class="align-r">
							<i class="fas fa-bars hdr-menu" @click.stop="menu = !menu"></i>
						</v-col>
					</v-row>
				</v-col>
			</v-row>
		</v-app-bar> 
		<!-- Uncomment this to show the header with back button and no notification bell --> 
		<v-app-bar app
			color="#fff"
			dark
			dense
			class="m-padding-tb top-nav"
			v-show="$PRXRouter().isOnRoute('profile') || $PRXRouter().isOnRoute('selected-products') || $PRXRouter().isOnRoute('selected-module') || $PRXRouter().isOnRoute('selected-patient') || $PRXRouter().isOnRoute('selected-rewards') || $PRXRouter().isOnRoute('notification') "
				>
			<v-row>
				<v-col cols="3">
					<div class="vertical-parent" @click="goBack">
						<div class="vertical-align">
							<i class="fas fa-chevron-left hdr-back color-black"></i>
						</div>
					</div>
				</v-col>
				<v-col cols="6">
					<div class="vertical-parent">
						<div class="vertical-align">
							<h1 class="frm-title clr-black align-c">{{ pageName }}</h1>
						</div>
					</div>
				</v-col>
				<v-col cols="3">
			
				</v-col>
			</v-row>
		</v-app-bar>
		
		<!-- Sidebar -->
		<v-navigation-drawer temporary v-model="drawer" app color="white">
			<v-divider></v-divider>

			<v-list
			dense
			nav
			>
			<v-list-item
					v-for="item in items"
					:key="item.title"
					link
					@click="$PRXRouter().goTo(item.action)"
					:input-value="$PRXRouter().isOnRoute(item.action)"
					>
					<v-list-item-icon>
					<v-icon>{{ item.icon }}</v-icon>
					</v-list-item-icon>

					<v-list-item-content>
							<v-list-item-title>{{ item.title }}</v-list-item-title>
					</v-list-item-content>
			</v-list-item>
			</v-list>
		</v-navigation-drawer>


		<!-- Side Menu -->
		<v-navigation-drawer
	      v-model="menu"
	      absolute
	      temporary
	      right
	      class="hdr-menu__holder px-3" 
	    >

	      <v-list dense>

			<v-list-item
	        >
	          <p class="sec-title color-pr2 l-padding-t">All Menu</p>
	        </v-list-item>      	

	        <v-list-item
	          link
	        >
	          <v-list-item-icon>
	            <div class="hdr-menu__icon" :style="{ backgroundImage: 'url(' + $PRXConfig().staticUrl('icons/patient-health.svg') + ')' }">
	            	
	            </div>
	          </v-list-item-icon>

	          <v-list-item-content>
	            <v-list-item-title @click="goToPatients()" class="clr-gray hdr-menu__link">My Patient's Health</v-list-item-title>
	          </v-list-item-content>
	        </v-list-item>
																																													
	        <v-list-item
	          link
	        >
	          <v-list-item-icon>
	            <div class="hdr-menu__icon" :style="{ backgroundImage: 'url(' + $PRXConfig().staticUrl('icons/medicine.svg') + ')' }">
	            	
	            </div>
	          </v-list-item-icon>

	          <v-list-item-content>
	            <v-list-item-title class="clr-gray hdr-menu__link"><a class="clr-gray hdr--link"
	            @click="openMedicineInfomation()">Medicine Information</a></v-list-item-title>
	          </v-list-item-content>
	        </v-list-item>

	        <v-list-item
	          link
	        >
	          <v-list-item-icon>
	            <div class="hdr-menu__icon" :style="{ backgroundImage: 'url(' + $PRXConfig().staticUrl('icons/online-consultation.svg') + ')' }">
	            	
	            </div>
	          </v-list-item-icon>

	          <v-list-item-content>
	            <v-list-item-title @click="openOnlineConsultation()" class="clr-gray hdr-menu__link">Online Consultation</v-list-item-title>
	          </v-list-item-content>
	        </v-list-item>

	        <v-list-item
	          link
	        >
	          <v-list-item-icon>
	            <div class="hdr-menu__icon" :style="{ backgroundImage: 'url(' + $PRXConfig().staticUrl('icons/help.svg') + ')' }">
	            	
	            </div>
	          </v-list-item-icon>

	          <v-list-item-content>
	            <v-list-item-title @click="goToHelp()" class="clr-gray hdr-menu__link">Help</v-list-item-title>
	          </v-list-item-content>
	        </v-list-item>
	      
	      </v-list>
	    </v-navigation-drawer>

	</div>
</template>

<script type="text/javascript">

import { bus } from '@/assets/js/EventBus.js';

export default {

	components: {

	},

	computed: {
		pageName() {
	        return this.$store.state.pageName.name;
		},
		received() {
			return this.$store.state.notificationReceive.received;
		},

		renderImage() {
			if(this.user) {
				return this.user.full_image;
			}
		},
	},

	watch: {
		received: {
			handler: function(val) {
				this.getNotificationCount();
			},
			deep: true
		}
	},

	data () {
		return {
			drawer: false,
			items: [
				{
					title: 'Home',
					icon: 'fa-home',
					action: 'home'
				},
				{
					title: 'Page',
					icon: 'fa-file',
					action: 'page'
				},
				{
					title: 'Form',
					icon: 'fa-pen-square',
					action: 'form'
				}
			],

			menu: null,
			notificationCount: 0
		}
	},

	mounted() {
		this.getNotificationCount();
		this.eventHandler();
	},

	methods: {
		getNotificationCount() {
			axios.get(this.routes['api.doctor.notifications.count'])
				.then(response => {
					this.notificationCount = response.data.count;
				})
		},

		showSidebar () {
			this.drawer = true
		},

		viewProfile() {
		    this.$store.commit('pageName/set', 'Profile');
			this.$PRXRouter().goTo('profile')
		},

		goBack() {
			this.$PRXRouter().goBack();
		},

		viewAllNotification() {
			this.$PRXRouter().goTo('notification');
	      	this.$store.commit('pageName/set', 'Notification');
		},

		goToPatients() {
			this.$store.commit('pageName/set', 'My Patient Health');
			this.$PRXRouter().goTo('mypatient-health');
		},

		goToHelp() {
			this.$store.commit('pageName/set', 'Help');
			this.$PRXRouter().goTo('help','Help');
		},

		openMedicineInfomation() {
			let inApp = cordova.InAppBrowser.open('https://www.drugs.com/', '_blank', 'closebuttoncaption=Close,hideurlbar=yes');
		},

		openOnlineConsultation() {
			this.$PRXRouter().goTo('online-consultation');
	    },

	    eventHandler() {
	    	bus.$on('recount', () => {
	    		this.getNotificationCount();
	    	});
	    },
  
	}
}
</script>
