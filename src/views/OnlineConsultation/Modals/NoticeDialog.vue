<template>
  <v-row justify="center">
    <v-dialog
      v-model="notice"
      width="250"
    >
      <v-card class="health__dialogCon pa-5">
        <!-- <v-icon class="close--dialog" @click="height = false">{{ 'fa-times' }}</v-icon> -->
        <div class="text-center mb-5">
          <p class="font-weight-bold mb-2">Notice</p>

          <small>Your patient's duration have been full consumed</small>
        </div>

        <v-card-actions class="text-center">
          <v-btn class="custom-btn filled-pr1 s-btn mx-auto text-small font-weight-bold" @click="message = false">End Consultation</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>


<script>
  export default {

    props: {
       show: Boolean
    },

    data () {
      return {
        notice: false,
      }
    },

     watch: {
       show(val) { 
          this.notice = val
       }
    }, 
  }
</script>