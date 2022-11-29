<template>
    <!-- Filter View -->
    <v-navigation-drawer
    v-model="callView"
    fixed
    left
    class="chat__pageCon chat__details"
    width="100%"
    touchless
    >
        <v-card class="chat__headerCon frm-elevation">
            <v-toolbar class="py-2">
                <v-img :src="$PRXConfig().staticUrl('icons/video.svg')" class="chat--icon" max-width="40px" max-height="40px" width="40px" height="60px"></v-img>
                <vs-switch v-model="active1" class="video--switch">
                  <template #off>
                      <v-icon>{{ 'fa-video-slash' }}</v-icon>
                  </template>
                  <template #on>
                      <v-icon>{{ 'fa-video' }}</v-icon>                                                                              
                  </template>
                </vs-switch>

                <!-- <v-switch class="video--switch mb-0" v-model="switch1" label=""></v-switch> -->
            </v-toolbar>
        </v-card>
        <div class="chat__timeHolder text-center gradient--toRight">
            <p class="mb-0 clr-white font-weight-bold">00:00</p>
        </div>

        <v-layout row wrap mx-auto class="mt-12">
          <v-flex xs12 class="pt-8 text-center">
            <div class="call--imageHolder">
                <div class="call--bg mx-auto"></div>
                <v-img :src="$PRXConfig().staticUrl('medicine/biogesic.png')" class="call--profile mx-auto" max-width="130px" width="120px" height="120px"></v-img>
            </div>
          </v-flex>

          <v-flex xs12 class="text-center mt-5">
            <p class="font-weight-bold">Elizabeth is requesting for a call..</p>
          </v-flex>
        </v-layout>

        <v-layout row wrap mx-auto class="mt-10">
          <v-col 
            @click="updateStatus(request.id, 'declined')"
            cols="6" class="pa-0 text-center patienCard--buttonHolder">
                <v-btn class="mx-auto my-2 patientCard--button" small fab color="red">
                    <v-icon>{{ 'fa-times' }}</v-icon>
                </v-btn>

                <small>Decline</small>
            </v-col>
            <v-col 
            @click="updateStatus(request.id, 'accepted')"
            cols="6" class="pa-0 text-center patienCard--buttonHolder">
                <v-btn class="mx-auto my-2 patientCard--button" small fab color="green" @click="trigAcceptedCallView()">
                    <v-icon>{{ 'fa-check' }}</v-icon>
                </v-btn>

                <small class="text-small">Accept</small>
            </v-col>
        </v-layout>

        <AcceptedCallPage :show="acceptedCallView"></AcceptedCallPage>

        

    </v-navigation-drawer>
</template>

<script>
import AcceptedCallPage from './AcceptedCallPage.vue';
    export default {

        components: {
            AcceptedCallPage,
        },

        props: {
           show: Boolean
        },

        data () {
          return {
            callView: false,
            acceptedCallView: false,
          }
        },


         watch: {
           show(val) { 
              this.callView = val
           }
        },

        methods: {
          trigAcceptedCallView() {
           this.acceptedCallView = this.acceptedCallView ? false: true;
          },
        }

    }
</script>