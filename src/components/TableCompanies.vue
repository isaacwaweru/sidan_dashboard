<template>
  <div>
    <h3 class="mx-5 my-5">Top Companies</h3>

    <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">
              Name
            </th>
            <th class="text-left">
              Orders
            </th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in desserts" :key="item.name">
            <td>{{ item.name }}</td>
            <td>{{ item.calories }}</td>
            <td>
              <v-img max-height="24" max-width="24" :src="item.icon"></v-img>
            </td>
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
      desserts: [
        {
          name: "TomTom",
          calories: 159,
          icon: require("../assets/arrow_up.svg")
        },
        {
          name: "Kabuku Rabbits",
          calories: 237,
          icon: require("../assets/arrow_up.svg")
        },
        {
          name: "Eclairs",
          calories: 262,
          icon: require("../assets/arrow_drop.svg")
        }
      ]
    };
  }
};
</script>
