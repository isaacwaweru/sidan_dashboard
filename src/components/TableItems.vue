<template>

  <v-simple-table  v-if="items" dense>
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">
            Name
          </th>
          <th class="text-left">
            Amount
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="item in items"
          :key="item.item.name"
        >
          <td>{{ item.item.name }}</td>
          <td>{{ item.item.amount }}</td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>

</template>

<script>
export default {
  name: "TableItems",
  computed: {
     items () {
       console.log("they are ",this.$store.state.items)
    return this.$store.state.items
  }
    },


}
</script>

<style>

</style>