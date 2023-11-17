<template>
  <div>
    <v-card elevation="10" class="rounded-15 pa-5" v-if="loading">
      <v-row>
        <v-col cols="12" md="8">
          <v-skeleton-loader type="card" />
        </v-col>
        <v-col cols="12" md="4">
          <v-skeleton-loader type="card-heading" />
          <v-skeleton-loader type="card-heading" />
        </v-col>
      </v-row>
    </v-card>

    <v-card elevation="10" class="rounded-15 pa-5" :loading="loading" color="grey lighten-5" v-else>

<!--      Toolbar   -->
      <v-card-title class="teal lighten-4 font-weight-bold py-2">
        <div class="d-flex flex-fill">
          <v-btn small icon outlined color="info" class="mr-2" to="/"><v-icon small>mdi-arrow-left-thick</v-icon></v-btn>
          <small>{{letter.id}} - {{letter.title}}</small>
          <v-spacer />
          <div v-if="my_refer">
            <v-btn small outlined rounded color="info" class="caption text-normal" @click="editing={dialog: true, loading: false, type: letter.pdf_url ? 'pdf':'text', title: letter.title, body: letter.body, file: null, external_sender: ''}" v-if="!letter.user">Edit<v-icon small class="ml-2">mdi-pencil</v-icon></v-btn>
            <v-btn small outlined rounded color="info" class="caption text-normal" @click="signLetter" v-if="!letter.user">Sign<v-icon small class="ml-2">mdi-signature-freehand</v-icon></v-btn>
            <v-btn small outlined rounded color="info" class="caption text-normal" @click="dialog_refer=true; $nextTick(() => $refs.refer_modal.initialize())">Refer<v-icon small class="ml-2">mdi-reply mdi-flip-h</v-icon></v-btn>
            <v-btn small outlined rounded color="teal" class="caption text-normal" v-if="my_refer.user_id===CurrentUser.id && !my_refer.trashed && !my_refer.archived" @click="changeReferStatus('archived', true)">Archive<v-icon small class="ml-1">mdi-archive-outline</v-icon></v-btn>
            <v-btn small outlined rounded color="green" class="caption text-normal" v-if="my_refer.user_id===CurrentUser.id && !my_refer.trashed && my_refer.archived" @click="changeReferStatus('archived', false)">Recycle<v-icon small class="ml-2">mdi-archive-arrow-up-outline</v-icon></v-btn>
            <v-btn small outlined rounded color="pink lighten-2" class="caption text-normal" v-if="my_refer.user_id===CurrentUser.id && !my_refer.trashed" @click="changeReferStatus('trashed', true)">Remove<v-icon small class="ml-1">mdi-trash-can-outline</v-icon></v-btn>
            <v-btn small outlined rounded color="green" class="caption text-normal" v-if="my_refer.user_id===CurrentUser.id && my_refer.trashed" @click="changeReferStatus('trashed', false)">Recycle<v-icon small class="ml-2">mdi-backup-restore</v-icon></v-btn>
          </div>
          <v-tooltip top color="teal lighten-2">
            <template #activator="{on}">
              <v-btn small icon outlined v-on="on" :color="letter.watch ? 'teal':'grey'" class="ml-2 my-auto" @click="watchLetter" :loading="processing" v-if="letter.user"><v-icon small>{{letter.watch ? 'mdi-eye':'mdi-eye-off'}}</v-icon></v-btn>
            </template>
            <small>Watch Letter</small>
          </v-tooltip>
          <v-btn small icon outlined color="teal" class="ml-2 my-auto" v-if="!letter.pdf_url" @click="$refs.vh2p.generatePdf()"><v-icon small>mdi-printer</v-icon></v-btn>
        </div>
      </v-card-title>
      <v-card-text class="pt-5">
        <v-row>

<!--          Letter body & Appendices & Related letters      -->
          <v-col cols="12" md="8">
            <iframe class="rounded-lg" :src="pdf_src" style="border: lightgrey thin solid; min-height: 400px; max-height: 700px; width: 100%; overflow-y: auto" v-if="letter.pdf_url" />
            <div class="rounded-lg pa-3" style="border: lightgrey thin solid; min-height: 400px; max-height: 700px; background-color: white; overflow-y: auto" v-else>
              <div v-html="letter.body" class="black--text" style="line-height: 30px"></div>
              <div class="d-flex mt-10">
                <div class="flex-fill"></div>
                <div class="px-10 d-flex flex-column caption">
                  <b class="mx-auto">{{letter.user}}</b>
                  <span class="mx-auto">{{letter.post}}</span>
                  <img class="mx-auto" :src="MediaUrl+letter.sign_url" alt="sign" v-if="letter.sign_url"  style="height: 80px"/>
                  <v-chip x-small class="mx-auto my-2" v-else>No Sign</v-chip>
                </div>
              </div>
            </div>
            <table style="width: 100%">
              <tr v-if="letter.appendices.length || !letter.user">
                <td class="caption py-1 pr-1" style="width: 1%"><small>Appendices:</small></td>
                <td>
                  <span v-for="appendix in letter.appendices" class="ml-2">
                    <v-btn x-small color="cyan lighten-3" rounded @click="mediaDownload('letter-appendix', appendix.id, appendix.file_url.substr(13))">{{appendix.file_url.substr(13)}}</v-btn>
                    <v-btn x-small icon color="pink lighten-3" style="margin-right: -5px" title="Remove" v-if="!letter.user" @click="removeAppendix(appendix.id)"><v-icon x-small>mdi-trash-can-outline</v-icon></v-btn>
                  </span>
                </td>
                <td style="width: 1%">
                  <v-file-input v-model="new_appendix.file" style="display: none" ref="file_selector" @change="addAppendix" />
                  <v-btn x-small color="green lighten-3" class="rounded-lg" @click="new_appendix.file=null; $refs.file_selector.$refs.input.click()" width="100" v-if="!letter.user">Add Appendix</v-btn>
                </td>
              </tr>
              <tr v-if="letter.relations.length || !letter.user">
                <td class="caption py-1 pr-1" style="width: 1%"><small>Relations:</small></td>
                <td>
                  <span v-for="relation in letter.relations" class="ml-2">
                    <v-btn x-small color="cyan lighten-3" rounded :to="`/letter/${relation.id}`">{{relation.title}}</v-btn>
                    <v-btn x-small icon color="pink lighten-3" style="margin-right: -5px" title="Remove" v-if="!letter.user" @click="removeRelation(relation.id)"><v-icon x-small>mdi-trash-can-outline</v-icon></v-btn>
                  </span>
                </td>
                <td>
                  <v-btn x-small color="green lighten-3" class="rounded-lg" @click="related_letters={dialog: true, loading: false, q: '', page: 1, list: []}" width="100" v-if="!letter.user" :loading="related_letters.loading">Add Relation</v-btn>
                </td>
              </tr>
            </table>

          </v-col>

<!--      Refer To me Details      -->
          <v-col cols="12" md="4" class="px-0">
            <table style="width: 100%" v-if="my_refer">
              <tr v-if="my_refer.user_id===CurrentUser.id">
                <td class="caption py-1 pr-1" style="width: 1%">from:</td>
                <td class="caption font-weight-bold">{{my_refer.sender_user}} - {{my_refer.sender_post}}</td>
              </tr>
              <tr v-else>
                <td class="caption py-1 pr-1" style="width: 1%">to:</td>
                <td class="caption font-weight-bold">{{my_refer.user}} - {{my_refer.post}}</td>
              </tr>
              <tr>
                <td class="caption py-1 pr-1">time:</td>
                <td class="caption font-weight-bold">{{my_refer.time.substr(0,10)}} {{my_refer.time.substr(11,5)}}</td>
              </tr>
              <tr v-if="my_refer.transcript || my_refer.confidential || my_refer.urgency !== 'normal'">
                <td class="caption py-1 pr-1"><small>tag</small></td>
                <td>
                  <v-chip x-small dark color="pink lighten-2" class="px-2" v-if="my_refer.confidential">confidential</v-chip>
                  <v-chip x-small dark color="pink lighten-2" v-if="my_refer.urgency==='immediate'">immediate</v-chip>
                  <v-chip x-small dark color="orange lighten-1" class="px-2" v-else-if="my_refer.urgency==='urgent'">urgent</v-chip>
                  <v-chip x-small dark color="cyan lighten-2" class="px-2" v-if="my_refer.transcript">transcript</v-chip>
                </td>
              </tr>
              <tr>
                <td class="caption py-1 pr-1"><small>Refer:</small></td>
                <td class="caption font-weight-bold black--text">{{my_refer.body}}</td>
              </tr>
              <tr v-if="my_refer.appendices.length">
                <td class="caption py-1 pr-1"><small>Appendices:</small></td>
                <td>
                  <v-btn x-small color="cyan lighten-2" rounded v-for="appendix in my_refer.appendices" @click="mediaDownload('refer-appendix', appendix.id,appendix.file_url.substr(13))">{{appendix.file_url.substr(13)}}</v-btn>
                </td>
              </tr>
            </table>
            <div class="text-center mt-8" v-if="my_refer">
              <img src="@/assets/image/lines/l10.png" alt="line" style="width: 80%; max-width: 300px" />
              <p class="orange--text mt-8" v-if="letter.pdf_url && !letter.user">
                <v-icon color="orange">mdi-alert-circle-outline</v-icon>
                <b>Before any refer, "sign' the letter to prevent possible editing</b>
              </p>
            </div>
            <v-chip x-small v-else>You are not in then circulation of this letter</v-chip>
          </v-col>
        </v-row>

<!--    Complete Refer Circulation    -->
        <v-card flat outlined class="rounded-lg mt-6">
          <v-card-title class="teal lighten-4 caption py-2 d-flex justify-space-between">
            <small>{{letter.refers.length}} refer</small>
            <b>Refer Circulation</b>
            <v-btn small icon outlined color="teal" title="Tree of Refer" @click="loadLetterReferTree" :loading="processing"><v-icon small>mdi-file-tree mdi-flip-h</v-icon></v-btn>
          </v-card-title>
          <v-card-text class="pt-4">
            <v-simple-table dense>
              <thead>
                <tr>
                  <th class="caption text-center"><small></small></th>
                  <th class="caption text-center"><small>from</small></th>
                  <th class="caption text-center"><small>date</small></th>
                  <th class="caption text-center"><small>to</small></th>
                  <th class="caption text-center"><small>body</small></th>
                  <th class="caption text-center"><small></small></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(refer, index) in letter.refers" :style="{backgroundColor: refer===my_refer ? 'lightcyan':''}">
                  <td class="caption grey--text">{{index+1}}</td>
                  <td class="caption" :style="refer.user_id===CurrentUser.id || refer.sender_user_id===CurrentUser.id ? 'cursor: pointer':''" @click="refer.user_id===CurrentUser.id || refer.sender_user_id===CurrentUser.id ? $router.push('/letter/ref'+refer.id):{}">
                    <div>{{refer.sender_user}}</div>
                    <div class="grey--text" style="margin-top: -5px"><small>{{refer.sender_post}}</small></div>
                  </td>
                  <td class="caption" :style="refer.user_id===CurrentUser.id || refer.sender_user_id===CurrentUser.id ? 'cursor: pointer':''" @click="refer.user_id===CurrentUser.id || refer.sender_user_id===CurrentUser.id ? $router.push('/letter/ref'+refer.id):{}">
                    <div class="text-center"><small>{{refer.time.substr(0,10)}}</small></div>
                    <div class="text-center grey--text" style="margin-top: -5px"><small>{{refer.time.substr(11,5)}}</small></div>
                  </td>
                  <td class="caption" :style="refer.user_id===CurrentUser.id || refer.sender_user_id===CurrentUser.id ? 'cursor: pointer':''" @click="refer.user_id===CurrentUser.id || refer.sender_user_id===CurrentUser.id ? $router.push('/letter/ref'+refer.id):{}">
                    <div class="d-flex">
                      <div class="my-auto">
                        <div>{{refer.user}}</div>
                        <div class="grey--text" style="margin-top: -5px"><small>{{refer.post}}</small></div>
                      </div>
                      <v-tooltip right color="grey lighten-1" v-if="refer.seen_time">
                        <template #activator="{on}">
                          <v-icon small class="my-auto ml-2" color="grey lighten-1" v-on="on">mdi-eye</v-icon>
                        </template>
                        <div class="caption black--text text-center"><small>{{refer.seen_time.substr(0,10)}}<br>{{refer.seen_time.substr(11,5)}}</small></div>
                      </v-tooltip>
                      <v-tooltip right color="grey lighten-1" v-if="refer.trashed">
                        <template #activator="{on}">
                          <v-icon small class="my-auto ml-2" color="grey lighten-1" v-on="on">mdi-trash-can-outline</v-icon>
                        </template>
                        <div class="caption black--text text-center"><small>Removed</small></div>
                      </v-tooltip>
                      <v-tooltip right color="grey lighten-1" v-if="refer.archived">
                        <template #activator="{on}">
                          <v-icon small class="my-auto ml-2" color="grey lighten-1" v-on="on">mdi-archive-outline</v-icon>
                        </template>
                        <div class="caption black--text text-center"><small>Archived</small></div>
                      </v-tooltip>
                    </div>
                  </td>
                  <td class="caption font-weight-bold">{{refer.body}}</td>
                  <td>
                    <div class="caption d-flex justify-space-between">
                      <div class="my-auto">
                        <v-btn x-small color="cyan lighten-3" rounded v-for="appendix in refer.appendices" class="ml-1" @click="mediaDownload('refer-appendix', appendix.id, appendix.file_url.substr(13))">{{appendix.file_url.substr(13)}}</v-btn>
                      </div>
                      <div class="my-auto">
                        <v-chip x-small dark color="pink lighten-2" v-if="refer.urgency==='immediate'">immediate</v-chip>
                        <v-chip x-small dark color="orange lighten-1" v-else-if="refer.urgency==='urgent'">urgent</v-chip>
                        <v-chip x-small dark color="pink lighten-2" v-if="refer.confidential">confidential</v-chip>
                        <v-icon color="cyan" title="transcript" v-if="refer.transcript">mdi-content-copy mdi-18px</v-icon>
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </v-simple-table>
          </v-card-text>
        </v-card>

      </v-card-text>

<!--      Print Layout  -->
      <vh2p :enable-download="false" ref="vh2p" :manual-pagination="true" pdf-format="a4" pdf-orientation="landscape" :preview-modal="true" :pdf-quality="2">
        <section slot="pdf-content">
          <div style="margin: 20px; padding: 10px 20px 10px 20px; border: thin solid grey; font-family: dirooz,serif; font-size: small; width: 285mm; border-radius: 15px">
            <table style="width: 100%; margin: 20px 0">
              <tr>
                <td></td>
                <td style="width: 100px">
                  <div>
                    <small style="color: grey; margin-right: 5px">No: </small>
                    <b>{{letter.id}}</b>
                  </div>
                  <div>
                    <small style="color: grey; margin-right: 8px">Date: </small>
                    <b>{{letter.date}}</b>
                  </div>
                </td>
              </tr>
            </table>
            <div v-html="letter.body" style="margin-top: 10px; line-height: 30px"></div>
            <v-row style="margin: 10px 0">
              <v-col></v-col>
              <v-col style="text-align: center">
                <b>{{letter.user}}</b><br>
                <small style="color: grey">{{letter.post}}</small><br>
                <img :src="MediaUrl+letter.sign_url" alt="sign" v-if="letter.sign_url"  style="height: 80px"/>
                <v-chip x-small class="mx-auto my-2" v-else>No Signature</v-chip>
              </v-col>
            </v-row>
          </div>
        </section>
      </vh2p>

    </v-card>

<!--    Refer Modal -->
    <v-dialog v-model="dialog_refer" width="600" scrollable persistent v-if="my_refer">
      <ReferModal ref="refer_modal" :ids="[my_refer.id]" :reply_me="true" :is_in_inbox="my_refer && my_refer.user_id===CurrentUser.id && !my_refer.trashed && !my_refer.archived" @closeModal="closeReferModal" />
    </v-dialog>

<!--    Refer Tree -->
    <v-dialog v-model="dialog_refer_tree" width="80%" scrollable>
      <v-card>
        <v-card-title class="teal lighten-4 font-weight-bold"><small class="mx-auto">Referral Tree</small></v-card-title>
        <v-card-text class="pt-4">
          <org-chart :datasource="refer_tree" style="height: 95%" >
            <template slot-scope="data">
              <v-card :title="data.nodeData.seen_time?.substr(0,16).replaceAll('T',' ')">
                <v-card-title class="cyan lighten-3 px-1 py-0 caption font-weight-bold" :class="data.nodeData.seen_time ? 'cyan':'orange'">
                  <small class="mx-auto">{{data.nodeData.user}}</small>
                </v-card-title>
                <v-card-text class="caption font-weight-bold py-1 px-0">
                  <small>{{data.nodeData.post}}</small>
                </v-card-text>
              </v-card>
            </template>
          </org-chart>
        </v-card-text>
      </v-card>
    </v-dialog>

<!--    Edit Letter Modal -->
    <v-dialog v-model="editing.dialog" width="800" persistent v-if="!letter.user">
      <v-card>
        <v-card-title class="teal lighten-4 d-flex justify-space-between">
          <div style="width: 400px">
            <v-text-field dense solo color="teal" v-model="editing.title" label="Title" hide-details />
          </div>
          <div>
            <v-btn-toggle dense rounded mandatory color="info" v-model="editing.type">
              <v-btn small width="80" :disabled="editing.loading" value="text" class="caption text-normal">Internal</v-btn>
              <v-btn small width="80" :disabled="editing.loading" value="pdf" class="caption text-normal">External</v-btn>
            </v-btn-toggle>
          </div>
        </v-card-title>
        <v-card-text class="pt-4">
          <div v-show="editing.type==='text'">
            <ckeditor v-model="editing.body" :editor="editor" :config="editorConfig" @ready="onReady" style="border: lightgray thin solid; min-height: 350px; line-height: 30px" />
          </div>
          <div v-show="editing.type==='pdf'" class="pa-4" style="border: lightgray thin solid; min-height: 390px">
            <v-file-input dense solo hide-details show-size small-chips accept="application/pdf" color="teal" v-model="editing.file" label="just pdf file" class="mb-4" />
            <v-text-field dense solo hide-details color="teal" v-model="editing.external_sender" label="Sender Organization" />
            <p class="orange--text mt-8" v-if="letter.pdf_url">
              <v-icon color="orange">mdi-alert-circle-outline</v-icon>
              <b>if Attached new appendix, former file will be overwritten</b>
            </p>
          </div>
        </v-card-text>
        <v-card-actions class="teal lighten-4 d-flex justify-space-around">
          <v-btn small dark color="teal lighten-1" class="caption rounded-lg text-normal" width="100" :loading="editing.loading" @click="saveLetter">Save</v-btn>
          <v-btn small dark color="teal lighten-1" class="caption rounded-lg text-normal" width="100" :loading="editing.loading" @click="editing.dialog=false">Ignore</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

<!--    related letter modal -->
    <v-dialog v-model="related_letters.dialog" width="500" scrollable>
      <v-card :loading="related_letters.loading">
        <v-card-title class="teal lighten-4 font-weight-bold"><small>New Related Letter</small></v-card-title>
        <v-card-text class="pt-4">
          <v-text-field dense outlined clearable hide-details v-model="related_letters.q" class="rounded-10 mb-3" label="search with title and no..." @keyup.enter.exact="relatedLetterSearch" @click:clear="related_letters.list=[]" :disabled="related_letters.loading" autofocus />
          <v-simple-table dense>
            <tbody>
              <tr v-for="relation in related_letters.list">
                <td style="cursor: pointer" @click="addRelation(relation.id)">{{relation.id}} - {{relation.title}}</td>
              </tr>
            </tbody>
          </v-simple-table>
          <v-pagination color="teal lighten-3" v-model="related_letters.page" :length="Math.ceil(related_letters.count/10)" total-visible="9" @input="relatedLetterSearch" v-show="related_letters.count > 10" />
        </v-card-text>
      </v-card>
    </v-dialog>

  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import vh2p from 'vue-html2pdf'
  import ReferModal from '~/components/ReferModal'
  import OrgChart from 'vue-organization-chart'
  import 'vue-organization-chart/dist/orgchart.css'
  import DocumentEditor from '@ckeditor/ckeditor5-build-decoupled-document'

  export default {
    name: '_pk',
    components: {ReferModal, vh2p, OrgChart},
    computed: {
      ...mapGetters(['MediaUrl', 'CurrentUser']),
      letter() { return this.$store.state.letter.letter },
      my_refer() {
        if (this.$route.params.pk.substr(0,3) !== 'ref') return null
        let i = this.letter.refers.map(item => item.id).indexOf(Number(this.$route.params.pk.substr(3)))
        return this.letter.refers[i]
      },
    },
    data() {
      return {
        loading: false,
        processing: false,
        pdf_src: '',
        dialog_refer: false,
        dialog_refer_tree: false,
        refer_tree: {},
        editing: {dialog: false, loading: false, type: 'text', title: '', body: '', file: null, external_sender: ''},
        editor: DocumentEditor,
        editorConfig: {
          fontSize: {options: [9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20], supportAllValues: true},
          toolbar: {items: ['heading', '|', 'fontSize', 'fontColor', 'fontBackgroundColor', '|', 'bold', 'italic', '|', 'alignment', 'numberedList', 'bulletedList', '|', 'outdent', 'indent', '|', 'link', 'insertTable', '|', 'undo', 'redo'], shouldNotGroupWhenFull: true}
        },
        new_appendix: {file: null, loading: false},
        related_letters: {dialog: false, loading: false, q: '', page: 1, list: []},
      }
    },
    methods: {
      loadLetter() {
        this.loading = true
        this.$axios.$get(`letter-detail/${this.$route.params.pk}`, {headers: {Authorization: 'token '+this.$cookies.get('userToken')}})
          .then(res => {
            this.$store.commit('letter/setLetter', {letter: res.letter, ref: this.$route.params.pk.substr(0,3) === 'ref' ? Number(this.$route.params.pk.substr(3)):0})
            this.$store.commit('setCurrentUserLetterCount', res.letter_count)
            if (res.letter.pdf_url) this.$axios.$get(`letter-media/letter/${res.letter.id}`, {headers: {'Authorization': 'token '+this.$cookies.get('userToken')}, responseType: 'blob'})
              .then(res => this.pdf_src = window.URL.createObjectURL(new Blob([res], {type: 'application/pdf'})))
              .catch(() => this.$toast.error('file not found'))
          })
          .catch(err => this.$toast.error(err.response.data.detail))
          .finally(() => this.loading = false)
      },
      mediaDownload(table, pk, title) {
        if (this.loading) return
        this.loading = true
        this.$axios.$get(`letter-media/${table}/${pk}`, {headers: {'Authorization': 'token '+this.$cookies.get('userToken')}, responseType: 'blob'})
          .then(res => {
            let fileURL = window.URL.createObjectURL(new Blob([res]))
            let fileLink = document.createElement('a')
            fileLink.href = fileURL
            fileLink.setAttribute('download', title)
            fileLink.click()
          })
          .catch(() => this.$toast.error('file not found'))
          .finally(() => this.loading = false)
      },
      changeReferStatus(field, value) {
        if (this.loading) return
        this.loading = true
        this.$axios.$post('change-refer-status/', {field: field, value: value, ids: [this.my_refer.id]}, {headers: {Authorization: 'token '+this.$cookies.get('userToken')}})
          .then(() => {
            // to reload letter list if returned to list page:
            this.$store.commit('letter/setMenuPage', 0)
            this.$router.push('/letter')
            this.$toast.success(`referral ${field==='trashed' ? (value ? 'removed':'recovered'):(value ? 'archived':'recovered')}`)
          })
          .catch(err => this.$toast.error(err.response.data.detail))
          .finally(() => this.loading = false)
      },
      closeReferModal(then) {
        this.dialog_refer = false
        if (then) {
          if (['archive', 'trash'].includes(then)) this.$store.commit('letter/removeLetters', this.selected)
          this.selected = []
        }
      },
      loadLetterReferTree() {
        if (this.processing) return
        this.processing = true
        this.$axios.$get('letter-refer-tree/'+this.letter.id, {headers: {Authorization: 'token '+this.$cookies.get('userToken')}})
          .then(res => {
            this.refer_tree = res
            this.dialog_refer_tree = true
          })
          .catch(err => this.$toast.error(err.response.data.detail))
          .finally(() => this.processing = false)
      },
      watchLetter() {
        if (this.processing) return
        this.processing = true
        this.$axios.$post('watch-letter/', {id: this.letter.id, watch: !this.letter.watch}, {headers: {Authorization: 'token '+this.$cookies.get('userToken')}})
          .then(res => {
            this.$store.commit('letter/setLetterWatch', res.watch)
            if (res.watch) this.$toast.info('watching enabled, you will be notified on any new referral of this letter')
            else this.$toast.info('watching disabled')
          })
          .catch(err => this.$toast.error(err.response.data.detail))
          .finally(() => this.processing = false)
      },
      onReady(editor) {
        editor.ui.getEditableElement().parentElement.insertBefore(editor.ui.view.toolbar.element, editor.ui.getEditableElement())
      },
      saveLetter() {
        if (!this.editing.title) {
          this.$toast.error('Please enter letter title')
          return
        }
        if (this.editing.type === 'text' && !this.editing.body) {
          this.$toast.error('Please write something...')
          return
        }
        if (this.editing.type === 'pdf' && (!this.editing.file || !this.editing.external_sender)) {
          this.$toast.error('Please specify file and sender')
          return
        }
        this.editing.loading = true
        let formDate = new FormData
        formDate.append('id', this.letter.id)
        formDate.append('title', this.editing.title)
        if (this.editing.type === 'text') formDate.append('body', this.editing.body)
        else {
          formDate.append('file', this.editing.file)
          formDate.append('external_sender', this.editing.external_sender)
        }
        this.$axios.$post('save-letter/', formDate, {headers: {Authorization: 'token '+this.$cookies.get('userToken')}})
          .then(res => {
            this.$store.commit('letter/setLetter', {letter: res, ref: this.$route.params.pk.substr(0,3) === 'ref' ? Number(this.$route.params.pk.substr(3)):0})
            this.editing.dialog = false
            if (this.editing.type === 'pdf') this.$axios.$get(`letter-media/letter/${this.letter.id}`, {headers: {'Authorization': 'token '+this.$cookies.get('userToken')}, responseType: 'blob'})
              .then(res => this.pdf_src = window.URL.createObjectURL(new Blob([res], {type: 'application/pdf'})))
              .catch(() => this.$toast.error('file not found'))
          })
          .catch(err => this.$toast.error(err.response.data.detail))
          .finally(() => this.editing.loading = false)
      },
      signLetter() {
        if (confirm('after signed letter wont be editable, sign it?')) this.$axios.$post('sign-letter/', {id: this.letter.id}, {headers: {Authorization: 'token '+this.$cookies.get('userToken')}})
          .then(res => {
            this.$store.commit('letter/signLetter', {id: this.letter.id, ...res})
            this.$toast.success('Done')
          })
          .catch(err => this.$toast.error(err.response.data.detail))

      },
      addAppendix() {
        if (this.new_appendix.file) {
          this.new_appendix.loading = true
          let formData = new FormData
          formData.append('id', this.letter.id)
          formData.append('file', this.new_appendix.file)
          this.$axios.$post('letter-appendix-add/', formData, {headers: {'Authorization': 'token '+this.$cookies.get('userToken')}})
            .then(res => this.$store.commit('letter/addLetterAppendix', res))
            .catch(err => this.$toast.error(err.response.data.detail))
            .finally(() => this.new_appendix.loading = false)
        }
      },
      removeAppendix(pk) {
        if (confirm('Can`t be recovered, remove file?')) {
          this.new_appendix.loading = true
          this.$axios.$post('letter-appendix-remove/', {id: pk}, {headers: {'Authorization': 'token '+this.$cookies.get('userToken')}})
            .then(() => this.$store.commit('letter/removeLetterAppendix', pk))
            .catch(err => this.$toast.error(err.response.data.detail))
            .finally(() => this.new_appendix.loading = false)
        }
      },
      relatedLetterSearch() {
        if (this.related_letters.loading) return
        this.related_letters.loading = true
        this.$axios.$get('related-letter-search/', {headers: {'Authorization': 'token '+this.$cookies.get('userToken')}, params: {q: this.related_letters.q, page: this.related_letters.page}})
          .then(res => {
            this.related_letters.list = res.list
            this.related_letters.count = res.count
            this.related_letters.page = res.page
          })
          .catch(err => this.$toast.error(err.response.data.detail))
          .finally(() => this.related_letters.loading = false)
      },
      addRelation(pk) {
        if (this.related_letters.loading) return
        this.related_letters.loading = true
        this.$axios.$post('letter-relation-add/', {letter: this.letter.id, relation: pk}, {headers: {'Authorization': 'token '+this.$cookies.get('userToken')}})
          .then(res => {
            this.$store.commit('letter/addLetterRelation', res)
            this.related_letters.dialog=false
          })
          .catch(err => this.$toast.error(err.response.data.detail))
          .finally(() => this.related_letters.loading = false)
      },
      removeRelation(pk) {
        this.related_letters.loading = true
        this.$axios.$post('letter-relation-remove/', {letter: this.letter.id, relation: pk}, {headers: {'Authorization': 'token '+this.$cookies.get('userToken')}})
          .then(() => this.$store.commit('letter/removeLetterRelation', pk))
          .catch(err => this.$toast.error(err.response.data.detail))
          .finally(() => this.related_letters.loading = false)
      },
    },
    watch: {
      '$route.params.pk': { handler() {this.loadLetter()}, immediate: true }
    },
  }
</script>

