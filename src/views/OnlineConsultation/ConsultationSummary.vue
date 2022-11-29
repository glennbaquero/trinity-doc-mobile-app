<template>
    <!-- Filter View -->
    <v-navigation-drawer
    v-model="consultationSummary"
    fixed
    left
    class="online__consultationHolder"
    width="100%"
    touchless
    >
        <v-card class="online__consultationCol" style="border-radius: 0 !important;">
            <v-toolbar class="consultation__historyTitle type-shdw-gray py-3 frm-elevation" style="border-radius: 0 !important;">
                <v-btn icon dark @click="hide">
                    <v-icon class="back--icon">{{ 'fa-chevron-left' }}</v-icon>
                </v-btn>
                <v-toolbar-title>Consultation Summary</v-toolbar-title>
            </v-toolbar>
        </v-card>
        <v-container class="py-7 header__marginTop">
          <v-form v-model="isValid">
            <v-layout row wrap mx-auto class="px-5">
                <v-flex xs12>
                  <v-text-field
                   :disabled="!canEdit"
                   v-model="post.notes"
                   dense
                   label="Notes"
                   :rules="[rules.required]"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field
                  :disabled="!canEdit"
                   v-model="post.next_action"
                   dense
                   label="Next Actions"
                   :rules="[rules.required]"
                  ></v-text-field>
                </v-flex>
            </v-layout>
          

            <v-layout row wrap mx-auto>
              <v-flex xs12 class="px-5 mt-5">
                <p class="font-weight-bold color-pr2">Prescription</p>
              </v-flex>
            </v-layout>

            <PrescriptionTable
            :items="post.meds"
            ref="prescriptionTable"
            :can-edit="canEdit"
            ></PrescriptionTable>
            
            <v-layout row wrap mx-auto class="mt-5">
              <v-flex xs12 class="px-5 date__prescriptionHolder">
                <v-dialog
                  ref="dialog"
                  v-model="modal"
                  :return-value.sync="post.date_validity"
                  persistent
                  width="290px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="post.date_validity"
                      label="Valid Until"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                      :rules="[rules.required]"
                      :disabled="!canEdit"
                    ></v-text-field>
                  </template>
                  <v-date-picker 
                  :min="minDate"
                  v-model="post.date_validity" scrollable>
                    <v-spacer></v-spacer>
                    <v-btn text color="primary" @click="modal = false">Cancel</v-btn>
                    <v-btn text color="primary" @click="$refs.dialog.save(post.date_validity)">OK</v-btn>
                  </v-date-picker>
                </v-dialog>
              </v-flex>
              
              <template v-if="canEdit">
                <v-flex xs12>
                    <v-btn
                      class="custom-btn filled-pr1 lg-btn mx-auto text-small  py-5"
                      :disabled="!isValid"
                      @click="submit()"
                    >
                      Save
                    </v-btn>
                </v-flex>
              </template>
            </v-layout>
          </v-form>
        </v-container>

      <Loader
      :loading="loading"
      ></Loader>

      <Dialog
      :show="successModal"
      :item="modalMessage"
      @close="setModal"
      ></Dialog>

    </v-navigation-drawer>
</template>

<script>
import Dialog from '@/components/Dialog'
import Loader from '@/components/Loader'
import PrescriptionTable from './PrescriptionTable.vue'

    export default {

        props: {
          consultation: {
            type: Object,
            default: {}
          },

          minutes: {
            type: [Number],
            default: 0
          },

          seconds: {
            type: [Number],
            default: 0
          },

          canEdit: {
            type: Boolean,
            default: true
          },

        },

        components: {
          Dialog,
          Loader,
          PrescriptionTable,
        },

        computed: {
          minDate() {
            return moment().format('Y-MM-DD');
          },
        },

        data () {
          return {

            modal: false,
            consultationSummary: false,

            post: {
              notes: null,
              next_action: null,
              date_validity: new Date().toISOString().substr(0, 10),
              meds: [],
            },

            rules: {
              required: value => !!value || 'Required field.', 
            },

            isValid: false,
            loading: false,

            successModal: false,
            modalMessage: {}
          }
        },

        methods: {
          /**
           * Fetch resources from api
           * 
           */
          fetchResources() {
            this.setLoading(true);            
            let data = {
              consultation_id: this.consultation.id
            }

            axios.post(this.routes['api.doctor.medical-prescriptions.fetch'], data)
              .then((response) => {
                this.setLoading(false);                
                let prescription = response.data.prescription.medical_prescription;
                this.post = {
                  notes: prescription.notes,
                  next_action: prescription.next_action,
                  date_validity: prescription.date_validity,
                  meds: response.data.prescription.meds
                };
              }).catch((err) => {
                this.setLoading(false);
              });
          },

          getPost() {
            let post = this.post;
            post.consultation_id = this.consultation.id;
            post.remaining = (this.minutes * 60) + this.seconds;
            post.meds = this.$refs['prescriptionTable'].meds;
            return post;
          },

          /**
           * Submit prescription to api
           */
          submit() {
            this.setLoading(true);
            axios.post(this.routes['api.doctor.medical-prescriptions.store'], this.getPost())
              .then((response) => {
                this.setLoading(false);
                this.modalMessage = {
                  title: response.data.title,
                  message: response.data.message
                };
                this.setModal();
              }).catch((err) => {
                this.setLoading(false);
              });
          },

          /**
           * Set loading status
           * 
           * @param boolean status
           */
          setLoading(status) {
            // this.loading = status;
          },

          setModal() {
            this.successModal = this.successModal ? false: true;
            if(!this.successModal) {
              this.$emit('ended')
              this.consultationSummary = false;
            }
          },

          show() {
            this.consultationSummary = true;
            this.fetchResources();
          },

          hide() {
            this.$emit('hide')
            this.consultationSummary = false;
          },

        },
    }
</script>