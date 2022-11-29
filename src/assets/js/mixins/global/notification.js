import { bus } from '../../EventBus.js';
export default {
	methods: {
		setupPushNotif() {
			var $this = this;
	        var push = PushNotification.init({
	            android: {
	                senderID: 876723025628,
	                clearBadge: true
	            },
	            ios: {
	                alert: "true",
	                badge: "true",
	                sound: "true",
	                clearBadge: true
	            },
	        });

	        //registration
	        push.on('registration', function(data) {
	            console.log('Registering device token -----');
	            var data = {
	                'token' : data.registrationId,
	                'platform' : device.platform,
	                'deviceable_id' : localStorage.user ? JSON.parse(localStorage.user).id : 0,
	            }
	            axios.post($this.routes['api.doc.store.token'], data).then(response => {
	            	window.localStorage.setItem('pushnotifs/setToken', response.data.token);
	            });
	        });

	        push.on('notification', (data) => {
	            if(data.title == 'Calling...') {
	            	var doctor = data.message.split('is calling you.');
	            	if(!$this.$store.state.onlineConsultation.onCall) {
						cordova.plugins.CordovaCall.setVideo(true);
		            	cordova.plugins.CordovaCall.setIcon('icon');
		            	cordova.plugins.CordovaCall.setAppName(data.message);
		            	cordova.plugins.CordovaCall.receiveCall(doctor[0]);
		            	cordova.plugins.CordovaCall.on('answer', function(e) {
		            		$this.$store.commit('onlineConsultation/setOnCall', true);
			                $this.$PRXRouter().goTo('video-call-receiver');
			                setTimeout(() => {
			                	cordova.plugins.CordovaCall.endCall((success) => {
			                		// code 
			                	}, (error) => {
			                		console.log('Error', error)
			                	});
			                }, 2000)  
		            	});

		            	cordova.plugins.CordovaCall.on('reject', function(e) {
	                        $this.callRejected();
	                    });
	            		
	            	}
	            	

	            } else if(data.message == 'Patient not answer the call.') {
	            	bus.$emit('no_answer' , data);
	            } else {
            		bus.$emit('new_notification' , data);	        	
            		$this.$store.commit('notificationReceive/set', data.message);
            		// $this.$store.commit('notificationReceive/setMessage', data.message);
            		// $this.$store.commit('notificationReceive/setTitle', data.title);
            	    console.log('notification received ...');
	            }
	        });

	        push.on('error', function(e) {
	            console.log('Error, ' + e);
	        })
		},

		callRejected() {
            var data = {end_call: true}
            axios.post(this.routes['api.doctor.video-call-session.show'], data)
                .then(response => {
                	console.log('cancelled');
					// var session = OT.initSession(this.$store.state.api.opentok_key, response.data.session);
					// session.connect(response.data.token, function (error) {
					// 	console.log(error);
					// });					
			  //   	session.disconnect();
                }).catch((err) => {
                	console.log(err);
                });
        }

	}
}