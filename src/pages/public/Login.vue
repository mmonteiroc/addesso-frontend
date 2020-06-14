<template>
  <q-page class=" window-height window-width row justify-center items-center back">
    <div class="column">
      <div class="row">
        <h5 class="text-h3  q-my-md font-prime-regular text-white">Addesso</h5>
      </div>
      <div class="row">
        <q-card bordered class="q-pa-lg " v-if="!createRootUser">
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


        <q-card bordered class="q-pa-lg " v-if="createRootUser">
          <q-card-section class="q-pb-none">
            <div class="text-subtitle1 flex full-width justify-between">
              Application not initialized

              <q-icon name="info" size="1.5em" color="primary">
                <q-tooltip content-style="font-size: 1em">
                  We gonna generate a root user which gonna be the administrator of the application. <br>
                  You can change this password afterwards in the settings
                </q-tooltip>
              </q-icon>

            </div>
            <div>

            </div>
          </q-card-section>
          <q-card-section>
            <q-input class="q-my-sm" outlined v-model="newRoot.password" label="Password for root user"
                     @keypress.enter="saveRootPassword"
                     type="password"
            >
            </q-input>
          </q-card-section>
          <q-card-section class="q-px-md q-py-none">
            <q-btn unelevated color="primary" size="md" class="full-width" label="save password"
                   @click="saveRootPassword"/>

          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>


<script>

  export default {
    name: 'Login',

    async beforeCreate() {
      const response = await this.$API.get('/auth/root');
      if (response.status === 200) this.createRootUser = true;
    },
    data() {
      return {
        createRootUser: false,
        newRoot: {
          password: ''
        },
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

      },
      async saveRootPassword() {
        const response = await this.$API.post("/auth/root", this.newRoot)
        if (response.status === 200) {
          this.createRootUser = false;
          this.$notify("Now you can access to the site as root with the password you just set", 'green-10')
        } else {
          this.$notify(response.data, 'grey-9')
        }
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
