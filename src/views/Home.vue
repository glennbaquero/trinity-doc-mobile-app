<template>
	<v-container class="pa-5 home-holder">
		<v-row v-if="requests.length" class="no-gutters">
			<v-col cols="12 px-0">
				<p class="bold color-pr2 sec-title">Chat Consultation Requests</p>
			</v-col>
			<v-col cols="12" class="px-0">
				<v-tabs v-model="tab" color="transparent" centered hide-arrows class="text-center">
					<v-tabs-slider color="transparent"></v-tabs-slider>
					<!-- TAB_COMPONENT -->
					<v-tab v-for="(request, key) in requests" :key="key" 
						   href="#tab1" class="patients-card-holder pl-0 pr-3 mb-3">
						<v-card
							width="160"
							height="205"
							class="patients-card py-5"
						>

							<v-row class="card-inner-holder mx-0">
								
								<v-col cols="12" class="pa-0 text-center">
									<v-img :src="request.patient_image" class="mx-auto patient-img elevation-0" width="60px" height="60px"></v-img>

									<p class="bold mt-5 mb-1 patient-card-name">{{request.patient_name}}</p>

									<!-- <small class="color-pr2 bold">{{patient.reward_points}} points</small> -->
								</v-col>
								<!-- <v-col cols="12" class="pa-0">
									<v-btn class="custom-btn filled-pr1 s-btn mt-5" @click.prevent="showPatient(patient)">View Details</v-btn>
								</v-col> -->
								<v-col 
								@click="updateStatus(request.id, 'declined')"
								cols="6" class="pa-0 text-center patienCard--buttonHolder">
									<v-btn class="mx-auto my-2 patientCard--button" small fab color="red">
      									<v-icon>{{ 'fa-times' }}</v-icon>
    								</v-btn>

    								<small>Decline</small>
								</v-col>
								<v-col 
								@click="updateStatus(request.id, 'accepted'); updateOnlineStatus()"
								cols="6" class="pa-0 text-center patienCard--buttonHolder">
									<v-btn class="mx-auto my-2 patientCard--button" small fab color="green">
      									<v-icon>{{ 'fa-check' }}</v-icon>
    								</v-btn>

    								<small class="text-small">Accept</small>
								</v-col>
							</v-row>
						</v-card>
					</v-tab>

					<!-- END_COMPONENT -->
				</v-tabs>

				<!-- you can remove this once your done using it --> 
				<!-- end of button -->

				<CallModal :show="callModal"></CallModal>
			</v-col>
		</v-row>
		<!-- Frame 2 -->
		<!-- <v-row v-if="mostPurchased" class="no-gutters">
			<v-col cols="12" class="pb-0 px-0 my-3">
				<p class="bold color-pr2 sec-title mb-0">Most Purchased</p>
			</v-col>
			<v-col cols="12" class="px-0">
				<v-card v-for="(item, key) in mostPurchased" :key="key" class="elevation-3 most-purchased-card mb-5">
					<v-row class="most-purchased-card__inner">
						<v-col cols="3" class="align-c px-0 mp-col">
							<v-img :src="item.image_path" class="mx-auto" width="60px" height="60px"></v-img>
						</v-col>
						<v-col cols="9 px-0 mp-col">
							<div class="vertical-parent">
								<div class="vertical-align">
									<p class="mb-0 bold mp-name">{{item.name}}</p>
									<div class="inlineBlock-parent">
										<p class="color-pr2 mb-0 mr-1 bold">{{item.sum_points}} points</p><p class="color-pr2 mb-0 mr-1 bold">earned as of</p><p class="color-pr2 mb-0 bold">{{item.latest_date_purchase}}</p>
									</div>
								</div>
							</div>
						</v-col>
					</v-row>
				</v-card>
			</v-col>
		</v-row> -->

		<!-- Frame 4 -->
		<v-row class="pb-12 no-gutters">
			<v-col cols="12" class="px-0">
				<p class="bold color-pr2 sec-title">Dashboard</p>
			</v-col>
			<v-col 
			@click="$PRXRouter().goTo('rewards')"
			cols="12" class="ml-0 pr-1 mb-3 py-0 dashboard-card">
				<v-card
					class="py-1 dashboard-inner"
					width="100%"
				>
					<v-list-item two-line
					>
						<v-list-item-avatar
							tile
							size="20"
							class="align-centered"
						>
							<div class="icon-holder fill-pink">
								<v-img :src="$PRXConfig().staticUrl('icons/heart.svg')" class="mx-auto icons" width="15px" height="15px"></v-img>
							</div>
						</v-list-item-avatar>
						<v-list-item-content>
							<v-list-item-title class="headline font-weight-bold">{{points}}</v-list-item-title>
							<v-list-item-subtitle class="">Points Earned</v-list-item-subtitle>
						</v-list-item-content>
					</v-list-item>
				</v-card>
			</v-col>
			<v-col cols="12" class="ml-0 mb-3 py-0 dashboard-card">
				<v-card
					class="py-1 dashboard-inner"
					width="100%"
					@click="trigPaymentSummaryView()"
				>
					<v-list-item two-line>
						<v-list-item-avatar
							tile
							size="20"
							class="align-centered"
						>
							<div class="icon-holder fill-green">
								<v-img :src="$PRXConfig().staticUrl('icons/peso.svg')" class="mx-auto icons" width="10px" height="10px"></v-img>
							</div>
						</v-list-item-avatar>
						<v-list-item-content>
							<v-list-item-title class="headline font-weight-bold">₱ {{ credits }}</v-list-item-title>
							<v-list-item-subtitle class="">Earnings</v-list-item-subtitle>
						</v-list-item-content>
					</v-list-item>
				</v-card>
			</v-col>

			<v-col 
			@click="$PRXRouter().goTo('patients')"
			cols="12" class="ml-0 mb-3 py-0 dashboard-card">
				<v-card
					class="py-1 dashboard-inner"
					width="100%"
				>
					<v-list-item two-line>
						<v-list-item-avatar
							tile
							size="20"
							class="align-centered"
						>
							<div class="icon-holder fill-orange">
								<v-img :src="$PRXConfig().staticUrl('icons/patient.svg')" class="mx-auto icons" width="15px" height="15px"></v-img>
							</div>
						</v-list-item-avatar>
						<v-list-item-content>
							<v-list-item-title class="headline font-weight-bold">{{patientCount}}</v-list-item-title>
							<v-list-item-subtitle class="">Linked Patients</v-list-item-subtitle>
						</v-list-item-content>
					</v-list-item>
				</v-card>
			</v-col>
		</v-row>

		<v-row class="pb-12 no-gutters">
			<v-col cols="12" class="px-0">
				<p class="bold color-pr2 sec-title">Schedule</p>
			</v-col>
			<v-col cols="12" class="px-0">
				<v-card
					class="py-5"
				>
				  <WeeklyCalendar></WeeklyCalendar>
				  <v-row class="pb-0 no-gutters pt-3">
				  	<v-col cols="6" class="px-3">
				  		<div class="inlineBlock-parent">
				  			<div class="dots"></div> <small class="clr-gray">Fully Booked</small>
				  		</div>
				  	</v-col>
				  	<v-col cols="6" class="px-3 text-right">
				  		<small><a class="clr-gray" @click="trigOnlineConsultation()">See full schedule</a></small>
				  	</v-col>
				  </v-row>
				</v-card>	
			</v-col>
		</v-row>

		<!-- Frame 3 -->
		<v-row v-if="articles.length" class="no-gutters pb-10">
			<v-col cols="12" class="px-0 pb-0">
				<p class="bold color-pr2 sec-title">Articles</p>
			</v-col>
			<v-col cols="12" class="px-0">
				<v-tabs v-model="tab" color="transparent" centered hide-arrows class="text-center">
					<v-tabs-slider color="transparent"></v-tabs-slider>
					<!-- TAB_COMPONENT -->
					<v-tab v-for="(article, key) in articles" :key="key" @click="showArticle(article)" href="#tab1" class="article-card-holder pl-0 mb-3">
						<v-card
							class="mx-auto article-card"
							:flat="flat"
							:loading="loading"
							:outlined="outlined"
							:elevation="elevation"
							:raised="raised"
							:width="260"
							:height="330"
						>
							<v-img :src="article.full_image" class="mx-auto" width="100%" height="113px"></v-img>
							<v-card-title class="article-card-title bold pb-0 mb-2 text-left">{{article.title}}</v-card-title>

							<v-card-text class="align-l pb-0">
								<div class="frm-desc">
									<p v-html="article.overview"></p>
								</div>
							</v-card-text>
							<v-card-actions class="mx-auto">
								<v-btn class="custom-btn filled-pr1 s-btn mx-auto" @click.prevent="showArticle(article)" min-width="121px">View</v-btn>
							</v-card-actions>
						</v-card>
					</v-tab>
					<!-- END_COMPONENT -->
				</v-tabs>
			</v-col>
		</v-row>

		<Loader
		:loading="loading"
		></Loader>

		<PaymentSummary ref="payout"></PaymentSummary>

		<AlertMessage 
			ref="message"
		></AlertMessage>

	</v-container>
</template>
<script>

import { bus } from '@/assets/js/EventBus.js';
import Loader from '@/components/Loader';
import WeeklyCalendar from './WeeklyCalendar.vue';
import CallModal from './Modals/CallModal.vue';
import PaymentSummary from './Payment/PaymentSummary.vue';
import AlertMessage from './Modals/AlertMessage.vue';
import ChatPage from './OnlineConsultation/ChatPage.vue';

export default {
	components: {
		Loader,		
		WeeklyCalendar,
		CallModal,
		PaymentSummary,
		AlertMessage,
	},

	mounted() {
		this.init();
	},

	data: () => ({

		requests: [],

		dialog: false,

		loading: false,
		raised: null,
		flat: null,
		elevation: null,
		outlined: null,
		tab: null,
		callModal: false,
		paymentSummary: false,
		chatPage: false,
		credits: 0,
		backgroundMode: null,
	}),

	computed: {
		linkedPatients() {
			return this.$store.state.user.linked_patients;
		},

		articles() {
			return this.$store.state.articles.random;
		},

		articleCount() {
			return this.$store.state.articles.count;
		},

		patientCount() {
			return this.$store.state.user.patient_count;
		},

		points() {
			return this.$store.state.user.points;
		},

		mostPurchased() {
			return this.$store.state.user.most_purchased
		},

		patientRecords() {
			return this.$store.state.user.patient_records;	
		},

	},

	methods: {

		init() {
			this.eventHandler();
			this.fetchChatRequests();
			this.fetchCredits();
			this.backgroundProcessor();
		},

		initializeChat() {
			var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
			(function(){
			var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
			s1.async=true;
			s1.src='https://embed.tawk.to/5d919aa26c1dde20ed041bf5/default';
			s1.charset='UTF-8';
			s1.setAttribute('crossorigin','*');
			s0.parentNode.insertBefore(s1,s0);
			})();
		},

		fetchChatRequests() {
			//this.loading = true;
			axios.post(this.routes['api.doctor.consultations.fetch.chat.requests'])
				.then((response) => {
					//this.loading = false;					
					this.requests = response.data.requests;
				}).catch((err) => {
					//this.loading = false;
				});
		},

		fetchCredits() {
			//this.loading = true;
			axios.post(this.routes['api.doctor.payouts.fetch'])
				.then((response) => {
					//this.loading = false;					
					this.credits = response.data.credits;
				}).catch((err) => {
					//this.loading = false;
				});
		},

		updateStatus(id, status) {
			this.loading = true;

			let data = {
				consultation_id: id,
				status: status
			};

			axios.post(this.routes['api.doctor.consultations.update.status'], data)
				.then((response) => {
					this.loading = false;

					if(status == 'declined') {
						this.fetchChatRequests();
					} else {
						if(response.data.isValid == 'false') {
							this.$refs['message'].show(response.data);
						} else {
							let consultation = response.data.consultation;
							consultation.patient = response.data.patient;
							this.openChatPage(consultation);
						}
					}
				}).catch((err) => {
					this.loading = false;
				});
		},

		updateOnlineStatus() {
			let data = {
				//2 is equal to the busy online status
				online: 2
			};

			axios.post(this.routes['api.doctor.update.online-status'], data)
				.then((response) => {
					this.$store.commit('user/set', response.data.doctor);
				}).catch((err) => {

				});	
		},

		openChatPage(consultation) {
            this.$store.commit('onlineConsultation/setConsultation', consultation);                
            this.$PRXRouter().goTo('chats');
		},


		showPatient(patient) {
			this.$store.commit('patients/show', patient);
			this.$PRXRouter().goTo('selected-patient');
		},

		showArticle(article) {
			this.$store.commit('articles/show', article);
			this.$PRXRouter().goTo('selected-module');
		},

		trigCallModal() {
        	this.callModal = this.callModal ? false: true;
      	},

      	trigPaymentSummaryView() {
      		this.$refs['payout'].show();
      	},

      	trigOnlineConsultation() {
			this.$PRXRouter().goTo('online-consultation');
      	},

      	backgroundProcessor() {
			let $this = this;
			document.addEventListener("pause", function() {
		    	$this.backgroundMode = setInterval(() =>  {
					$this.fetchChatRequests();
		    	}, 1000);				
			}, false);
			
			document.addEventListener("resume", function() {
				clearInterval($this.backgroundMode);
			}, false);
      	},

      	/**
      	 * Event handler
      	 * 
      	 */
      	eventHandler() {
      		bus.$on('new_notification', () => {
      			this.fetchChatRequests();
      		});
      	}, 	
	}
}
</script>