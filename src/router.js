import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from './views/Home.vue'
import ProductPage from './views/Products/ProductPage.vue'
import SelectedProductPage from './views/Products/SelectedProductPage.vue'
import PatientPage from './views/Patients/PatientPage.vue'
import SelectedPatientPage from './views/Patients/SelectedPatientPage.vue'
import RewardsPage from './views/Rewards/RewardsPage.vue'
import SelectedRewardsPage from './views/Rewards/SelectedRewardsPage.vue'
import ModulesPage from './views/Modules/ModulesPage.vue'
import SelectedModulePage from './views/Modules/SelectedModulePage.vue'
import LoginPage from './views/LoginPage.vue'
import ForgotPasswordPage from './views/ForgotPasswordPage.vue'
import SignupPage from './views/SignupPage.vue'
import Notification from './views/Notification.vue'
import ProfilePage from './views/ProfilePage.vue'
import QrcodePage from './views/QrcodePage.vue'
import MyPatientHealthPage from './views/MyHealth/MyPatientHealthPage.vue'
import HelpPage from './views/HelpPage.vue'
import VideoCallDispatcher from './views/OnlineConsultation/VideoCallDispatcher.vue'
import VideoCallReceiver from './views/OnlineConsultation/VideoCallReceiver.vue'
import ChatPage from './views/OnlineConsultation/ChatPage.vue'
import OnlineConsultation from './views/OnlineConsultation/OnlineConsultation.vue'
import ConsultationHistory from './views/OnlineConsultation/ConsultationHistory.vue'


Vue.use(VueRouter)

export default new VueRouter({
  routes: [

    /* Auth */
    { name: 'login', path: '/', component: LoginPage },
    { name: 'forgot-password', path: '/forgot-password', component: ForgotPasswordPage },
    { name: 'signup', path: '/signup', component: SignupPage },

    /* Pages */
    { name: 'home', path: '/home', component: Home },
    { name: 'products', path: '/products', component: ProductPage },
    { name: 'selected-products', path: '/selected-products', component: SelectedProductPage },
    { name: 'patients', path: '/patients', component: PatientPage },
    { name: 'selected-patient', path: '/selected-patient', component: SelectedPatientPage },
    { name: 'rewards', path: '/rewards', component: RewardsPage },
    { name: 'selected-rewards', path: '/selected-rewards', component: SelectedRewardsPage },
    { name: 'modules', path: '/modules', component: ModulesPage },
    { name: 'selected-module', path: '/selected-module', component: SelectedModulePage },
    { name: 'notification', path: '/notification', component: Notification },
    { name: 'profile', path: '/profile', component: ProfilePage },
    { name: 'qrcode', path: '/qrcode', component: QrcodePage },
    { name: 'mypatient-health', path: '/mypatient-health', component: MyPatientHealthPage },
    { name: 'help', path: '/help', component: HelpPage },
    { name: 'video-call-dispatcher', path: '/video-call-dispatcher/:params', component: VideoCallDispatcher },
    { name: 'video-call-receiver', path: '/video-call-receiver', component: VideoCallReceiver },
    { name: 'chats', path: '/chats', component: ChatPage },
    { name: 'online-consultation', path: '/online-consultation', component: OnlineConsultation },
    { name: 'consultation-history', path: '/consultation-history', component: ConsultationHistory },    
  ]
})
