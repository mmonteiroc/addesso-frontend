<template>
  <q-page class="row q-py-xl">
    <div class="col-lg-2"></div>
    <div class="col-12 col-md-5 col-lg-3 q-pa-md ">
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
    <div class="col-12 col-md-7 col-lg-5 q-pa-md ">
      <q-card flat bordered>
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
          <q-btn label="Manage addresses ..." color="primary" flat no-caps/>
        </q-card-actions>
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

  }
</script>

<style scoped>

</style>
