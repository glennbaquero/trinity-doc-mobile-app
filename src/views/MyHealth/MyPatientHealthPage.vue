<template>
<v-container class="pa-5 mypatients-holder">

	<v-row class="no-gutters">
		<v-col cols="12 px-0 mb-2">
			<p class="bold color-pr2">Patients who shared their health records</p>
		</v-col>
	</v-row>

	<v-row class="no-gutters pb-12">

		<template v-for="(patient, key) in filteredPatients">
			<v-col cols="12" class="px-0 py-2" :key="key">
				<v-card class="elevation-3 mypatient-card" @click.prevent="show(patient)">
					<v-row class="mypatient-card__inner">
						<v-col cols="3" class="align-c px-0 mypatient-col">
							<img :src="patient.full_image" alt="" class="mx-auto elevation-1 mypatient-img" width="50px" height="50px">
						</v-col>
						<v-col cols="9 px-0 mypatient-col">
							<div class="vertical-parent">
								<div class="vertical-align">
									<p class="mb-0 bold mypatient-name">{{ patient.fullname }}</p>
									<!-- <div class="inlineBlock-parent">
										<p class="color-pr2 mb-0 mr-1 bold">{{ patient.reward_points }} points</p><p class="color-pr2 mb-0 mr-1 bold">earned as of</p><p class="color-pr2 mb-0 bold">{{ dateNow }}</p>
									</div> -->
								</div>
							</div>
						</v-col>
					</v-row>
				</v-card>
			</v-col>
		</template>

		<template v-if="!filteredPatients.length">
			<v-col cols="12" class="text-center products-card__holder">
				<p class="bold">No Patients found</p>
			</v-col>
		</template>

	</v-row>

</v-container>
</template>

<script>
import _ from 'lodash'; 

export default {

	computed: {

		filteredPatients() {
			let patients = this.$store.state.user.linked_patients;

			patients = patients.filter((patient) => {
				return this.findArray(this.$store.state.user.patient_records, patient.id)
			});

			return patients;

		},

		dateNow() {
			return moment().format('YYYY-MM-DD')
		},

	},

  	methods: {
		
		show(patient) {
			this.$store.commit('patients/show', patient);
			this.$PRXRouter().goTo('selected-patient');
		},
  	},

}
</script>
