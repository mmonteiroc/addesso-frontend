<template>
  <q-page>
    <q-btn label="HOLA" @click="openModale=true"/>

    <q-dialog v-model="openModale">
      <q-card>
        <q-card-section>
          <div class="text-h4">New ticket</div>
        </q-card-section>

      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
  export default {
    name: "index",
    data() {
      return {
        openModale: false
      }
    }
  }
</script>

<style scoped>

</style>
