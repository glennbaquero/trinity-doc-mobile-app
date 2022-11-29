<template>
  <!-- Filter View -->
    <v-navigation-drawer
      v-model="onlineConsultation"
      fixed
      left
      class="online__consultationHolder"
      width="100%"
      touchless
    >
     	<v-card class="frm-elevation">
     	  <v-card class="online__consultationCol">
	        <v-toolbar class="consultation__historyTitle type-shdw-gray py-3 frm-elevation">
	          <v-btn icon dark @click="hide()">
	            <v-icon class="back--icon">{{ 'fa-chevron-left' }}</v-icon>
	          </v-btn>
	          <v-toolbar-title>Online Consultation</v-toolbar-title>
	        </v-toolbar>
	      </v-card>
	      <v-container class="pa-4">
	        <v-layout row wrap mx-auto class="pb-5 header__marginTop">
	          <v-flex xs12>
	            <v-card class="mb-5 py-7 px-7">
	            	<v-layout row wrap mx-auto>
	            	  <v-flex xs6 class="align-self-center">
	            	    <small class="text-small">Total Earnings</small>
	            	    <p class="mb-0 font-weight-bold">P {{ credits }}</p>
	            	  </v-flex>
	            	  <v-flex 
                  @click="openPayout"
                  xs6 class="text-right align-self-center">
	            	    <v-btn class="custom-btn filled-pr1 s-btn mx-auto text-small">View Summary</v-btn>
	            	  </v-flex>
	            	</v-layout>
	            </v-card>
	          </v-flex>
	        </v-layout>

	        <v-layout row wrap mx-auto>
	          <v-flex xs6 class="align-self-center">
	         	<p class="mb-0 font-weight-bold">Consultation Schedule</p>
	          </v-flex>
	          <v-flex xs6 class="align-self-center text-right">
	            <v-btn class="custom-btn filled-white s-btn mx-auto text-small" @click="openConsultationHistory()">Consultation History</v-btn>
	          </v-flex>
	        </v-layout>

	        <v-layout row wrap mx-auto class="pt-5 pb-8">
	          <v-flex xs12 class="px-2 consultation__CalendarHolder">
	            <MonthlyCalendar
              :schedules="approved_schedules"
              @date-changed="dateChanged"
              ></MonthlyCalendar>
              <div class="online--selectHolder">
                <v-row class="no-gutters">
                    <v-col cols="2" class="px-0 align-self-center">
                      <div :class="renderStatusClass()"></div>
                    </v-col>
                    <v-col cols="10" class="px-0 align-self-center clr-white">
                      <v-select
                        v-model="information.online"
                        :items="onlineStatuses"
                        item-text="label"
                        item-value="value"
                        class="pt-0"
                      ></v-select>
                    </v-col>
                  </v-row> 
              </div>
	          </v-flex>

	          <v-flex xs12>
	            <div class="inlineBlock-parent">
		  			<div class="dots"></div> <small class="clr-gray">Fully Booked</small>
		  		</div>
	          </v-flex>
	        </v-layout>  
	      </v-container>
     	</v-card>

     	<v-container class="mt-5">
     	  <v-layout row wrap mx-auto class="availability__Holder">
     	    <v-flex xs4 class="align-self-center">
     	      <p class="mb-0 font-weight-bold">Availability</p>
     	    </v-flex>
     	    <v-flex xs3 class="align-self-center">
     	       <v-select
		        :items="items"
            v-model="timeType"
		        label="Availability"
		        class="pt-0 my-0"
		      ></v-select>
     	    </v-flex>
     	    <v-flex xs5 class="align-self-center text-center">
     	      <v-btn 
            @click="openSchedEditor()"
            :disabled="canEdit"
            class="custom-btn filled-white s-btn mx-auto text-small">Edit Schedule</v-btn>
     	    </v-flex>
     	  </v-layout>

     	  <EditSchedule 
        ref="schedule-editor"
        :date="date"
        :fetched-schedules="schedules"
        @updated="init"
        ></EditSchedule>
     	  
        <v-layout row wrap mx-auto class="mt-3">
     	    <v-flex xs12>
     	      <p class="mb-0 color-pr2 font-weight-bold">Available Time Slots</p>
     	    </v-flex>

     	 	<v-flex xs12>
     	 	  <v-layout row wrap mx-auto class="time--holder">
     	 	    
            <template v-for="schedule in schedules">
              <template v-if="timeType == 'Morning' && schedule.type == 'am'">
                <v-flex xs12 class="mb-1">
         	 	      <v-switch
  		              :label="renderLabel(schedule.start_time, schedule.end_time, schedule.type)"
  		              v-model="schedule.status"
                    color="green"
  		              value="green"
  		              hide-details
                    input-value="true"
  		              readonly
                  ></v-switch>
         	 	    </v-flex>
              </template>

              <template v-if="timeType == 'Afternoon' && schedule.type == 'pm'">
                <v-flex xs12 class="mb-1">
                  <v-switch
                    :label="renderLabel(schedule.start_time, schedule.end_time, schedule.type)"
                    v-model="schedule.status"
                    color="green"
                    value="green"
                    hide-details
                    input-value="true"
                    readonly
                  ></v-switch>
                </v-flex>
              </template>
            
            </template>

            <template v-if="!schedules.length">
              <v-flex xs12 class="text-center mt-5">
                <small class="py-8">No schedules.</small>
              </v-flex>
            </template>

     	 	    <div class="line--divider"></div>
     	 	  </v-layout>
     	 	</v-flex>
     	  </v-layout>
     	</v-container>

     	<v-container>
     	  <v-layout row wrap mx-auto>
     	    <v-flex xs12>
     	      <p class="font-weight-bold color-pr2">Booked Consultations</p>
     	    </v-flex>

    			<v-flex xs12>
    			  <template v-for="consultation in consultations">
              <!-- orange -->
              <!-- sky-blue -->
              <v-layout row wrap mx-auto class="py-3">
      			    <v-flex xs5 class="align-self-center">
      			      <div class="inlineBlock-parent">
      			      	<div class="bullet--schedule sky-blue"></div> <small class="clr-gray">{{ renderLabel(consultation.start_time, consultation.end_time, consultation.schedule_type) }}</small>
      			      </div>
      			    </v-flex>
      			    <v-flex xs3 class="align-self-center text-center">
      			      <small class="font-weight-bold"><a class="clr-gray"></a>{{ consultation.patient_name }}</small>
      			    </v-flex>
                <template v-if="consultation.status == 'Approved'">
        			    <template v-if="canChat(consultation.date, consultation.start_time, consultation.end_time, consultation.schedule_type)">
                    <v-flex xs4 class="align-self-center text-center">
          			       <v-btn 
                       @click="openChatPage(consultation)"
                       class="custom-btn filled-pr1 s-btn mx-auto text-small">Chat Now</v-btn>
          			    </v-flex>
                  </template>
                  <template v-else>
                    <v-flex xs4 class="align-self-center text-center">
                       <v-btn
                       class="custom-btn filled-pr1 s-btn mx-auto text-small">{{ consultation.status }}</v-btn>
                    </v-flex>
                  </template>
                </template>
                <template v-else>
                <v-flex xs2 class="align-self-center text-center">
                    <v-btn 
                    @click="updateStatus(consultation.id, 'declined')"
                    class="mx-auto my-2 patientCard--button" small fab color="red">
                      <v-icon>{{ 'fa-times' }}</v-icon>
                    </v-btn>

                    <small>Decline</small>
                </v-flex>
                <v-flex xs2 class="align-self-center text-center">
                    <v-btn 
                    @click="updateStatus(consultation.id, 'accepted')"
                    class="mx-auto my-2 patientCard--button" small fab color="green">
                      <v-icon>{{ 'fa-check' }}</v-icon>
                    </v-btn>
                    <small class="text-small">Accept</small>
                </v-flex>
                </template>
      			  </v-layout>
            </template>
    			</v-flex>
          <template v-if="!consultations.length">
       	    <v-flex xs12 class="text-center mt-5">
       	      <small class="py-8">No booked consultation yet.</small>
       	    </v-flex>
          </template>
     	  </v-layout>
     	</v-container>
      
      <Loader
      :loading="loading"
      ></Loader>

      <PaymentSummary ref="payout"></PaymentSummary>

      <AlertMessage ref="message"></AlertMessage>

    </v-navigation-drawer>
</template>

<script>
 import MonthlyCalendar from './MonthlyCalendar.vue'
 import EditSchedule from './EditSchedule.vue'
 import PaymentSummary from '../Payment/PaymentSummary.vue';
 import AlertMessage from '../Modals/AlertMessage.vue';

 import Loader from '@/components/Loader'

  export default {
  
    components: {
        PaymentSummary,
        Loader,
        MonthlyCalendar,
        EditSchedule,
        AlertMessage
    },

    computed: {
      canEdit() {
        let now = moment().format('Y-MM-DD');
        if(this.date < now) {
          return true; 
        }
        return false;
      },

      user() {
        return this.$store.state.user.details;
      }

    },

    watch: {
      'information.online'(val) {
          this.updateOnlineStatus();
      }
    },    

    data () {
      return {
        date: moment().format('Y-MM-DD'),

        onlineConsultation: false,

        timeType: "Morning",
        items: ['Morning', 'Afternoon'],
        information: {},
        onlineStatuses: [
          {'value' : 3, 'label' : 'Offline'},   
          {'value' : 1, 'label' : 'Online'},
          {'value' : 2, 'label' : 'Busy'},
        ],

        consultations: [],
        schedules: [],
        credits: 0,
        loading: false,
        approved_schedules: []
      }
    },

    mounted() {
      /* Spread data from computed property */
      setTimeout(() => {
        this.information = {
          first_name: this.user.first_name,
          last_name: this.user.last_name,
          mobile_number: this.user.mobile_number,
          // email: this.user.email,
          specialization_id: this.user.specialization_id,
          license_number: this.user.license_number,
          alma_mater: this.user.alma_mater,
          place_of_practice: this.user.place_of_practice,
          online: this.user.online,
        };
      }, 200);

      
      this.init();
    },

    methods: {

      /*
      |--------------------------------------------------------------------------
      | @Initialize
      |--------------------------------------------------------------------------
      */

      init() {
        this.onlineConsultation = true;
        this.fetchResources();
      },


      /*
      |--------------------------------------------------------------------------
      | @Methods
      |--------------------------------------------------------------------------
      */
      
      updateOnlineStatus() {
        let data = {
          online: this.information.online
        };
        axios.post(this.routes['api.doctor.update.online-status'], data)
          .then(response => {
            this.$store.commit('user/set', response.data.doctor);
          })
          .catch(error => {
            console.log(err);
          })
      },

      /**
       * Fetch online consultation resoruces
       * 
       */
      fetchResources() {
        this.setLoading(true);

        let data = {
          date: this.date
        };
        axios.post(this.routes['api.doctor.online-consultations.fetch'], data)
          .then((response) => {
            this.setLoading(false);
            this.credits = response.data.credits;
            this.schedules = response.data.schedules;
            this.consultations = response.data.consultations;
            this.approved_schedules = response.data.approved_schedules;
          }).catch((err) => {
            this.setLoading(false);            
          })
      },

      updateStatus(id, status) {
        // this.setLoading(true);
        this.loading = true;

        let data = {
          consultation_id: id,
          status: status
        };

        axios.post(this.routes['api.doctor.consultations.update.status'], data)
          .then((response) => {
            if(response.data.isValid == 'false') {
              this.$refs['message'].show(response.data);
            } else {
              this.fetchResources();
              this.$store.commit('user/set', response.data.doctor);
            }
            setTimeout(() => {
              this.loading = false;
            }, 2000)
          }).catch((err) => {
            this.loading = false;
          });
      },

      /**
       * Event handler for date change
       * 
       * @param date date
       */
      dateChanged(date) {
        this.date = date;
        this.fetchResources();
      },

      /**
       * Opener for sched editor
       * 
       */
      openSchedEditor() {
        this.$refs['schedule-editor'].show();
      },

      /**
       * Setting loading status
       * 
       * @param boolean status
       */
      setLoading(status) {
        // this.loading = status;
      },

      openConsultationHistory() {
        this.$PRXRouter().goTo('consultation-history');
      },

      openPayout() {
        this.$refs['payout'].show();        
      },

      hide() {
        this.onlineConsultation = false;
        this.$PRXRouter().goBack();
      },

      openChatPage(consultation) {
        this.$store.commit('onlineConsultation/setConsultation', consultation);                
        this.$PRXRouter().goTo('chats');
      },

      /*
      |--------------------------------------------------------------------------
      | @Renders
      |--------------------------------------------------------------------------
      */
      
      /**
       * Render label for schedule
       * 
       * @param  startTime
       * @param  endTime
       */
      renderLabel(startTime, endTime, type) {
        let start = moment(moment().format('Y-MM-DD') +' '+  startTime).format('hh:mm'),
          end = moment(moment().format('Y-MM-DD') +' '+  endTime).format('hh:mm');
   
        return start + ' ' + type +  ' - '+ end + ' ' + type;        
      },

      /**
       * Render online status class
       */
      renderStatusClass() {
      if(this.information.online == 1) {
        return 'online--status online';
      } else if (this.information.online == 2) {
        return 'online--status busy';
      } 
      return 'online--status offline';
    },

      /*
      |--------------------------------------------------------------------------
      | @Checkers
      |--------------------------------------------------------------------------
      */
      canChat(date, startTime, endTime, schedType) {
        let start = moment(moment(date).format('Y-MM-DD') +' '+  startTime + ' ' +  schedType),
        end = moment(moment(date).format('Y-MM-DD') +' '+  endTime + ' ' + schedType),
        now = moment(moment().format('Y-MM-DD h:mm a'));
        if(now >= start) {
          if(now.diff(start) >= 0 && end.diff(now) >= 0) {
            return true;
          }
          return false;         
        }
        return false;
      }

    },
  }
</script>