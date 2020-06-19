<template>
  <q-dialog v-model="show" @before-hide="cleanCategory" persistent>
    <q-card style="min-width: 550px; ">
      <q-card-section class="q-pa-md">
        <div class="text-h6">Create new category</div>
      </q-card-section>
      <q-separator inset=""/>

      <q-card-section class="q-pa-md ">
        <q-input outlined dense v-model="category.name" autofocus placeholder="Category name" class="q-mb-md"/>
        <q-editor v-model="category.description" min-height="5rem" placeholder="Here goes the category description..."
                  :toolbar="[['bold', 'italic', 'strike', 'underline']]"/>
      </q-card-section>
      <q-separator inset=""/>

      <q-card-actions align="right" class="text-primary q-pr-sm">
        <q-btn flat label="Cancel" color="red-10" @click="close"/>
        <q-btn flat label="Save category" @click="addCategory"/>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
  export default {
    name: "CategoryCreator",
    props: {
      show: Boolean
    },
    async created() {
    },
    data() {
      return {
        category: {
          name: '',
          description: '',
        }
      }
    },
    methods: {
      async addCategory() {
        const response = await this.$API.post("/category", this.category)
        if (response.status === 200) {
          this.$notify("Category added correctly", "green-10")
          this.$emit('added-category', {
            name: this.category.name,
            description: this.category.description
          })
          this.close();
        } else {
          this.$notify("Has been an error", 'red-10')
        }
      },
      cleanCategory() {
        this.category.name = '';
        this.category.description = ''
      },
      close() {
        this.$emit('close-dialog')
      }
    },
    computed: {}
  }
</script>

<style scoped>

</style>
