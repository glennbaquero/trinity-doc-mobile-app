import Vue from 'vue'

import ConfigMixin from './config.js';
import AuthMixin from './auth.js';
import PushNotification from './notification.js';

Vue.mixin({
	mixins: [ ConfigMixin, AuthMixin, PushNotification ],
	// mixins: [ ConfigMixin, AuthMixin ],
});