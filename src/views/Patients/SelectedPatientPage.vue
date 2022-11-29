<template>
<v-container class="pa-5 patients-holder">
<v-row class="no-gutters pt-3 mb-5">
<v-col cols="12" class="px-0">
	<v-card class="elevation-0" color="transparent">
		<v-row class="patient-card__inner">
			<v-col cols="3" class="align-c px-0 patient-col">
				<v-img :src="patient.full_image" class="mx-auto patient-img elevation-1" width="70px" height="70px"></v-img>
			</v-col>
			<v-col cols="9 px-0 patient-col">
				<div class="vertical-parent">
					<div class="vertical-align">
						<h4 class="mb-0 bold selected-patient-name">{{patient.fullname}}</h4>
						<!-- <div class="inlineBlock-parent">
							<p class="clr-gray mb-0 mr-1 bold">{{patient.reward_points}} points</p>
							<p class="clr-gray mb-0 mr-1 bold">earned as of</p><p class="clr-gray mb-0 bold">{{dateNow}}</p> -->
						<!-- </div> -->
					</div>
				</div>
			</v-col>
		</v-row>
	</v-card>
</v-col>
</v-row>
<!-- Frame 2 -->
<v-row class="no-gutters">
	<v-expansion-panels class="patient__accordion">
	  <v-expansion-panel>
	    <v-expansion-panel-header class="clr-gray bold px-0">Purchased Products</v-expansion-panel-header>
	    <v-expansion-panel-content>
	       <v-row class="no-gutters pb-12"> 
			<!-- Patients Card -->
			<v-col v-for="(product, key) in patient.purchased_products" :key="key" cols="12" class="px-0 py-2">
				<v-card class="elevation-3 patient-card">
					<v-row class="patient-card__inner">
						<v-col cols="3" class="align-c px-0 patient-col">
							<v-img :src="product.image_path" class="mx-auto" width="55px" height="55px"></v-img>
						</v-col>
						<v-col cols="9 px-0 patient-col">
							<div class="vertical-parent">
								<div class="vertical-align">
									<p class="mb-0 bold patient-name">{{product.name}}</p>
									<div class="inlineBlock-parent">
										<p class="color-pr2 mb-0 mr-1 bold">{{product.points}} points</p><p class="color-pr2 mb-0 mr-1 bold">earned as of</p><p class="color-pr2 mb-0 bold">{{product.date_purchased}}</p>
									</div>
								</div>
							</div>
						</v-col>
					</v-row>
				</v-card>
			</v-col>

			<template v-if="!patient.purchased_products.length">
				<p class="bold">No purchase record</p>			
			</template>
		
			<!-- End Of Patients Cards -->
		</v-row>
	    </v-expansion-panel-content>
	  </v-expansion-panel>
	</v-expansion-panels>
</v-row>

<template v-if="isReviewer">
	<v-row class="no-gutters">
	<v-expansion-panels class="patient__accordion">
		<v-expansion-panel>
	    	<v-expansion-panel-header class="clr-gray bold px-0">Patient's Shared Health</v-expansion-panel-header>
	    		<v-expansion-panel-content>
	    			<v-row class="no-gutters pb-4">
						<v-col cols="12" class="align-l">
							<div class="vertical-parent">
								<div class="vertical-align">
									<p class="color-pr1">Health Record</p>	
								</div>
							</div>
						</v-col>

						<v-col cols="12" class="px-0 py-2">
							<v-carousel class="graph-slider pb-8" height="auto">
								<template v-for="chart in charts">
								  	<template v-if="myHealthData.charts">
									  	<v-carousel-item>
										  	<v-card class="elevation-3">
												
												<!-- this card -->
												<v-row class="no-gutters bg-color-white">
													<v-col cols="6" class="pt-2">
														<div class="frm-desc">
															<p class="bold  pl-2 graph-title">{{ chart.label }}</p>
														</div>
													</v-col>
													<v-col cols="6" class="align-r pt-2">
														<DatePicker
														:default-date="date"
														@date-selected="dateSelected"
														></DatePicker>
													</v-col>
												</v-row>
												<div id="app">
													<graph :data="myHealthData.charts[chart.key] ? myHealthData.charts[chart.key]:[] "></graph>	
												</div>
											</v-card>
									  	</v-carousel-item>
								  	</template>
								</template>
							</v-carousel>
							
						</v-col>
					</v-row>

					<v-row class="pb-12 no-gutters">
						<v-col cols="12 mb-3">
							<v-card class="pa-3 elevation-3 patient-record__Card">
								<div class="inlineBlock-parent mb-5">
									<div class="patient-data__icn" :style="{ backgroundImage: 'url(' + $PRXConfig().staticUrl('icons/blood-pressure.svg') + ')' }"></div><p class="clr-gray sec-title mb-0">Blood Pressure</p>
								</div>

								<v-row>
									<template v-if="bloodPressure">
										<v-col cols="3">
											<input type="text" :value="bloodPressure.systole + '/' + bloodPressure.diastole " readonly="" class="bold sec-title width--100">
										</v-col>
										<v-col cols="9">
											<input type="text" :value="bloodPressure.status" readonly="" class="bold sec-title color-pr2 width--100 align-r">
										</v-col>
									</template>
								</v-row>
								<v-divider></v-divider>
								<!-- <div id="app"> -->
								  <!-- <v-app> -->
								    <v-expansion-panels class="card__accordion elevation-0">
								      <v-expansion-panel>
								        <v-expansion-panel-header class="color-pr1 bold px-0">Recommendation</v-expansion-panel-header>
								        <v-expansion-panel-content v-html="pageItem.doc_app_myhealth_bs">
								      
								        </v-expansion-panel-content>
								      </v-expansion-panel>
								    </v-expansion-panels>
								  <!-- </v-app> -->
								<!-- </div> -->
							</v-card>
						</v-col>

						<v-col cols="12 mb-3">
							<v-card class="pa-3 elevation-3 patient-record__Card">
								<div class="inlineBlock-parent mb-5">
									<div class="patient-data__icn" :style="{ backgroundImage: 'url(' + $PRXConfig().staticUrl('icons/blood-pressure.svg') + ')' }"></div><p class="clr-gray sec-title mb-0">Heart Rate</p>
								</div>

								<v-row>
									<template v-if="heartRate">
										<v-col cols="6">
											<input type="text" :value="heartRate.value + ' bpm'" readonly="" class="bold sec-title width--100">
										</v-col>
										<v-col cols="6">
											<input type="text" :value="heartRate.status" readonly="" class="bold sec-title color-pr2 width--100 align-r">
										</v-col>
									</template>
								</v-row>
								<v-divider></v-divider>
								<!-- <div id="app"> -->
								  <!-- <v-app> -->
								    <v-expansion-panels class="card__accordion elevation-0">
								      <v-expansion-panel>
								        <v-expansion-panel-header class="color-pr1 bold px-0">Recommendation</v-expansion-panel-header>
								        <v-expansion-panel-content v-html="pageItem.doc_app_myhealth_hr">
								        </v-expansion-panel-content>
								      </v-expansion-panel>
								    </v-expansion-panels>
								  <!-- </v-app> -->
								<!-- </div> -->
							</v-card>
						</v-col>

						<v-col cols="12 mb-3">
							<v-card class="pa-3 elevation-3 patient-record__Card">
								<div class="inlineBlock-parent mb-5">
									<div class="patient-data__icn" :style="{ backgroundImage: 'url(' + $PRXConfig().staticUrl('icons/weight.svg') + ')' }"></div><p class="clr-gray sec-title mb-0">Body Mass Index(BMI - Asian)</p>
								</div>

								<v-row>
									<template v-if="bmi">
										<v-col cols="6">
											<input type="text" :value="bmi.value" readonly="" class="bold sec-title width--100">
										</v-col>
										<v-col cols="6">
											<input type="text" :value="bmi.status" readonly="" class="bold sec-title color-pr2 width--100 align-r">
										</v-col>
									</template>
								</v-row>
								<v-divider></v-divider>
								<!-- <div id="app"> -->
								  <!-- <v-app> -->
								    <v-expansion-panels class="card__accordion elevation-0">
								      <v-expansion-panel>
								        <v-expansion-panel-header class="color-pr1 bold px-0">Recommendation</v-expansion-panel-header>
								        <v-expansion-panel-content v-html="pageItem.doc_app_myhealth_bmi">
								        </v-expansion-panel-content>
								      </v-expansion-panel>
								    </v-expansion-panels>
								  <!-- </v-app> -->
								<!-- </div> -->
							</v-card>
						</v-col>

						<v-col cols="12 mb-3">
							<v-card class="pa-3 elevation-3 patient-record__Card">
								<div class="inlineBlock-parent mb-5">
									<div class="patient-data__icn" :style="{ backgroundImage: 'url(' + $PRXConfig().staticUrl('icons/blood.svg') + ')' }"></div><p class="clr-gray sec-title mb-0">Blood Sugar Level</p>
								</div>

								<v-row>
									<template v-if="bloodSugar">
										<v-col cols="6">
											<input type="text" :value="bloodSugar.value" readonly="" class="bold sec-title width--100">
										</v-col>
									</template>
								</v-row>
								<v-divider></v-divider>
								<!-- <div id="app"> -->
								  <!-- <v-app> -->
								    <v-expansion-panels class="card__accordion elevation-0">
								      <v-expansion-panel>
								        <v-expansion-panel-header class="color-pr1 bold px-0">Recommendation</v-expansion-panel-header>
								        <v-expansion-panel-content v-html="pageItem.doc_app_myhealth_bs">
								         </v-expansion-panel-content>
								      </v-expansion-panel>
								    </v-expansion-panels>
								  <!-- </v-app> -->
								<!-- </div> -->
							</v-card>
						</v-col>

						<v-col cols="12 mb-3">
							<v-card class="pa-3 elevation-3 patient-record__Card">
								<div class="inlineBlock-parent mb-5">
									<div class="patient-data__icn" :style="{ backgroundImage: 'url(' + $PRXConfig().staticUrl('icons/cholesterol.svg') + ')' }"></div><p class="clr-gray sec-title mb-0">Cholesterol</p>
								</div>

								<v-row>
									<template v-if="cholesterol">
										<v-col cols="2">
											<label for="">LDL</label>
											<input type="text" :value="cholesterol.ldl" readonly="" class="bold sec-title width--100">
										</v-col>
										<v-col cols="2">
											<label for="">HDL</label>
											<input type="text" :value="cholesterol.hdl" readonly="" class="bold sec-title width--100">
										</v-col>
										<v-col cols="2">
											<label for="">TOTAL</label>
											<input type="text" :value="cholesterol.total" readonly="" class="bold sec-title width--100">
										</v-col>
										<v-col cols="6">
											<input type="text" :value="cholesterol.status" readonly="" class="bold sec-title color-pr2 width--100 align-r">
										</v-col>
									</template>
								</v-row>
								<v-divider></v-divider>
								<!-- <div id="app"> -->
								  <!-- <v-app> -->
								    <v-expansion-panels class="card__accordion elevation-0">
								      <v-expansion-panel>
								        <v-expansion-panel-header class="color-pr1 bold px-0">Recommendation</v-expansion-panel-header>
								        <v-expansion-panel-content v-html="pageItem.doc_app_myhealth_chl">
								        </v-expansion-panel-content>
								      </v-expansion-panel>
								    </v-expansion-panels>
								  <!-- </v-app> -->
								<!-- </div> -->
							</v-card>
						</v-col>
					</v-row>
	    		</v-expansion-panel-content>
	  		</v-expansion-panel>
		</v-expansion-panels>
	</v-row>
</template>


<Loader
:loading="loading"
message="Loading"
></Loader>

</v-container>
</template>
<script>


import Loader from '@/components/Loader';
import DatePicker from '@/components/DatePicker'
import graph from './Graph.vue'

export default {
	
	components:{
		DatePicker,
        graph,
        Loader,
    },
	
	computed: {
		pageItem() {
			return this.$store.state.user.pageItems
		},

		patient() {
			return this.$store.state.patients.selected;
		},

		dateNow() {
			return moment().format('YYYY-MM-DD')
		},

		bloodPressure() {
			let bloodPressure = this.myHealthData.data;
				if(bloodPressure) {
					return {
						systole: bloodPressure.bloodPressures && bloodPressure.bloodPressures.systole ?  bloodPressure.bloodPressures.systole : '--',
						diastole: bloodPressure.bloodPressures && bloodPressure.bloodPressures.diastole ? bloodPressure.bloodPressures.diastole : '--',
						status: bloodPressure.bloodPressures && bloodPressure.bloodPressures.status ? bloodPressure.bloodPressures.status : '--',
				}
			}
		},

		heartRate() {
			let heartRate = this.myHealthData.data;
			if(heartRate) {
				return {
					value: heartRate.heartRates && heartRate.heartRates.value ? heartRate.heartRates.value : '--',
					status: heartRate.heartRates && heartRate.heartRates.status ? heartRate.heartRates.status : '--',
				}
			}
		},

		bloodSugar() {
			let bloodSugar = this.myHealthData.data;
			if(bloodSugar) {
				return {
					value: bloodSugar.bloodSugars && bloodSugar.bloodSugars.value ? bloodSugar.bloodSugars.value : '--' 
				}
			}
		},

		cholesterol() {
			let cholesterol = this.myHealthData.data;
			if(cholesterol) {
				return {
					ldl: cholesterol.cholesterols && cholesterol.cholesterols.ldl ? cholesterol.cholesterols.ldl : '--',
					hdl: cholesterol.cholesterols && cholesterol.cholesterols.hdl ? cholesterol.cholesterols.hdl : '--', 
					total: cholesterol.cholesterols && cholesterol.cholesterols.total_chl ? cholesterol.cholesterols.total_chl : '--',
					status: cholesterol.cholesterols && cholesterol.cholesterols.status ? cholesterol.cholesterols.status : '--',            
				}
			}
		},

		bmi() {
			let bmi = this.myHealthData.data;
			if(bmi) {
				return {
					value: bmi.bmis && bmi.bmis.value ? bmi.bmis.value : '--',
					status: bmi.bmis && bmi.bmis.status ? bmi.bmis.status : '--',            
				}
			}
		},

		patientRecords() {
			return this.$store.state.user.patient_records;	
		},

		isReviewer() {
			if(this.findArray(this.patientRecords, this.patient.id) && this.patient.share_status) {
				return true;
			}
		},	

	},

	watch: {
		date() {
			this.init();
		},
	},

	data() {
		return {
	        myHealthData: {},
	        date: moment().format("YYYY-MM-DD"), 

	        charts: [
	        	{key: 'bloodPressure', label: 'Blood Pressure Level', icon: '/static/icons/blood-pressure-control.svg'},
	        	{key: 'bloodSugar', label: 'Blood Sugar Level', icon: '/static/icons/blood-pressure-control.svg'},
	        	{key: 'heartRate', label: 'Heart Rate', icon: '/static/icons/hearbeat.svg'},
	        	{key: 'bmi', label: 'BMI', icon: '/static/icons/weight.svg'},
	        	{key: 'cholesterol', label: 'Cholesterol', icon: '/static/icons/cholesterol.svg'},
	        ],
			loading: false,	        
		}
	},

	mounted() {
		if(this.isReviewer) {
			this.init();
		}
	},

	methods: {
		
		/*
		|--------------------------------------------------------------------------
		| @Initialize
		|--------------------------------------------------------------------------
		*/
		init() {

			// this.loading = true;

			let data = {
				'date': this.date,
				'patient_id': this.patient.id,
			};
			axios.post(this.routes['api.doctor.patient.records'], data)
				.then((response) => {
					this.loading = false;					
					if(response.status === 200) {
						this.myHealthData = response.data;
					}
				}).catch((err) => {
					this.loading = false;					
				});
		},

		/*
		|--------------------------------------------------------------------------
		| @Methods
		|--------------------------------------------------------------------------
		*/

		/**
		 * Set date value 
		 * 
		 * @param  date date
		 */
		dateSelected(date) {
			this.date = date;
		},
	},

}
</script>