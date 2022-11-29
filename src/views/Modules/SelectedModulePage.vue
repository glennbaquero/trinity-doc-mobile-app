<template>
	<v-container class="selected-module pa-0">
		<v-row class="no-gutters">
			<v-col cols="12" class="px-0 py-0">
				<v-img :src="article.full_image" class="mx-auto article-img" width="100%" height="200px"></v-img>
			</v-col>
		</v-row>
		<!--Frame 2 -->
		<v-row class="no-gutters pa-5 mt-3 pb-6">
			<v-col cols="12" class="px-0 mb-3">
				<h2 class="article-title color-pr2 bold"> {{article.title}}</h2>
			</v-col>
			<v-col cols="12" class="px-0">
				<div class="frm-desc">
					<p class="bold mb-2">Overview</p>
					<p v-html="article.overview"></p>
				</div>
			</v-col>
		</v-row>

		<template v-if="related_articles.length">
			<v-row class="no-gutters px-5 py-0 mt-3">

				<v-col cols="12">
					<div class="frm-desc">
						<p class="color-pr1 mb-0">Related Articles</p>
					</div>
				</v-col>
				
				<template v-for="article in related_articles">
					<v-card
						class="mx-auto mt-3 px-0 module-card elevation-3"
						width="100%"
						outlined
						@click="showRelatedArticles(article)"
					>
						<v-list-item two-line class="px-0">
							<v-list-item-avatar
								tile
								size="90"
								class="ma-0 mr-4"
							>
								<img class="mx-auto module-img" :src="article.full_image" width="100%" height="100%" alt="">
								<!-- <v-img :src="article.full_image" class="mx-auto module-img" width="100px" height="100%"></v-img> -->
							</v-list-item-avatar>
							<v-list-item-content class="pr-4 pt-0">
								<v-list-item-title class="module-title mb-1 bold color-pr1">{{ article.title }}</v-list-item-title>
								<v-list-item-subtitle class="module-desc mt-2" v-html="article.short_overview"></v-list-item-subtitle>
							</v-list-item-content>
						</v-list-item>	
					</v-card>
				</template>
			</v-row>
		</template>

		<v-row class="no-gutters pa-5 mb-5 pb-12 mb-10">
			<!-- Comment Card -->
			<comment :comments="comments"></comment>

			<!-- End loop for Reply card -->
			<button style="padding: 17px 36px;" class="custom-btn lg-btn filled-pr1" @click="showAddComment">Write a Comment</button>

			<v-row class="comment-textfield no-gutters pa-5 mt-3 ma-0" v-if="showAddCommentTextField">
				<v-col cols="12">
					<p class="font-weight-bold">Write a Comment</p>
				</v-col>
				
				<v-col cols="8">
					<form action="">
						<v-text-field
							v-validate="'required'"
							type="text"
							outlined
							name="email"
							placeholder="Write comment"
							v-model="comment"
						></v-text-field>	
					</form>
				</v-col>
				<v-col cols="4">
					<div class="rows inlineBlock-parent">
						<div class="col--2">
							<v-btn class="custom-btn ml-3" width="10" color="#ffffff00" dark @click="showAddCommentTextField = false">
		                		<i class="fas fa-times"></i>
		            		</v-btn>	
						</div
						><div class="col--2">
							<v-btn class="custom-btn ml-3" width="10" color="#ffffff00" dark @click="addComment">
		                		<i class="fas fa-paper-plane"></i>
		            		</v-btn>	
						</div>
					</div>
				</v-col>

			</v-row>


		</v-row>


		<v-btn @click="modal= true" class="article-btn px-0">
			Request Full Version
		</v-btn>
		<!-- Modal -->
		<v-dialog
			v-model="modal"
			max-width="90%">
			<v-card class="module-modal py-5">
				<v-row class="px-5 mx-auto">
					<v-col cols="12" class="pa-0 pb-2">
						<v-list-item two-line class="px-0">
							<v-list-item-avatar
							size="44"
							class="ma-0 mr-4"
							>
								<v-img :src="$PRXConfig().staticUrl('/icons/prompt.svg')" class="mx-auto patient-img"></v-img>
							</v-list-item-avatar>
							<v-list-item-content two-lines class="px-0 py-5">
								<div class="frm-desc">
									<p class="mb-0">Click proceed to confirm request.</p>
								</div>
							</v-list-item-content>
						</v-list-item>
					</v-col>
					<v-col cols="12" class="pa-0 text-center pb-2">
						<v-btn min-width="121px" class="custom-btn s-btn filled-pr1" @click.prevent="download()"><v-icon left>fa-check</v-icon>Proceed</v-btn>
					</v-col>
					<v-col cols="12" class="pa-0 text-center">
						<v-btn min-width="121px" class="custom-btn s-btn filled-gray" @click="modal = false"><v-icon left>fa-times</v-icon>Cancel</v-btn>
					</v-col>
				</v-row>
			</v-card>
		</v-dialog>
	<!-- Success Modal -->
	<v-dialog
		v-model="smodal"
		width="90%">
		<v-card class="success-modal py-6">
			<v-row class="px-5 mx-auto">
				<v-col cols="12" class="pa-0 text-center">
					<v-img :src="$PRXConfig().staticUrl('/icons/Check.svg')" class="mx-auto success-icon" width="44px" height="44px"></v-img>
					<h1 class="frm-title my-5 mb-0">Success!</h1>
					<div class="frm-desc my-3">
						<p class="mb-0 mx-auto success-text">Please check your email to view the full version.</p>
						<p class="mb-0">Thank you.</p>
					</div>
				</v-col>
				<v-col cols="12" class="pa-0 text-center">
					<v-btn min-width="121" class="custom-btn s-btn filled-pr2" @click.prevent="smodal = false"><v-icon left>fa-check</v-icon>Done</v-btn>
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
				Processing request
				<v-progress-linear
					indeterminate
					color="white"
					class="mb-0"
				></v-progress-linear>
			</v-card-text>
		</v-card>
	</v-dialog>
	<Dialog 
		:item="item"
		:show="successDialog" 
		@close="successDialog = false"
	></Dialog>
</v-container>
</template>

<script>
	import Dialog from '@/components/Dialog';
	import Comment from './Comment.vue';
	export default {

		watch: {
			selectedId() {
				this.getArticleData();
			},
		},

		data: () => ({
			modal: false,
			smodal: false,
			dialog: false,
			successDialog: false,
			showAddCommentTextField: false,
			comment: null,
			item: {},
			comments: [],
			related_articles: [],
			selectedId: null,
		}),

	

		computed: {
			article() {
				return this.$store.state.articles.selected;
			},	
		},

		components : { Comment, Dialog },

		mounted() {

	      	window.scrollTo(0,0);
			this.getArticleData();
			this.selectedId = this.article.id;

		},

		methods: {

			showRelatedArticles(article){

				this.$store.commit('articles/show', article);
				this.selectedId = article.id;

			  	window.scrollTo(0,0);
			  
			},

			download() {

				this.modal = false;
				this.dialog = true;

				axios.post(this.routes['api.doctor.articles.download'], {article: this.article.id})
				.then(response => {
					this.dialog = false;
					this.smodal = true;
				})
				.catch(error => {
					this.dialog = false;
					this.$PRX.alert.error('Something went wrong...', 'Ooops', 'options');
				})

			},

			getArticleData() {
				
				var data = {
					id: this.article.id
				}

				axios.post(this.routes['api.doctor.articles.comments.fetch'], data)
				.then(response => {
					this.comments = response.data.comments;
					this.related_articles = response.data.related_articles;
				})
			},

			showAddComment() {

				this.showAddCommentTextField = !this.showAddCommentTextField;
				
			},

			addComment() {
				var data = {
				  id: this.article.id,
				  comment: this.comment
				};

				axios.post(this.routes['api.doctor.articles.store'], data)
				  .then(response => {
				    // this.item.message = 'Your comment is for approval. Thank you!'
				    // this.item.title = 'For Approval'
				    // this.successDialog = true;
				    this.comment = null;
				    this.showAddCommentTextField = false;
				    this.getArticleData();
				  })
			}
		}
	}
</script>
