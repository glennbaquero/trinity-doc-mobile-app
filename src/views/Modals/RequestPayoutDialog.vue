<template>
  <v-row justify="center">
    <v-dialog
      v-model="request"
      max-width="290"
    >
      <v-card class="health__dialogCon py-3">
        <div class="text-center mb-5">
          <p class="mb-0 font-weight-bold">Request Payout</p>
        </div>
      
        <v-form v-model="isValid">
          <v-layout class="px-5">
            <v-flex xs12>
                <v-text-field
                  dense
                  type="number"
                  v-model="post.value"
                  :rules="[rules.required, rules.max]"
                  label="Enter Amount"
                ></v-text-field>
            </v-flex>

          </v-layout>

          <v-card-actions class="text-center">
            <v-btn class="custom-btn filled-pr1 s-btn mx-auto text-small font-weight-bold" @click="trigSuccessDialog(); submitPayoutRequest(); $emit('close')" :disabled="!isValid">Okay</v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    
      <PayoutMessageDialog 
      @close="request = false"
      :show="payoutMessage"
      ref="message"></PayoutMessageDialog>
    </v-dialog>
  </v-row>
</template>


<script>
import PayoutMessageDialog from './PayoutMessageDialog.vue';

  export default {

    components: {
      PayoutMessageDialog,
    },

    props: {  


       credits: {
        type: Number,
        default: 0,
       },
       show: Boolean,
    },

    data () {
      return {
        request: false,
        payoutMessage: false,
        isValid: false,

        loading: false,

        post: {
          value: null
        },

        rules: {
          required: value => !!value || 'Required field.',
          max: value => parseFloat(value) <= parseFloat(this.credits) || 'Amount should not exceed the total credits' 
        },
      }
    },

    mounted() {

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

      /*
      * Submit request to API
      */
      submitPayoutRequest() {
        this.setLoading();
        axios.post(this.routes['api.doctor.payouts.request'], this.post)
          .then((response) => {
              this.setLoading();
            if(response.status === 200) {
              this.message = response.data.message;
              this.$emit('submitted');
              this.post.value = null;
              this.$refs['message'].show(response.data)
            }
          }).catch((err) => {
            this.setLoading();
            console.log(err);
          });
      },

      /**
       * Set loading status
       * 
       */
      setLoading() {
        this.loading = this.loading ? false: true;
      },

      trigSuccessDialog() {
       this.payoutMessage = this.payoutMessage ? false: true;
      },
    },

     watch: {
       show(val) { 
          this.request = val
       }
    }, 
  }
</script>