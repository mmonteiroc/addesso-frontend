<template>
  <q-page class="row ">
    <div class=" q-pa-md  col-12 col-md-8">
      <q-card class="shadow-0">
        <q-card-section>
          <div class="text-h5 q-mt-sm q-mb-xs">{{ticket.title}}</div>
        </q-card-section>
        <q-card-section class=" ">
          <q-btn label="Edit" size="sm" class="q-ma-xs" unelevated text-color="black" icon="create" color="grey-2"/>

          <q-btn-group class="q-ma-xs" outline>
            <q-btn label="Assign" text-color="black" color="grey-2" size="sm"/>
            <q-btn-dropdown color="grey-2" text-color="black" label="More" dropdown-icon="keyboard_arrow_down"
                            size="sm">
              <q-list>
              </q-list>
            </q-btn-dropdown>
          </q-btn-group>


        </q-card-section>
        <q-card-section>
          <div class="q-mb-sm text-h6">
            Details
            <q-separator/>
          </div>
          <div class="row full-width">
            <div class="col-6">
              <div class="row q-my-xs text-grey-7">
                <div class="col-4">Owner:</div>
                <div class="col-8 text-grey-10 text-capitalize">{{ticket.userOwner.name}} {{ticket.userOwner.surname}}
                </div>
              </div>
              <div class="row q-my-xs text-grey-7">
                <div class="col-4">Category:</div>
                <div class="col-8 text-grey-10">{{ticket.category.name}}</div>
              </div>
              <div class="row q-my-xs text-grey-7 vertical-middle">
                <div class="col-4 flex  content-center">Status:</div>
                <div class="col-8 text-grey-10">
                  <q-chip class=" q-ml-none" size="sm" square v-if="ticketHistory.length>0">
                    {{ticketHistory[ticketHistory.length-1].status.shortName}}
                  </q-chip>
                </div>
              </div>
            </div>
            <div class="col-6">
              <div class="flex justify-between">
                <div class="row">
                  <div class="text-subtitle1 flex content-center">Attached files</div>
                  <q-btn class="q-ml-md" size="sm" dense unelevated color="grey-2" text-color="black"
                         icon-right="add"
                         @click="uploadFileTicket=true"
                  ></q-btn>
                </div>
                <div>
                  <q-btn size="sm" flat round color="grey-2" text-color="black" icon="more_vert">
                    <q-menu>
                      <q-list class="disable-select">
                        <q-item class="text-red-10" clickable v-ripple @click="eraseAllFiles">
                          <q-item-section>Delete all files</q-item-section>
                        </q-item>
                      </q-list>
                    </q-menu>
                  </q-btn>
                  <q-icon size="sm" name="info" class="cursor-pointer" color="grey-6">
                    <q-tooltip>
                      Do right click on the files !
                    </q-tooltip>
                  </q-icon>
                </div>
              </div>

              <!--              CARROUSEL OF FILES UPLOADED FOR THIS TICKET-->
              <carousel :perPage="4" class="q-mt-md  ">
                <slide class="  cursor-pointer   q-px-sm"
                       v-for="file in ticket.atachedFiles">
                  <div
                    class="flex column text-center overflow-hidden items-center  rounded-borders bordered-area full-height">
                    <q-img class=""
                           spinner-color="purple"
                           width="40px"
                           :src="'statics/files/'+file.filetype+'-icon.png'"
                           placeholder-src="statics/files/generic-icon.png"
                           native-context-menu
                    >
                    </q-img>

                    <div class="full-width">{{file.name}}</div>
                  </div>
                  <q-menu
                    touch-position
                    context-menu
                  >

                    <q-list dense style="min-width: 100px">
                      <q-item clickable v-close-popup @click="downloadFile(file)">
                        <q-item-section>Download</q-item-section>
                      </q-item>
                      <q-item clickable v-close-popup @click="deleteFile(file)">
                        <q-item-section class="text-red-10">Delete</q-item-section>
                      </q-item>

                    </q-list>

                  </q-menu>

                  <q-tooltip :delay="500">
                    Uploaded {{parseDate(file.uploadDate)}}
                  </q-tooltip>
                </slide>

              </carousel>
            </div>

          </div>
        </q-card-section>
        <q-card-section>
          <div class="q-mb-sm text-h6 ">
            Description
            <q-separator/>
          </div>
          <div class="rounded-borders q-pa-sm " v-html="ticket.description"></div>
        </q-card-section>
        <q-card-section>
          <div class="q-mb-sm text-h6 ">
            Comments
            <q-separator/>
          </div>
          <div class="rounded-borders  q-my-sm q-py-md q-px-xs  "
               v-if="ticket.comments!==undefined &&ticket.comments!=null ">
            <span v-if="ticket.comments.length===0">There are no comments yet on this issue</span>
            <div v-if="ticket.comments.length!==0" v-for="comment in ticket.comments"
            >
              <div class="flex justify-between">
                <div class="row">
                  <q-avatar rounded size="2.5em" class="q-mr-sm">
                    <q-img :src="comment.user.profilePhoto"
                           placeholder-src="~assets/avatar.png"></q-img>
                  </q-avatar>
                  <div class=" flex content-center ">
                    {{comment.user.email}}
                  </div>
                </div>
                <div class="flex content-center">
                  {{parseDate(comment.creationDate)}}
                </div>


              </div>
              <div class="q-pa-xs q-my-md q-mx-none bg-grey-3 rounded-borders" v-html="comment.text"/>
            </div>
          </div>
        </q-card-section>
        <q-separator inset=""/>
        <q-card-section>
          <div class=" ">
            <div class="flex justify-between">
              <div class=" row content-center">
                <q-avatar rounded size="2.5em" class="q-mr-sm">
                  <q-img src=""
                         placeholder-src="~assets/avatar.png"
                  />
                </q-avatar>
                <div class=" flex content-center ">
                  pepe
                </div>
              </div>
              <div class="row content-center text-h6">
                New comment
              </div>
            </div>
            <q-input class="q-mt-sm"
                     v-model="newComment.text"
                     outlined
                     placeholder="Enter comment here ..." v-if="!showCommentWriter" @focus="showCommentWriter=true"/>
            <div v-if="showCommentWriter" class="q-mt-sm">
              <q-editor
                placeholder="Enter comment here ..."
                v-model="newComment.text"

              />
              <div class="full-width flex">
                <q-btn label="Save" color="primary" class="q-ma-xs" unelevated @click="saveComment"
                       :disable="newComment.text===''"></q-btn>
                <q-btn label="Cancel" color="red-10" class="q-ma-xs" flat @click="cancelNewComment"></q-btn>
              </div>
            </div>


          </div>
        </q-card-section>
      </q-card>

    </div>
    <div class=" content-center column q-pa-md col-12 col-md-4 ">
      <PeopleRelatedTicket :ticket="ticket" :borderless="true" class="q-mb-md full-width"></PeopleRelatedTicket>
      <HistoricTimeline :borderless="true" width="100%" class=" full-width" :historic="ticketHistory"
                        :idTicket="ticket.idTicket"
                        v-if="historyCharged"></HistoricTimeline>
    </div>


    <!--    DIALOGS DOWN HERE  -->

    <q-dialog v-model="uploadFileTicket" position="bottom" persistent @before-hide="cleanFiles">
      <q-card>

        <q-card-section class="row items-center no-wrap">
          <div class="text-h5">
            Attach new files to this ticket
          </div>
        </q-card-section>
        <q-separator/>
        <q-card-section>
          <q-file
            v-model="newAttahcedFiles"
            label="Pick files"
            outlined
            use-chips
            style="max-width: 300px"
            counter
            multiple
          >
            <template v-slot:prepend>
              <q-icon name="attach_file"/>
            </template>
          </q-file>
        </q-card-section>
        <q-card-actions>
          <q-btn label="save" icon-right="backup" unelevated color="primary" @click="uploadNewAttachedFiles"
                 :disable="newAttahcedFiles===null"/>
          <q-btn label="cancel" v-close-popup flat color="red-10"/>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
  import HistoricTimeline from "components/HistoricTimeline";
  import PeopleRelatedTicket from "components/PeopleRelatedTicket";
  import {Carousel, Slide} from 'vue-carousel';


  export default {
    name: "TicketView",
    components: {
      HistoricTimeline,
      PeopleRelatedTicket,
      Carousel,
      Slide
    },
    props: {
      sessionUser: Object
    },
    async created() {

      /*
      * We get first the ticket info
      * */
      const idTicket = this.$route.params.idTicket
      const ticketResponse = await this.$API.get(`/tickets/${idTicket}`)
      if (ticketResponse.status === 200) {
        this.ticket = ticketResponse.data;
        if (this.ticket.ticketHistories.length > 0) this.ticketHistory = this.$sortTicketHistory(this.ticket.ticketHistories)
        else this.ticketHistory = []
        this.historyCharged = true;

        this.ticket.comments = this.$sortTicketsComments(this.ticket.comments)
        console.log(this.ticket.comments)
      }
    },
    data() {
      return {
        newAttahcedFiles: null,
        uploadFileTicket: false,
        showCommentWriter: false,
        historyCharged: false,
        ticket: {
          category: {},
          userOwner: {},
          userAssigned: {},
          ticketHistories: []
        },
        ticketHistory: [],
        newComment: {
          idTicket: null,
          text: '',
        }
      }
    },
    methods: {
      parseDate(data) {
        return this.$parseDateTimeToGoodString(data)
      },
      async saveComment() {
        this.showCommentWriter = false;
        this.newComment.idTicket = this.ticket.idTicket;
        const response = await this.$API.post("/ticket/comment", this.newComment)

        this.ticket.comments.push({
          text: this.newComment.text,
          user: {
            email: 'You wrote it right now ...',
            profilePhoto: ''
          }
        });

        this.newComment.idTicket = null;
        this.newComment.text = ''
      },
      cancelNewComment() {
        this.newComment.idTicket = null;
        this.newComment.text = ''
        this.showCommentWriter = false;
      },
      cleanFiles() {
        this.newAttahcedFiles = null
      },
      async uploadNewAttachedFiles() {
        const allPromises = [];
        this.newAttahcedFiles.forEach(file => {
          const formData = new FormData();
          formData.append("file", file);
          allPromises.push(this.$API.post(`/ticket/${this.ticket.idTicket}/file`, formData));
        })
        const responses = await Promise.all(allPromises);
        responses.forEach((response, index) => {
          if (response.status !== 200) this.$notify("Error, file not uploaded: " + this.newAttahcedFiles[index].name, 'red-10')
          console.log(response.status)
        })
        this.uploadFileTicket = false
        await this.refreshFiles()
      },
      async downloadFile(file) {
        const response = await this.$API.get(`/resource/${file.idFile}`, {
          responseType: 'blob'
        });
        console.log(file)
        this.$saver.saveAs(response.data, file.name)
      },
      async refreshFiles() {
        const response = await this.$API.get(`/ticket/${this.ticket.idTicket}/file`);
        if (response.status === 200) {
          this.ticket.atachedFiles = response.data;
        }
      },
      async eraseAllFiles() {
        const response = await this.$API.delete(`/ticket/${this.ticket.idTicket}/file/`)
        if (response.status === 200) {
          this.$notify("Files erased correctly", 'green-10')
          this.ticket.atachedFiles = [];
        } else {
          this.$notify(response.data, 'red-10')
        }
      },
      async deleteFile(file) {
        const response = await this.$API.delete(`/ticket/file/${file.idFile}`)
        if (response.status === 200) {
          this.$notify("File erased correctly", 'green-10')
          this.ticket.atachedFiles = this.ticket.atachedFiles.filter(individual => {
            return individual !== file;
          })
        } else {
          this.$notify(response.data, 'red-10')
        }
      }
    },
    filters: {}
  }
</script>

<style scoped>

</style>
