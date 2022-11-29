<template>
  <v-row justify="center">
    <v-dialog
      v-model="endCall"
      width="290"
      style="border-radius: 0 !important;"
      persistent
    >
      <v-card class="health__dialogCon pt-3 pb-5">
        <v-layout row wrap mx-auto class="py-5 px-7">
          <v-flex xs3 class="align-self-center">
            <v-img :src="$PRXConfig().staticUrl('icons/warning.svg')" class="mx-auto" width="30px" height="30px"></v-img>
          </v-flex>
          <v-flex xs9 class="text-left align-self-center">
            <p class="mb-0 font-weight-bold type-black">Are you sure you want to end this consultation</p>  
          </v-flex>
        </v-layout>

        <v-layout row wrap mx-auto class="px-7 pt-3">
          <v-flex xs6 class="text-center">
            <v-btn
              @click="hide()"
              class="custom-btn filled-white s-btn mx-auto text-small">
              No
            </v-btn>
          </v-flex>
          <v-flex xs6 class="text-center">
            <v-btn
              class="custom-btn filled-pr1 s-btn mx-auto text-small prescription__button"
              @click="confirm()"
            >
             Yes
            </v-btn>

          </v-flex>
        </v-layout>
      </v-card>
    </v-dialog>
  </v-row>
</template>


<script>

  export default {

    props: {
      consultation: {
        type: Object,
        default: {}
      }
    },

    data () {
      return {
        endCall: false,
      }
    },

    methods: {

      /*
      |--------------------------------------------------------------------------
      | @Methods
      |--------------------------------------------------------------------------
      */
     
      /**
       * Show call dialog
       * 
       */
      show() {
        this.endCall = true;
      },

      /**
       * Hide call dialog
       * 
       */
      hide() {
        this.endCall = false;
      },

      /**
       * Show consultation summary
       * 
       */
      confirm() {
        this.$emit('confirmed');
        this.hide();
      },

    },

  }
</script>