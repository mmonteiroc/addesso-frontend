<template>
  <q-dialog v-model="show" @before-hide="cleanTicket">
    <q-card style="min-width: 550px; ">
      <q-card-section class="q-pa-sm">
        <div class="text-h6">Create new ticket</div>
      </q-card-section>
      <q-separator inset=""/>

      <q-card-section class="q-pa-none row">
        <div class="col-12 col-md-6 q-pa-sm">
          <q-input outlined dense v-model="ticket.title" autofocus placeholder="Title" class="q-mb-md"/>
          <q-editor v-model="ticket.description" min-height="5rem" placeholder="Here goes the ticket description...."
                    :toolbar="[['bold', 'italic', 'strike', 'underline']]"/>
        </div>
        <div class="col-12 col-md-6 q-pa-sm">
          <q-select dense outlined v-model="selectedCategory" :options="categories" value="code" label="Category"
                    @input="ticket.idCategory = selectedCategory.code"/>
          <div v-if="selectedCategory!=null" class="q-pl-md q-my-md">
            {{selectedCategory.description}}
          </div>
          <q-select dense outlined v-model="selectedStatus" :options="statuses" value="code" label="Status"
                    @input="ticket.idStatus = selectedStatus.code"/>
          <div v-if="selectedStatus!=null" class="q-pl-md q-my-md">
            {{selectedStatus.description}}
          </div>
        </div>


      </q-card-section>

      <q-card-actions align="right" class="text-primary">
        <q-btn flat label="Cancel" color="red-10" v-close-popup/>
        <q-btn flat label="Save ticket" @click="addTicket"/>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
  export default {
    name: "TicketCreator",
    props: {
      show: Boolean
    },
    async created() {
      /*
      * We get categories
      * */
      const response = await this.$API.get("/category");
      if (response.status === 200) {
        const categories = response.data;
        categories.forEach(cat => {
          this.categories.push({
            label: cat.name,
            code: cat.idCategory,
            description: cat.description
          })
        })
      }
      const responseStatus = await this.$API.get("/status");
      if (responseStatus.status === 200) {
        const statuses = responseStatus.data;
        statuses.forEach(status => {
          this.statuses.push({
            label: status.shortName,
            code: status.idStatus,
            description: status.description
          })
        })
      }
    },
    data() {
      return {
        selectedCategory: null,
        categories: [],
        selectedStatus: null,
        statuses: [],
        ticket: {
          title: '',
          description: '',
          idCategory: null,
          idStatus: null
        }
      }
    },
    methods: {
      async addTicket() {
        const response = await this.$API.post("/tickets", this.ticket)
        if (response.status === 200) {
          this.$notify("ticket added correctly", "green-10")
          this.cleanTicket()
          this.show = false;
        } else {
          this.$notify("Has been an error", 'red-10')
        }
      },
      cleanTicket() {
        this.ticket.title = '';
        this.ticket.description = ''
        this.ticket.idCategory = null;
        this.ticket.idStatus = null;
        this.selectedStatus = null
        this.selectedCategory = null;
      }
    }
  }
</script>

<style scoped>

</style>
