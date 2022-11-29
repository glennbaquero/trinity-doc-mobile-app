<template>
  <v-row justify="center">
    <v-dialog
      v-model="chatRequest"
      width="290"
    >
      <v-card class="health__dialogCon pt-3 pb-5">
        <!-- <v-icon class="close--dialog" @click="bookingRequest = false">{{ 'fa-times' }}</v-icon> -->
        <v-layout row wrap mx-auto class="py-5 px-7">
          <v-flex xs12 class="text-center  align-self-center px-7">
            <p class="mb-1 font-weight-bold type-black">Requesting chat to Elizabeth Uy...</p> 
          </v-flex>
        </v-layout>

        <v-layout row wrap mx-auto class="px-7 pt-3">
          <v-flex xs12 class="text-center">
            <v-btn
              class="custom-btn filled-pr1 s-btn mx-auto text-small"
              @click="trigCallPageView()"
            >
            Cancel
            </v-btn>
          </v-flex>
        </v-layout>

        <CallPage :show="callPageView"> </CallPage>
        <!-- <ChatPage :show="chatView"></ChatPage> -->
      </v-card>
    </v-dialog>
  </v-row>
</template>


<script>
import CallPage from '../CallPage.vue';
// import ChatPage from '../ChatPage.vue';

  export default {
    components: {
      CallPage,
    },

    props: {
       show: Boolean 
    },

    data () {
      return {
        chatRequest: false,
        chatView: false,
        callPageView: false
      }
    },

    methods: {
      trigChatView() {
       this.chatView = this.chatView ? false: true;
      },

      trigCallPageView() {
       this.callPageView = this.callPageView ? false: true;
      },
    },

     watch: {
       show(val) { 
          this.chatRequest = val
       }
    }, 
  }
</script>