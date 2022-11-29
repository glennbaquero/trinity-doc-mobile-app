<template>
<v-container class="pa-5 help-holder">
<v-row class="no-gutters pt-3">
<v-col cols="12" class="px-0">
<v-text-field
	solo
	v-model="search"
	label="Type Keywords"
	append-icon="fa-arrow-right"
	class=""
></v-text-field>
</v-col>
</v-row>

<v-row class="no-gutters pb-12">
	<v-col cols="12" class="px-0" >
    <template v-for="(item, key) in filteredFaqs">
        <p class="bold color-pr2 sec-title" v-if="key != 'undefined'">{{ item[0].category.name }}</p>
        <template v-if="key != 'undefined'" v-for="faq in item" >
          <v-expansion-panels class="help__accordion mb-3">
            <v-expansion-panel>
              <v-expansion-panel-header class="clr-gray bold">{{ faq.question }}</v-expansion-panel-header>
              <v-expansion-panel-content>
                 <h5 class="font-weight-default" v-html="faq.answer"></h5>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </template>
    </template>
		

    <template v-if="isEmptyFaqs">
      <p class="bold">No data found</p>      
    </template>

	</v-col>
</v-row>

</v-container>
</template>

<script>
import _ from 'lodash'; 

export default {

  watch: {

  },

  computed: {

    filteredFaqs(){

      let faqs = this.items;

      var groups = _.groupBy(faqs, (faq) => {
        return faq.faq_category_id;
      })
      
      if(this.search){
        groups = [];
        groups = _.groupBy(faqs, (faq) => {
          if(faq.question.toLowerCase().includes(this.search.toLowerCase())) {
            return faq.faq_category_id;
          }
        })
      }
    
      return groups;
    },

    isEmptyFaqs() {
      return _.isEmpty(this.filteredFaqs)
    },
  },
  
	data() {
		return {
			items: [],
			search: null,
		}
	},

  mounted(){

    this.init();
    
  },
   
  methods: {

    init(){
      this.fetchFaqs();
    },

    fetchFaqs(){
  
      axios.get(this.routes['api.doctor.faqs.fetch'])
        .then(response =>{
          
          this.items = response.data.faqs;
  
      });

    }

  },

  

}
</script>
