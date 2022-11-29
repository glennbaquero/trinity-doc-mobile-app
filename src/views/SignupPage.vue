<template>
	<v-container class="pa-5 signup-holder">
		<v-row class="no-gutters pt-3">
			<v-col cols="12" class="px-0">
				<h1 class="frm-title">Hi, signup to be with us!</h1>
				<p class="mt-2 bold clr-gray">Kindly put your deteails here</p>
			</v-col>
		</v-row>
		<v-row class="no-gutters">
			<v-col cols="12" class="px-0">
				<form action="">
				<v-col cols="12" class="px-0">
					<v-text-field
						v-validate="'required'"
						v-model="item.first_name"
						name="first_name"
						label="First Name"
						placeholder="First Name"
						:error-messages="errors.collect('first_name')"
					></v-text-field>
				</v-col>
				<v-col cols="12" class="px-0">
					<v-text-field
						v-validate="'required'"
						v-model="item.last_name"
						name="last_name"
						label="Last Name"
						placeholder="Last Name"
						:error-messages="errors.collect('last_name')"
					></v-text-field>
				</v-col>
				<v-col cols="12" class="px-0">
					<v-text-field
						v-validate="'required'"
						v-model="item.mobile_number"
						name="mobile-number"
						placeholder="+63 000000000"
						label="Mobile Number"
						:error-messages="errors.collect('mobile-number')"
					></v-text-field>
				</v-col>
				<v-col cols="12" class="px-0">
					<v-text-field
						v-validate="'required'"
						v-model="item.email"
						name="email"
						label="Email"
						placeholder="(e.g sample@gmail.com)"
						data-vv-name="email"
						data-vv-as="email"
						data-vv-value-path="internalValue"
						:error-messages="errors.collect('email')"
					></v-text-field>
				</v-col>
				<v-col cols="12" class="px-0">
					<v-text-field
						v-validate="'required'"
						v-model="item.alma_mater"
						name="alma-mater"
						placeholder="Alma Mater"
						label="Alma Mater"
						:error-messages="errors.collect('alma-mater')"
					></v-text-field>
				</v-col>
				<v-col cols="12" class="px-0">
					<v-text-field
						v-validate="'required'"
						v-model="item.place_of_practice"
						name="place-of-practice"
						placeholder="Hospital Affiliation"
						label="Hospital Affiliation"
						:error-messages="errors.collect('place-of-practice')"
					></v-text-field>
				</v-col>
				<v-col cols="12" class="px-0">
					<v-text-field
						v-validate="'required'"
						v-model="item.license_number"
						name="license-number"
						placeholder="License number"
						label="License number"
						:error-messages="errors.collect('license-number')"
					></v-text-field>
				</v-col>				
				<v-col cols="12" class="px-0">
					<v-text-field
						v-validate="'required'"
						type="password"
						v-model="item.password"
						name="password"
						label="Password"
						:error-messages="errors.collect('password')"
					></v-text-field>
				</v-col>
				<v-col cols="12" class="px-0">
					<v-text-field
						v-validate="'required'"
						type="password"
						v-model="item.password_confirmation"
						name="password_confirmation"
						label="Confirm Password"
						:error-messages="errors.collect('password_confirmation')"
					></v-text-field>
				</v-col>
				<v-col cols="12" class="px-0">
					<v-select
						:items="specializations"
						v-model="item.specialization_id"
						item-text="name"
						item-value="id"
						label="Specializations"
					></v-select>
				</v-col>
				<v-col cols="12" class="pb-12 px-0">
					<button class="custom-btn lg-btn lh-btn filled-pr1" @click.prevent="openPrivacy()">Sign Up</button>
					<div class="inlineBlock-parent align-c mt-5 pb-5">
						<p class="mb-0">Already has an account?</p> <a class="ml-1 signup-link" @click="$PRXRouter().goTo('login')">Login</a>
					</div>
				</v-col>
			</form>
			</v-col>
		</v-row>

	    <v-dialog v-model="privacy" persistent max-width="90%">
		    <v-card class="pa-5 privacy-modal">
		    	<p class="sec-title align-c">Privacy Policy</p>
		    	<div class="frm-desc mb-4">
		    		<small v-html="pageItems.privacy"></small>
		    	</div>

		    	<div class="frm-desc align-c mb-4">
		    		<small>
		    			<a @click="openTermsAndConditions" class="align-c">Read the full terms and conditions</a>
		    		</small>
		    	</div>
		
		    	<v-row no-gutter>
		    		<v-col cols="12" class="pa-0 pb-2 text-center">
						<v-btn min-width="121px" class="custom-btn s-btn filled-pr1" @click="register"><v-icon left>fa-check</v-icon>I AGREE</v-btn>
					</v-col>
					<v-col cols="12" class="pa-0 text-center">
						<v-btn min-width="121px" class="custom-btn s-btn filled-gray" @click="privacy = false"><v-icon left>fa-times</v-icon>Cancel</v-btn>
					</v-col>
		    	</v-row>
		    </v-card>
	    </v-dialog>


		<v-dialog v-model="termsAndConditions" persistent max-width="90%">
		    <v-card class="pa-5 privacy-modal">
		    	<p class="sec-title align-c">Terms and Conditions</p>
		    	<div class="frm-desc mb-4">
		    		<small v-html="pageItems.terms"></small>
		    	</div>

		    	<v-row no-gutter>
		    		<v-col cols="12" class="pa-0 pb-2 text-center">
						<v-btn min-width="121px" class="custom-btn s-btn filled-pr1" @click="register"><v-icon left>fa-check</v-icon>I AGREE</v-btn>
					</v-col>
					<v-col cols="12" class="pa-0 text-center">
						<v-btn min-width="121px" class="custom-btn s-btn filled-gray" @click="termsAndConditions = false"><v-icon left>fa-times</v-icon>Cancel</v-btn>
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
				Processing your registration
				<v-progress-linear
					indeterminate
					color="white"
					class="mb-0"
				></v-progress-linear>
				</v-card-text>
			</v-card>
		</v-dialog>

	</v-container>
</template>
<script>
export default {
	data: () => ({
		item: {},
		dialog: false,
		privacy: false,
		termsAndConditions: false,
		pageItems: {},
	}),

	mounted() {

		this.init();

	},

	computed: {
		specializations() {
			return JSON.parse(window.localStorage.getItem('specializations'));
		}
	},

	methods: {

		init() {
			this.pageItems.terms = this.$store.state.pageItems.terms;
			this.pageItems.privacy = this.$store.state.pageItems.privacy;			
		},

		openPrivacy() {
			this.privacy = true;
		},

		openTermsAndConditions() {
			this.privacy = false;
			this.termsAndConditions = true;
		},

		register() {
			this.dialog = !this.dialog;

			this.privacy = false;
			this.termsAndConditions = false;			

			axios.post(this.routes['api.doctor.register'], this.item)
				.then(response => {
					this.dialog = !this.dialog;
					this.$PRX.alert.success('Registration complete, wait for admin approval!', 'Success', 'options');
					this.item = {};
				})
				.catch(error => {
					this.dialog = !this.dialog;
            		this.$PRX.alert.error(this.parseResponse(error), 'Ooops', 'options');
				})
		}
	},
}
</script>