<template>
  <q-card :style="'height:'+height+';width:'+width" class="overflow-auto scrollArea shadow-1 ">

    <q-card-section class="  full-width  ">
      <div class="text-h5">Historic changes</div>
    </q-card-section>
    <q-card-section class="q-pt-none">
      <q-timeline color="primary" layout="dense">
        <q-timeline-entry
          v-for="(change, index) in historic"
          :title="change.status.shortName"
          :subtitle="parseDate(change.statusUpdatedDate)"
          :key="change.idHistory"
          :color="index===historic.length-1?'primary':'grey-7'"
        >
          <div class="text-grey-6" v-html="change.status.description"></div>
        </q-timeline-entry>
      </q-timeline>
    </q-card-section>

  </q-card>
</template>

<script>
  export default {
    name: "HistoricTimeline",
    props: {
      height: {
        type: String,
        default: '300px'
      },
      width: {
        type: String,
        default: '270px'
      },
      historic: Array
    },
    data() {
      return {}
    },
    computed: {},
    methods: {
      parseDate(data) {
        return this.$parseDateTimeToGoodString(data)
      }
    },

  }
</script>

<style scoped>

</style>
