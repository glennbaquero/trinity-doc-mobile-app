<template>
<v-container class="pa-5 selected-module">
	<v-row class="no-gutters">
		<v-col cols="12" class="px-0 py-3">
			<v-img :src="product.full_image" class="mx-auto article-img" width="200px" height="200px"></v-img>
		</v-col>
	</v-row>
	<!--Frame 2 -->
	<v-row class="no-gutters px-0 mt-3 pb-12">
		<v-col cols="12" class="px-0 mb-3">
			<h2 class="article-title color-pr2 bold">{{product.brand_name}}</h2>
		</v-col>
		<v-col cols="12" class="px-0 mb-3">
			<v-row class="no-gutters px-0">
				<!-- <v-col cols="6" class="px-0">
					<h4 class="bold">P {{product.price}}</h4>
				</v-col> -->
				<!-- <v-col cols="6" class="px-0 text-right">
					<div class="selected-points text-center">
						<div class="vertical-parent">
							<div class="vertical-align">
								<p class="clr-white bold mb-0">{{product.doctor_points}} pts.</p>
							</div>
						</div>
					</div>
				</v-col> -->
			</v-row>
		</v-col>
		<v-col cols="12" class="px-0">
			<div class="frm-desc" v-if="product.description">
				<p class="bold mb-2">Description</p>
				<p v-html="product.description"></p>
			</div>

			<div class="frm-desc" v-if="product.ingredients">
				<p class="bold mb-2">Ingredients</p>
				<p v-html="product.ingredients"></p>
			</div>

			<div class="frm-desc" v-if="product.directions">
				<p class="bold mb-2">Directions</p>
				<p v-html="product.directions"></p>
			</div>
		</v-col>
	</v-row>
	<!-- <v-btn class="article-btn gradient--toRight px-0">
		Download Article
	</v-btn> -->
</v-container>
</template>
<script>
export default {
	computed: {
		product() {
			return this.$store.state.products.selected;
		}
	}
}
</script>
