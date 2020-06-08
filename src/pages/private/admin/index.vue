<template>
  <q-page class="flex  flex-center">
    <q-card>
      <q-card-section>
        <div class="text-h4">Add new statuses</div>
      </q-card-section>
      <q-card-section>
        <q-input label="Short name" v-model="newStatus.shortName"/>
        <q-input label="Description" v-model="newStatus.description"/>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn @click="saveNewStatus" label="Save"/>
      </q-card-actions>
    </q-card>

    <q-card>
      <q-card-section>
        <div class="text-h4">Add new categories</div>
      </q-card-section>
      <q-card-section>
        <q-input label="Category name" v-model="newCat.name"/>
        <q-input label="Description" v-model="newCat.description"/>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn @click="saveNewCategory" label="Save"/>
      </q-card-actions>
    </q-card>

    <q-card>
      <q-card-section>
        <div class="text-h4">Add new ticket</div>
      </q-card-section>
      <q-card-section>
        <q-input label="Category name" v-model="newTicket.title"/>
        <q-input label="Description" v-model="newTicket.description"/>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn @click="saveNewTicket" label="Save"/>
      </q-card-actions>
    </q-card>

    <TicketCreator :show="true"></TicketCreator>
  </q-page>
</template>

<script>
  import TicketCreator from "components/TicketCreator";

  export default {
    name: "index",
    components: {
      TicketCreator
    },
    data() {
      return {
        newStatus: {
          shortName: '',
          description: ''
        },
        newCat: {
          name: '',
          description: ''
        },
        newTicket: {
          title: '',
          description: '',
          idCategory: 3,
          idStatus: 8
        }
      }
    },
    methods: {
      async saveNewStatus() {
        const response = await this.$API.post("/status", this.newStatus)
        if (response.status === 200) {
          this.$notify("Status added correctly", "green-10")
          this.newStatus.shortName = '';
          this.newStatus.description = ''
        } else {
          this.$notify("Has been an error", 'red-10')
        }

      },
      async saveNewCategory() {
        const response = await this.$API.post("/category", this.newCat)
        if (response.status === 200) {
          this.$notify("Category added correctly", "green-10")
          this.newCat.name = '';
          this.newCat.description = ''
        } else {
          this.$notify("Has been an error", 'red-10')
        }
      },
      async saveNewTicket() {
        const response = await this.$API.post("/tickets", this.newTicket)
        if (response.status === 200) {
          this.$notify("ticket added correctly", "green-10")
          this.newTicket.title = '';
          this.newTicket.description = ''
        } else {
          this.$notify("Has been an error", 'red-10')
        }
      }
    }
  }
</script>

<style scoped>

</style>
