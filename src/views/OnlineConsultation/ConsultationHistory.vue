<template>
  <v-row justify="center">
  <v-dialog v-model="history" fullscreen hide-overlay transition="dialog-right-transition">
    <v-card class="consultation__historyCon">
      <v-toolbar class="consultation__historyTitle type-shdw-gray py-3 frm-elevation rounded-0" style="border-radius: 0 !important;">
        <v-btn icon dark @click="hide()" style="color: #000">
          <v-icon class="back--icon">{{ 'fa-chevron-left' }}</v-icon>
        </v-btn>
        <v-toolbar-title>Consultation History</v-toolbar-title>
      </v-toolbar>
     
     <v-container coloumn pa-4>
      <v-layout row wrap mx-auto>
        <v-flex xs12>
          <template v-for="consultation in consultation_history">
            <v-card class="consultation__historyCard" @click="openAction(consultation)">
              <v-layout class="pa-5">
                <v-flex xs8>
                  <p class="mb-0">{{ consultation.patient_name }}</p>
                  <span class="clr-black">{{ renderDate(consultation.date) }}</span>
                  <span class="clr-black">{{ renderTime(consultation.start_time, consultation.end_time) }}</span>
                </v-flex>
                <v-flex xs4 class="align-self-center">
                  <span class="status">{{ consultation.status }}</span>
                  <template v-if="consultation.status == 'Approved'">
                    <span class="status">{{ renderTimeLeft(consultation.type, consultation.date, consultation.start_time, consultation.end_time, consultation.remaining).status }}</span>
                  </template>
                </v-flex>

              </v-layout>
            </v-card>
          </template>
        </v-flex>
          <template v-if="!consultation_history.length">
            <v-flex xs12 text-center>
              <p class="general__text color-gray"><b>No consultation history</b></p>
            </v-flex>
          </template>
      </v-layout>
    </v-container>
  </v-card>

    <ChooseActionDialog 
    @show-chat="openChatPage"
    ref="action-dialog" :consultation="selectedConsultation"></ChooseActionDialog>

    <Loader
    :loading="loading"
    ></Loader>

  </v-dialog>
</v-row>
</template>


<script>

import Loader from '@/components/Loader';
import ChooseActionDialog from './Modals/ChooseActionDialog.vue';
import AcceptedCallPage from './AcceptedCallPage.vue';
import CallPage from './CallPage.vue';

  export default {
    components: {
      Loader,
      ChooseActionDialog,
      AcceptedCallPage,
      CallPage,
    },

    data () {
      return {
        history: true,
        chooseAction: false,
        consultation_history: [],
        acceptCallView: false,
        selectedConsultation: {},


        loading: false,
      }
    },

    mounted() {
      this.init();
    },

    methods: {
      /*
      |--------------------------------------------------------------------------
      | @Initialize
      |--------------------------------------------------------------------------
      */
      init() {
        this.fetchConsultations();
      },

      /*
      |--------------------------------------------------------------------------
      | @Methods
      |--------------------------------------------------------------------------
      */

      /**
       * Fetch consultation history
       * 
       */
       fetchConsultations() {

        this.setLoading(true);
        axios.post(this.routes['api.doctor.consultations.fetch.consultation.history'])
        .then((response) => {
          this.setLoading(false);
          this.consultation_history = response.data.consultation_history;
        }).catch((err) => {
          this.setLoading(false);
        });
       },

      trigActionDialog() {
       this.chooseAction = this.chooseAction ? false: true;
      },

      setLoading(status) {
        this.loading = status;
      },

      hide() {
        this.$PRXRouter().goBack();        
      },

      openAction(consultation) {
        if (consultation.status != 'Disapproved' && consultation.status != 'Cancelled') {
          this.selectedConsultation = consultation;
          if(consultation.status == "Completed" || consultation.status == "Approved") {
            this.$refs['action-dialog'].show();
          }
          if(this.renderTimeLeft(consultation.type, consultation.date, consultation.start_time, consultation.end_time, consultation.remaining).action) {
            this.$refs['action-dialog'].show();            
          }
        }

      },

      openChatPage() { 
        this.$store.commit('onlineConsultation/setConsultation', this.selectedConsultation);
        this.$PRXRouter().goTo('chats');
      },

      /*
      |--------------------------------------------------------------------------
      | @Renders
      |--------------------------------------------------------------------------
      */

      /**
       * Render time left
       * 
       * @param  date date
       * @param  time time
       */
      renderTimeLeft(type, date, start, end, remaining) {
        if(type === 0) {
          if(end) {
            let end = moment(moment(date).format('Y-MM-DD') +' '+ start),
            now = moment();
            let duration = end.diff(now, 'minutes');

            if(duration <= 0) {
              return {
                'status': '',
                'action': false,
              };
            } else if (duration > 60) {
              return {
                'status': 'Not yet started',
                'action': false,
              };
            } else {
              return {
                'status': duration + ' mins left',
                'action': true,
              };
            }
          } 

        } else {

          if(remaining) {
            let now = moment();
            start = moment(moment(date).format('Y-MM-DD') +' '+ start);
            start = start.add('seconds', remaining);
            let left = start.diff(now, 'minutes');

            if(left <= 0) {
              return {
                'status': '',
                'action': false,
              };
            } else if (left > 60) {
              return {
                'status': 'Not yet started',
                'action': false,
              };
            } else {
              return {
                'status': left + ' mins left',
                'action': true,
              };
            }
          }
          
        }
      },

      /**
       * Render consultation time
       * 
       * @param  startTime
       * @param  endTime
       */
      renderTime(startTime, endTime) {
        if(startTime && endTime) {
          let start = moment(moment().format('YYYY-MM-DD') + ' ' + startTime).format('hh:mm A'),
          end = moment(moment().format('YYYY-MM-DD') + ' ' + endTime).format('hh:mm A');          
  
          return start +' - ' + end;        
        }
      },

      /**
       * Render consultation date
       * 
       * @param  date
       */
      renderDate(date) {
        return moment(date).format('MMMM DD, YYYY');  
      },

      trigAcceptCallView() {
       this.acceptCallView = this.acceptCallView ? false: true;
      },

      trigCallView() {
       this.callPage = this.callPage ? false: true;
      },

    },
  }
</script>

