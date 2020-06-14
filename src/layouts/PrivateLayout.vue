<template>
  <q-layout view="hhh lpR fFf">

    <q-header class="bg-primary text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="left = !left"/>
        <q-toolbar-title>
          Addesso
        </q-toolbar-title>
        <div class="">
          <q-btn round dense>
            <q-avatar>
              <q-img
                :src="sessionUser.profilePhoto"
                placeholder-src="~assets/avatar.png"
              />
            </q-avatar>
            <q-menu
              transition-show="slide-left"
              transition-hide="slide-right"
              :offset="[0,10]"
            >
              <q-list style="min-width: 150px">
                <q-item clickable>

                  <q-item-section>My account</q-item-section>
                  <q-item-section side>
                    <q-icon name="account_circle"/>
                  </q-item-section>
                </q-item>
                <q-item clickable @click="$disconnect">
                  <q-item-section>Disconnect</q-item-section>
                  <q-item-section side>
                    <q-icon name="exit_to_app"/>
                  </q-item-section>
                </q-item>
                <q-item clickable>
                  <q-item-section>Change account</q-item-section>
                  <q-item-section side>
                    <q-icon name="people"/>
                  </q-item-section>
                </q-item>
                <q-item-label header class="q-pb-xs">Settings</q-item-label>

                <q-separator/>
                <q-item clickable>
                  <q-item-section class="">
                    Sound settings
                  </q-item-section>
                  <q-item-section side>
                    <q-icon name="notifications_none"/>
                  </q-item-section>
                </q-item>
                <q-item clickable>
                  <q-item-section>Security settings</q-item-section>
                  <q-item-section side>
                    <q-icon name="security"/>
                  </q-item-section>

                </q-item>
                <q-separator/>

                <q-item clickable>
                  <q-item-section>Help center</q-item-section>
                  <q-item-section side>
                    <q-icon name="help_center"/>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>

        </div>
      </q-toolbar>
    </q-header>

    <q-drawer show-if-above v-model="left" side="left" bordered>
      <q-list>
        <q-item v-for="link in menuLinks" clickable v-ripple :to="link.uri" :key="link.uri">
          <q-item-section avatar top>
            <q-icon :name="link.icon" size="2em"/>
          </q-item-section>
          <q-item-section>
            <q-item-label lines="1" style="font-size: 1.2em">{{link.name}}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view :sessionUser="sessionUser"/>
    </q-page-container>

  </q-layout>
</template>

<script>
  export default {
    data() {
      return {
        left: false,
        menuLinks: [
          {
            name: 'Control panel',
            icon: 'insert_chart_outlined',
            uri: '/worker/panel',
            needsTechnician: false
          },
          {
            name: 'My issues',
            icon: 'show_chart',
            uri: '/worker/issues',
            needsTechnician: false
          },
          {
            name: 'My tasks',
            icon: 'fas fa-tasks',
            uri: '/worker/todo',
            needsTechnician: true
          }
        ],
        sessionUser: {
          admin: false,
          email: "",
          iduser: null,
          name: "",
          profilePhoto: null,
          surname: "",
          technician: false
        }
      }
    },
    beforeCreate() {
      this.$API.get('/user/me').then(response => {
        if (response.status === 200) this.sessionUser = response.data;
        else this.$notify(response.data)
      })
    }
  }
</script>
