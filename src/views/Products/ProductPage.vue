<template>
<v-container class="pa-5 product-holder">
<v-row class="no-gutters pt-3">
<v-col cols="12" class="px-0">
<v-text-field
	solo
	v-model="search"
	label="Search"
	placeholder="Type your keyword here"
	append-icon="fa-search"
	class=""
></v-text-field>
</v-col>
</v-row>
<!-- Frame 2 -->
<v-row class="no-gutters mb-3">
	<v-col cols="6" class="px-0">
		<p class="sec-title color-pr2">Products</p>
	</v-col>
	<v-col cols="6" class="px-0 text-right filtering">
			<!-- <v-btn class="ml-auto mr-0 custom-btn filled-orange" min-height="40" @click.prevent="sort()">
				<i class="fas fa-list left mr-2"></i>Sort by price
			</v-btn> -->
			<div class="filter--holder">
		    <v-menu offset-y class="menu--holder">
		      <template v-slot:activator="{ on }">
		        <v-btn
		          class="ml-auto mr-0 custom-btn filled-orange" min-height="40" 
		          v-on="on"
		        >
		          <i class="fas fa-list left mr-2"></i>Sort by {{ sortName }}
		        </v-btn>
		      </template>
		      <v-list
				class="menu--holder"
		      >
		        <v-list-item class="drop--menu" @click="sort(1, 'Price')">
		          <v-list-item-title>Price</v-list-item-title>
		        </v-list-item>
		        <v-list-item class="drop--menu" @click="sort(2, 'Points')">
		          <v-list-item-title>Points</v-list-item-title>
		        </v-list-item>
		        <v-list-item class="drop--menu" @click="sort(3, 'Name')">
		          <v-list-item-title>Name</v-list-item-title>
		        </v-list-item>
		      </v-list>
		    </v-menu>
  			</div>
	</v-col>
</v-row>
<!-- Product Cards -->
<v-row class="no-gutters pb-12 products-holder">
	<v-col v-for="(product, key) in products" :key="key" cols="6" class="text-center products-card__holder">
		<v-card
			width="95%"
			height="215"
			max-height="215"
			class="mr-2 mb-3 elevation-2 products-card py-5"
		>
			<v-row class="product-card-inner-holder no-gutters mx-0">
				<v-col cols="12" class="pa-0">
					<v-img :src="product.full_image" class="mx-auto product-img" width="100px" height="100px"></v-img>

					<p class="bold mt-5 mb-2 product-card-name clr-gray">{{product.brand_name}}</p>

					<v-btn class="custom-btn filled-pr1 s-btn mx-auto" @click.prevent="show(product)" min-width="121px">View</v-btn>

					<!-- <v-btn class="custom-btn filled-pr2 s-btn" @click.prevent="show(product)">
						View
					</v-btn> -->
				</v-col>
			</v-row>
		</v-card>
	</v-col>
	<v-col cols="12" class="text-center products-card__holder">
		<infinite-loading spinner="waveDots" :identifier="infiniteId" @infinite="infiniteHandler" ref="infiniteLoading">
			<div slot="no-more"></div>
			<div slot="no-results">No records found</div>
		</infinite-loading>
	</v-col>
	
</v-row>
<!-- Filter View -->
<v-navigation-drawer
	v-model="drawer"
	fixed
	temporary
	class="filter-view"
	width="100%"
>
	<v-list-item class="py-7 px-5 filter-header">
		<i class="fas fa-chevron-left" @click.stop="drawer = !drawer"></i>
	</v-list-item>
	<v-divider></v-divider>
</v-navigation-drawer>
</v-container>
</template>

<script>
import _ from 'lodash'; 

export default {
	data: () => ({
		drawer: null,
		search: '',
		infiniteId: +new Date(),

		products: [],
		page: 1,
		sortId: 1,
		sortName: null

	}),

	computed: {
		// products() {
		// 	return this.$store.state.products.items;
		// },

		// page() {
		// 	return this.$store.state.products.page;
		// }
	},

	watch: {
		search() {
			this.searchOperation();
		}
	},

	methods: {

		sort(id, name) {
			this.sortName = name;
			this.sortId = id;
			this.searchOperation();
		},

		searchOperation: _.debounce(function() {
			this.page = 1;
			this.products = [];
			this.infiniteId += 1; // This will trigger inifinit handler
		}, 500),

		infiniteHandler($state) {
			axios.get(this.routes['api.doctor.linked.products'], { params: {page: this.page, search: this.search, sort: this.sortId} })
				.then(({data}) => {
					var response = data.data;
					if(response.data.length) {
						this.products.push(...response.data);
						this.page += 1;

						$state.loaded();
					} else {
						$state.complete();
					}
				});
		},

		show(product) {
			this.$store.commit('products/show', product);
			this.$PRXRouter().goTo('selected-products');
		},

	},
}
</script>
