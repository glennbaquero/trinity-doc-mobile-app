<template>
    <!-- Filter View -->
    <v-navigation-drawer
    v-model="chatDetails"
    fixed
    left
    class="chat__pageCon chat__details"
    width="100%"
    touchless
    >
        <v-card class="chat__headerCon frm-elevation">
            <v-toolbar class="py-4">
                <v-btn icon dark @click="chatDetails = false">
                    <v-icon class="back--icon">{{ 'fa-chevron-left' }}</v-icon>
                </v-btn>
                <v-img :src="$PRXConfig().staticUrl('icons/patient.svg')" class="mr-7 chat__profileImg" max-width="45px" width="45px" height="45px"></v-img>
                <v-toolbar-title class="font-weight-bold">Dr. Jane Doe</v-toolbar-title>
            </v-toolbar>
        </v-card>

        <v-layout row wrap mx-auto class="chat__convoHolder mt-5">
          <!-- Receiver -->
          <v-flex xs12 class="pa-5">
            <v-layout row wrap mx-auto>
              <v-flex xs2>
                <v-img :src="$PRXConfig().staticUrl('images/profile.jpeg')" class="mr-7 chat__profileImg" max-width="45px" width="45px" height="45px"></v-img>
              </v-flex>
              <v-flex xs10>
                <div class="receiver__contentHolder frm-elevation py-3">
                  <div class="receiver__content">
                    <small class="font-weight-normal">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</small>
                  </div>
                </div>
              </v-flex>
            </v-layout>
          </v-flex>
          <!-- Sender -->
          <v-flex xs12 class="pa-5">
            <v-layout row wrap mx-auto>
              <v-flex xs2>
              
              </v-flex>
              <v-flex xs10>
                <div class="sender__contentHolder frm-elevation py-3">
                  <div class="sender__content">
                    <small class="font-weight-normal">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</small>
                  </div>
                </div>
              </v-flex>
            </v-layout>
          </v-flex>

          <!-- Sender -->
          <v-flex xs12 class="pa-5">
            <v-layout row wrap mx-auto>
              <v-flex xs2>
              
              </v-flex>
              <v-flex xs10>
                <div class="sender__contentHolder frm-elevation py-3">
                  <div class="sender__content">
                    <small class="font-weight-normal">My Health Record:</small>
                    <small class="font-weight-normal"><span class="font-weight-bold">Height:</span> 6'11 ft</small>
                    <small class="font-weight-normal"><span class="font-weight-bold">Weight:</span> 99 lbs</small>
                    <small class="font-weight-normal"><span class="font-weight-bold">Other Conditions:</span> Arrhythmia</small>
                  </div>
                </div>
              </v-flex>
            </v-layout>
          </v-flex>

          <!-- Sender -->
          <v-flex xs12 class="pa-5">
            <v-layout row wrap mx-auto>
              <v-flex xs2>
              
              </v-flex>
              <v-flex xs10>
                <div class="sender__contentHolder frm-elevation py-3">
                  <div class="sender__content">
                    <v-img :src="$PRXConfig().staticUrl('medicine/biogesic.png')" class="" max-width="100%" width="100%" height="auto"></v-img>
                  </div>
                </div>
              </v-flex>
            </v-layout>
          </v-flex>


          <!-- Medical Information -->
          <v-flex xs12 class="pa-5 frm-elevation">
            <MedicalInformation></MedicalInformation>

            <v-layout row wrap mx-auto>
              <v-flex xs12 class="mt-3">
                <div class="presc__drNameHolder text-center">
                  <p class="mb-0 font-weight bold type-black">Dr.Jane Doe</p>
                  <small class="font-weight-normal">Cardiologist</small>
                  <small class="font-weight-normal">License No. 0707476</small>
                </div>
              </v-flex>

              <v-flex xs12 class="text-center pt-8">
                 <v-btn
                    class="custom-btn filled-pr1 s-btn mx-auto text-small"
                    @click="trigPrescriptionPage()"
                  >
                    Download and Save RX
                  </v-btn>
              </v-flex>
            </v-layout>            
          </v-flex>

          <v-flex xs12 class="pa-5">
            <v-layout row wrap mx-auto>
              <v-flex xs2>
              
              </v-flex>
              <v-flex xs10>
                <div class="sender__contentHolder frm-elevation py-3">
                  <div class="sender__content">
                    <small class="font-weight-normal">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</small>
                  </div>
                </div>
              </v-flex>
            </v-layout>
          </v-flex>

        </v-layout>

        <div class="chat__detailsFooter py-3">
          <div class="chat__detailsInner text-center">
            <small class="font-weight-normal clr-white">This consultation has ended. You can't reply to this conversation. This is already an archived message.</small>
          </div>
        </div>

    </v-navigation-drawer>
</template>

<script>
import MedicalInformation from './MedicalInformation.vue';
    export default {

        components: {
            MedicalInformation,
        },

        props: {
           show: Boolean
        },

        data () {
          return {
            chatDetails: false,
          }
        },


         watch: {
           show(val) { 
              this.chatDetails = val
           }
        },

        methods: {
          // trigPersonalInfoDialog() {
          //  this.personalInfoDialog = this.personalInfoDialog ? false: true;
          // },
        }

    }
</script>