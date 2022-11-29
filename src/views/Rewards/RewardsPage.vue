<template>
	<v-container class="pa-5 reward-holder">
		<v-row class="no-gutters pt-3">
			<v-col cols="12" class="px-0 mb-2">
				<p class="sec-title color-pr2 mb-0">CME</p>
			</v-col>
			<v-col cols="12" class="px-0">
			<v-card class="elevation-1 reward-card">
				<v-row class="reward-card__inner px-3">
					<v-col cols="3" class="align-c px-0 reward-col">
						<div class="vertical-parent">
							<div class="vertical-align">
								<div class="icon-holder fill-pink mx-auto">
									<v-img :src="$PRXConfig().staticUrl('icons/heart.svg')" class="mx-auto icons" width="25px" height="25px"></v-img>
								</div>
							</div>
						</div>
					</v-col>
					<v-col cols="5" class="px-0 reward-col">
						<div class="vertical-parent">
							<div class="vertical-align">
								<p class="mb-0 bold patient-name color-pr2">Professional Points</p>
							</div>
						</div>
					</v-col>
					<v-col cols="4" class="px-0 reward-col">
						<div class="vertical-parent">
							<div class="vertical-align">
								<h4 class="mb-0 bold patient-name color-pr2">{{points}} points</h4>
							</div>
						</div>
					</v-col>
				</v-row>
			</v-card>
		</v-col>
		</v-row>
		<v-row class="no-gutters reward-tab py-5 pt-7 px-0">
			<v-col cols="12" class="px-0">
				<v-tabs
					v-model="tab"
					background-color="transparent"
					color="#3EAF01"
					grow
					class="ml-0"
				>
					<v-tab
						key="head-tab1"
						class="ml-0 bold"
					>
						Rewards
					</v-tab>
					<v-divider
						class="mx-0"
						vertical
						height="30px"
					></v-divider>
					<v-tab
						key="head-tab2"
						class="ml-0 bold"
						@click="sponsorships"
					>
						History
					</v-tab>
				</v-tabs>
			</v-col>
			<!-- <v-col cols="6" class="align-r px-0">
				<v-btn class="ml-auto mr-0 bg-color-pr2 px-3 custom-btn filled-pr3" min-width="60%" @click.stop="drawer = !drawer">
					Filter by<v-img :src="$PRXConfig().staticUrl('/icons/settings.svg')" class="ml-5" width="20px" height="15px"></v-img>
				</v-btn>
			</v-col> -->
		</v-row>
		<v-row class="no-gutters pb-12">
			<v-col col="12" class="px-0">
				<v-tabs-items v-model="tab">
					<v-tab-item
						key="item-tab1"
						color="transparent"
					>
						<v-row v-for="(item, key) in items" :key="key" class="mt-5 no-gutters">
							<!-- <p class="color-pr2">{{getName(key)}}</p> -->
							<!-- Reward Ticket -->
							<v-col v-for="(reward, index) in item" :key="index" cols="12" class="px-0 pb-3 ticket">
								<v-row class="no-gutters">
									<v-card
										class="mx-auto px-0 ticket-card"
										width="100%"
										outlined
									>
										<div class="curve top-left"></div>
										<div class="curve bot-left"></div>
										<div class="curve top-right"></div>
										<div class="curve bot-right"></div>
										<v-list-item two-line class="px-0">
											<v-list-item-avatar
												tile
												width="150px"
												height="100%"
												class="ma-0"
											>
												<v-img :src="reward.full_image" class="mx-auto module-img" width="130px" height="195px"></v-img>
											</v-list-item-avatar>
											<v-list-item-content class="pl-4 pr-3 border-dots">
												<v-list-item-title class="ticket-title mb-1 points bold">{{reward.points}} points</v-list-item-title>
												<small class="color-pr2 mb-2 ticket-date">expires on {{reward.expiry_date}}</small>
												<v-list-item-title class="ticket-title2 mb-1 bold">{{reward.name}}</v-list-item-title>
												<v-list-item-subtitle class="ticket-desc" v-html="reward.description"></v-list-item-subtitle>
												<v-list-item class="px-0">
													<v-btn class="custom-btn filled-pr1 s-btn" @click.prevent="showSponsorships(reward)" min-width="121px">Redeem</v-btn>
													<!-- <v-btn class="custom-btn s-btn filled-pr2" @click.prevent="showSponsorships(reward)">Redeem</v-btn> -->
												</v-list-item>
											</v-list-item-content>
										</v-list-item>
									</v-card>
								</v-row>
							</v-col>
							<!-- end of Reward ticket -->
						</v-row>
					</v-tab-item>
					<v-tab-item
						key="item-tab2"
					>
						<v-row class="mt-5 no-gutters">
							<v-col v-for="(item, key) in redeemed" :key="key" cols="12" class="px-0 pb-3 ticket">
								<v-row class="no-gutters">
									<v-card
										class="mx-auto px-0 ticket-card"
										width="100%"
										outlined
									>
										<div class="curve top-left"></div>
										<div class="curve bot-left"></div>
										<div class="curve top-right"></div>
										<div class="curve bot-right"></div>
										<v-list-item two-line class="px-0">
											<v-list-item-avatar
												tile
												width="150px"
												height="195px"
												class="ma-0"
											>
												<v-img :src="item.data | full_image" class="mx-auto module-img" width="130px" height="100%"></v-img>
											</v-list-item-avatar>
											<v-list-item-content class="pl-4 pr-3 border-dots">
												<v-list-item-title class="ticket-title points mb-1 bold">{{ item.used_points }} points deducted</v-list-item-title>
												<small class="color-pr2 mb-5 ticket-date">claimed on {{ item.data | claimed }}</small>
												<v-list-item-title class="ticket-title2 mb-1 bold">{{ item.data | title }}</v-list-item-title>
												<v-list-item-subtitle class="ticket-desc" v-html="$options.filters.description(item.data)"></v-list-item-subtitle>
											</v-list-item-content>
										</v-list-item>
									</v-card>
								</v-row>
							</v-col>
						</v-row>
					</v-tab-item>
				</v-tabs-items>
			</v-col>
		</v-row>

		<!-- Filter View -->
		<v-navigation-drawer
			v-model="drawer"
			fixed
			temporary
			class="filter-view"
			width="100%"
		>
			<v-list-item class="py-7 px-5 filter-header">
					<i class="fas fa-chevron-left" @click.stop="drawer = !drawer"></i>
			</v-list-item>
			<v-divider></v-divider>
			<v-list-item>
				<v-row class="pa-5">
					<p class="mt-3 bold color-pr2">Select Categories</p>
						<template v-for="(item, key) in categories">
							<v-col cols="11" class="py-0 px-0" :key="'desc' + key">
								<div class="frm-desc">
									<p class="mt-0 mb-0">{{item.name}}</p>
								</div>
							</v-col>
							<v-col cols="1" class="pa-0 text-right" :key="'val' + key">
								<v-checkbox class="mt-2 ml-auto mr-0" color="#74C946" height="0" v-model="selected" :value="item.id"></v-checkbox>
							</v-col>
						</template>
						<v-col cols="12" class="px-0 mt-5">
							<v-btn class="custom-btn lg-btn filled-pr1 lh-btn" @click.prevent="drawer = !drawer">Display Result</v-btn>
						</v-col>
				</v-row>
			</v-list-item>
		</v-navigation-drawer>

		<!-- Modal -->
		<v-dialog
			v-model="dialog"
			max-width="90%"
			>
			<v-card class="reward-modal py-5">
				<v-row class="px-5 mx-auto">
					<v-col cols="12" class="pa-0 text-center">
						<v-img :src="$PRXConfig().staticUrl('icons/prompt.svg')" class="mx-auto reward-icon" width="44" height="44"></v-img>
						<h1 class="frm-title my-5 mb-0">Select sponsorship</h1>
						<div class="frm-desc">
						<p class="mx-auto">To proceed for reward redemption please select sponsorship</p>
						</div>
					</v-col>
					<p class="mt-3 bold color-pr2">Select sponsorship</p>
					<template v-for="(sponsorship, key) in reward.sponsorships">
						<v-col cols="11" class="py-0 px-0" :key="key + 'item'">
							<div class="frm-desc">
							<p class="mt-0 mb-0">{{sponsorship.name}} (+ {{sponsorship.points}} pts)</p>
							</div>
						</v-col>
						<v-col cols="1" class="pa-0 text-right" :key="key + 'action'">
							<v-checkbox class="mt-2 ml-auto mr-0" color="#74C946" height="0" v-model="selectedSponsorships" :value="sponsorship" multiple></v-checkbox>
						</v-col>
					</template>

					<v-col cols="12" class="pa-0 text-center pb-2">
						<v-btn min-width="121px" class="custom-btn s-btn filled-pr1" @click.prevent="show()"><v-icon left>fa-check</v-icon>Proceed</v-btn>
					</v-col>
					<v-col cols="12" class="pa-0 text-center">
						<v-btn min-width="121px" class="custom-btn s-btn filled-gray" @click="dialog = false"><v-icon left>fa-times</v-icon>Cancel</v-btn>
					</v-col>
				</v-row>
			</v-card>
		</v-dialog>
	</v-container>
</template>

<script>
import _ from 'lodash'; 

export default {
	data: () => ({
		tab: null,
		drawer: null,
		dialog: false,
		selected: [],

		reward: {},
		selectedSponsorships: [],
		sponsorshipsPointsSpend: 0,
	}),

	computed: {
		categories() {
			return this.$store.state.rewards.categories;
		},

		items() {
			var items = this.$store.state.rewards.items;

			if(this.selected.length > 0) {
				items =  items.filter((item, key) => {
					if(this.selected.includes(item.reward_category_id)) {
						return item;
					}
				})
			}

			return _.groupBy(items, 'reward_category_id');  
		},

		redeemed() {
			return this.$store.state.rewards.redeemed;
		},

		points()
		{
			return this.$store.state.user.points;
		}
	},

	filters: {
		points(value, sponsorship) {
			console.log(JSON.parse(value).points, sponsorship)
			return parseInt(JSON.parse(value).points) + parseInt(sponsorship);
		},

		claimed(value) {
			return moment(JSON.parse(value).created_at).format('MMM Do YY');
		},

		title(value) {
			return JSON.parse(value).name;
		},

		description(value) {
			return JSON.parse(value).description;
		},

		full_image(value) {
			return JSON.parse(value).full_image;
		},
	},

	methods: {
		show() {
			// Compute total to redeem points
			const total = _.sumBy(this.selectedSponsorships, 'points');
			
			if(this.points >= total) {
				this.$store.commit('rewards/show', this.reward);
				this.$store.commit('rewards/appendSelectedSponsorships', this.selectedSponsorships);
				this.$PRXRouter().goTo('selected-rewards');
			} else {
				this.$PRX.alert.error('You have not met the required points to redeem this reward', 'Sorry', 'options');
			}
		},

		showSponsorships(reward) {
			this.reward = reward;

			if(this.reward.sponsorships.length > 0) {
				/* Show Sponsorships */
				this.dialog = true;
			} else {
				/* Show selected rewards page */
				this.show();
			}
			
		},

		getName(key) {
			return this.categories.find(category => category.id == key).name;
		},

		sponsorships() {
			var redeems = this.redeemed;
			var sponsorshipArr = [];

			redeems.forEach((redeem) => {
				var sponsorships = JSON.parse(redeem.sponsorships);

				sponsorships.forEach((sponsorship, key) => {
						sponsorshipArr.push(sponsorship.points);
				})
			});

			this.sponsorshipsPointsSpend = this.totalSponsorship(sponsorshipArr);
		},

		totalSponsorship(sponsorshipArr) {
			if(sponsorshipArr.length) {
				return sponsorshipArr.reduce(function(a,b) {
					return a+b;
				}, 0);	
			} else {
				return 0;
			}

		}
	}
}
</script>
