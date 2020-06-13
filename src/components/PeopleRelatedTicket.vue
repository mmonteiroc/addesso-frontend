<template>
  <q-card :class="borderless?' shadow-0':' shadow-1' ">
    <q-card-section class="  full-width  q-py-none">
      <div class="text-h6">People</div>
      <q-separator/>
    </q-card-section>
    <q-card-section class="column">
      <div class="">
        <span class="text-grey-7">Assignee:</span>
        <div class="q-mt-sm row">
          <q-avatar rounded size="2.5em" class="q-mr-sm">
            <q-img placeholder-src="~assets/avatar.png"></q-img>
          </q-avatar>
          <div class="content-center disable-select" v-if="ticket.userAssigned===null">
            Unassigned
            <div class="text-blue-8 cursor-pointer disable-select" @click="assignMySefl">Assign to me</div>
          </div>
          <div class="flex content-center" v-if="ticket.userAssigned!==null">
            {{ticket.userAssigned.email}}

          </div>
        </div>
      </div>
      <div class=" q-my-xs ">
        <span class="text-grey-7">Reporter:</span>
        <div class="q-mt-sm row">
          <q-avatar rounded size="2.5em" class="q-mr-sm">
            <q-img :src="ticket.userOwner.profilePhoto" placeholder-src="~assets/avatar.png"></q-img>
          </q-avatar>
          <div class=" flex content-center ">
            {{ticket.userOwner.email}}
          </div>

        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
  export default {
    name: "PeopleRelatedTicket",
    props: {
      ticket: {
        userOwner: Object
      },
      borderless: {
        type: Boolean,
        default: false
      },
    },
    methods: {
      async assignMySefl() {
        const response = await this.$API.put("/tickets/worker/me", {
          idTicket: this.ticket.idTicket,
        })
        if (response.status === 200) {
          // WE SHOW THE USEROWNER
          this.$notify("You have been assigned correctly", 'positive')
        } else {
          this.$notify(response.data, 'negative')
        }
        console.log(response)
      }
    }
  }
</script>

<style scoped>

</style>
