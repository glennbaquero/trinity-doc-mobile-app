<template>
  <v-row justify="center">
    <v-dialog
      v-model="action"
      max-width="290"
      class="popup__holder rounded-0"
      style="border-radius: 0 !important;"
    >
      <v-card class="popup__cardHolder pt-3 pb-5 px-5 rounded-0" style="border-radius:0 !important;">
        <v-icon class="close--dialog" @click="hide">{{ 'fa-times' }}</v-icon>
        <div class="text-center mb-5">
          <p class="font-weight-bold">Choose action</p>
        </div>

          <template v-if="consultation.status == 'Approved'">
            <v-card class="consultation__actionCard py-4 px-7 mb-2" @click="viewDetails()">
                <v-layout>
                  <v-flex xs3 class="align-self-center">
                    <v-img :src="$PRXConfig().staticUrl('icons/chat2.svg')" class="ml-0" width="30px" height="30px"></v-img>
                  </v-flex>
                  <v-flex xs9 class="align-self-center">
                    <p class="mb-0">Chat now</p>
                  </v-flex>
                </v-layout>
            </v-card>
          </template>

          <v-card class="consultation__actionCard py-4 px-7 mb-2" @click="viewDetails()">
              <v-layout>
                <v-flex xs3 class="align-self-center">
                  <v-img :src="$PRXConfig().staticUrl('icons/view.svg')" class="ml-0" width="30px" height="30px"></v-img>
                </v-flex>
                <v-flex xs9 class="align-self-center">
                  <p class="mb-0">View Details</p>
                </v-flex>
              </v-layout>
          </v-card>

      </v-card>
    </v-dialog>

  </v-row>
</template>


<script>


  export default {
    props: {
      consultation: {
        type: [Object, String],
        default: {}
      },
    },

    data () {
      return {
        action: false,
      }
    },

    methods: {

      /*
      |--------------------------------------------------------------------------
      | @Methods
      |--------------------------------------------------------------------------
      */
      viewDetails() {
        this.$emit('show-chat');
        this.hide();
      },

      show() {
        this.action = true;
      },

      hide() {
        this.action = false;
      },


    },

  }
</script>