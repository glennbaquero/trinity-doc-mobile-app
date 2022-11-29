<template>
  <div class="prescription__table">
    <v-layout row wrap mx-auto class="px-5 mb-5">
      <v-flex xs12 class="prescription__header mb-5">
        
      </v-flex>
      <v-flex xs4>
        <p class="mb-0 font-weight-bold">Product</p>
      </v-flex>
      <v-flex xs3>
        <p class="mb-0 font-weight-bold">Dosage</p>
      </v-flex>
      <v-flex xs3>
        <p class="mb-0 font-weight-bold">Duration</p>
      </v-flex>
      <v-flex xs2>
        
      </v-flex>
    </v-layout>

    <template v-for="(med, index) in meds">
      <v-layout row wrap mx-auto class="px-5 py-3">
        <v-flex xs12 class="prescription__tableContent py-3">
          <v-layout row wrap mx-auto>
            <v-flex xs4 class="px-1 break__all">
              <small class="font-italic">{{ med.name }}</small>
            </v-flex>
            <v-flex xs3 class="px-1 break__all">
              <small class="font-italic">{{ med.dosage }}</small>
            </v-flex>
            <v-flex xs3 class="px-1 break__all">
              <small class="font-italic pl-1">{{ med.duration }}</small>
            </v-flex>
            <v-flex xs2 class="text-right align-self-center">
              <template v-if="canEdit">
                <v-btn class="circle__button mx-auto px-1 light--green" @click="selectMed(med, index)"><v-icon class="color-pr1">{{ 'fa-edit' }}</v-icon></v-btn>
              </template>
            </v-flex>
            <v-flex xs8 class="mt-5 px-1">
              <small class="font-italic">Note: {{ med.notes }}</small>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
    </template>

    <template v-if="!meds.length">
        <v-flex xs12 class="text-center mt-5">
          <small class="py-8">Add medicines</small>
        </v-flex>
    </template>

    <v-layout row wrap mx-auto>
      <template v-if="canEdit">
        <v-flex xs12 class="text-center">
          <v-btn
            class="custom-btn filled-white s-btn mx-auto text-small"
            @click="openAddPrescription()"
          >
            <v-icon class="color-pr1">{{ 'fa-plus' }}</v-icon>
            Add New
          </v-btn>
        </v-flex>
      </template>

      <AddPrescriptionDialog 
      ref="add-prescription"
      @add="add"
      :selected="selectedMed"
      @update="update"
      ></AddPrescriptionDialog>
      
    </v-layout>
  </div>
</template>
<script>
import AddPrescriptionDialog from './Modals/AddPrescriptionDialog.vue'
  export default {
   
    props: {
      items: {
        type: Array,
        default: []
      },

      canEdit: {
        type: Boolean,
        default: true
      }
    },

    components: {
      AddPrescriptionDialog,
    },

    watch: {
      items: {
        handler() {
          this.meds = this.items;
        }, deep: true
      },
    },

    data () {
      return {
        
        meds: [],

        prescView: false,
        addPrescriptionDialog: false,
        editPrescriptionDialog: false,
        selectedMed: {},
      }
    },

    methods: {

      /*
      |--------------------------------------------------------------------------
      | @Methods
      |--------------------------------------------------------------------------
      */

      /**
       * Adding item
       * 
       * @param object item
       */
      add(item) {
        this.meds.push(item);
      },

      /**
       * Updating item
       * 
       * @param  object item
       */
      update(item) {
        this.meds[item.index] = { ... item.item };
        this.selectedMed = {};
      },

      /**
       * Select speicified item
       * 
       * @param  object med
       * @param  int index
       */
      selectMed(med, index) {
        this.selectedMed = med;
        this.selectedMed.index = index;
        this.openAddPrescription();
      },

      /**
       * Open prescription creator
       * 
       */
      openAddPrescription() {
        this.$refs['add-prescription'].show();
      },
      
    }
  }
</script>