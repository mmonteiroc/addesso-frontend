<template>
  <div>
    <q-card :style="'width:'+width" :class="borderless?' shadow-0':' shadow-1' ">
      <q-card-section class="flex content-center   ">
        <div class="text-h5 content-center q-mr-md">Historic changes</div>
        <q-btn label="Update status" size="sm" dense class="" color="grey-2" unelevated text-color="black"
               @click="showUpdateStatus=true"/>
      </q-card-section>
      <q-card-section class="q-pt-none">
        <q-timeline color="primary" layout="dense" v-if="historic!=null && historic.length>0">
          <q-timeline-entry
            v-for="(change, index) in historic"
            :title="change.status.shortName"
            :subtitle="parseDate(change.statusUpdatedDate)"
            :key="change.idHistory"
            :color="index===historic.length-1?'primary':'grey-7'"
          >
            <q-btn dense round size="sm" text-color="red-10" icon="clear" class="absolute-top-right"
                   v-if="change.idHistory!==null" @click="eraseHistory(change.idHistory)"></q-btn>
            <q-btn dense round size="sm" text-color="grey-7" disable icon="clear" class="absolute-top-right"
                   v-if="change.idHistory===null || change.idHistory===undefined"></q-btn>
            <div class="text-grey-6" v-html="change.status.description"></div>
          </q-timeline-entry>
        </q-timeline>
        <div v-if="historic.length===0">
          There is no status updates in this ticket right now
        </div>
      </q-card-section>


    </q-card>

    <q-dialog v-model="showUpdateStatus">
      <q-card style="min-width: 350px; ">
        <q-card-section class="q-pa-md">
          <div class="text-h6">Select new status</div>
        </q-card-section>

        <q-card-section>
          <q-option-group
            v-model="newStatusSelected"
            :options="allStatuses"
            color="primary"
          />
        </q-card-section>
        <q-card-actions align="right" class="text-primary q-pr-sm">
          <q-btn flat label="Cancel" color="red-10" v-close-popup/>
          <q-btn flat label="Save status" @click="setStatus"/>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>


</template>

<script>
  export default {
    name: "HistoricTimeline",
    props: {
      width: {
        type: String,
        default: '270px'
      },
      historic: Array,
      borderless: {
        type: Boolean,
        default: false,
      },
      idTicket: Number
    },
    data() {
      return {
        newStatusSelected: null,
        showUpdateStatus: false,
        allStatuses: Array
      }
    },
    async created() {
      const statusResponse = await this.$API.get('/status');
      if (statusResponse.status === 200) {
        this.allStatuses = statusResponse.data.map(status => {
          return {
            label: status.shortName,
            value: status.idStatus,
            desc: status.description
          }
        });
      }
    },
    computed: {},
    methods: {
      parseDate(data) {
        return this.$parseDateTimeToGoodString(data)
      },
      async setStatus() {
        const response = await this.$API.put("/tickets", {
          idTicket: this.idTicket,
          idStatus: this.newStatusSelected
        })
        if (response.status === 200) {
          this.$notify("Status updated correctly", 'positive')
          const status = this.getStatus(this.newStatusSelected)
          const indHistory = {
            status: {
              shortName: status.label,
              description: status.desc
            }
          }
          this.historic.push(indHistory)
          this.showUpdateStatus = false
        } else {
          this.$notify(response.data, 'negative')
        }
      },
      async eraseHistory(id) {
        const response = await this.$API.delete("/tickets/status", {
          data: {
            idHistory: id
          }
        })

        this.historic = this.historic.filter(change => {
          return change.idHistory !== id
        })
      },
      getStatus(id) {
        return this.allStatuses.filter(stat => {
          return stat.value === id
        })[0]
      }
    },


  }
</script>

<style scoped>

</style>
