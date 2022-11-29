<template>
  <v-row justify="center" class="month__calendarHolder">
    <v-date-picker v-model="date" 
    :events="functionEvents"
    color="orange" width="100%"></v-date-picker>
  </v-row>
</template>
<script>
	
  export default {
    props: {
      schedules: {
        type: Array,
        default: []
      }
    },
    data: () => ({
      date: moment().format('Y-MM-DD'),
      month: false,
    }),

    watch: {
      date() {
        this.dateChanged();
      },  
    },

    computed: {
      functionEvents () {
        return this.dateFunctionEvents;

      },
    },


    methods: {
      dateChanged() {
        this.$emit('date-changed', this.date);
      },

      dateFunctionEvents (date) {
        if (this.schedules.includes(date)) return ['#A8A8A8']
      },



    },
  }

</script>