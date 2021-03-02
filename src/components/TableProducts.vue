<template>
  <div>
    <h3 class="mx-5 my-5">Top Products</h3>

    <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">
              Item
            </th>
            <th class="text-left">
              Company
            </th>
            <th class="text-left">
              Orders
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in companies" :key="item.name">
            <td>{{ item.name }}</td>
            <td>{{ item.company }}</td>
            <td>{{ item.orders }}</td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </div>
</template>
<script>
export default {
  name: "TableProducts",
  data() {
    return {
      companies: [
        {
          name: "Tomatoes",
          company: "TomTom Ltd",
          orders: "1500"
        },
        {
          name: "Avocadoes",
          company: "TomTom Ltd",
          orders: "1500"
        },
        {
          name: "Books",
          company: "TomTom Ltd",
          orders: "1500"
        }
      ]
    };
  }
};
</script>
