<template>
  <q-page class="q-pa-md">
    <div class="row">
      <div class="col-12 col-md-4 q-pa-sm">
        <q-card>
          <q-card-section>
            <div class="text-h5">
              All users
            </div>
          </q-card-section>
          <q-separator/>

          <!--      LIST OF USERS OF THE APP-->
          <q-card-section>
            <q-list separator>


              <q-item v-for="user in allUsers" :key="user.iduser" class="q-mb-sm q-px-none">
                <q-item-section avatar>
                  <q-avatar>
                    <q-img
                      ratio="1"
                      :src="user.profilePhoto!==null?baseApiUrl+'/photos?id='+user.profilePhoto.idFile+'&access='+user.accessPhoto:''"

                      placeholder-src="~assets/avatar.png"/>
                  </q-avatar>
                </q-item-section>

                <q-item-section>
                  <q-item-label class="">{{ user.name }} {{user.surname}}</q-item-label>
                  <q-item-label caption lines="1">{{ user.email }}</q-item-label>
                </q-item-section>

                <q-item-section side class="row">

                  <div>
                    <q-chip v-model="user.admin" @remove="updateRoles(user)" color="primary" text-color="white"
                            removable
                            icon="cake"
                            label="Admin"
                    />
                    <q-chip v-model="user.technician" @remove="updateRoles(user)" color="primary" text-color="white"
                            removable
                            icon="cake"
                            label="Technician"
                    />
                    <q-btn icon="add" round size="sm">
                      <q-menu anchor="bottom right" self="top right" :offset="[0,10]">
                        <q-list style="min-width: 100px">
                          <q-item clickable v-close-popup v-if="!user.admin"
                                  @click="()=>{user.admin = true; updateRoles(user)}">
                            <q-item-section>Mark as admin</q-item-section>
                          </q-item>
                          <q-item clickable v-close-popup v-if="!user.technician"
                                  @click="()=>{user.technician = true; updateRoles(user)}">
                            <q-item-section>Mark as technician</q-item-section>
                          </q-item>
                          <q-item v-if="user.admin && user.technician">
                            <q-item-section>
                              This user has all the roles
                            </q-item-section>
                          </q-item>
                        </q-list>
                      </q-menu>
                    </q-btn>
                  </div>

                </q-item-section>
              </q-item>
            </q-list>
          </q-card-section>
        </q-card>
      </div>
      <div class="col-12 col-md-4 q-pa-sm">
        <q-card>
          <q-card-section class="flex justify-between content-center">
            <div class="text-h5 flex content-center">
              Issue categories
            </div>
            <q-btn icon="add" round dense @click="addNewCategory=true"/>
          </q-card-section>
          <q-separator/>

          <q-card-section>
            <q-list separator>

              <q-item v-for="category in allCategories" :key="category.idCategory" class="q-mb-sm q-px-none">

                <q-item-section>
                  <q-item-label class="">{{ category.name }}</q-item-label>
                  <q-item-label caption lines="1">{{ category.description }}</q-item-label>
                </q-item-section>

                <q-item-section side>
                  <q-btn icon="more_vert" size="sm" flat round v-if="category.idCategory">
                    <q-menu anchor="bottom right" self="top right" :offset="[0,10]">
                      <q-list style="min-width: 100px">
                        <q-item clickable v-close-popup @click="updateCaregory(category)">
                          <q-item-section>Update category</q-item-section>
                        </q-item>
                        <q-item clickable v-close-popup @click="deleteCategory(category)">
                          <q-item-section class="text-red-10">Delete category</q-item-section>
                        </q-item>
                      </q-list>
                    </q-menu>
                  </q-btn>
                </q-item-section>
              </q-item>
            </q-list>
          </q-card-section>
        </q-card>
      </div>
      <div class="col-12 col-md-4 q-pa-sm">
        <q-card>
          <q-card-section class="flex justify-between content-center">
            <div class="text-h5 flex content-center">
              Issue statuses
            </div>
            <q-btn icon="add" round dense @click="addStatus=true"/>
          </q-card-section>
          <q-separator/>
          <q-card-section>
            <q-list separator>
              <q-item v-for="status in allStatuses">
                <q-item-section class="text-weight-bold">
                  {{status.shortName}}
                </q-item-section>
                <q-item-section>
                  {{status.description}}
                </q-item-section>
              </q-item>
            </q-list>
          </q-card-section>
        </q-card>
      </div>
    </div>


    <!--    DIALOGS DOWN HERE-->

    <CategoryCreator :show="addNewCategory" @close-dialog="addNewCategory=false"
                     @added-category="addCategoryToArray"></CategoryCreator>
    <StatusCreator :show="addStatus" @close-dialog="addStatus=false" @added-status="addStatusToArray"></StatusCreator>
  </q-page>
</template>

<script>
  import CategoryCreator from "components/dialogs/CategoryCreator";
  import TicketCreator from "components/dialogs/TicketCreator";
  import StatusCreator from "components/dialogs/StatusCreator";

  export default {
    name: "ControlPanel",
    props: {
      baseApiUrl: null
    },
    data() {
      return {
        allUsers: [],
        addNewCategory: false,
        addStatus: false,
        allCategories: [],
        allStatuses: []
      }
    },
    components: {
      CategoryCreator,
      TicketCreator,
      StatusCreator
    },
    beforeCreate() {

      /*
      * We do it like this without the async/await
      * so the categories doesn't have to wait for users
      * and it's a simple scenario
      * */
      this.$API.get("/users").then(response => {
        if (response.status === 200) this.allUsers = response.data;
      });

      this.$API.get("/category").then(response => {
        if (response.status === 200) this.allCategories = response.data;
      });

      this.$API.get("/status").then(response => {
        if (response.status === 200) this.allStatuses = response.data;
      })
    },
    methods: {
      addCategoryToArray(cat) {
        this.allCategories.push(cat)
      },
      addStatusToArray(stat) {
        this.allStatuses.push(stat)
      },
      async updateRoles(user) {
        console.log(user)
      },
      async updateCaregory() {

      },
      async deleteCategory(cat) {
        const response = await this.$API.delete('category', {
          data: {
            idCategory: cat.idCategory
          }
        })
        if (response.status === 200) {
          this.allCategories = this.allCategories.filter(indv => indv !== cat)
        } else {
          this.$notify(response.data, 'red-10')
        }
      }
    }
  }
</script>

<style scoped>

</style>
