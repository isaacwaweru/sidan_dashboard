<template>
  <div>
    <h3 class="mx-5 my-5">Dashboard</h3>

    <v-row no-gutters>
      <v-col cols="12" sm="12" md="6">
        <UserLineCharts />
      </v-col>
      <v-col block cols="12" sm="12" md="3">
        <DashboardCards />
        <DashboardCards />
      </v-col>
      <v-col cols="12" sm="12" md="3">
        <DashboardCards />
        <DashboardCards />
      </v-col>
    </v-row>
    <v-row class="mb-6">
      <v-col>
        <v-card class="pa-2" outlined tile>
          <TableCompanies />
        </v-card>
      </v-col>
      <v-col>
        <v-card class="pa-2" outlined tile>
          <TableProducts />
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import UserLineCharts from "@/components/UserLineChart.vue";
import DashboardCards from "@/components/DashboardCards.vue";
import TableProducts from "@/components/TableProducts.vue";
import TableCompanies from "@/components/TableCompanies.vue";

export default {
  name: "Dashboard",
  components: { UserLineCharts, DashboardCards, TableProducts, TableCompanies }
};
</script>
