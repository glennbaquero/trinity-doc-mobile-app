<template>
  <v-row justify="center">
    <v-dialog
      v-model="success"
      width="250"
    >
      <v-card class="popup__cardHolder pa-7">
        <!-- <v-icon class="close--dialog" @click="height = false">{{ 'fa-times' }}</v-icon> -->
        <div class="text-center mb-5">
          <p class="font-weight-bold">Awaiting Elizabeth Uy to Join Call...</p>
        </div>

        <v-card-actions class="text-center">
          <v-btn class="custom-btn filled-pr1 s-btn mx-auto" @click="success = false">Cancel</v-btn>
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
        success: false,
      }
    },

     watch: {
       show(val) { 
          this.success = val
       }
    }, 
  }
</script>