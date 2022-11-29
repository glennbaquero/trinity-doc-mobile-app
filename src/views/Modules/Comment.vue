<template>
	<div>
		<template v-for="(comment, key) in comments">
			<v-card class="comment-card py-2 mb-5 mt-5" >
				<v-row class="px-5 mx-auto">
					<v-col cols="12" class="px-0 py-2">
						<v-list-item two-line class="px-0">
							<v-list-item-avatar
							tile
							size="55"
							class="ma-0 mr-6"
							>
							<v-img :src="comment.image_path" class="mx-auto comment-img" width="180px" height="100%"></v-img>
						</v-list-item-avatar>
						<v-list-item-content two-lines class="px-0 py-0">
							<div class="frm-desc">
								<p class="mb-5 bold color-pr1 comment-card-name">{{ comment.user_name }}</p>
							</div>
						</v-list-item-content>
					</v-list-item>
				</v-col>
				<v-col cols="3" class="pa-0">

				</v-col>
				<v-col cols="9" class="pa-0">
					<div class="frm-desc">
						<p v-html="comment.comment"></p>
					</div>
					<div class="frm-desc inlineBlock-parent" @click="viewReply(key)">
						<small>{{ comment.date }}</small>	<p class="ml-12 mb-0 repy-link bold color-pr1">View all</p>
					</div>
				</v-col>
			</v-row>
			<i class="fas fa-ellipsis-h card-dots"></i>
			</v-card>
			<!-- Reply Card -->
			<reply v-if="replyShow == key" :comment="comment" :reply-show="true"></reply>
		</template>
	</div>
</template>

<script>
	import Reply from './Reply.vue';

	export default {
		props : {
			comments: {
				type: Array,
				default: [],
			},
		},

		data() {
			return {
				replyShow: false,
				replies: []
			}
		},

		components: { Reply },

		methods: {
			viewReply(key) {
				if(this.replyShow === key) {
					this.replyShow = null;
				} else {
					this.replyShow = key;
				}
			}
		}
	}
</script>