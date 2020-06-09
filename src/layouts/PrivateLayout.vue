<template>
  <q-layout view="hhh lpR fFf">

    <q-header class="bg-primary text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="left = !left"/>
        <q-toolbar-title>
          Addesso
        </q-toolbar-title>
        <div>
          <q-btn round dense>
            <q-avatar>
              <q-img
                src="https://cdn.quasar.dev/logo/svg/quasar-logo.svg"

              />
            </q-avatar>
          </q-btn>

        </div>
      </q-toolbar>
    </q-header>

    <q-drawer show-if-above v-model="left" side="left" bordered>
      <!-- drawer content -->
    </q-drawer>

    <q-page-container>
      <router-view/>
    </q-page-container>

  </q-layout>
</template>

<script>
  export default {
    data() {
      return {
        left: false
      }
    }
  }
</script>
