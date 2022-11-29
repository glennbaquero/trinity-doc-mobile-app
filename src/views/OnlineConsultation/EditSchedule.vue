<template>
  <!-- Filter View -->
    <v-navigation-drawer
      v-model="editSchedule"
      fixed
      left
      class="online__consultationHolder"
      width="100%"
      touchless
    >
 	  <v-card class="online__consultationCol">
        <v-toolbar class="consultation__historyTitle type-shdw-gray py-3 frm-elevation">
          <v-btn icon dark @click="hide()">
            <v-icon class="back--icon">{{ 'fa-chevron-left' }}</v-icon>
          </v-btn>
          <v-toolbar-title>Edit Schedule</v-toolbar-title>
        </v-toolbar>
      </v-card>

     	<v-container class="mt-5 pb-0">
     	  <v-layout row wrap mx-auto class="availability__Holder header__marginTop">
     	    <v-flex xs4 class="align-self-center">
     	      <p class="mb-0 color-pr2 font-weight-bold">Availability</p>
     	    </v-flex>
     	    <v-flex xs3 class="align-self-center">
     	       <v-select
            v-model="timeType"
		        :items="items"
		        label="Availability"
		        class="pt-0 my-0"
		      ></v-select>
     	    </v-flex>
     	    <v-flex xs5 class="align-self-center text-center">
     	   
     	    </v-flex>
     	  </v-layout>
     	  <v-layout row wrap mx-auto class="mt-3">
     	    <v-flex xs12>
     	      <h6>{{ dateNow.formmatedDate }}</h6>
     	      <p>{{ dateNow.day }}</p>
     	    </v-flex>
     	    <div class="line--divider"></div>

     	 	<v-flex xs12>
     	 	  <v-layout row wrap mx-auto class="time--holder" >
     	 	    
            <template v-if="timeType">
              <v-flex xs12 class="mb-1" v-for="schedule in schedules">
       	 	    
              <template v-if="timeType == 'Morning' && schedule.type == 'am'">
                  <v-switch
                    v-model="schedule.status"
                    :label="renderLabel(schedule)"
  		              color="green"
  		              hide-details
  		            ></v-switch>
              </template>
              <template v-if="timeType == 'Afternoon' && schedule.type == 'pm'">
                <v-switch
                  v-model="schedule.status"
                  :label="renderLabel(schedule)"
                  color="green"
                  hide-details
                ></v-switch>
              </template>

       	 	    </v-flex>
            </template>

 	 	        <!-- <v-btn
              class="btn-noborder px-0 mt-3"
            >
              <v-img :src="$PRXConfig().staticUrl('icons/health.svg')" class="mr-2" width="12px" max-height="12px" max-width="12px" contain></v-img> Add More
            </v-btn> -->

     	 	    <div class="line--divider"></div>
     	 	  </v-layout>
     	 	</v-flex>
     	  </v-layout>
     	</v-container>

     	<v-container class="py-0">
     	  <v-layout row wrap mx-auto class="editSchedule__Select">
     	    <v-flex xs2 class="align-self-center">
     	      	<v-img :src="$PRXConfig().staticUrl('icons/repeat.svg')" width="20px" max-height="20px" max-width="20px" contain></v-img>
     	    </v-flex>
     	    <v-flex xs7 class="align-self-center">
     	      <v-select
              v-model="repeatType"
			        :items="types"
              item-text="label"
              item-value="value"
			        placeholder="Does not Repeat"
			        class="pt-0 my-0"
			     ></v-select>
     	    </v-flex>
     	  </v-layout>

     	  <div class="line--divider"></div>

     	  <v-layout row wrap mx-auto class="pb-8">
     	    <v-flex xs6 class="text-left">
     	      <v-btn 
            @click="editSchedule = false"
            class="custom-btn filled-white s-btn mx-auto text-small font-weight-bold"
            >Cancel</v-btn>
     	    </v-flex>
     	    <v-flex xs6 class="text-right">
     	      <v-btn 
            :disabled="loading"
            class="custom-btn filled-pr1 s-btn mx-auto text-small font-weight-bold" @click="submitSchedule()">Save</v-btn>		
     	    </v-flex>
     	  </v-layout>
     	</v-container>

     	<CustomRecurrence 
      :date="date"
      :schedules="schedules"
      :show="customRecurrenceView"
      @success="showSuccessMessage"
      @hide="repeatType = 'no_repeat'"
      ></CustomRecurrence>

      <Dialog
      :show="success"
      :item="dialogMessage"
      @close="hide"
      ></Dialog>

    </v-navigation-drawer>
</template>

<script>
 import Loader from '@/components/Loader'; 
 import MonthlyCalendar from './MonthlyCalendar.vue'
 import CustomRecurrence from './CustomRecurrence.vue'
 import Dialog from '@/components/Dialog';


  export default {
  
    props: {
      date: {
        type: String,
        default: null
      },
      fetchedSchedules: {
        type: Array,
        default: []
      }
    },

    components: {
      Loader,
      Dialog,
      MonthlyCalendar,
      CustomRecurrence,
    },

    computed: {
      dateNow() {
        if(this.date) {
          let parsedDate = moment(this.date);
            return {
              formmatedDate: parsedDate.format('MMMM D, YYYY'),
              day: parsedDate.format("dddd")
            };
        }
      }
    },

    watch: {
      repeatType() {
        if(this.repeatType == 'custom') {
          this.trigCustomRecurrenceView();
        }
      },

      fetchedSchedules() {
        if(this.fetchedSchedules.length) {
          this.schedules = this.fetchedSchedules;
        } else {
          this.schedules = this.preGenerated;
        }
      },

    },

    data () {
      return {
        timeType: 'Morning',

      	editSchedule: false,
        consultationHistoryView: false,
        customRecurrenceView: false,

        items: ['Morning', 'Afternoon'],

        types: [
          {'value' : 'no_repeat', 'label': 'Does not repeat' },
          {'value' : 'every_day', 'label': 'Every Day' },
          {'value' : 'every_week', 'label': 'Every Week' },
          {'value' : 'every_month', 'label': 'Every Month' },
          {'value' : 'every_year', 'label': 'Every Year' },
          {'value' : 'custom', 'label': 'Custom Recurrence' },        
        ],

        repeatType: 'no_repeat',
        schedules: [],
        preGenerated: [
          /*AM Schedules*/
          {'start_time' : '12:00', 'end_time': '01:00', 'status': false, 'label': '12:00 AM - 01:00 AM', 'type' : 'am' },
          {'start_time' : '01:00', 'end_time': '02:00', 'status': false, 'label': '01:00 AM - 02:00 AM', 'type' : 'am' },
          {'start_time' : '02:00', 'end_time': '03:00', 'status': false, 'label': '02:00 AM - 03:00 AM', 'type' : 'am' },
          {'start_time' : '03:00', 'end_time': '04:00', 'status': false, 'label': '03:00 AM - 04:00 AM', 'type' : 'am' },
          {'start_time' : '04:00', 'end_time': '05:00', 'status': false, 'label': '04:00 AM - 05:00 AM', 'type' : 'am' },
          {'start_time' : '05:00', 'end_time': '06:00', 'status': false, 'label': '05:00 AM - 06:00 AM', 'type' : 'am' },
          {'start_time' : '06:00', 'end_time': '07:00', 'status': false, 'label': '06:00 AM - 07:00 AM', 'type' : 'am' },
          {'start_time' : '07:00', 'end_time': '08:00', 'status': false, 'label': '07:00 AM - 08:00 AM', 'type' : 'am' },

          {'start_time' : '8:00', 'end_time': '9:00', 'status': false, 'label': '8:00 AM - 9:00 AM', 'type' : 'am'},
          {'start_time' : '9:00', 'end_time': '10:00', 'status': false, 'label': '9:00 AM - 10:00 AM', 'type' : 'am' },
          {'start_time' : '10:00', 'end_time': '11:00', 'status': false, 'label': '10:00 AM - 11:00 AM', 'type' : 'am' },
          {'start_time' : '11:00', 'end_time': '12:00', 'status': false, 'label': '11:00 AM - 12:00 PM', 'type' : 'am' },

          /*PM Schedules*/
          {'start_time' : '12:00', 'end_time': '01:00', 'status': false, 'label': '12:00 PM - 01:00 PM', 'type' : 'pm' },
          {'start_time' : '01:00', 'end_time': '02:00', 'status': false, 'label': '01:00 PM - 02:00 PM', 'type' : 'pm' },
          {'start_time' : '02:00', 'end_time': '03:00', 'status': false, 'label': '02:00 PM - 03:00 PM', 'type' : 'pm' },          
          {'start_time' : '03:00', 'end_time': '04:00', 'status': false, 'label': '03:00 PM - 04:00 PM', 'type' : 'pm' },
          {'start_time' : '04:00', 'end_time': '05:00', 'status': false, 'label': '04:00 PM - 05:00 PM', 'type' : 'pm' },
          {'start_time' : '05:00', 'end_time': '06:00', 'status': false, 'label': '05:00 PM - 06:00 PM', 'type' : 'pm' },  

          {'start_time' : '06:00', 'end_time': '07:00', 'status': false, 'label': '06:00 PM - 07:00 PM', 'type' : 'pm' },   
          {'start_time' : '07:00', 'end_time': '08:00', 'status': false, 'label': '07:00 PM - 08:00 PM', 'type' : 'pm' },
          {'start_time' : '08:00', 'end_time': '09:00', 'status': false, 'label': '08:00 PM - 09:00 PM', 'type' : 'pm' },   
          {'start_time' : '09:00', 'end_time': '10:00', 'status': false, 'label': '09:00 PM - 10:00 PM', 'type' : 'pm' },   
          {'start_time' : '10:00', 'end_time': '11:00', 'status': false, 'label': '10:00 PM - 11:00 PM', 'type' : 'pm' },   
          {'start_time' : '11:00', 'end_time': '12:00', 'status': false, 'label': '11:00 PM - 12:00 AM', 'type' : 'pm' },                          
        ],

        loading: false,
        dialogMessage: {
          title: 'Schedule Updated',
          message: 'Schedule has been successfully update'
        },
        success: false
      }
    },


    methods: {
      /*
      |--------------------------------------------------------------------------
      | @Methods
      |--------------------------------------------------------------------------
      */
      show() {
        this.editSchedule = true;
      },

      hide() {
        this.success = false;
        this.repeatType = 'no_repeat';
        this.editSchedule = false;
        this.$emit('updated');        
      },

      /*
      * Submit request to API
      */
      submitSchedule() {
        this.setLoading(true);
        let data = {
          type: this.repeatType,
          date: this.date,
          schedules: this.schedules,
          doctor_id: this.getItem('user').id
        };

        axios.post(this.routes['api.doctor.schedules.store'], data)
          .then((response) => {
            this.setLoading(false);
            this.success = true;
            this.repeatType = 'no_repeat';
          }).catch((err) => {
            this.setLoading(false);
          });
      },

      showSuccessMessage() {
        this.success = true;
        this.hide();
      },

      trigCustomRecurrenceView() {
       this.customRecurrenceView = this.customRecurrenceView ? false: true;
      },

      setLoading(status) {
        this.loading = status;
      },

      renderLabel(schedule) {
        if(schedule.label) {
          return schedule.label;
        }
        return schedule.start_time + ' ' + schedule.type + ' - ' + schedule.end_time + ' ' + schedule.type;
      },

    },
  }
</script>