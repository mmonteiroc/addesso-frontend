<template>
  <q-page class=" window-height window-width row justify-center items-center back">
    <div class="column">
      <div class="row">
        <h5 class="text-h3  q-my-md font-prime-regular text-white">Addesso</h5>
      </div>
      <div class="row">
        <q-card bordered class="q-pa-lg ">
          <q-card-section>
            <q-input class="q-my-sm" outlined v-model="login.email" type="email" label="Email"
                     @keypress.enter="doLogin"/>
            <q-input class="q-my-sm" outlined v-model="login.password" label="Password" @keypress.enter="doLogin"
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
          <q-card-section class="q-px-md q-py-none">
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
            <div class=" text-center text-weight-bold  q-my-sm">
              <span class="cursor-pointer">How to recover my password?</span>
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
        const responseLogin = await this.$API.post('/auth/login', this.login);
        if (responseLogin.status === 200) {
          const access_token = responseLogin.data.access_token;
          const refresh_Token = responseLogin.data.refresh_token;
          const user_roles = JSON.parse(responseLogin.data.roles);

          localStorage.setItem("access_token", access_token);
          localStorage.setItem("refresh_token", refresh_Token);
          localStorage.setItem("roles", JSON.stringify(user_roles));

          this.$router.push("/worker")
        } else {
          console.log(this.$noti)
          this.$notify("Login data not valid", 'red-10',)
        }
      },
      recoverPassword() {

      }
    }
  }
</script>

<style>
  .q-card {
    width: 360px;
  }

  .back {
    background-color: #21D4FD;
    background-image: linear-gradient(140deg, #21D4FD 0%, rgba(139, 8, 253, 0.95) 100%);
  }
</style>
