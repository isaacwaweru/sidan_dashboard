<template>
  <div>
    <h3 class="mx-5 my-5">Agents Big</h3>

    <v-data-table v-if="agents"
      :headers="headers"
      :items="agents"
      :search="search"
      sort-by="calories"
      class="elevation-1"
    >     
    <template v-slot:item.face_photo="{ item }">
              <v-avatar size="36px" rounded>
                <v-img
                  :alt="item"
                  :src="item.face_photo"
                ></v-img>
              </v-avatar>
            </template>
    <template v-slot:item.id_photo="{ item }">
              <v-avatar size="36px" rounded>
                <v-img
                  :alt="item"
                  :src="item.id_photo"
                ></v-img>
              </v-avatar>
            </template>
      <template v-slot:top>
        <v-toolbar flat>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            class="mx-5 my-4"
            hide-details
          ></v-text-field>
         
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="headline"
                >Are you sure you want to delete this item?</v-card-title
              >
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDelete"
                  >Cancel</v-btn
                >
                <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                  >OK</v-btn
                >
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)">
          mdi-pencil
        </v-icon>
      </template>
      <template v-slot:no-data>
        <v-btn color="primary" @click="initialize">
          Reset
        </v-btn>
      </template>
    </v-data-table>
  </div>
</template>

<script>
export default {
  name: "Users",
  data: () => ({
    dialog: false,
    dialogDelete: false,
    search: "",


    headers: [
      {
        text: "Name",
        align: "start",
        sortable: false,
        value: "first_name"
      },
      { text: "Face Photo", value: "face_photo" },
      { text: "Active", value: "active" },
      { text: "Phone", value: "phone_number" },
      { text: "Location", value: "location" },
      { text: "ID Photo", value: "id_photo" },
      { text: "ID Number", value: "id_number" },
      { text: "Registration_date", value: "registration_date" },
      { text: "Actions", value: "actions", sortable: false }
    ],
    companies: [],
    editedIndex: -1,
    editedItem: {
      name: "",
      business_no: "",
      type: "",
      physical_location: "",
      krapin: "",
      status: ""
    },
    defaultItem: {
      name: "",
      business_no: "",
      type: "",
      physical_location: "",
      krapin: "",
      status: ""
    }
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
    agents () {
      console.log("Agents",this.$store.state.agents)
    return this.$store.state.agents
  }
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    }
  },

  
  methods: {

  
    editItem(item) {
      this.editedIndex = this.companies.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.desserts.splice(this.editedIndex, 1);
      this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.companies[this.editedIndex], this.editedItem);
      } else {
        this.companies.push(this.editedItem);
      }
      this.close();
    }
  }
};
</script>

<style></style>
