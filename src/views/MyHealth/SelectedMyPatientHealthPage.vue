<template>
<v-container class="pa-5 mypatients-holder">

<v-row class="no-gutters pb-12">
	
	<v-col cols="12" class="px-0 py-2">
		<!-- <v-card class="selected-mypatient-card"> -->
			<v-row class="selected-mypatient-card__inner">
				<v-col cols="3" class="align-c px-0 mypatient-col">
					<img src="/static/user.jpg" alt="" class="mx-auto elevation-1 selected-mypatient-img" width="50px" height="50px">
					<!-- <v-img :src="" class="mx-auto elevation-1 patient-img" width="50px" height="50px"></v-img> -->
				</v-col>
				<v-col cols="9 px-0 selected-mypatient-col">
					<div class="vertical-parent">
						<div class="vertical-align">
							<p class="mb-0 bold selected-mypatient-name">Abby Fernando</p>
							<div class="inlineBlock-parent">
								<p class="color-pr2 mb-0 mr-1 bold">89 points</p><p class="color-pr2 mb-0 mr-1 bold">earned as of</p><p class="color-pr2 mb-0 bold">06-21-2019</p>
							</div>
						</div>
					</div>
				</v-col>
			</v-row>
		<!-- </v-card> -->
	</v-col>

	<v-col cols="12" class="px-0 py-2">
		<v-card class="elevation-3">
			<div id="app">
			    <graph-line
			            :width="600"
			            :height="400"
			            :shape="'normal'"
			            :axis-min="0"
			            :axis-max="50"
			            :axis-full-mode="true"
			            :labels="[ '1Q', '2Q', '3Q', '4Q' ]"
			            :names="names"
			            :values="values">
			        <note :text="'Line Chart'"></note>
			        <tooltip :names="names" :position="'right'"></tooltip>
			        <legends :names="names"></legends>
			        <guideline :tooltip-y="true"></guideline>
			    </graph-line>
			</div>
		</v-card>
	</v-col>

</v-row>

<v-row class="no-gutters pb-4">
	<v-col cols="12" class="align-l">
		<div class="vertical-parent">
			<div class="vertical-align">
				<p class="color-pr1">Health Record</p>	
			</div>
		</div>
	</v-col>
	<!-- <v-col cols="6" class="align-r">
		<v-btn class="custom-btn filled-pr2 l-btn" @click.prevent="showPatient(patient)">Enter Record</v-btn>
	</v-col> -->
</v-row>

<v-row class="pb-12">
	<v-col cols="12 mb-3">
		<v-card class="pa-3 elevation-3 patient-record__Card">
			<div class="inlineBlock-parent mb-5">
				<div class="patient-data__icn" style="background-image: url('')"></div><p class="clr-gray bold mb-0">Blood Pressure</p>
			</div>

			<v-row>
				<v-col cols="6">
					<input type="text" value="88 bpm" readonly="" class="bold sec-title width--100">
				</v-col>
				<v-col cols="6">
					<input type="text" value="Normal" readonly="" class="bold sec-title color-pr2 width--100 align-r">
				</v-col>
			</v-row>
			<v-divider></v-divider>
			<!-- <div id="app"> -->
			  <!-- <v-app> -->
			    <v-expansion-panels class="card__accordion elevation-0">
			      <v-expansion-panel>
			        <v-expansion-panel-header class="color-pr1 bold px-0">Recommendation</v-expansion-panel-header>
			        <v-expansion-panel-content>
			          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
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
				<div class="patient-data__icn" style="background-image: url('')"></div><p class="clr-gray bold mb-0">Heart Rate</p>
			</div>

			<v-row>
				<v-col cols="6">
					<input type="text" value="88 bpm" readonly="" class="bold sec-title width--100">
				</v-col>
				<v-col cols="6">
					<input type="text" value="Normal" readonly="" class="bold sec-title color-pr2 width--100 align-r">
				</v-col>
			</v-row>
			<v-divider></v-divider>
			<!-- <div id="app"> -->
			  <!-- <v-app> -->
			    <v-expansion-panels class="card__accordion elevation-0">
			      <v-expansion-panel>
			        <v-expansion-panel-header class="color-pr1 bold px-0">Recommendation</v-expansion-panel-header>
			        <v-expansion-panel-content>
			          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
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
				<div class="patient-data__icn" style="background-image: url('')"></div><p class="clr-gray bold mb-0">Body Mass Index(BMI - Asian)</p>
			</div>

			<v-row>
				<v-col cols="6">
					<input type="text" value="88 bpm" readonly="" class="bold sec-title width--100">
				</v-col>
				<v-col cols="6">
					<input type="text" value="Normal" readonly="" class="bold sec-title color-pr2 width--100 align-r">
				</v-col>
			</v-row>
			<v-divider></v-divider>
			<!-- <div id="app"> -->
			  <!-- <v-app> -->
			    <v-expansion-panels class="card__accordion elevation-0">
			      <v-expansion-panel>
			        <v-expansion-panel-header class="color-pr1 bold px-0">Recommendation</v-expansion-panel-header>
			        <v-expansion-panel-content>
			          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
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
				<div class="patient-data__icn" style="background-image: url('')"></div><p class="clr-gray bold mb-0">Blood Sugar Level</p>
			</div>

			<v-row>
				<v-col cols="6">
					<input type="text" value="88 bpm" readonly="" class="bold sec-title width--100">
				</v-col>
				<v-col cols="6">
					<input type="text" value="Normal" readonly="" class="bold sec-title color-pr2 width--100 align-r">
				</v-col>
			</v-row>
			<v-divider></v-divider>
			<!-- <div id="app"> -->
			  <!-- <v-app> -->
			    <v-expansion-panels class="card__accordion elevation-0">
			      <v-expansion-panel>
			        <v-expansion-panel-header class="color-pr1 bold px-0">Recommendation</v-expansion-panel-header>
			        <v-expansion-panel-content>
			          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
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
				<div class="patient-data__icn" style="background-image: url('')"></div><p class="clr-gray bold mb-0">Cholesterol</p>
			</div>

			<v-row>
				<v-col cols="3">
					<label for="">LDL</label>
					<input type="text" value="180" readonly="" class="bold sec-title width--100">
				</v-col>
				<v-col cols="3">
					<label for="">HDL</label>
					<input type="text" value="60" readonly="" class="bold sec-title width--100">
				</v-col>
				<v-col cols="3">
					<label for="">TOTAL</label>
					<input type="text" value="240" readonly="" class="bold sec-title width--100">
				</v-col>
				<v-col cols="3">
					<input type="text" value="Normal" readonly="" class="bold sec-title color-pr2 width--100 align-r">
				</v-col>
			</v-row>
			<v-divider></v-divider>
			<!-- <div id="app"> -->
			  <!-- <v-app> -->
			    <v-expansion-panels class="card__accordion elevation-0">
			      <v-expansion-panel>
			        <v-expansion-panel-header class="color-pr1 bold px-0">Recommendation</v-expansion-panel-header>
			        <v-expansion-panel-content>
			          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
			        </v-expansion-panel-content>
			      </v-expansion-panel>
			    </v-expansion-panels>
			  <!-- </v-app> -->
			<!-- </div> -->
		</v-card>
	</v-col>
</v-row>

</v-container>
</template>

<script>
import _ from 'lodash';

export default {

	 data: {
    	image_src: '/static/user.jpg',
  	}


}
</script>
