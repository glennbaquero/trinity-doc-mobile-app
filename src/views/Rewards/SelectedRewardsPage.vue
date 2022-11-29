<template>
<v-container class="selected-module pa-0 selected-rewards">
	<v-row class="no-gutters px-0">
		<v-col cols="12" class="px-0 py-0">
			<v-img :src="reward.full_image" class="article-img" width="100%" height="250px"></v-img>
		</v-col>
	</v-row>
	<!--Frame 2 -->
	<v-row class="no-gutters px-5 mt-3 pb-12">
		<v-col cols="12" class="px-0 mb-3">
			<h2 class="rewards-title color-pr2 bold">{{reward.name}}</h2>
		</v-col>
		<v-col cols="12" class="px-0">
			<div class="frm-desc">
				<p class="bold mb-2">Overview</p>
				<p v-html="reward.description"></p>
			</div>
			<temmplate v-if="sponsorships.length > 0">
				<div class="frm-desc">
					<p class="bold mb-2">Selected Sponsor</p>
				</div>
				<div class="frm-desc" v-for="(sponsorship, key) in sponsorships" :key="key">
					<p class="bold mb-2">{{ sponsorship.name }}</p>
					<p v-html="sponsorship.description"></p>
				</div>
			</temmplate>
		</v-col>
	</v-row>
	<v-btn class="article-btn px-0" @click="showConfirmation = true">
		Redeem Rewards
	</v-btn>
	<!-- Success Modal -->
	<v-dialog
		v-model="selmodal"
		max-width="90%"
	>
		<v-card class="success-modal py-5">
			<v-row class="px-5 mx-auto">
				<v-col cols="12" class="pa-0 text-center">
					<v-img :src="$PRXConfig().staticUrl('/icons/Check.svg')" class="mx-auto success-icon" width="44" height="44"></v-img>
					<h1 class="frm-title my-5 mb-0">Success!</h1>
					<div class="frm-desc my-3">
						<p class="mb-0 mx-auto success-text">Please wait for the admin to take action on your request. Thank you.</p>
					</div>
				</v-col>
				<v-col cols="12" class="pr-0 text-center pb-0">
					<!-- <v-btn class="custom-btn s-btn filled-pr2" @click="selmodal = false; $PRXRouter().goTo('rewards')">Done</v-btn> -->
					<v-btn min-width="121" class="custom-btn s-btn filled-pr1 mx-auto" @click="selmodal = false; $PRXRouter().goTo('rewards')"><v-icon left>fa-check</v-icon>Done</v-btn>
				</v-col>
			</v-row>
		</v-card>
	</v-dialog>

	<v-dialog
		v-model="dialog" persistent width="90%"
		>
		<v-card
			color="#3A823E"
			dark
		>
			<v-card-text>
			Processing request
			<v-progress-linear
				indeterminate
				color="white"
				class="mb-0"
			></v-progress-linear>
			</v-card-text>
		</v-card>
	</v-dialog>

	<!-- Modal -->
	<v-dialog
		v-model="showConfirmation"
		width="90%"
		>
		<v-card class="py-5">
			<v-row class="px-5 mx-auto">
				<v-col cols="12" class="pa-0 text-center">
					<v-img :src="$PRXConfig().staticUrl('icons/prompt.svg')" class="mx-auto reward-icon" width="44px" height="44px"></v-img>
					<h1 class="frm-title my-5 mb-0">Are you sure?</h1>
					<div class="frm-desc">
						<p class="mx-auto">Are you sure you want to redeem this reward?</p>
					</div>
				</v-col>
				<v-col cols="12" class="pa-0 text-center pb-2">
					<v-btn min-width="121px" class="custom-btn s-btn filled-pr1" @click.prevent="redeem()"><v-icon left>fa-check</v-icon>Proceed</v-btn>
				</v-col>
				<v-col cols="12" class="pa-0 text-center">
					<v-btn min-width="121px" class="custom-btn s-btn filled-gray" @click="showConfirmation = false"><v-icon left>fa-times</v-icon>Cancel</v-btn>
				</v-col>
			</v-row>
		</v-card>
	</v-dialog>
</v-container>
</template>

<script>
import VueMarkdown from 'vue-markdown';

export default {
	components: {
		VueMarkdown,
	},

	data: () => ({
		selmodal: false,
		dialog: false,
		showConfirmation: false
	}),

	computed: {
		reward() {
			return this.$store.state.rewards.selected;
		},

		sponsorships() {
			return this.$store.state.rewards.selectedSponsorships
		}
	},

	methods: {
		redeem() {
			this.dialog = true;

			axios.post(this.routes['api.doctor.merchant.redeem'], {...this.reward, selectedSponsorships: [...this.sponsorships]})	
				.then(response => {
					this.dialog = false;
					this.selmodal = true;
					// this.$store.commit('rewards/appendRedeemed', response.data.redeemed);
				})
				.catch(error => {
					this.dialog = false;
					if(error.response.status == 422) {
						this.$PRX.alert.error(error.response.data.message, 'Sorry', 'options');
					}
				})
		}
	}
}
</script>
