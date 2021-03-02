

<template>

  <div>


    <h3 class="mx-5 my-5">Orders</h3>
    <template>
      <v-card>
        <v-card-title>
          Orders
          <v-spacer></v-spacer>
                    <v-text-field
                        v-model="search"
                        append-icon="mdi-magnify"
                        label="Search"
                        single-line
                        hide-details
                    ></v-text-field>
        </v-card-title>
        <v-data-table
            v-if="orders"
            :headers="headers"
            :items="orders"
            :search="search"
        >
          <template v-slot:item.orders="{ item }">
            <v-chip

                dark
            >
              {{showNumberOFOrders(item.orders)}}
            </v-chip>
          </template>

          <template v-slot:item.actions="{ item }">
            <v-icon
                small
                class="mr-2"
                @click="showItem(item)"
            >
              mdi-eye
            </v-icon>
          </template>



        </v-data-table>

        <v-dialog v-model="dialog" max-width="500px">
          <v-card>

            <v-card-title class="headline">The orders are ?</v-card-title>

              <v-spacer></v-spacer>
              <template>
                <v-data-table
                    :headers="headersOrder"
                    :items="selectedOrder"
                    class="elevation-1"
                >
                </v-data-table>
              </template>
            <v-card-actions>
              <v-btn color="blue darken-1" text @click="confirm">OK</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>

          </v-card>
        </v-dialog>
      </v-card>
    </template>
  </div>


</template>


<script>
export default {
  name: "Companies",

  data: () => ({
    search: "",
    dialog:false,
    selectedOrder:null,
    headersOrder:[
      {
        text: "Title",
        align: "start",
        value: "title"
      },
      {
        text: "Price",
        align: "start",
        value: "price"
      },

    ],
    headers: [
      {
        text: "Location",
        align: "start",
        value: "location"
      },
      {
        text: "Orders",
        align: "start",
        value: "orders"
      },
      {
        text: "Status",
        align: "start",
        value: "status"
      },

      {
        text: "Contacts",
        align: "start",
        value: "contacts"
      },

      {
        text: "House No",
        align: "start",
        value: "house_no"
      },
      { text: "Paid", value: "paid" },
      { text: "scheduled_date", value: "scheduled_date" },
      { text: 'Actions', value: 'actions', sortable: false },

    ],

  }),

  methods: {
    showNumberOFOrders(orders){
      return orders.length;
    },
    showItem (item) {
      console.log("Orders are ",item)
      this.selectedOrder = item.orders;
      this.dialog = true
    },


      confirm () {
        this.dialog = false
      },

  },
  computed: {

    orders () {
      return this.$store.state.orders;
    }
  },
};
</script>


