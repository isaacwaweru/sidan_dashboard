<template>
  <v-card class=" ml-4 mr-4 mb-4 ">
    <v-card-title>
      <div class="text-center"></div>
      <v-avatar size="64" class="mt-5">
        <v-img
          left
          class="elevation-6 "
          alt=""
          src="@/assets/total_orders.svg"
        ></v-img>
      </v-avatar>

      <v-col><h1 right class=" ml-4">2000</h1></v-col>
    </v-card-title>

    <v-card-actions>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="mb-5">Evan You</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "DashboardCards"
};
</script>
