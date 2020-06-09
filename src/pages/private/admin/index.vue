<template>
  <q-page class="flex  flex-center">

    <HistoricTimeline :historic="historic"></HistoricTimeline>
  </q-page>
</template>

<script>
  import TicketCreator from "components/dialogs/TicketCreator";
  import CategoryCreator from "components/dialogs/CategoryCreator";
  import StatusCreator from "components/dialogs/StatusCreator";
  import HistoricTimeline from "components/HistoricTimeline";

  export default {
    name: "index",
    components: {
      TicketCreator,
      CategoryCreator,
      StatusCreator,
      HistoricTimeline
    },
    async created() {
      const response = await this.$API.get("/tickets")
      this.historic = this.$sortTicketHistory(response.data[0].ticketHistories)
    },
    data() {
      return {
        historic: null,
      }
    },
    methods: {}
  }
</script>

<style scoped>

</style>
