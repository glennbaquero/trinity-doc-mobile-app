<template>
	<v-container class="px-5 pb-0 pt-7 login-holder">
		<div class="vertical-parent">
			<div class="vertical-align">
				<v-row class="no-gutters">
					<v-col cols="12" class="px-0">
						<h1 class="frm-title color-pr2">Forgot your Password?</h1>
						<h6 class="clr-black">Please enter your valid email</h6>
					</v-col>
				</v-row>
				<v-row class="no-gutters">
					<v-col cols="12" class="px-0">
						<form action="#">
						<v-col cols="12" class="py-0 px-0">
							<v-text-field
								name="email"
								v-model="email"
								label="Email"
								:error-messages="error"
							></v-text-field>
						</v-col>
						<v-col class="align-c px-0">
							<button class="custom-btn lg-btn filled-pr1" @click.prevent="send()">Send</button>
						</v-col>
						<v-col cols="12" class="pa-0 mt-12 align-c">
							<div class="inlineBlock-parent frm-desc mt-3">
								<a class="ml-1 signup-link" @click="$PRXRouter().goTo('login')">Back to Login</a>
							</div>
						</v-col>
						</form>
					</v-col>
				</v-row>
			</div>
		</div>

		<v-dialog
			v-model="dialog" persistent width="90%"
			>
			<v-card
				color="#3A823E"
				dark
			>
				<v-card-text>
				Processing Request...
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
		email: null,
		dialog: false,	
		error: null,
	}),

	methods: {
		send() {

			this.dialog = !this.dialog
			axios.post(this.routes['web.doctor.password.email'], {email: this.email})
				.then(response => {
					this.dialog = !this.dialog
					
					if(response.data.email) {
						this.error = response.data.email;
					} else {
						this.$PRX.alert.success(response.data.status, 'Success', 'options');
						this.email = null;
						this.error = null;
					}
					
				})
				.catch(error => {
					this.dialog = !this.dialog;
            		this.$PRX.alert.error('Something went wrong...', 'Ooops', 'options');
				})
		}
	}
}
</script>