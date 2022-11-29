<template>
  	<v-navigation-drawer
  	v-model="acceptcallView"
  	fixed
  	left
  	class="chat__pageCon chat__details acceptCall__Holder"
  	width="100%"
  	touchless
  	>
  	    <v-card class="chat__headerCon frm-elevation" style="z-index: 10">
  	        <v-toolbar class="py-2">
  	            <v-img :src="$PRXConfig().staticUrl('icons/video.svg')" class="chat--icon" max-width="40px" max-height="40px" width="40px" height="60px"></v-img>
  	            <vs-switch v-model="withVideo" class="video--switch">
  	              <template #off>
  	                  <v-icon>{{ 'fa-video-slash' }}</v-icon>
  	              </template>
  	              <template #on>
  	                  <v-icon>{{ 'fa-video' }}</v-icon>                                                                              
  	              </template>
  	            </vs-switch>
  	        </v-toolbar>
  	    </v-card>
  	    <div class="chat__timeHolder text-center gradient--toRight">
		    <p class="mb-0 clr-white font-weight-bold">00:{{ minutes | format }}:{{ seconds | format }}</p>
  	    </div>

  	    <template v-if="display">
	  	    <v-layout row wrap mx-auto>
	  	      	<v-flex xs12 class="videoHolder">
	  	        	<div id="publisherAppend" >
	      	  			<loading :active="!hasSubscriber" loader="dots" color="#fff" :is-full-page="false" width="10" height="10" zIndex="9" background-color="#000"></loading>
		      	  		<div id="subscriber" style="width: 100%; height: 100%; background-color: white"></div>
	  	        	</div>
	  	      	</v-flex>
	  	    	<v-flex xs12 class="videoHolder">
	  	  			<!-- <loading :active="isRendering" loader="dots" color="#fff" :is-full-page="false" width="10" height="10" zIndex="9" background-color="#000"></loading> -->s
	  	        	<div id="publisherAppend" >
		      	  		<div id="publisher" style="width: 100%; height: 100%; background-color: black"></div>
	  	        	</div>
	  	      	</v-flex>
	  	    </v-layout>
	  	      <v-layout row wrap mx-auto class="px-5 call__buttonHolder pb-6">
	  	      	<v-snackbar
	  	      	    v-model="snackbar"
	  	      	    timeout="25000"
	  	      	    color="warning">

	  	      	    You have 5 minutes left for this consultation.

	  	      	    <template v-slot:action="{ attrs }">
	  	      	        <v-btn
	  	      	          	text
	  	      	          	v-bind="attrs"
	  	      	          	@click="snackbar = false"
	  	      	        >
	  	      	          	Okay
	  	      	        </v-btn>
	  	      	    </template>
	  	      	</v-snackbar>
                <template v-if="confirmation">
	                <v-flex xs6 class="align-self-center text-center">
	                    <v-btn 
	                    @click="confirmation = false"
	                    class="mx-auto my-2 patientCard--button" small fab color="red">
	                      <v-icon>{{ 'fa-times' }}</v-icon>
	                    </v-btn>
	                    <small class="clr-white">Cancel</small>
	                </v-flex>
	                <v-flex xs6 class="align-self-center text-center">
	                    <v-btn
	                    @click="openConsultationSummary()" 
	                    class="mx-auto my-2 patientCard--button" small fab color="green">
	                      <v-icon>{{ 'fa-check' }}</v-icon>
	                    </v-btn>
	                    <small class="clr-white text-small">End</small>
	                </v-flex>

	                <v-flex xs12 class="mt-3 align-self-center text-center">
	                    <p class="clr-white"><b>End Call?</b></p>
	                </v-flex>

	            </template>

	            <template v-else>
		  	        <v-col text
		  	          cols="6" class="pa-0 text-center patienCard--buttonHolder">
		  	              <v-btn class="mr-5 ml-auto my-2 patientCard--button" small fab :style="[ withVoice ? {'background': 'gray' } : {'background': 'red' } ]" @click="turnOffVoice()">
		  	                  <v-icon>{{ 'fa-microphone' }}</v-icon>
		  	              </v-btn>
		  	          </v-col>
		  	          <v-col 
		  	          cols="6" class="pa-0 text-center patienCard--buttonHolder">
		  	              <v-btn class="ml-5 mr-auto my-2 patientCard--button" small fab color="red" @click="end">
		  	                  <v-icon>{{ 'fa-phone' }}</v-icon>
		  	              </v-btn>
		  	          </v-col>
		  	          <v-layout row wrap mx-auto class="mt-5">
		  	            <v-flex xs12 class="px-5">
		  	               <v-btn
		  	                  class="custom-btn filled-pr1 lg-btn mx-auto text-small"
		  	                  @click="showConfirmation"
		  	                  >
		  	                  Create Prescription
		  	              </v-btn>
		  	            </v-flex>
		  	          </v-layout>
	  	          </template>

	  	      </v-layout>

			<!-- Div -->
			<v-layout row wrap mx-auto>
			  <v-flex xs12 class="pa-5">
			    <p>
			    </p>
			  </v-flex>
			  <v-flex xs12 class="pa-5">
			    <p><div id="subscriber" style="width: 100%; height: 100%"></div></p>
			  </v-flex>
			</v-layout>
			<!-- End Div -->
		</template>

    <ConsultationSummary 
    :consultation="consultation"
	@ended="$PRXRouter().goBack()"
    @hide="$PRXRouter().goBack()"
    :minutes="minutes"
    :seconds="seconds"    
    ref="consultation-summary"></ConsultationSummary>

  	</v-navigation-drawer>
</template>
<script type="text/javascript">

    import ConsultationSummary from './ConsultationSummary.vue';

	import Loading from 'vue-loading-overlay';
    // Import stylesheet
    import 'vue-loading-overlay/dist/vue-loading.css';
	export default {
		components: {
			Loading,
			ConsultationSummary
		},

		data() {
			return {
				acceptcallView: true,
				show: false,
				sessionID: null,
				token: null,
				key: null, //change this upon deploying to production
				withVoice: true,
				withVideo: true,
				showButtons: false,
				connectionId: null,
				session: null,
				publisher: null,
				subscriber: null,
				hasSubscriber: false,
				isRendering: true,

				timer: null,

                minutes: 0,
                seconds: 0,	

                display: true,         			
                confirmation: false,

                consultation: {},
                patient: {},
                snackbar: false
			}

		},

		watch: {
			withVideo(val) {
		    	var publisher = this.publisher;
		    	publisher.publishVideo(val);
			},
		},

		mounted() {
            this.key = this.$store.state.api.opentok_key;
		    this.deviceIsReady();
            this.backgroundProcessor();
            this.lockPortrait();  
			document.addEventListener('backbutton', this.onBackbutton.bind(this), false);		    
		},

        beforeRouteLeave (to, from, next) {
            clearInterval(this.timer);
            next();
        },

		methods: {
		  	deviceIsReady: function() {
		  		var data = {};

			  	
			  	axios.post(this.routes['api.doctor.video-call-session.show'], data)
			  		.then(response => {
			  			this.sessionID = response.data.session;
			  			this.token = response.data.token;
				  		this.session = OT.initSession(this.key, this.sessionID);
				  		this.patient = response.data.patient;
				  		this.consultation = response.data.consultation;
				  		this.startTimer();
			  			document.addEventListener('deviceready', this.runVideoCall.bind(this), false);
			  			setTimeout(() => {
			  				this.showButtons = true;
			  			}, 10000)
			  		}).catch(errors => {
			  			console.log(errors);
			  		})		    
		  	},

		  	runVideoCall() {
		  		// Initialize Session Object

		  		var $this = this;
		  		var session = this.session;
		  		
		  		
		  		// initialize a publisher
		  		var options = {
		  		  	insertMode: 'append',
		  		  	width: 400,
		  		  	height: 227,
		  		  	zIndex: 1000,
		  		};

		  		this.publisher = OT.initPublisher('publisher', options);
		  		var publisher = this.publisher;

		  		session.on({

		  		  	streamCreated: function(event) {
		  		  		$this.hasSubscriber = true;
		  		    	$this.subscriber = session.subscribe(event.stream, 'subscriber', options);
		  		  	},
		  		  	streamDestroyed: function(event) {
		  		    	$this.end();
		  		  	},
		  		  	sessionConnected: function(event) {
		  		    	session.publish(publisher);
			  			$this.isRendering = false;
		  		  	},

		  		  	streamPropertyChanged: function(event) {
			  		  	// Setting an image to display in audio-only mode
			  		  	if ($this.subscriber.stream.hasVideo) {
			  		    	var imgData = $this.subscriber.getImgData();
			  		    	$this.subscriber.setStyle('backgroundImageURI', imgData);
			  		  	} else {
			  		    	$this.subscriber.setStyle('backgroundImageURI',
			  		      		'https://tokbox.com/img/styleguide/tb-colors-cream.png'
			  		    	);
			  		  	}
		  		  	}

		  		});

		  		session.connect(this.token, function(error) {
		  		  	if (error) {
		  		    	console.log('There was an error connecting to the session:', error);
		  		  	}
		  		});
		  		this.receivedEvent('deviceready');

		  	},

		    // Update DOM on a Received Event
		    receivedEvent: function(id) {
		        var parentElement = document.getElementById(id);
		        console.log(parentElement);
		        console.log('Received Event: ' + id);
		    },

		    turnOffVoice() {
		    	this.withVoice = !this.withVoice;
		    	var publisher = this.publisher;
		    	publisher.publishAudio(this.withVoice);
		    },

		    end() {
		    	var session = this.session;
		    	session.connect(this.token, function(error) {
		    	  	if (error) {
		    	    	console.log('There was an error connecting to the session:', error);
		    	  	}
		    	});
		    	session.disconnect();
		    	this.stopTimer();
        		this.$store.commit('onlineConsultation/setOnCall', false);		    	
	    		this.$PRXRouter().goBack();
		    },

		    changeCamera() {
		    	var publisher = this.publisher;
		    	publisher.cycleVideo();
		    },

            openConsultationSummary() {
            	this.display = false;
				var session = this.session;
		    	session.connect(this.token, function(error) {
		    	  	if (error) {
		    	    	console.log('There was an error connecting to the session:', error);
		    	  	}
		    	});
		    	session.disconnect();
		    	this.stopTimer();
                this.$refs['consultation-summary'].show();
            },

		    onBackbutton() {
		    	this.stopTimer();
		    	this.end();
		    },

            startTimer() {
                if(this.consultation.start_time) {
                    this.timer = setInterval(() => {
                        let addedSeconds = this.consultation.type == 1 ? this.consultation.remaining : 3600;
                        let start_time = moment(moment().format('Y-MM-DD') +' '+ this.consultation.start_time);

                        let end = start_time.add(addedSeconds, 'seconds');
                        let now = moment();
                        let remaining = end.diff(now, 'seconds');

                        if(remaining <= 0) {
                            clearInterval(this.timer);
                            this.end();
                        } 
                        
                        if((remaining / 60) === 5 ) {
                        	this.snackbar = false;
                            // this.$PRX.alert.warning('You have 5 minutes left for this consultation.', 'Reminder:');
                        }

                        this.minutes = parseInt(remaining / 60);
                        this.seconds = remaining % 60;
                        
                    }, 1000);                    
                }

            },

            showConfirmation() {
            	this.confirmation = true;
            },

            stopTimer() {
                clearInterval(this.timer);  
            },            

            backgroundProcessor() {
                let $this = this;
                document.addEventListener("pause", function() {
                	$this.withVideo = false;
                }, false);
                
                document.addEventListener("resume", function() {
					$this.withVideo = true;
                }, false);
            },

            lockPortrait() {
				screen.orientation.lock('portrait');
            }

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

<style type="text/css">
	html, body, .OT_root {
	  background: transparent !important;
	}

	.OT_root video {
	  display: none !important;
	}
</style>