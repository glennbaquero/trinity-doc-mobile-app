<template>
<v-container class="pa-5 patients-holder">
<v-row class="no-gutters pt-3">
<v-col cols="12" class="px-0">
<v-text-field
	solo
	v-model="search"
	label="Search"
	append-icon="fa-search"
	class=""
></v-text-field>
</v-col>
</v-row>
<!-- Frame 2 -->
<v-row class="no-gutters">
	<v-col cols="6" class="px-0">
		<p class="sec-title color-pr2">Patients</p>
	</v-col>
	<v-col cols="6" class="text-right px-0">
		 <v-btn class="ml-auto mr-0 custom-btn filled-orange" min-height="40" @click.prevent="sort()">
				<i class="fas fa-list left mr-2"></i>Sort by name
			</v-btn>
	</v-col>
</v-row>
<v-row class="no-gutters pb-12">
	<!-- Patients Card -->
	<v-col v-for="(patient, key) in patients" :key="key" cols="12" class="px-0 py-2">
		<v-card class="elevation-3 patient-card" @click.prevent="show(patient)">
			<v-row class="patient-card__inner">
				
				<template v-if="findArray(patientRecords, patient.id) && patient.share_status">				
					<div class="patients-card__icon" :style="{ backgroundImage: 'url(' + $PRXConfig().staticUrl('icons/health.svg') + ')' }"></div>
				</template>
				
				<v-col cols="3" class="align-c px-0 patient-col">
					<v-img :src="patient.full_image" class="mx-auto elevation-1 patient-img" width="50px" height="50px"></v-img>
				</v-col>
				<v-col cols="9 px-0 patient-col">
					<div class="vertical-parent">
						<div class="vertical-align">
							<p class="mb-0 bold patient-name">{{patient.fullname}}</p>
							<!-- <div class="inlineBlock-parent">
								<p class="color-pr2 mb-0 mr-1 bold">{{patient.reward_points}} points</p><p class="color-pr2 mb-0 mr-1 bold">earned as of</p><p class="color-pr2 mb-0 bold">{{dateNow}}</p>
							</div> -->
						</div>
					</div>
				</v-col>
			</v-row>
		</v-card>
	</v-col>
	<v-col cols="12" class="text-center products-card__holder">
		<infinite-loading spinner="waveDots" :identifier="infiniteId" @infinite="infiniteHandler" ref="infiniteLoading">
			<div slot="no-more"></div>
			<div slot="no-results"></div>
		</infinite-loading>
	</v-col>
	<!-- End Of Patients Cards -->
</v-row>
</v-container>
</template>

<script>
import _ from 'lodash'; 

export default {
	data: () => ({
		drawer: null,
		search: '',
		infiniteId: +new Date(),
		sorting: 'asc'
	}),
	
	computed: {
		patients() {
			return this.$store.state.patients.items;
		},

		page() {
			return this.$store.state.patients.page;
		},

		dateNow() {
			return moment().format('YYYY-MM-DD')
		},

		patientRecords() {
			return this.$store.state.user.patient_records;	
		}

	},

	watch: {
		search() {
			this.searchOperation();
		},

		sorting() {
			this.searchOperation();
		}
	},

	methods: {

		searchOperation: _.debounce(function() {
			this.$store.commit('patients/reset');
			this.infiniteId += 1; // This will trigger inifinit handler
		}, 500),

		infiniteHandler($state) {
			axios.get(this.routes['api.doctor.linked.patients'], { params: {page: this.page, search: this.search, sort: this.sorting} })
				.then(({data}) => {
					var response = data.data;
					if(response.data.length) {
						setTimeout(() => {
							this.$store.commit('patients/pageIncrement', 1);
							this.$store.commit('patients/append', response.data);
							$state.loaded();
						}, 500);
					} else {
						$state.complete();
					}
				});
		},

		show(patient) {
			this.$store.commit('patients/show', patient);
			this.$PRXRouter().goTo('selected-patient');
		},

		sort() {
			let sort = this.sorting == 'asc' ? 'desc' : 'asc';

			this.sorting = sort;
		}
	}
}
</script>
