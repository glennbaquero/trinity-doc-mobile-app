<template>
	<div>
		<v-card class="reply-card py-2 ma-0" v-for="reply in comment.replies">
			<v-row class="px-8 mx-auto">
				<v-col cols="12" class="px-0 py-2">
					<v-list-item two-line class="px-0">
						<v-list-item-avatar
						tile
						size="45"
						class="ma-0 mr-6"
						>
						<v-img :src="reply.user.full_image" class="mx-auto reply-img" width="180px" height="100%"></v-img>
					</v-list-item-avatar>
					<v-list-item-content two-lines class="px-0 py-0">
						<div class="frm-desc">
							<p class="mb-5 bold color-pr1 comment-card-name">{{ reply.user.fullname }}</p>
						</div>
					</v-list-item-content>
				</v-list-item>
				</v-col>
				<v-col cols="3" class="pa-0">

				</v-col>
				<v-col cols="9" class="pa-0">
					<div class="frm-desc">
						<p v-html="reply.content"></p>
					</div>
					<div class="frm-desc inlineBlock-parent">
						<small>{{ reply.created_at }}</small>
					</div>
				</v-col>
			</v-row>
			<i class="fas fa-ellipsis-h card-dots"></i>
		</v-card>

		<v-row class="comment-textfield no-gutters pa-5 mt-3 ma-0" v-show="replyShow">
			<v-col cols="8">
				<form action="">
					<v-text-field
						v-validate="'required'"
						type="text"
						outlined
						name="email"
						placeholder="Write reply"
						v-model="reply"
					></v-text-field>	
				</form>
			</v-col>
			<v-col cols="4">
				<div class="rows inlineBlock-parent">
					<div class="col--2">
						<v-btn class="custom-btn ml-3" width="10" color="#ffffff00" dark @click="replyShow = false">
	                		<i class="fas fa-times"></i>
	            		</v-btn>	
					</div
					><div class="col--2">
						<v-btn class="custom-btn ml-3" width="10" color="#ffffff00" dark @click="addReply">
	                		<i class="fas fa-paper-plane"></i>
	            		</v-btn>	
					</div>
				</div>

			</v-col>
		</v-row>
		<Dialog 
			:item="item"
			:show="successDialog" 
			@close="successDialog = false"
		></Dialog>
	</div>
</template>
<script>
	import Dialog from '@/components/Dialog';
	export default{
		props: {
			comment: Array,
			replyShow: Boolean
		},

		data() {
			return {
				reply: null,
				successDialog: false,
				showReplyTextField: true,
				item: {},
			}
		},

		components : { Dialog },

		methods : {
			addReply() {
				var data = {
				  	reply: this.reply,
				  	id: this.comment.id
				};

				axios.post(this.routes['api.doctor.replies.store'], data)
				  .then(response => {
				    // this.item.message = 'Your reply is for approval. Thank you!'
				    // this.item.title = 'For Approval'
				    this.showReply = false;
				    // this.successDialog = true;
				    this.reply = null;
				  })
			}
		}
	}
</script>