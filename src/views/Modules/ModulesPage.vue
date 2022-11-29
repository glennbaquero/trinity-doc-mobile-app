<template>
<v-container class="pa-5 modules-holder">
<v-row class="no-gutters pt-3">
<v-col cols="12" class="px-0">
<v-text-field
	solo
	v-model="search"
	label="Search"
	append-icon="fa-search"
	class=""
></v-text-field>
</v-col>
</v-row>
<!-- Frame 2 -->
<v-row class="no-gutters">
	<v-col cols="12 px-0 mb-2">
		<p class="sec-title color-pr2">Articles</p>
	</v-col>
	<!-- <v-col cols="6 px-0 mb-2" class="text-right">
		 <v-btn class="ml-auto mr-0 custom-btn filled-orange" min-height="40" @click.prevent="sort()">
			<i class="fas fa-list left mr-2"></i>Sort by name
		</v-btn>
	</v-col> -->
</v-row>
<v-row class="no-gutters pb-12">
	<!-- Module Cards -->
	<v-col v-for="(article, key) in articles" :key="key" cols="12" class="px-0 py-1">
		<v-row class="no-gutters">
			<v-card
				class="mx-auto px-0 module-card elevation-3"
				width="100%"
				outlined
				@click.prevent="show(article)"
			>
				<v-list-item two-line class="px-0">
					<v-list-item-avatar
						tile
						size="130"
						class="ma-0 mr-4"
					>
						<v-img :src="article.full_image" class="mx-auto module-img" width="100px" height="100%"></v-img>
					</v-list-item-avatar>
					<v-list-item-content class="pr-4">
						<v-list-item-title class="module-title mb-1 bold">{{article.title}}</v-list-item-title>
						<v-list-item-subtitle class="module-desc mt-2" v-html="article.overview"></v-list-item-subtitle>
					</v-list-item-content>
				</v-list-item>
			</v-card>
		</v-row>
	</v-col>
	<v-col cols="12" class="text-center products-card__holder">
		<infinite-loading spinner="waveDots" :identifier="infiniteId" @infinite="infiniteHandler" ref="infiniteLoading">
			<div slot="no-more"></div>
			<div slot="no-results" v-if="articles == 0">No records found</div>
		</infinite-loading>
	</v-col>
	<!--End on Modules Card -->
</v-row>
<!-- Filter View -->
<!-- <v-navigation-drawer
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
	<v-list-item>
		<v-row class="pa-5">
			<p class="mt-3 bold color-pr2">Select Articles</p>
				<v-col cols="11" class="py-0 px-0">
					<div class="frm-desc">
						<p class="mt-0 mb-0">Conventions</p>
					</div>
				</v-col>
				<v-col cols="1" class="pa-0 text-right">
					<v-checkbox class="mt-2 ml-auto mr-0" color="#74C946" height="0" v-model="selected" value="Conventions"></v-checkbox>
				</v-col>
				<v-col cols="11" class="py-0 px-0">
					<div class="frm-desc">
						<p class="mt-0 mb-0">Dining</p>
					</div>
				</v-col>
				<v-col cols="1" class="pa-0 text-right">
					<v-checkbox class="mt-2 ml-auto mr-0" color="#74C946" height="0" v-model="selected" value="Dining"></v-checkbox>
				</v-col>
				<v-col cols="11" class="py-0 px-0">
					<div class="frm-desc">
						<p class="mt-0 mb-0">Entertainment</p>
					</div>
				</v-col>
				<v-col cols="1" class="pa-0 text-right">
					<v-checkbox class="mt-2 ml-auto mr-0" color="#74C946" height="0" v-model="selected" value="Dining"></v-checkbox>
				</v-col>
				<v-col cols="11" class="py-0 px-0">
					<div class="frm-desc">
						<p class="mt-0 mb-0">Gas</p>
					</div>
				</v-col>
				<v-col cols="1" class="pa-0 text-right">
					<v-checkbox class="mt-2 ml-auto mr-0" color="#74C946" height="0" v-model="selected" value="Gas"></v-checkbox>
				</v-col>
				<v-col cols="11" class="py-0 px-0">
					<div class="frm-desc">
						<p class="mt-0 mb-0">Gift Certificate</p>
					</div>
				</v-col>
				<v-col cols="1" class="pa-0 text-right">
					<v-checkbox class="mt-2 ml-auto mr-0" color="#74C946" height="0" v-model="selected" value="Gift Certicate"></v-checkbox>
				</v-col>
				<v-col cols="11" class="py-0 px-0">
					<div class="frm-desc">
						<p class="mt-0 mb-0">Others</p>
					</div>
				</v-col>
				<v-col cols="1" class="pa-0 text-right">
					<v-checkbox class="mt-2 ml-auto mr-0" color="#74C946" height="0" v-model="selected" value="Others"></v-checkbox>
				</v-col>
				<v-col cols="12" class="px-0 mt-5">
					<v-btn class="custom-btn lg-btn filled-this.init();pr2 lh-btn">Display Result</v-btn>
				</v-col>
		</v-row>
	</v-list-item>
</v-navigation-drawer> -->
</v-container>
</template>

<script>
import _ from 'lodash'; 

export default {
	data: () => ({
		drawer: null,
		search: '',
		infiniteId: +new Date(),
		sorting: 'asc',
		article_count: null,
	}),
	
	computed: {
		articles() {
			return this.$store.state.articles.items;
		},

		page() {
			return this.$store.state.articles.page;
		},
	},

	watch: {
		search() {
			this.searchOperation();
		},

		sorting() {
			this.searchOperation();
		}
	},

	mounted(){

	},

	methods: {


		searchOperation: _.debounce(function() {
			this.$store.commit('articles/reset');
			this.infiniteId += 1; // This will trigger inifinit handler
		}, 500),

		infiniteHandler($state) {
			axios.get(this.routes['api.doctor.articles'], { params: {page: this.page, search: this.search, sort: this.sorting} })
				.then(({data}) => {
					var response = data.data;
					if(response.data.length) {
						console.log(response.data);
						setTimeout(() => {
							this.article_count  = response.data.length;
							
							this.$store.commit('articles/pageIncrement', 1);
							this.$store.commit('articles/append', response.data);
							$state.loaded();
						}, 500);
					} else {
						$state.complete();
					}
				});
		},

		show(article) {
			this.$store.commit('articles/show', article);
			this.$PRXRouter().goTo('selected-module');
		},

		sort() {
			let sort = this.sorting == 'asc' ? 'desc' : 'asc';

			this.sorting = sort;
		}
	}
}
</script>
