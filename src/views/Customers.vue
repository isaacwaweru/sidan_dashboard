<template>

  <div>
    <h3 class="mx-5 my-5">Customers</h3>
    
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
          <v-data-table v-if="customers" :headers="headers" :items="customers" :search="search">
     
           

       
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "Customers",
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
          text: "Email",
          align: "start",
          value: "email"
        },
         
          {
          text: "Phone",
          align: "start",
          value: "phone_number"
        },
        {
          text: "Registration_date",
          align: "start",
          value: "house_no"
        }
        

      ],
      
    };
  },
   
    computed: {
   
    customers () {
    return this.$store.state.customers;
  }
  },
};
</script>
