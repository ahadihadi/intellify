<template>
  <v-card elevation="10" class="rounded-15 pa-5" :loading="loading" color="grey lighten-5">
    <v-card-title class="teal lighten-4 d-flex py-2">
      <v-btn-toggle dense rounded mandatory color="deep-purple darken-4" v-model="menu.tag" @change="$store.commit('letter/setLetterMenu', menu)">
        <v-btn class="caption text-normal" :disabled="loading" value="inbox" width="70">Inbox</v-btn>
        <v-btn class="caption text-normal" :disabled="loading" value="new" width="70" v-if="CurrentUser.letter_count">
          <v-badge inline color="pink lighten-2" :content="CurrentUser.letter_count">New</v-badge>
        </v-btn>
        <v-btn class="caption text-normal" :disabled="loading" value="outbox" width="70">Outbox</v-btn>
        <v-btn class="caption text-normal" :disabled="loading" value="archive" width="70">Archive</v-btn>
        <v-btn class="caption text-normal" :disabled="loading" value="trash" width="70">Trash</v-btn>
      </v-btn-toggle>
      <div class="ml-4">
        <v-text-field dense solo hide-details clearable v-model="menu.q" :disabled="loading" color="teal" class="rounded-15 caption" height="20" append-icon="mdi-magnify" @keyup.enter.exact="$store.commit('letter/setLetterMenu', menu)" @keyup.esc.exact="menu.q=null; $store.commit('letter/setLetterMenu', menu)" @click:clear="menu.q=null; $store.commit('letter/setLetterMenu', menu)" />
      </div>
      <v-spacer />
      <v-btn icon small outlined color="info" v-show="selected.length" @click="dialog_refer=true; $nextTick(() => $refs.refer_modal.initialize())"><v-icon small>mdi-reply mdi-flip-h</v-icon></v-btn>
      <v-btn icon small outlined color="teal" class="ml-2" v-show="selected.length" v-if="menu.tag==='inbox'" @click="changeReferStatus('archived', true)" title="Archive"><v-icon small>mdi-archive-outline</v-icon></v-btn>
      <v-btn icon small outlined color="green" class="ml-2" v-show="selected.length" v-if="menu.tag==='archive'" @click="changeReferStatus('archived', false)" title="Recycle"><v-icon small>mdi-archive-arrow-up-outline</v-icon></v-btn>
      <v-btn icon small outlined color="pink lighten-2" class="ml-2" v-show="selected.length" v-if="menu.tag==='inbox'" @click="changeReferStatus('trashed', true)" title="Remove"><v-icon small>mdi-trash-can-outline</v-icon></v-btn>
      <v-btn icon small outlined color="green" class="ml-2" v-show="selected.length" v-if="menu.tag==='trash'" @click="changeReferStatus('trashed', false)" title="Recycle"><v-icon small>mdi-backup-restore</v-icon></v-btn>
      <v-btn icon small outlined color="cyan" class="ml-2" @click="editing={dialog: true, loading: false, type: 'text', title: '', body: '<p><strong>Dear Mr ...</strong><br /><strong>Manager of ...</strong></p><p>Respected Sir، ...</p><p>&nbsp;</p><p>Thanks, and best wishes.</p>', file: null, external_sender: ''}" title="New Letter"><v-icon>mdi-plus mdi-18px</v-icon></v-btn>
      <v-btn icon small outlined color="cyan" class="ml-2" @click="dialog_setting=true; $nextTick(() => $refs.letter_setting.initialize())" title="Config"><v-icon>mdi-cog mdi-18px</v-icon></v-btn>
    </v-card-title>


    <v-simple-table>
      <thead>
        <tr>
          <th></th>
          <th>
            <v-btn icon color="teal" @click="selected = selected.length===letter_list.list.length ? []:letter_list.list.map(item => item.id)" v-if="letter_list.list.length">
              <v-icon :color="selected.length===letter_list.list.length ? 'teal':'grey'">{{selected.length===letter_list.list.length ? 'mdi-checkbox-multiple-marked-outline':'mdi-checkbox-multiple-blank-outline'}}</v-icon>
            </v-btn>
            <span v-if="letter_list.list.length">Select All</span>
          </th>
          <th class="text-left">Date & No.</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(letter, index) in letter_list.list">
          <td style="width: 50px" class="caption grey--text pl-0">
            <div class="d-flex justify-space-between">
              {{10 * menu.page + index - 9}}
              <v-avatar size="8" color="pink lighten-2" class="my-auto" v-if="!letter.seen_time" title="New" />
            </div>
          </td>
          <td style="height: 55px">
            <v-skeleton-loader type="list-item" v-if="loading" max-width="500" />
            <div class="d-flex" v-else>
              <v-checkbox dense hide-details color="teal" class="my-auto ml-2" :value="letter.id" v-model="selected" />
              <div class="my-auto">
                <NuxtLink :to="`letter/ref${letter.id}`">
                  <div class="font-weight-bold">{{letter.letter_title}}</div>
                  <div class="grey--text">
                    <small>{{menu.tag === 'outbox' ? 'to':'from'}}: {{letter.user.name}} ({{letter.user.post}})</small>
                    <small v-if="letter.external_sender"> | signer: {{letter.external_sender}}</small>
                    <small v-else-if="letter.signer.name"> | signer: {{letter.signer.name}} ({{letter.signer.post}})</small>
                  </div>
                </NuxtLink>
              </div>
              <v-spacer />
              <div class="my-auto">
                <v-chip small dark color="pink lighten-2" v-if="letter.urgency==='immediate'">immediate</v-chip>
                <v-chip small dark color="orange lighten-1" v-else-if="letter.urgency==='urgent'">urgent</v-chip>
                <v-chip small dark color="pink lighten-2" v-if="letter.confidential">confidential</v-chip>
                <v-icon color="cyan" title="has appendix" v-if="letter.has_appendix">mdi-paperclip</v-icon>
                <v-icon color="cyan" title="transcript" v-if="letter.transcript">mdi-content-copy mdi-18px</v-icon>
              </div>
            </div>
          </td>
          <td class="text-left">
            <v-skeleton-loader type="list-item" v-if="loading" max-width="100" />
            <div v-else>
              <b>{{letter.letter_id}}</b>
              <div class="grey--text"><small>{{letter.date}} {{letter.time}}</small></div>
            </div>
          </td>
        </tr>
      </tbody>
    </v-simple-table>

    <div class="text-center">
      <v-pagination circle color="teal" v-model="menu.page" v-show="letter_list.count > 10" :length="Math.ceil(letter_list.count/10)" class="my-auto" @input="$store.commit('letter/setLetterMenu', menu)" />
    </div>

    <v-dialog v-model="dialog_setting" width="600">
      <LetterSettingModal ref="letter_setting" @closeDialog="dialog_setting=false" />
    </v-dialog>

    <v-dialog v-model="dialog_refer" width="600" scrollable persistent>
      <ReferModal ref="refer_modal" :ids="selected" :is_in_inbox="menu.tag==='inbox'" @closeModal="closeReferModal" />
    </v-dialog>

    <v-dialog v-model="editing.dialog" width="820" persistent>
      <v-card>
        <v-card-title class="teal lighten-4 d-flex justify-space-between">
          <div style="width: 400px">
            <v-text-field dense outlined color="teal" v-model="editing.title" label="Title" class="white" hide-details autofocus />
          </div>
          <div>
            <v-btn-toggle dense rounded mandatory color="info" v-model="editing.type">
              <v-btn small width="100" :disabled="editing.loading" value="text" class="caption text-normal">Internal</v-btn>
              <v-btn small width="100" :disabled="editing.loading" value="pdf" class="caption text-normal">External</v-btn>
            </v-btn-toggle>
          </div>
        </v-card-title>
        <v-card-text class="pt-4">
          <div v-show="editing.type==='text'">
            <ckeditor v-model="editing.body" :editor="editor" :config="editorConfig" @ready="onReady" style="border: lightgray thin solid; min-height: 350px; line-height: 30px" />
          </div>
          <div v-show="editing.type==='pdf'" class="pa-4" style="border: lightgray thin solid; min-height: 390px">
            <v-file-input dense outlined hide-details show-size small-chips accept="application/pdf" color="teal" v-model="editing.file" label="just pdf file" class="mb-4" />
            <v-text-field dense outlined hide-details color="teal" v-model="editing.external_sender" label="Sender Organization" />
          </div>
        </v-card-text>
        <v-card-actions class="teal lighten-4 d-flex justify-space-around py-3">
          <v-btn small dark color="teal lighten-1" class="caption rounded-lg text-normal" width="100" :loading="editing.loading" @click="saveLetter">Save</v-btn>
          <v-btn small dark color="teal lighten-1" class="caption rounded-lg text-normal" width="100" :loading="editing.loading" @click="editing.dialog=false">Ignore</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

  </v-card>
</template>

<script>
  import {mapGetters} from 'vuex'
  import LetterSettingModal from '~/components/LetterSettingModal'
  import ReferModal from '~/components/ReferModal'
  import DocumentEditor from '@ckeditor/ckeditor5-build-decoupled-document'

  export default {
    name: 'letter',
    components: {ReferModal, LetterSettingModal},
    computed: {
      ...mapGetters(['MediaUrl', 'CurrentUser']),
      letter_list() { return this.$store.state.letter.letter_list },
      letter_menu() { return this.$store.state.letter.menu },
    },
    data() {
      return {
        loading: false,
        selected: [],
        menu: {page: 1, q: null, tag: 'inbox'},
        dialog_setting: false,
        dialog_letter_detail: false,
        dialog_refer: false,
        editing: {dialog: false, loading: false, type: 'text', title: '', body: '', file: null, external_sender: ''},
        editor: DocumentEditor,
        editorConfig: {
          fontSize: {options: [9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20], supportAllValues: true},
          toolbar: {items: ['heading', '|', 'fontSize', 'fontColor', 'fontBackgroundColor', '|', 'bold', 'italic', '|', 'alignment', 'numberedList', 'bulletedList', '|', 'outdent', 'indent', '|', 'link', 'insertTable', '|', 'undo', 'redo'], shouldNotGroupWhenFull: true}
        },
      }
    },
    mounted() {
      this.menu = {...this.letter_menu}
      this.selected = []
      if (!this.menu.page) {
        this.loadLetterList()
      }
      if (!this.$store.state.letter.frequent_text_list.length) this.$axios.$get('frequent-text-list/', {headers: {Authorization: 'token '+this.$cookies.get('userToken')}})
          .then(res => this.$store.commit('letter/setFrequentTextList', res))
      if (!this.$store.state.letter.recipient_group_list.length) this.$axios.$get('recipient-group-list/', {headers: {Authorization: 'token '+this.$cookies.get('userToken')}})
          .then(res => this.$store.commit('letter/setRecipientGroupList', res))
      if (!this.$store.state.letter.recipient_list.length) this.$axios.$get('recipient-list/', {headers: {Authorization: 'token '+this.$cookies.get('userToken')}})
          .then(res => this.$store.commit('letter/setRecipientList', res))
    },
    methods: {
      loadLetterList() {
        this.loading = true
        this.$axios.$get('letter-list/', {headers: {Authorization: 'token '+this.$cookies.get('userToken')}, params: this.menu})
          .then(res => {
            this.$store.commit('letter/setLetterList', res)
            this.menu = {...this.letter_menu}
            this.selected = []
          })
          .catch(err => this.$toast.error(err.response.data.detail))
          .finally(() => this.loading = false)
      },
      changeReferStatus(field, value) {
        if (this.loading) return
        this.loading = true
        this.$axios.$post('change-refer-status/', {field: field, value: value, ids: this.selected}, {headers: {Authorization: 'token '+this.$cookies.get('userToken')}})
          .then(() => this.loadLetterList())
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
        formDate.append('title', this.editing.title)
        if (this.editing.type === 'text') formDate.append('body', this.editing.body)
        else {
          formDate.append('file', this.editing.file)
          formDate.append('external_sender', this.editing.external_sender)
        }
        this.$axios.$post('save-letter/', formDate, {headers: {Authorization: 'token '+this.$cookies.get('userToken')}})
          .then(res => {
            this.editing.dialog = false
            this.$toast.success(`Letter ${res.letter_title} Created`)
            this.$router.push('letter/ref'+res.id)
            this.loadLetterList()
          })
          .catch(err => this.$toast.error(err.response.data.detail))
          .finally(() => this.editing.loading = false)
      },
    },
    watch: {
      '$store.state.letter.menu': {handler() {this.loadLetterList()}, deep: true}
    },
  }
</script>
