<template>
	<div>
		<v-dialog
			v-model="show"
			max-width="90%"
			persistent
			>
			<v-card class="py-5">
				<v-row class="px-5 mx-auto">
					<v-col cols="12" class="pa-0 text-center">
						<v-img :src="$PRXConfig().staticUrl('icons/prompt.svg')" class="mx-auto reward-icon" width="44px" height="44px"></v-img>
						<h1 class="frm-title my-5">{{ item.title }}</h1>
						<div class="frm-desc">
						<p class="mx-auto" v-html="item.message"></p>
						</div>
					</v-col>
					<!-- <p class="mt-3 bold color-pr2">Select Articles</p> -->
					<v-col cols="12" class="pa-0 text-center">
						<v-btn class="custom-btn s-btn filled-pr1 mx-auto" @click="$emit('close')" min-width="121px"><v-icon left>fa-check</v-icon>OK</v-btn>
					</v-col>
				</v-row>
			</v-card>
		</v-dialog>
	</div>
</template>

<script>
	export default{
		props: {
			show: Boolean,
			item: Object
		}
	}
</script>