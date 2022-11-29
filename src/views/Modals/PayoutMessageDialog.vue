<template>
  <v-row justify="center">
    <v-dialog
      v-model="message"
      max-width="290"
    >
      <v-card class="health__dialogCon pa-5">
        <!-- <v-icon class="close--dialog" @click="height = false">{{ 'fa-times' }}</v-icon> -->
        <div class="text-center mb-5">
          <p class="font-weight-bold mb-2">{{ successMessage.title }}</p>

          <small><span class="font-weight-bold">Note:</span> {{ successMessage.message }}</small>
        </div>

        <v-card-actions class="text-center">
          <v-btn class="custom-btn filled-pr1 s-btn mx-auto text-small font-weight-bold" @click="close">Okay</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>


<script>
  export default {
    data () {
      return {
        message: false,
        successMessage: {}
      }
    },
 
    methods: {
      show(successMessage) {
        this.successMessage = successMessage;
        this.message = true;
      },

      close() {
        this.message = false;
        this.$emit('close');
      }
    },
  }
</script>