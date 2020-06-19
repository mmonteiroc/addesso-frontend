<template>
  <q-page class="row q-py-xl">
    <div class="col-lg-1"></div>
    <div class="col-12 col-md-3  q-pa-md ">
      <q-card flat bordered>
        <q-card-section class="flex column flex-center">
          <q-avatar size="230px">
            <q-img
              ratio="1"
              :src="sessionUser.profilePhoto!==null?baseApiUrl+'/photos?id='+sessionUser.profilePhoto.idFile+'&access='+sessionUser.accessPhoto:''"
              placeholder-src="~assets/avatar.png"
              alt="Profile picture"
              v-if="loadProfileImage"
            />
          </q-avatar>
          <div class="text-h5 q-mt-md">
            <span class="text-weight-light">Hello,</span>&nbsp;{{sessionUser.name}}
          </div>
          <div class="text-h6 text-weight-light q-mt-md">
            {{sessionUser.email}}
          </div>
        </q-card-section>


        <q-card-section class="flex flex-center q-px-xl">
          <q-btn label="information" class=" " unelevated color="primary" to="/personal"></q-btn>
        </q-card-section>
        <q-card-section class="full-width q-px-xl">
          <q-btn label="Security" class=" full-width  " flat color="primary" to="/security"></q-btn>
          <q-btn label="Configuration" class=" full-width " flat color="primary" to="/settings"></q-btn>
        </q-card-section>
      </q-card>
    </div>
    <div class="col-12 col-md-7 q-pa-md ">
      <q-card flat bordered class="full-width">
        <q-card-section>
          <div class="text-h6 text-weight-light">
            Primary address
          </div>
          <div class="text-overline text-weight-light">
            You have {{sessionUser.addresses.length}} address(es)
          </div>
        </q-card-section>
        <q-card-section v-for="address in sessionUser.addresses" v-if="address.primary">
          <div>
            {{address.street}}
          </div>
          <div>
            {{address.zipCode}}, {{address.city}}
          </div>
          <div>
            {{address.state}}, {{address.country}}
          </div>
        </q-card-section>
        <q-card-section v-if="sessionUser.addresses.length<=0">
          You dont have a primary address
        </q-card-section>


        <q-card-actions>
          <q-btn label="Manage addresses ..." color="primary" flat no-caps to="/addresses"/>
        </q-card-actions>
      </q-card>

      <q-card flat bordered class="q-mt-xl full-width">
        <q-card-section>
          <div class="text-weight-light text-h6">
            Open sessions
          </div>
        </q-card-section>
        <q-card-section>
          <q-list separator>
            <q-item v-for="session in sessionUser.sessions" :key="session.idSession">
              <q-item-section avatar>
                <q-avatar>
                  <q-icon name="fab fa-chrome"></q-icon>
                </q-avatar>
              </q-item-section>
              <q-item-section>
                <div>
                  Last activity was:
                </div>
                <div class="text-weight-bold">
                  {{parseDate(session.lastConnection)}}
                </div>
                <div class="text-weight-bold">
                  From: {{session.lastConnectionIp}}
                </div>
              </q-item-section>
              <q-item-section>
                <div>
                  Browser information
                </div>
                <div>
                  Connected on <span class="text-weight-bold">{{session.browser}}</span>
                </div>
              </q-item-section>
              <q-item-section side>
                <q-btn icon="delete" label="Close session" flat color="red-10" @click="closeSession(session)"></q-btn>
              </q-item-section>
            </q-item>
          </q-list>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script>
  export default {
    name: "Account",
    props: {
      sessionUser: Object,
      loadProfileImage: null,
      baseApiUrl: null
    },
    data() {
      return {}
    },
    methods: {
      parseDate(data) {
        return this.$parseDateTimeToGoodString(data)
      },
      closeSession(session) {

        this.$API.delete(`/session/${session.idSession}`).then(response => {
          if (response.status === 200) {
            this.$notify("Session closed correctly", 'green-10')
            this.$emit("session-deleted", session)
          } else this.$notify(response.data, 'red-10');
        })
      },
      sortSessions(sessions) {
        return this.$sortUserSessions(sessions).reverse();
      }
    }
  }
</script>

<style scoped>

</style>
