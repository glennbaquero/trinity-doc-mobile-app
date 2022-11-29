<template>
	<v-container class="pa-5 login-holder">
		<div class="vertical-parent">
			<div class="vertical-align">
				<v-row class="no-gutters">
					<v-col cols="12" class="px-0 mb-10">
						<h1 class="frm-title clr-black">Hello Doctor,</h1>
						<h6 class="clr-gray1">Please login to your account</h6>
					</v-col>
				</v-row>
				<v-row class="no-gutters">
					<v-col cols="12" class="px-0">
						<form action="#">
						<v-col cols="12" class="pa-0">
							<v-text-field
								v-validate="'required'"
								v-model="item.email"
								type="email"
								name="email"
								color="#3A823E"
								label="Email"
								data-vv-name="email"
								data-vv-as="Email"
								data-vv-value-path="internalValue"
								:error-messages="errors.collect('email')"
							></v-text-field>
						</v-col>
						<v-col cols="12" class="pa-0">
							<v-text-field
								v-validate="'required'"
								v-model="item.password"
								type="password"
								name="password"
								color="#3A823E"
								label="Password"
								data-vv-name="password"
								data-vv-as="Password"
								data-vv-value-path="internalValue"
								:error-messages="errors.collect('password')"
							></v-text-field>
						</v-col>
						<v-col cols="12" class="pa-0 mt-12 align-c">
							<button class="custom-btn lg-btn filled-pr1" @click.prevent="login">Login</button>
							<div class="inlineBlock-parent frm-desc mt-3">
								<p class="mb-0">Don't have an account yet?</p> <a class="ml-1 signup-link" @click="$PRXRouter().goTo('signup')">Sign up</a>
							</div>
						</v-col>
						<v-col cols="12" class="pa-0 mt-12 align-c">
							<div class="inlineBlock-parent frm-desc mt-3">
								<a class="ml-1 signup-link" @click="$PRXRouter().goTo('forgot-password')">Forgot Password</a>
							</div>
						</v-col>
						</form>
					</v-col>
				</v-row>
			</div>
		</div>

		<Loader
		:loading="loading"
		message="Signing in"
		></Loader>

	</v-container>
</template>

<script>

import Loader from '@/components/Loader';
import LogoutMixin from '../assets/js/mixins/logout.js';

export default {
	mixins: [LogoutMixin],

	components: {
		Loader,
	},

	data: () => ({
		item: {},
		loading: false,
	}),

	mounted() {
		if(this.authenticated) {
            this.$PRXRouter().goTo('home');
        }
	}, 

	methods: {
		login() {
			this.loading = !this.loading;

			axios.post(this.routes['api.doctor.login'], this.item)
				.then(response => {
					this.setToken(response.data.token)
					this.loading = !this.loading;
				})
				.catch(error => {
					this.loading = !this.loading;
					this.$PRX.alert.error(this.parseResponse(error), 'Ooops', 'options');
				})
		},

		setToken(token) {
			this.$PRXRouter().goTo('home');
			window.axios.defaults.headers.common['Authorization'] = token;
          	window.localStorage.setItem('authToken', token);
			this.$store.commit('user/setToken', token);
			this.$store.commit('user/authenticate');

			let device_token = window.localStorage.getItem('pushnotifs/setToken');

			this.authenticate();
		},
	}
}
</script>
