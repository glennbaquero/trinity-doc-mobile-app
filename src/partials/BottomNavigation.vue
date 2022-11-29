<template>
  <v-bottom-navigation fixed
    v-model="bottomNav"
    class="bottom-nav"
    grow
    v-show="!$PRXRouter().isOnRoute('login') && !$PRXRouter().isOnRoute('forgot-password') && !$PRXRouter().isOnRoute('signup') && !$PRXRouter().isOnRoute('profile') && !$PRXRouter().isOnRoute('selected-module') && !$PRXRouter().isOnRoute('selected-rewards')"
    >
    <v-btn
      v-for="item in items"
      :key="item.title"
      :value="item.action"
      class="bottom-btn"
      :input-value="$PRXRouter().isOnRoute(item.action)"
      @click="viewPage(item)"
      >
      <span>{{ item.title }}</span>
      <v-icon>{{ item.icon }}</v-icon>
    </v-btn>

  </v-bottom-navigation>
</template>

<script type="text/javascript">
export default {
  mounted () {
  },
  data () {
    return {
      bottomNav: true,
      items: [
        {
          title: 'Home',
          icon: 'fa-home',
          action: 'home'
        },
        {
          title: 'Product',
          icon: 'fa-shopping-bag',
          action: 'products'
        },
        {
          title: 'Patients',
          icon: 'fa-address-book',
          action: 'patients'
        },
        {
          title: 'CME',
          icon: 'fa-heart',
          action: 'rewards'
        },
        {
          title: 'Articles',
          icon: 'fa-file-alt',
          action: 'modules'
        }
      ]
    }
  },

  methods: {
    viewPage(item) {
      this.$store.commit('pageName/set', item.title);
      this.$PRXRouter().goTo(item.action)
    }
  }
}
</script>
