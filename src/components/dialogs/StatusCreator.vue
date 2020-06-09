<template>
  <q-dialog v-model="show" @before-hide="cleanStatus">
    <q-card style="min-width: 550px; ">
      <q-card-section class="q-pa-md">
        <div class="text-h6">Create new status</div>
      </q-card-section>
      <q-separator inset=""/>

      <q-card-section class="q-pa-md ">
        <q-input outlined dense v-model="status.shortName" autofocus placeholder="IN_PROGRESS" label="Status short name"
                 class="q-mb-md"/>
        <q-editor v-model="status.description" min-height="5rem" placeholder="Here goes the status description..."
                  :toolbar="[['bold', 'italic', 'strike', 'underline']]"/>
      </q-card-section>
      <q-separator inset=""/>

      <q-card-actions align="right" class="text-primary q-pr-sm">
        <q-btn flat label="Cancel" color="red-10" v-close-popup/>
        <q-btn flat label="Save status" @click="addStatus"/>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
  export default {
    name: "SatusCreator",
    props: {
      show: Boolean
    },
    async created() {
    },
    data() {
      return {
        status: {
          shortName: '',
          description: '',
        }
      }
    },
    methods: {
      async addStatus() {
        const response = await this.$API.post("/status", this.status)
        if (response.status === 200) {
          this.$notify("Status added correctly", "green-10")
          this.cleanStatus()
          this.show = false;
        } else {
          this.$notify("Has been an error", 'red-10')
        }
      },
      cleanStatus() {
        this.status.shortName = '';
        this.status.description = ''
      }
    }
  }
</script>

<style scoped>

</style>
