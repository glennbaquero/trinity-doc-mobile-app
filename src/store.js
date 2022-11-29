import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	modules: {
		screen: {
			namespaced: true,
			state: {
				scrollable: true
			},

			mutations: {
				scrollable (state, value) {
					state.scrollable = value
				}
			}
		},
		api: {
			namespaced: true,
			state: {
				routes: [],
				opentok_key: null,
			},
			mutations: {
				set(state, value) {
					state.routes = value ? value : {};
				},

				setKey(state, value) {
					state.opentok_key = value;
				}
			},
		},

		user: {
			namespaced: true,
			state: {
				details: {},
				auth: false,
				token: null,
				linked_patients: [],
				patient_count: null,
				points: null,
				most_purchased: [],
				patient_records: [],
				pageItems: [],
			},
			mutations: {
				set(state, value) {
					state.details = value ? value : {}; 
				},

				setToken(state, value) {
					state.token = value;
				},

				setLinkedPatients(state, value) {
					// state.linked_patients.push(...value);
		      		state.linked_patients = value ? value : null; 
				},

				setPatientCount(state, value) {
					state.patient_count = value;
				},

				setPoints(state, value) {
					state.points = value;
				},

				setPageItem(state, value) {
					state.pageItems = value;
				},

				setMostPurchased(state, value) {
					if(value) {
						// state.most_purchased.push(...value);
			      		state.most_purchased = value ? value : null; 
					}
				},

				setPatientRecords(state, value) {
					state.patient_records = value;
				},

				authenticate(state) {
					state.auth = true;
				},

				clearAuth(state) {
					state.auth = false;
					state.token = null;
				},
			},
		},

		notifications: {
			namespaced: true,
			state: {
				items: [],
				page: 1,
			},
			mutations: {
				append(state, value) {
					state.items.push(...value);
				},

				pageIncrement(state, value) {
					state.page += value;
				},
				pageReset(state, value) {
					state.page = value;
				},
				itemReset(state, value) {
					state.items = [];
				}
			}
		},

		pushnotifs: {
			namespaced: true,
			state: {
				token: null,
			},
			mutations: {
				setToken(state,value) {
					state.token = value;
				},
			}
		},

		products: {
			namespaced: true,
			state: {
				items: [],
				page: 1,
				selected: {},
			},
			mutations: {
				append(state, value) {
					// state.items.push(...value);
		      		state.items = value ? value : null; 
				},

				pageIncrement(state, value) {
					state.page += value;
				},

				reset(state) {
					state.page = 1;
					state.items = [];
				},

				show(state, value) {
					state.selected = value;
				}
			},
		},

		patients: {
			namespaced: true,
			state: {
				items: [],
				page: 1,
				selected: {},
			},
			mutations: {
				append(state, value) {
					state.items.push(...value);
				},

				pageIncrement(state, value) {
					state.page += value;
				},

				reset(state) {
					state.page = 1;
					state.items = [];
				},

				show(state, value) {
					state.selected = value;
				}
			},
		},

		articles: {
			namespaced: true,
			state: {
				items: [],
				page: 1,
				selected: {},
				random: [],
				count: null,
			},
			mutations: {
				append(state, value) {
					state.items.push(...value);
		      		// state.items = value ? value : null; 
				},

				pageIncrement(state, value) {
					state.page += value;
				},

				reset(state) {
					state.page = 1;
					state.items = [];
				},

				show(state, value) {
					state.selected = value;
				},

				setRandom(state, value) {
					// state.random.push(...value);
		      		state.random = value ? value : null; 
				},

				setCount(state, value) {
					state.count = value;
				}
			},
		},

		pageName: {
		  	namespaced: true,
		  	state: {
		    	name: 'Home',
		  	},
		  	mutations: {
		    	set(state, value) {
		      	state.name = value ? value : null; 
		    	},
		  	},
		},

		rewards: {
			namespaced: true,
			state: {
				categories: [],
				items: [],
				selected: {},
				redeemed: [],
				selectedSponsorships: [],
			},
			mutations: {
				appendCategories(state, value) {
					// state.categories.push(...value);
		      		state.categories = value ? value : null; 
				},

				appendItems(state, value) {
					// state.items.push(...value);
		      		state.items = value ? value : null; 
				},

				appendRedeemed(state, value) {
					if(value) {
						// state.redeemed.push(...value);
			      		state.redeemed = value ? value : null; 
					}
				},

				appendSelectedSponsorships(state, value) {
					// state.selectedSponsorships = [];
					// state.selectedSponsorships.push(...value);
		      		state.selectedSponsorships = value ? value : null; 
				},

				reset(state) {
					state.items = [];
				},

				show(state, value) {
					state.selected = value;
				}
			}
		},

		notificationReceive: {
		  	namespaced: true,
		  	state: {
		    	received: false,
		  	},
		  	mutations: {
		    	set(state, value) {
		      		state.received = value ? value : null; 
		    	},
		  	},
		},
		pageItems: {
			namespaced: true,
			state: {
				terms: null,
				privacy: null,
			},
			mutations: {
		    	setTerms(state, value) {
		      		state.terms = value; 
		    	},
		    	setPrivacy(state, value) {
		      		state.privacy = value; 
		    	},
		  	},
		},

        onlineConsultation: {
            namespaced: true,
            state: {
                consultation: {},
                timer: {},
                onCall: false,
            },
            mutations: {
                setConsultation(state, value) {
                    state.consultation = value;
                },
                setTimer(state, value) {
                	state.timer = value;
                },
                setOnCall(state, value) {
                	state.onCall = value;
                }
            },
        },

	},

	getters: {
		//
	}
})
