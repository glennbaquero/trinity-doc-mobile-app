<template>
    <!-- Filter View -->
    <v-navigation-drawer
    v-model="chatView"
    fixed
    left
    class="chat__pageCon"
    width="100%"
    style="position: fixed"
    stateless
    touchless
    >
    <v-card class="chat__headerCon">
        <v-toolbar class="py-4">
            <v-btn icon dark @click="hide">
                <v-icon class="back--icon">{{ 'fa-chevron-left' }}</v-icon>
            </v-btn>
            
            <template v-if="patient">
                <v-img :src="patient.full_image" class="mr-7 chat__profileImg" max-width="45px" width="45px" height="45px"></v-img>

                <div class="chat__nameHolder">
                    <v-toolbar-title class="font-weight-bold">{{ patientName }}</v-toolbar-title> 
               </div>
            </template>
            <template v-if="canChat">
                <v-img 
                @click="videoCall('voice')"
                :src="$PRXConfig().staticUrl('icons/call.svg')" class="call--icon" max-width="40px" max-height="40px" width="40px" height="60px"></v-img>
                <v-img :src="$PRXConfig().staticUrl('icons/video.svg')" class="video--icon" max-width="40px" max-height="40px" width="40px" height="60px" @click="videoCall('video')"></v-img>
            </template>

        </v-toolbar>
    </v-card>
    <div class="chat__timeHolder text-center gradient--toRight">
        <p class="mb-0 clr-white font-weight-bold">00:{{ minutes | format }}:{{ seconds | format }}</p>
    </div>

    <v-layout row wrap mx-auto class="chat__convoHolder mt-5">
        
        <template v-if="!conversation.length">
            <v-layout row wrap mx-auto>
                <v-flex xs12 text-center>
                    <p class="font-weight-bold mb-0 type-gray">Start your conversation with {{  patient ? patient.fullname: '' }}</p>                                
                </v-flex>
            </v-layout>        
        </template>

        <template v-for="(chat, index) in conversation">

            <!-- Receiver -->
            <template v-if="chat.receiver">
                <!-- Receiver -->
                <template v-if="chat.message != 'null' && !chat.file">            
                    <v-flex xs12 
                    :id="'bubble' + index"                    
                    class="pa-5">
                        <v-layout row wrap mx-auto>
                            <v-flex xs2>
                                <v-img :src="chat.sender_image" class="mr-7 chat__profileImg" max-width="45px" width="45px" height="45px"></v-img>
                            </v-flex>
                            <v-flex xs10>
                                <div class="receiver__contentHolder frm-elevation py-3">
                                    <div class="receiver__content">
                                        <small class="font-weight-normal" v-html="chat.message"></small>
                                        <v-flex text-right>
                                            <small class="font-weight-normal"><i>{{ chat.readable_date }}</i></small>
                                        </v-flex>
                                    </div>
                                </div>
                            </v-flex>
                        </v-layout>
                    </v-flex>
                </template>

                <template v-if="chat.message == 'null' && chat.file">
                    <v-flex 
                    :id="'bubble' + index"
                    xs12 class="pa-5">
                        <v-layout row wrap mx-auto>
                            <v-flex xs2>
                                <v-img :src="chat.sender_image" class="mr-7 chat__profileImg" max-width="45px" width="45px" height="45px"></v-img>
                            </v-flex>
                            <v-flex xs10>
                                <div class="receiver__contentHolder frm-elevation py-3">
                                    <div class="receiver__content">
                                        <v-img 
                                        @click="previewImage(chat.file)"
                                        :src="chat.file" class="" max-width="100%" width="100%" height="auto"></v-img>
                                    </div>
                                </div>
                            </v-flex>
                        </v-layout>
                    </v-flex>
                </template>

            </template>

            <template v-if="chat.sender">
                <!-- Sender -->
                <template v-if="chat.message != 'null' && !chat.file">
                    <v-flex 
                    :id="'bubble' + index"
                    xs12 class="pa-5">
                        <v-layout row wrap mx-auto>
                               <v-flex xs2>

                            </v-flex>
                            <v-flex xs10>
                                <div class="sender__contentHolder frm-elevation py-3">
                                    <div class="sender__content">
                                        <small class="font-weight-normal" v-html="chat.message"></small>
                                        <v-flex text-right>
                                            <small class="font-weight-normal"><i>{{ chat.readable_date }}</i></small>
                                        </v-flex>
                                    </div>
                                </div>
                            </v-flex>
                        </v-layout>
                    </v-flex>
                </template>
                
                <template 
                v-if="chat.message == 'null' && chat.file">
                    <v-flex 
                    :id="'bubble' + index"
                    xs12 class="pa-5">
                        <v-layout row wrap mx-auto>
                            <v-flex xs2>

                            </v-flex>
                            <v-flex xs10>
                                <div class="sender__contentHolder frm-elevation py-3">
                                    <div class="sender__content">
                                        <v-img 
                                        @click="previewImage(chat.file)"
                                        :src="chat.file" class="" max-width="100%" width="100%" height="auto"></v-img>
                                    </div>
                                </div>
                            </v-flex>
                        </v-layout>
                    </v-flex>
                </template>

            </template>

        </template>

        <template v-for="chat in filteredToSend">
            <v-flex 
            xs12 class="pa-5">
                <v-layout row wrap mx-auto>
                       <v-flex xs2>

                    </v-flex>
                    <v-flex xs10>
                        <div class="sender__contentHolder frm-elevation py-3">
                            <div class="sender__content">
                                <small class="font-weight-normal" v-html="chat.message"></small>
                                <v-flex text-right>
                                    <small class="font-weight-normal"><i>Sending...</i></small>
                                </v-flex>
                            </div>
                        </div>
                    </v-flex>
                </v-layout>
            </v-flex>
        </template>
        
    </v-layout>

    <template v-if="!canChat">
        
    <!-- Prescription Button -->
        <v-btn
        style="z-index: 10"
        class="custom-btn filled-pr1 s-btn mx-auto text-small prescription__button"
        @click="openConsultationSummary()"
        >
        View Prescription
        </v-btn>
        <div  class="chat__pageCon chat__details" style="z-index: 0 !important">
            <div class="chat__textHolder">        
                <div class="chat__detailsFooter py-3">
                  <div class="chat__detailsInner text-center">
                    <small class="font-weight-normal clr-white">This consultation has ended. You can't reply to this conversation. This is already an archived message.</small>
                  </div>
                </div>
            </div>
        </div>
    </template>

    <!-- End Consultation Button -->
    <template v-if="canChat">
        <v-btn
        class="custom-btn filled-white s-btn mx-auto text-small end__conButton"
        @click="openConsultationSummary()"
        >
        Create Prescription
        </v-btn>

        <v-btn
        class="custom-btn filled-pr1 s-btn mx-auto text-small prescription__button"
        @click="openEndConsultationDialog()"
        >
        End Consultation
        </v-btn>

        <div class="chat__textHolder">
            <div class="chat__textInner">
                <div class="chat__border">
                    <v-text-field
                    v-model="post.message"
                    label="Type a message"
                    class="text__input mb-0"
                    solo
                    :disabled="!enable"
                    ></v-text-field>

                    <template v-if="!post.message">
                        <div 
                        @click="openFileViewer()"
                        class="image--uploadHolder">
                            <input 
                            @change="uploadImage"
                            ref="file"
                            accept="image/*" 
                            type="file" hidden>
                            <v-icon class="">{{ 'fa-camera' }}</v-icon>  
                        </div>
                    </template>
                </div>

                <div class="send__holder" @click="send">
                    <v-icon class="">{{ 'fa-paper-plane' }}</v-icon>
                </div>
            </div>
        </div>

        <EndConsultationDialog 
        ref="end-consulation"
        :consultation="consultation"
        @confirmed="end"
        ></EndConsultationDialog>
    </template>

    <ConsultationSummary 
    :consultation="consultation"
    @ended="setToEnded"
    :minutes="minutes"
    :seconds="seconds"
    ref="consultation-summary"
    :can-edit="canChat ? true: false"
    ></ConsultationSummary>

    <NoticeDialog :show="noticeDialog"></NoticeDialog>

    <Loader
    :message="message"    
    :loading="loading"
    ></Loader>

</v-navigation-drawer>
</template>

<script>
    import { bus } from '@/assets/js/EventBus.js';
    import ConsultationSummary from './ConsultationSummary.vue';
    import EndConsultationDialog from './Modals/EndConsultationDialog.vue'
    import NoticeDialog from './Modals/NoticeDialog.vue'
    import Loader from '@/components/Loader';

    export default {

        components: {
            ConsultationSummary,
            EndConsultationDialog,
            NoticeDialog,
            Loader
        },

        computed: {
            canChat() {
                if(this.consultationStatus == 'Completed' || this.consultationStatus == 'Disapproved' || this.consultationStatus == 'Pending' || this.consultationStatus == 'Refunded') {
                    this.stopTimer();
                    return false;
                } 
                return true;
            },
            
            patientName() {
                if(this.patient) {
                    let name = this.patient.fullname;
                    if(name.length > 10) {
                        name = name.substring(0, 10) + '...';
                    }
                    return name;
                }
            },
            filteredToSend() {
                let messages = this.toSend;

                messages = messages.filter((message) => {
                    return message.status == 0;
                });
                return messages;
            },                        
        },

        data () {
            return {

                enable: true,
                consultation: {},
                patient: null,
                conversation: [],

                post: {
                    message: null, 
                    file: null
                },
                minutes: 0,
                seconds: 0,

                loading: false,

                chatView: true,
                endConsultation: false,
                noticeDialog: false,
                createPrescriptionView: false,

                consultationStatus: "Completed",

                timer: null,
                addedSeconds: 0,

                message: 'Sending message',

                backgroundMode: null,

                toSend: []                
            }
        },

        mounted() {
            this.consultation = this.$store.state.onlineConsultation.consultation;
            this.patient = this.$store.state.onlineConsultation.consultation.patient;
            this.show();
            this.sendNotification();

            this.eventHandler();
            this.backgroundProcessor();            
        },

        beforeRouteLeave (to, from, next) {
            clearInterval(this.timer);
            next()
        },

        methods: {


            /*
            |--------------------------------------------------------------------------
            | @Methods
            |--------------------------------------------------------------------------
            */

            end() {

                let data = {
                    remaining: (this.minutes * 60) + this.seconds,
                    consultation_id: this.consultation.id,
                    status: 'completed'
                };
                this.message = "Please wait...";
                this.loading = true;
                axios.post(this.routes['api.doctor.consultations.update.status'], data)
                    .then((response) => {
                        this.loading = false;
                        this.consultationStatus = 'Completed';
                        this.message = "Sending message";       
                        this.updateOnlineStatus(); 

                    }).catch((err) => {
                        this.message = "Sending message";
                        this.loading = false;
                    });
            },

            /**
             * Fetch messages
             * 
             */
            fetchMessages() {

                return new Promise((resolve, reject) => {                
                    let data = {
                        consultation_id : this.consultation.id,
                    };                
                    axios.post(this.routes['api.doctor.consultation-chats.fetch'], data)
                        .then((response) => {
                            this.conversation = response.data.conversation;
                            this.consultationStatus = response.data.consultationStatus;
                            this.consultation.start_time = response.data.consultation.start_time;

                            if(this.conversation.length) {
                                setTimeout(() => {
                                    document.getElementById("bubble" + (this.conversation.length - 1)).scrollIntoView();
                                }, 100)
                            }
                            resolve(response);
                        }).catch((err) => {
                            reject(err);
                        });
                });
            },

            updateOnlineStatus() {
                let data = {
                    //2 is equal to the "online" online status
                    online: 1
                };

                axios.post(this.routes['api.doctor.update.online-status'], data)
                    .then((response) => {
                        this.$store.commit('user/set', response.data.doctor);
                    }).catch((err) => {

                    }); 
            },

            /**
             * Set post data
             * 
             */
            postData() {
                let data = new FormData();            
                data.append('file', this.post.file);
                data.append('message', this.post.message);                
                data.append('receiver_id', this.patient.id);
                data.append('consultation_id', this.consultation.id);
                
                this.post.message = null;
                this.post.file = null;                
                
                return data;
            },

            /**
             * Store message
             * 
             */
            send() {
                
                if(!this.enable) {
                    return;
                }

                if(!this.post.message  && !this.post.file) {
                    return;
                }

                this.toSend.push({'message': this.post.message, 'status': 0 });
                let key = this.toSend.length - 1;

                return new Promise((resolve, reject) => {
                // this.loading = true;

                    axios.post(this.routes['api.doctor.consultation-chats.store'], this.postData())
                        .then((response) => {
                            this.toSend[key].status = 1;                            
                            this.fetchMessages();
                            resolve(response);                       
                        }).catch((err) => {
                            reject(err)
                        });
                });

            },

            /**
             * Open file picker
             * 
             */
            openFileViewer() {
                if(!this.enable) {
                    return;
                }                
                this.$refs['file'].click();
            },

            /**
             * Upload image
             * 
             * @param  e
             */
            uploadImage(e) {

                let files = e.target.files || e.dataTransfer.files;
                if(!files.length) {
                    return;
                }
                this.post.file = files[0];

                // this.loading = true;

                this.send();
            },

            /**
             * Start timer
             * 
             */
            startTimer() {
                if(this.consultation.start_time && this.consultationStatus == 'Approved') {
                    this.timer = setInterval(() => {
                        let addedSeconds = this.consultation.type == 1 ? this.consultation.remaining : 3600;
                        let start_time = moment(moment().format('Y-MM-DD') +' '+ this.consultation.start_time);

                        let end = start_time.add(addedSeconds, 'seconds');
                        let now = moment();
                        let remaining = end.diff(now, 'seconds');

                        if(remaining <= 0) {
                            this.minutes = 0;
                            this.seconds = 0;
                            this.stopTimer();
                            this.consultationStatus = 'Completed';
                            return;
                        } 
                        if(remaining >= 3600) {
                            this.stopTimer();
                            this.consultationStatus = 'Completed';
                            clearInterval(this.timer);
                            return;                            
                        }
                        
                        if((remaining / 60) === 5 ) {
                            this.$PRX.alert.warning('You have 5 minutes left for this consultation.', 'Reminder:');
                        }

                        this.minutes = parseInt(remaining / 60);
                        this.seconds = remaining % 60;
                        
                    }, 1000);                    
                }

            },

            show() {
                this.minutes = 0;
                this.seconds = 0;
                this.fetchMessages()
                    .then((response) => {
                        this.startTimer();
                    });
            },

            /**
            * Send notification to user once the doctor enters the chat page
            * 
            */
            sendNotification() {
                let data = {
                    consultation_id: this.consultation.id,
                    isUser: 0,
                };
                axios.post(this.routes['api.doctor.consultations.send.notification'], data)
                    .then((response) => {

                    }).catch((err) => {

                    });    
            },

            setCompleted() {
                this.loading = true;
                this.message = 'Please wait.';
                let data = {
                    consultation_id: this.consultation.id,
                    status: 'completed',
                    remaining: (this.minutes * 60) + this.seconds,
                };

                axios.post(this.routes['api.doctor.consultations.update.status'], data)
                    .then((response) => {
                        this.loading = false;
                        this.fetchMessages();
                        this.updateOnlineStatus();
                        this.stopTimer();
                    }).catch((err) => {
                        this.loading = false;
                    });                
            },

            hide() {
                this.stopTimer();
                this.$PRXRouter().goBack();
            },

            openEndConsultationDialog() {
                this.$refs['end-consulation'].show();
            },

            trigNoticeDialog() {
                this.noticeDialog = this.noticeDialog ? false: true;
            },

            openConsultationSummary() {
                this.$refs['consultation-summary'].show();
            },

            previewImage(image) {
                PhotoViewer.show(image);
            },

            setToEnded() {
                this.stopTimer();
                this.fetchMessages();                
                this.updateOnlineStatus();                
            },

            videoCall(type) {
                this.$store.commit('onlineConsultation/setTimer', {
                    minutes: this.minutes,
                    seconds: this.seconds
                });
                this.$router.push({ name: 'video-call-dispatcher', params : { type: type } });
            },

            stopTimer() {
                clearInterval(this.timer);  
            },

            backgroundProcessor() {
                let $this = this;
                document.addEventListener("pause", function() {
                    $this.backgroundMode = setInterval(() =>  {
                        $this.fetchMessages();
                    }, 1000);               
                }, false);
                
                document.addEventListener("resume", function() {
                    clearInterval($this.backgroundMode);
                }, false);
            },

            /*
            |--------------------------------------------------------------------------
            | @Events
            |--------------------------------------------------------------------------
            */
            
            eventHandler() {
                bus.$on('new_notification', () => {
                    if(this.consultation) {
                        this.fetchMessages();
                    }
                });
            },
        },

        filters: {
            format(value) {
                if(value < 10) {
                    return '0' + value;
                }
                return value;
            }
        },

    }
</script> 