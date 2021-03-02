<template>
  <div>
    <h3 class="mx-5 my-5">Products</h3>
    <v-row no-gutters>
      <v-col cols="12" sm="12" md="12">
        <v-card>
          <v-card-title>
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Search"
              single-line
              hide-details
            ></v-text-field>
          </v-card-title>
          <v-data-table :headers="headers" :items="products" :search="search">
            <template v-slot:item.name="{ item }">
              <v-avatar size="36px" rounded>
                <v-img
                  :alt="item"
                  src="https://avatars0.githubusercontent.com/u/9064066?v=4&s=460"
                ></v-img>
              </v-avatar>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "Companies",
  data() {
    return {
      search: "",
      headers: [
        {
          text: "Name",
          align: "start",
          value: "name"
        },
        {
          text: "Description",
          align: "start",
          value: "description"
        },
        { text: "Company", value: "company" },
        { text: "Product Cost", value: "product_cost" }
      ],
      products: [
        {
          name: "Tomatoes",
          company: "Tomatoes Ltd",
          product_cost: 4500,
          description: "The best tomatoes in town"
        },
        {
          name: "Frozen Yogurt",
          company: "Delamere Ltd",
          product_cost: 8.0,
          description: "The best Youghurt in town"
        },
        {
          name: "Avocadoes",
          company: "Avo Suppliers",
          product_cost: 6.0,
          description: "The best Youghurt in town"
        }
      ]
    };
  }
};
</script>
