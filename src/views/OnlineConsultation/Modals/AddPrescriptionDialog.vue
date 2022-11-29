<template>
  <v-row justify="center">
    <v-dialog
      v-model="addPrescription"
      max-width="310"
    >
      <v-card class="health__dialogCon pa-6">
        <v-layout row wrap>
          <v-flex xs12>
            <p class="mb-0 font-weight-bold">Add Item</p>
          </v-flex>
        </v-layout>

        <v-form v-model="isValid">        
          <v-layout row wrap>
            <v-flex xs12>
                <v-text-field
                  v-model="post.name"
                  dense
                  label="Product Name"
                  :rules="[rules.required]"
                ></v-text-field>
            </v-flex>
            <v-flex xs12>
                <v-text-field
                  v-model="post.dosage"
                  dense
                  label="Dosage"
                  :rules="[rules.required]"
                ></v-text-field>
            </v-flex>
            <v-flex xs12>
                <v-text-field
                  v-model="post.duration"
                  dense
                  label="Duration"
                  :rules="[rules.required]"
                ></v-text-field>
            </v-flex>
            <v-flex xs12>
                <v-text-field
                  v-model="post.notes"
                  dense
                  label="Notes"
                ></v-text-field>
            </v-flex>
          </v-layout>

        <v-card-actions>
          <v-layout row wrap>
            <v-flex xs6>
              <v-btn class="custom-btn filled-white s-btn mx-auto text-small" @click="hide()">Cancel</v-btn>
            </v-flex>
            <v-flex xs6 class="align-self-center text-right">
              <v-btn 
                class="custom-btn filled-pr1 s-btn mx-auto text-small" 
                :disabled="!isValid"
                @click="submit()"
                >Save</v-btn>
            </v-flex>
          </v-layout>
        </v-card-actions>
      </v-form>

      </v-card>
    </v-dialog>
  </v-row>
</template>


<script>

  export default {

    props: {
      selected: {
        type: Object,
        default: null,
      },
    },


    data () {
      return {
        addPrescription: false,

        isValid: false,
        rules: {
          required: value => !!value || 'Required field',
        },

        post: {
          name: null,
          dosage: null,
          duration: null,
          notes: null,
        }

      }
    },

    watch: {
      selected: {
        handler() {
          this.post = { ...this.selected };
        }, deep: true 
      },
    },

    methods: {

      /*
      |--------------------------------------------------------------------------
      | @Methods
      |--------------------------------------------------------------------------
      */

      submit() {
        if(this.selected.index != null) {
          this.$emit('update', {
            item: this.post,
            index: this.selected.index
          });
        } else {
          this.$emit('add', this.post);
        }
        
        this.clearFields();
        this.hide();
      },

      clearFields() {
        this.post = {
          name: null,
          dosage: null,
          duration: null,
          notes: null
        };
      },

      show() {
        this.addPrescription = true;
      },
      hide() {
        this.addPrescription = false;
      }
    },
  }
</script>