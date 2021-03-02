<template>
  <nav>
    <v-toolbar>
      <v-toolbar-title class="headline text-uppercase">
        <v-img
          lazy-src="https://picsum.photos/id/11/10/6"
          height="36"
          contain
          max-width="241"
          src="@/assets/logo_beta.svg"
          alt=""
        ></v-img>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-switch
        v-model="$vuetify.theme.dark"
        class="mt-6"
        inset
        right
        persistent-hint
      ></v-switch>
      <v-btn text @click="logout()">
        <span>Sign out</span>
        <v-icon right>mdi-exit-to-app</v-icon>
      </v-btn>
    </v-toolbar>

    <v-navigation-drawer
      app
      v-model="drawer"
      :mini-variant.sync="mini"
      permanent
    >
      <v-list-item class="px-1 mr-4">
        <v-list-item-avatar color="indigo" size="46">
          <span class="white--text headline ">C</span>
        </v-list-item-avatar>

        <v-list-item-title font-weight-medium>Christopher </v-list-item-title>

        <v-btn icon @click.stop="mini = !mini">
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense>
        <v-list-item
          color="primary"
          v-for="item in items"
          :key="item.title"
          router
          :to="item.route"
          @click="drawer = !drawer"
          link
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      drawer: true,
      items: [
        {
          title: "Dashboard",
          icon: "mdi-home-outline",
          route: "/dashboard"
        },
        { title: "Services", icon: "mdi-bus-clock", route: "/services" },
        { title: "Customers", icon: "mdi-account-group-outline", route: "/customers" },
        { title: "Agents", icon: "mdi-account", route: "/agents" },
        {
          title: "Orders",
          icon: "mdi-account-group-outline",
          route: "/orders"
        },
        { title: "Users", icon: "mdi-account", route: "/users" }
      ],
      mini: true
    };
  },
  methods: {
    logout() {
      this.$store.dispatch("logout");
    }
  }
};
</script>

<style></style>script
