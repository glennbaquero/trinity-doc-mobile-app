<template>
	<v-container class="pa-0 profile-holder">
		<v-navigation-drawer
		v-model="drawer"
		fixed
		temporary
		class="filter-view qrcode-bg"
		width="100%"
		>
		<v-list-item class="py-7 px-5 filter-header">
			<i class="fas fa-chevron-left close-qr clr-white" @click.stop="drawer = !drawer"></i>
		</v-list-item>
		<v-row class="no-gutters pt-12">
			<v-col cols="12" class="px-0 pt-5 text-center">
			<div class="qrcode-container pt-12">
				<v-img :src="user.full_qr" class="mx-auto elevation-1" width="200px" height="200px"></v-img>

				<p class="frm-title clr-white">Scan QR Code to link</p>
			</div>
			</v-col>
		</v-row>
		</v-navigation-drawer>
		<v-row class="no-gutters">
			<v-col cols="12" class="px-0">
				<div class="profile-fr1">
					<div class="vertical-parent">
						<div class="vertical-align">
							<v-img :src="this.user.full_image" class="mx-auto profile-img" id="user_profile" width="76px" height="76px"></v-img>

							<v-row class="no-gutters px-4 mt-5">
								<v-col cols="6" class="px-0">
									<p class="profile-name font-weight-bold mb-0">Dr. {{this.user.fullname}}</p>
									<small class="mb-0">{{this.user.specialization_name}}</small>
								</v-col>
								<v-col cols="6" class="px-0 text-right online--selectHolder">
									<v-row class="no-gutters">
										<v-col cols="2" class="px-0 align-self-center">
											<div :class="renderStatusClass()"></div>	
										</v-col>
										<v-col cols="10" class="px-0 align-self-center clr-white">
											<v-select
												:items="onlineStatuses"
												v-model="information.online"
												item-text="label"
												item-value="value"
												class="pt-0"
											></v-select>
										</v-col>
									</v-row>
								</v-col>
							</v-row>
						</div>
					</div>
				</div>
			</v-col>
		</v-row>
		<!-- Frame 2 -->
		<v-row class="no-gutters pa-4 pb-12">
			<v-col cols="12" class="px-0 pb-5">
				<v-tabs
					v-model="tab"
					background-color="transparent"
					color="#3A823E"
					grow
					class="ml-0"
				>
					<v-tab
						key="tab1"
						class="ml-0 bold"
					>
						<small>Personal Info</small>
						
					</v-tab>
					<v-tab
						key="tab2"
						class="ml-0 bold"
					>
						<small>Security</small>
					</v-tab>
				</v-tabs>

				<v-tabs-items v-model="tab">
					<v-tab-item
						key="tab1"
						color="transparent"
					>
						<v-row class="mt-5 px-4">
							<v-col cols="6" class="pl-0 pr-2">
								<v-text-field
									v-validate="'required'"
									v-model="information.first_name"
									name="first_name"
									label="First Name"
									placeholder="First Name"
									:error-messages="error.first_name ? error.first_name[0] : ''"
								></v-text-field>
							</v-col>
							<v-col cols="6" class="pr-0 pl-2">
								<v-text-field
									v-validate="'required'"
									v-model="information.last_name"
									name="last_name"
									label="Last Name"
									placeholder="Last Name"
									:error-messages="error.last_name ? error.last_name[0] : ''"
								></v-text-field>
							</v-col>
							<v-col cols="12" class="px-0">
								<v-text-field
									v-validate="'required'"
									v-model="information.mobile_number"
									name="mobile-number"
									placeholder="+63 000000000"
									label="Mobile Number"
									type="number"
									:error-messages="error.mobile_number ? error.mobile_number[0] : ''"
								></v-text-field>
							</v-col>
							<v-col cols="12" class="px-0">
								<v-text-field
									v-validate="'required'"
									v-model="user.email"
									name="email"
									label="Email"
									:readonly="true"
									placeholder="(e.g sample@gmail.com)"
									:error-messages="error.email ? error.email[0] : ''"
								></v-text-field>
							</v-col>
							<v-col cols="6" class="pl-0 pr-2">
								<v-select
									:items="specializations"
									v-model="information.specialization_id"
									item-text="name"
									item-value="id"
									label="Specializations"
								></v-select>
							</v-col>
							<v-col cols="6" class="pr-0 pl-2">
								<v-text-field
									v-validate="'required'"
									v-model="information.license_number"
									name="license_number"
									label="License Number"
									placeholder="License Number"
									:error-messages="error.license_number ? error.license_number[0] : ''"
								></v-text-field>
							</v-col>
							<v-col cols="12" class="px-0">
								<v-text-field
									v-model="information.alma_mater"
									name="alma_mater"
									label="Graduated from"
									placeholder="Graduated from"
								></v-text-field>
							</v-col>
							<v-col cols="12" class="px-0">
								<v-text-field
									v-model="information.place_of_practice"
									name="place_of_practice"
									label="Hospital Affiliation"
									placeholder="Hospital Affiliation"
								></v-text-field>
							</v-col>
							<v-col cols="12" class="px-0">
								<div class="text-center">
									<small>Upload Profile Picture</small>
								</div>
							</v-col>
							<v-col cols="12" class="px-0">
								<!-- <v-file-input full-width rounded label="Upload Signature"
								@change="uploadSignature"
								></v-file-input> -->
						        <input type="file" @change="uploadProfile">
							</v-col>	

							<template v-if="uploadedSignature">
								<v-col cols="12" class="px-0">
									<div class="text-center">
										<img id="signature" class="mx-auto product-img" width="200px" height="200px">
									</div>
									<div class="text-center">
										<v-btn 
										@click="upload"
										class="custom-btn lh-btn filled-pr1 mt-4">Upload</v-btn>
									</div>
								</v-col>
							</template>
							<template v-if="information.signature_path && !uploadedSignature">
								<v-col cols="12" class="px-0">
									<div class="text-center">
										<small>Signature</small>
									</div>
								</v-col>
								<v-col cols="12" class="px-0">
									<div class="text-center">
										<img :src="user.signature_path" class="mx-auto product-img" width="150px" height="120px">
									</div>
								</v-col>
							</template>							
							<v-col cols="12" class="px-0">
								<!-- <v-file-input full-width rounded label="Upload Signature"
								@change="uploadSignature"
								></v-file-input> -->
						        <input type="file" @change="uploadSignature">
							</v-col>		
							<v-col cols="12">
								<v-btn class="custom-btn lg-btn lh-btn filled-pr1 mb-4" @click.stop="drawer = !drawer">View QR Code</v-btn>
								<v-btn class="custom-btn lg-btn lh-btn filled-gray" @click.prevent="updateProfile()">Update</v-btn>
							</v-col>
						</v-row>
					</v-tab-item>
					<v-tab-item
						key="tab2"
					>
						<v-row class="mt-5 px-5">
							<v-col cols="12" class="px-0">
								<v-text-field
									v-validate="'required'"
									type="password"
									v-model="password.old_password"
									name="password"
									label="Old Password"
									:error-messages="error.old_password ? error.old_password[0] : ''"
								></v-text-field>
							</v-col>
							<v-col cols="12" class="px-0">
								<v-text-field
									v-validate="'required'"
									type="password"
									v-model="password.password"
									name="password"
									label="Password"
									:error-messages="error.password ? error.password[0] : ''"
								></v-text-field>
							</v-col>
							<v-col cols="12" class="px-0">
								<v-text-field
									v-validate="'required'"
									type="password"
									v-model="password.password_confirmation"
									name="password_confirmation"
									label="Confirm Password"
								></v-text-field>
							</v-col>
							<v-col cols="12" class="pb-0">
								<v-btn class="custom-btn lg-btn lh-btn filled-pr1" @click.prevent="updatePassword()">Update</v-btn>
							</v-col>
							<v-col cols="12">
								<v-btn class="custom-btn lg-btn lh-btn filled-gray" @click="logout()">Logout</v-btn>
							</v-col>
						</v-row>
					</v-tab-item>
				</v-tabs-items>
			</v-col>
		</v-row>

		<v-dialog
			v-model="dialog" persistent width="90%"
			>
			<v-card
				color="#3A823E"
				dark
			>
				<v-card-text>
				Updating Profile
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
		tab: null,
		drawer: null,

		information: {},
		password: {},
		dialog: false,
		error: {},
		onlineStatuses: [
		  {'value' : 3, 'label' : 'Offline'},   
          {'value' : 1, 'label' : 'Online'},
          {'value' : 2, 'label' : 'Busy'},
        ],
        uploadedSignature: null,
	}),

	computed: {
		user() {
			return this.$store.state.user.details;
		},
		specializations() {
			return JSON.parse(window.localStorage.getItem('specializations'));
		},
	},

	mounted() {
		/* Spread data from computed property */
		setTimeout(() => {
			this.information = {
				first_name: this.user.first_name,
				last_name: this.user.last_name,
				mobile_number: this.user.mobile_number,
				// email: this.user.email,
				specialization_id: this.user.specialization_id,
				license_number: this.user.license_number,
				alma_mater: this.user.alma_mater,
				place_of_practice: this.user.place_of_practice,
				online: this.user.online,
				signature_path: this.user.signature_path
			};

		}, 200);
	},

	methods: {
		updateProfile() {
			this.dialog = true;

			let information = new FormData();

			information.append('first_name', this.information.first_name);
			information.append('last_name', this.information.last_name);
			information.append('mobile_number', this.information.mobile_number);
			information.append('specialization_id', this.information.specialization_id);
			information.append('license_number', this.information.license_number);
			information.append('alma_mater', this.information.alma_mater);
			information.append('place_of_practice', this.information.place_of_practice);
			information.append('online', this.information.online);
			information.append('signature_path', this.information.signature_path);
			information.append('image_path', this.information.full_image_path);

			axios.post(this.routes['api.doctor.update.profile'], information)
				.then(response => {
					this.dialog = false;
					this.error = {};
					this.$store.commit('user/set', response.data.doctor);
					this.$PRX.alert.success(response.data.message, 'Success', 'options');
				})
				.catch(error => {
					this.dialog = false;
					this.error = error.response.data.errors;
            		this.$PRX.alert.error('Please fill up all required fields', 'Ooops', 'options');
				})
		},

		updateOnlineStatus() {
			let data = {
				online: this.information.online
			};
			axios.post(this.routes['api.doctor.update.online-status'], data)
				.then(response => {
					this.$store.commit('user/set', response.data.doctor);
				})
				.catch(error => {
					console.log(err);
				})
		},

		updatePassword() {
			this.dialog = true;

			axios.post(this.routes['api.doctor.update.password'], this.password)
				.then(response => {
					this.dialog = false;
					this.error = {};
					this.$PRX.alert.success(response.data.message, 'Success', 'options');
				})
				.catch(error => {
					this.dialog = false;
					this.error = error.response.data.errors;
				});
		},

		logout() {
			axios.post(this.routes['api.doctor.logout'])
	    		.then(response => {
			    	this.$PRXRouter().goTo('login');
			    	this.$store.commit('user/clearAuth');
			    	window.localStorage.removeItem('authToken');
	    		})
		},

		// uploadSignature(input) {
		// 	this.uploadedSignature = input;
		// 	if (input) {
  //               var reader = new FileReader();

  //               reader.onload = function (e) {
  //                   $('#signature')
  //                       .attr('src', e.target.result);
  //               };

  //               reader.readAsDataURL(input);
  //       	}
		// },
		uploadSignature(e) {
			var files = e.target.files || e.dataTransfer.files;

			if(!files.length)
			   return;

			var reader = new FileReader();
	        reader.readAsDataURL(files[0]);
			reader.onload = function (event) {
				$('#signature')
			    .attr('src', event.target.result);
			};
			this.uploadedSignature = files[0];
		},

		uploadProfile(e) {
			var files = e.target.files || e.dataTransfer.files;

			if(!files.length)
			   return;

			this.information.full_image_path = files[0];
			this.renderImage();
		},

		renderImage() {
			if(this.information.full_image_path) {
				var filereader = new FileReader();
				var $this = this;
		        filereader.readAsDataURL(this.information.full_image_path);

		        filereader.onload = function (event) {
		            $this.user.full_image = event.target.result;
		        };
			}
		},

		upload() {

			this.dialog = true;

			let data = new FormData();
			data.append('signature', this.uploadedSignature);

			axios.post(this.routes['api.doctor.upload.signature'], data)
				.then((response) => {
					this.dialog = false;					
					this.$store.commit('user/set', response.data.doctor);
					this.user.signature_path = response.data.doctor.signature_path;
					this.uploadedSignature = null;
					this.$PRX.alert.success(response.data.message, 'Success', 'options');					
				}).catch((err) => {
					this.dialog = false;
				});
		},

		renderStatusClass() {
			if(this.information.online == 1) {
				return 'online--status online';
			} else if (this.information.online == 2) {
				return 'online--status busy';
			} 
			return 'online--status offline';
		}
	},

	watch: {
		'information.online'(val) {
			this.updateOnlineStatus();
		}
	}

}
</script>
