<template>
	<div>
		<v-dialog
			v-model="loading" persistent width="90%"
			>
			<v-card
				color="#3A823E"
				dark
			>
				<v-card-text>
				{{ message }}
				<v-progress-linear
					indeterminate
					color="white"
					class="mb-0"
				></v-progress-linear>
				</v-card-text>
			</v-card>
		</v-dialog>		
	</div>
</template>
<script>

export default {

	props: {
		loading: {
			type: Boolean,
			default: false,
		},

		message: {
			type: String,
			default: 'Loading...' 
		},

	},	

}

</script>