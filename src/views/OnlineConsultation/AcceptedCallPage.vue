<template>
    <!-- Filter View -->
    <v-navigation-drawer
    v-model="acceptcallView"
    fixed
    left
    class="chat__pageCon chat__details acceptCall__Holder"
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

                <!-- <v-switch class="video--switch mb-0" label=""></v-switch> -->
            </v-toolbar>
        </v-card>
        <div class="chat__timeHolder text-center gradient--toRight">
            <p class="mb-0 clr-white font-weight-bold">00:00</p>
        </div>

        <!-- <div class="acceptCall__Holder"> -->
          <!-- <v-layout row wrap mx-auto class="mt-12">
            <v-flex xs12 class="pt-8 text-center">
              <v-img :src="$PRXConfig().staticUrl('medicine/biogesic.png')" class="acceptcall--profile mx-auto" max-width="130px" width="120px" height="120px"></v-img>
            </v-flex>

            <v-flex xs12 class="text-center mt-5">
              <p class="font-weight-bold clr-white mb-0">Elizabeth Uy</p>
              <small class="clr-white">On Call</small>
            </v-flex>
          </v-layout> -->

          <v-layout row wrap mx-auto>
            <v-flex xs12 class="videoHolder">
              
            </v-flex>
            <v-flex xs12 class="videoHolder">
              
            </v-flex>
          </v-layout>

          <v-layout row wrap mx-auto class="px-5 call__buttonHolder pb-8">
            <v-col 
              @click="updateStatus(request.id, 'declined')"
              cols="6" class="pa-0 text-center patienCard--buttonHolder">
                  <v-btn class="mr-5 ml-auto my-2 patientCard--button" small fab style="background-color: rgba(255,255,255,0.5) !important;">
                      <v-icon>{{ 'fa-microphone' }}</v-icon>
                  </v-btn>
              </v-col>
              <v-col 
              @click="updateStatus(request.id, 'accepted')"
              cols="6" class="pa-0 text-center patienCard--buttonHolder">
                  <v-btn class="ml-5 mr-auto my-2 patientCard--button" small fab color="red">
                      <v-icon>{{ 'fa-phone' }}</v-icon>
                  </v-btn>
              </v-col>
              <v-layout row wrap mx-auto class="mt-5">
                <v-flex xs12 class="px-5">
                   <v-btn
                      class="custom-btn filled-pr1 lg-btn mx-auto text-small"
                      @click="trigCreatePrescription()"
                      >
                      RX
                  </v-btn>
                </v-flex>
              </v-layout>
          </v-layout>
        <!-- </div> -->


    </v-navigation-drawer>
</template>

<script>
// import Vuesax from 'vuesax'
// Vue.use(vsSwitch)
// import MedicalInformation from './MedicalInformation.vue';
    export default {

        // components: {
        //     MedicalInformation,
        // },

        props: {
           show: Boolean
        },

        data () {
          return {
            acceptcallView: false,
            active1: false,
          }
        },


         watch: {
           show(val) { 
              this.acceptcallView = val
           }
        },

        methods: {
          // trigPersonalInfoDialog() {
          //  this.personalInfoDialog = this.personalInfoDialog ? false: true;
          // },
        }

    }
</script>