<template>
  <q-page class=" window-height window-width row justify-center items-center">
    <div class="column">
      <div class="row">
        <h5 class="text-h4  q-my-md font-prime-regular">Addesso</h5>
      </div>
      <div class="row">
        <q-card bordered class="q-pa-lg ">
          <q-card-section>
            <q-input class="q-my-sm" outlined v-model="login.email" type="Email" label="email"/>
            <q-input class="q-my-sm" outlined v-model="login.password" label="Password"
                     :type="!seePasswd ? 'password' : 'text'"
            >
              <template v-slot:append>
                <q-icon
                  :name="!seePasswd ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="seePasswd = !seePasswd"
                />
              </template>
            </q-input>
          </q-card-section>
          <q-card-section class="q-px-md">
            <q-btn unelevated color="primary" size="md" class="full-width" label="Login" @click="doLogin"/>
            <div class="row q-my-sm">

              <div class="col-5 flex flex-center">
                <q-separator size="1px" color="grey-6" class=""/>
              </div>
              <div class="col-2  text-center vertical-middle">
                OR
              </div>
              <div class="col-5 flex flex-center">
                <q-separator size="1px" color="grey-6"/>
              </div>
            </div>

          </q-card-section>
        </q-card>

      </div>
    </div>
  </q-page>
</template>


<script>

  export default {
    name: 'Login',

    async created() {

    },
    data() {
      return {

        login: {
          email: '',
          password: '',
        },
        seePasswd: false,
      }
    },
    methods: {
      async doLogin() {
        const responseLogin = await this.$API.post('/auth/login/local', this.login);
        if (responseLogin.status === 200) {

        } else {

        }
      },
    }
  }
</script>

<style>
  .q-card {
    width: 360px;
  }
</style>
