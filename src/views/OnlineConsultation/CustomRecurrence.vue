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
          <v-toolbar-title>Custom Recurrence</v-toolbar-title>
        </v-toolbar>
      </v-card>

     	<v-container class="mt-5 pb-0">
     	  <v-layout row wrap mx-auto class="availability__Holder header__marginTop">
     	    <v-flex xs12 class="align-self-center">
     	      <p class="mb-0 color-pr2 font-weight-bold">Repeats on </p>
     	    </v-flex>
     	  </v-layout>
     	  <v-layout row wrap mx-auto class="mt-3">
          <v-flex xs12>
            <div class="days__holder">
              
              <template v-for="day in days">
                <div 
                @click="selectDay(day.value)"
                :class="{'active': selected(day.value)}"
                class="day__circleCol text-center">
                  <div class="vertical-parent">
                    <div class="vertical-align">
                      <p class="mb-0 font-weight-bold">{{ day.label }}</p>
                    </div>
                  </div>
                </div>
              </template>
              
            </div>
          </v-flex>
     	    <div class="line--divider"></div>

     	  </v-layout>
     	</v-container>

     	<v-container class="py-0">
     	  <v-layout row wrap mx-auto class="editSchedule__Select">
     	    <v-flex xs12>
            <p class="mb-0 color-pr2 font-weight-bold">Ends on </p>
          </v-flex>

          <v-flex xs12>
            <v-radio-group v-model="recurrenceType">
              <v-radio value="never" color="green">
                <template v-slot:label>
                  <div><small class="clr-black">Never</small></div>
                </template>
              </v-radio>
              <v-radio value="has_end" color="green">
                <template v-slot:label>
                  <div class="mr-2"><small class="clr-black">On</small></div> <div class="elevation-1 pa-3"><small>{{ readableDate }}</small></div>
                </template>
              </v-radio>
            </v-radio-group>
          </v-flex>
          
          <template v-if="recurrenceType == 'has_end'">
            <v-row justify="center" class="month__calendarHolder">
              <v-date-picker
                v-model="endsOn"
                class="mt-4"
                :min="minDate"
                color="orange" width="100%"
              ></v-date-picker>
            </v-row>
          </template>


     	  </v-layout>

     	  <div class="line--divider"></div>

     	  <v-layout row wrap mx-auto class="pb-8">
     	    <v-flex 
          @click="hide()"
          xs6 class="text-left">
     	      <v-btn class="custom-btn filled-white s-btn mx-auto text-small font-weight-bold">Cancel</v-btn>
     	    </v-flex>
     	    <v-flex 
          @click="save()"
          xs6 class="text-right">
     	      <v-btn class="custom-btn filled-pr1 s-btn mx-auto text-small font-weight-bold">Save</v-btn>		
     	    </v-flex>
     	  </v-layout>
     	</v-container>

      <Loader
      :loading="loading"
      message="Please wait, saving of schedules make take a while. Thank you"
      ></Loader>
      
    </v-navigation-drawer>
</template>

<script>
 import Loader from '@/components/Loader';  
 import ConsultationHistory from './ConsultationHistory.vue'

  export default {
  
    props: {
      
       schedules: {
        type: Array,
        default: []
       },

       date: {
        type: String,
        default: null
       },
       show: Boolean
    },

    components: {
      Loader,
      ConsultationHistory,
    },

    computed: {
      minDate() {
        return moment().format('Y-MM-DD');
      },
      readableDate() {
        if(this.endsOn) {
          return moment(this.endsOn).format('MMMM D, YYYY');
        }
        return moment().format('MMMM D, YYYY');
      }
    },

    data () {
      return {
        endsOn: null,
        days: [
         {label: 'Mo', value: 1},
         {label: 'Tu', value: 2},
         {label: 'W', value: 3}, 
         {label: 'Th', value: 4},         
         {label: 'F', value: 5},
         {label: 'Sa', value: 6},
         {label: 'Su', value: 7},
        ], 
        selectedDays: [],

      	editSchedule: false,
        consultationHistoryView: false,

        recurrenceType: 'never',

        loading: false,
      }
    },


     watch: {
       show(val) { 
          this.editSchedule = val
       }
    },

    methods: {

      /*
      |--------------------------------------------------------------------------
      | @Methods
      |--------------------------------------------------------------------------
      */

      hide() {
        this.$emit('hide');
        this.editSchedule = false;
      },

      /*
      * Submit request to API
      */
      save() {
        this.setLoading(true);
        let data = {

          type: 'custom',
          recurrence_type: this.recurrenceType,
          selected_days: this.selectedDays,
          schedules: this.schedules,
          date: this.endsOn,
          doctor_id: this.getItem('user').id          
        };

        axios.post(this.routes['api.doctor.schedules.store'], data)
          .then((response) => {
            this.setLoading(false);
            this.$emit('success');
          }).catch((err) => {
            this.setLoading(false);
          });
      },

      /**
       * Select day
       * 
       * @param  value
       */
      selectDay(value) {
        if(!this.selected(value)) {
          this.selectedDays.push(value);
        } else {
          let index = this.selectedDays.indexOf(value);
          this.selectedDays.splice(index, 1);            
        }
      },

      /**
       * Check if day is selected
       * 
       * @param  value
       */
      selected(value) {
        return this.selectedDays.includes(value);
      },

      setLoading(status) {
        // this.loading = status;
      }

    },
  }
</script>