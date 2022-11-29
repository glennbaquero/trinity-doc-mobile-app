<template>
    <!-- Filter View -->
    <v-navigation-drawer
    v-model="payout"
    fixed
    left
    class="online__consultationHolder"
    width="100%"
    touchless
    >
        <v-card class="online__consultationCol">
            <v-toolbar class="consultation__historyTitle type-shdw-gray py-3 frm-elevation">
                <v-btn icon dark @click="hide">
                    <v-icon class="back--icon">{{ 'fa-chevron-left' }}</v-icon>
                </v-btn>
                <v-toolbar-title>Payout Summary</v-toolbar-title>
            </v-toolbar>
        </v-card>
        <v-container class="pa-4">
            <v-layout row wrap mx-auto class="header__marginTop">
                <v-flex xs12>
                  <v-card class="py-5 px-7" style="padding-bottom: 20px">
                    <v-layout row wrap mx-auto>
                      <v-flex xs6 class="align-self-center">
                        <small>Total Earnings</small>
                        <p class="font-weight-bold mb-0">₱ {{ renderCredits }}</p>
                      </v-flex>
                      <v-flex xs6 class="text-right align-self-center">
                        <v-btn class="custom-btn filled-pr1 s-btn mx-auto text-small font-weight-bold" @click="trigRequestPayoutDialog()">Request Payout</v-btn>
                      </v-flex>
                    </v-layout>
                  </v-card>
                </v-flex>
            </v-layout>
            

            <v-layout row wrap mx-auto class="mt-5 mb-5">
              <v-tabs
                v-model="tab"
                background-color="transparent"
                color="#3A823E"
                grow
                class="ml-0"
              >
                <v-tab
                  key="tab1"
                  class="ml-0 bold pa-5"
                >
                  <small>Earnings</small>
                  
                </v-tab>
                <v-tab
                  key="tab2"
                  class="ml-0 bold pa-5"
                >
                  <small>Payout History</small>
                </v-tab>
              </v-tabs> 

            </v-layout>
          
            <v-tabs-items v-model="tab">          
              
              <v-tab-item
                key="tab1"
                color="transparent"
              >              
                <v-layout row wrap mx-auto class="transaction__historyTable pb-2 mb-3" v-for="earning in earnings">
                  <v-flex xs6>
                    <p class="mb-0">{{ earning.patient_name  }}</p>
                    <p class="clr-gray mb-0">{{ earning.date | human_readable }}</p>
                  </v-flex>
                  <v-flex xs6 class="text-right">
                    <p class="mb-0 font-weight-bold">₱ {{ currencyFormat(earning.fee) }}</p>
                  </v-flex>
                </v-layout>
                <template v-if="!earnings.length"> 
                  <v-layout row wrap mx-auto class="pb-2 mb-3">
                    <v-flex xs12 text-center>
                      <p class="clr-gray mb-0">No earnings history</p>
                    </v-flex>
                  </v-layout>
                </template>                
              </v-tab-item>
              <v-tab-item
                key="tab2"
                color="transparent"
              >              
                <v-layout row wrap mx-auto class="transaction__historyTable pb-2 mb-3" v-for="payout in payouts">
                  <v-flex xs6>
                    <p class="mb-0">Payout</p>
                    <p class="clr-gray mb-0">{{ payout.created_at | format_date }}</p>
                  </v-flex>
                  <v-flex xs6 class="text-right">
                    <p class="mb-0 font-weight-bold">{{ currencyFormat(payout.value) }} PHP</p>
                    <small :class="statusCheck(payout.approved_by, payout.declined_by, true)">{{ statusCheck(payout.approved_by, payout.declined_by, false) }}</small>
                  </v-flex>
                </v-layout>
                <template v-if="!payouts.length"> 
                  <v-layout row wrap mx-auto class="pb-2 mb-3">
                    <v-flex xs12 text-center>
                      <p class="clr-gray mb-0">No payout history</p>
                    </v-flex>
                  </v-layout>
                </template>                
              </v-tab-item>
            </v-tabs-items>

            <RequestPayoutDialog
            :credits="parseInt(credits)"
            :show="requestPayoutDialog" @submitted="fetchPayouts"></RequestPayoutDialog>
 
        </v-container>
        <Loader
        :loading="loading"
        ></Loader>
    </v-navigation-drawer>
</template>

<script>
import Loader from '@/components/Loader.vue';
import RequestPayoutDialog from '../Modals/RequestPayoutDialog.vue'

    export default {

        components: {
            Loader,
            RequestPayoutDialog,
        },

        data () {
          return {
            payout: false,
            requestPayoutDialog: false,

            credits: null,
            payouts: [],
            earnings: [],
            isClass: Boolean,
            loading: false,
            tab: null
          }
        },

        computed: {
          renderCredits() {
            if(this.credits) {
              let credits = this.credits;
              return credits.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            }

          }
        },

        methods: {

        /*
        |--------------------------------------------------------------------------
        | @Initialize
        |--------------------------------------------------------------------------
        */


        /*
        |--------------------------------------------------------------------------
        | @Methods
        |--------------------------------------------------------------------------
        */

        /**
         * Fetch Payouts
         * 
         */
         fetchPayouts() {
          this.setLoading();
          axios.post(this.routes['api.doctor.payouts.fetch'])
          .then((response) => {
            this.setLoading();
            this.credits = response.data.credits;
            this.payouts = response.data.payouts;
            this.earnings = response.data.earnings;
          }).catch((err) => {
            this.setLoading();
          });
         },

          trigRequestPayoutDialog() {
           this.requestPayoutDialog = this.requestPayoutDialog ? false: true;
          },

          /*Check status and class*/
          statusCheck($approved_by, $declined_by, $isClass) {
            if($approved_by) {
              if($isClass) {
                return 'status approved';
              }
              return 'Approved';
            } else if ($declined_by) {
              if($isClass) {
                return 'status disapproved';
              }
              return 'Declined';
            } else if ($isClass) {
              return 'status pending'
            }
            return 'Pending';
          },

            /**
           * Set loading status
           * 
           */
           setLoading() {
            // this.loading = this.loading ? false: true;
          },

          show() {
            this.payout = true;
            this.fetchPayouts();
          },

          hide() {
            this.payout = false;
          },
          currencyFormat(price) {
            return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
          }

        },

        filters: {
          format_date(date) {
            return moment(date).format('YYYY-MM-DD | h:mm A');
          },

          human_readable(date) {
            return moment(date).format('LL');
          }
        }

    }
</script>