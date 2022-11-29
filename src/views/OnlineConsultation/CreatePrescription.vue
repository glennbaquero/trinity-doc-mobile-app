<template>
    <!-- Filter View -->
    <v-navigation-drawer
    v-model="prescView"
    fixed
    left
    class="chat__pageCon"
    width="100%"
    touchless
    >
        <v-card class="chat__headerCon">
            <v-toolbar class="py-4">
                <v-btn icon dark @click="hide()">
                    <v-icon class="back--icon">{{ 'fa-chevron-left' }}</v-icon>
                </v-btn>
                <v-img :src="$PRXConfig().staticUrl('images/profile.jpeg')" class="mr-7 chat__profileImg" max-width="45px" width="45px" height="45px"></v-img>

                <div class="chat__nameHolder">
                  <v-toolbar-title class="font-weight-bold">Elizabeth Uy</v-toolbar-title>
                  <a href="#">My Health Record</a>
                </div>
            </v-toolbar>
        </v-card>
        <div class="chat__timeHolder text-center gradient--toRight">
          <p class="mb-0 clr-white font-weight-bold">00:00:10</p>
        </div>

        <v-layout row wrap mx-auto class="my-5 px-5">
          <v-flex xs12>
            <h5>Create Prescription</h5>
          </v-flex>
        </v-layout>
        
        <PrescriptionTable></PrescriptionTable>

    </v-navigation-drawer>
</template>

<script>
import PrescriptionTable from './PrescriptionTable.vue'

    export default {

        components: {
            PrescriptionTable,
        },

        data () {
          return {
            prescView: false,
          }
        },

        methods: {

          /*
          |--------------------------------------------------------------------------
          | @Methods
          |--------------------------------------------------------------------------
          */

          show() {
            this.prescView = true;
          },

          hide() {
            this.prescView = false;
          },



        }

    }
</script> 