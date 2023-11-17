<template>
  <v-card class="rounded-10">
    <v-card-title class="teal lighten-4 font-weight-bold py-2 pl-3">
      <small>Refer</small>
      <v-btn x-small outlined color="teal" class="ml-auto rounded-lg text-normal" v-show="!show_transcript" :disabled="loading" @click="show_transcript=true">add transcript</v-btn>
      <v-btn x-small outlined color="teal" class="ml-auto rounded-lg text-normal" v-show="show_transcript" :disabled="loading" @click="show_transcript=false; refers.forEach(item => item.transcripts=[])">remove transcript</v-btn>
      <v-btn x-small icon color="teal" class="ml-2" title="close" @click="$emit('closeModal', null)">
        <v-icon small>mdi-close</v-icon>
      </v-btn>
    </v-card-title>
    <v-card-text class="pt-4">
      <v-card flat v-for="(ref, ref_index) in refers" class="pa-1 mb-3 rounded-lg" color="grey lighten-3" style="border: lightgrey thin solid !important;">
<!--        Receiver    -->
        <v-menu offset-y transition="scale-transition" origin="top center" :close-on-content-click="false" :disabled="loading">
          <template #activator="{on}">
            <v-card outlined v-on="on" class="mb-2 rounded-lg px-2 d-flex">
              <v-icon color="teal">mdi-account-check-outline mdi-18px</v-icon>
              <span class="caption grey--text ml-1" v-show="!ref.recipients.length">Receiver</span>
              <div style="padding-bottom: 2px">
                <v-tooltip top v-for="rec in ref.recipients" :key="rec.id">
                  <template v-slot:activator="{on}">
                    <v-chip x-small v-on="on" class="ml-1" :color="rec > 0 ? 'teal lighten-4':'orange lighten-3'">{{recipient_list.find(item => item.id===rec).title}}</v-chip>
                  </template>
                  <small>{{recipient_list.find(item => item.id===rec).subtitle}}</small>
                </v-tooltip>
              </div>
            </v-card>
          </template>
          <v-list dense>
            <v-list-item v-for="recipient in recipient_list" :key="recipient.id">
              <v-checkbox dense hide-details v-model="ref.recipients" :value="recipient.id" color="teal" class="subtitle-2" />
              <div class="caption mt-2">{{recipient.title}} <small class="grey--text"> - {{recipient.subtitle}}</small></div>
            </v-list-item>
          </v-list>
        </v-menu>
<!--        Transcript    -->
        <v-menu offset-y transition="scale-transition" origin="top center" :close-on-content-click="false" v-if="show_transcript" :disabled="loading">
          <template #activator="{on}">
            <v-card outlined v-on="on" class="mb-2 rounded-lg px-2 d-flex">
              <v-icon color="teal">mdi-account-check-outline mdi-18px</v-icon>
              <span class="caption grey--text ml-1" v-show="!ref.transcripts.length">Transcript</span>
              <div style="padding-bottom: 2px">
                <v-tooltip top v-for="rec in ref.transcripts" :key="rec.id">
                  <template v-slot:activator="{on}">
                    <v-chip x-small v-on="on" class="ml-1" :color="rec > 0 ? 'teal lighten-4':'orange lighten-3'">{{recipient_list.find(item => item.id===rec).title}}</v-chip>
                  </template>
                  <small>{{recipient_list.find(item => item.id===rec).subtitle}}</small>
                </v-tooltip>
              </div>
            </v-card>
          </template>
          <v-list dense>
            <v-list-item v-for="recipient in recipient_list" :key="recipient.id">
              <v-checkbox dense hide-details v-model="ref.transcripts" :value="recipient.id" color="teal" class="subtitle-2" />
              <div class="caption mt-2">{{recipient.title}} <small class="grey--text"> - {{recipient.subtitle}}</small></div>
            </v-list-item>
          </v-list>
        </v-menu>

<!--        Body    -->
        <div class="d-flex">
          <div class="flex-fill">
            <v-textarea dense flat solo :rows="2" hide-details color="teal" v-model="ref.body" class="caption mb-1" @contextmenu.prevent="(e) => {frequent.show=false; frequent.index=ref_index; frequent.x=e.clientX; frequent.y=e.clientY; frequent.show=true}" :disabled="loading" />
            <div class="d-flex justify-space-between">
              <v-chip x-small>right click, for insert frequent text`s</v-chip>
              <v-btn x-small text outlined color="pink" class="rounded-lg text-normal" @click="refers.splice(ref_index, 1)" v-if="ref_index" :disabled="loading">
                <v-icon small>mdi-trash-can-outline</v-icon>
                Remove Refer
              </v-btn>
            </div>
          </div>
          <div class="pl-2 d-flex flex-column">
            <v-btn-toggle :color="ref.urgency==='immediate' ? 'pink':(ref.urgency==='urgent' ? 'orange':'teal')" dense mandatory v-model="ref.urgency">
              <v-btn x-small class="px-1 text-normal" :disabled="loading" value="normal">normal</v-btn>
              <v-btn x-small class="px-1 text-normal" :disabled="loading" value="urgent">urgent</v-btn>
              <v-btn x-small class="px-1 text-normal" :disabled="loading" value="immediate">immediate</v-btn>
            </v-btn-toggle>
            <v-btn x-small outlined :color="ref.confidential ? 'pink lighten-2':'grey'" class="rounded-lg mt-2 text-normal" @click="ref.confidential=!ref.confidential" :disabled="loading">
              <v-icon small v-if="ref.confidential">mdi-check</v-icon>
              confidential
            </v-btn>
            <v-btn x-small outlined color="grey" class="rounded-lg mt-2 text-normal" @click="$refs[`file_selector${ref_index}`][0].$refs.input.click()" :disabled="loading">Appendix</v-btn>
            <v-file-input v-model="ref.files" multiple style="display: none" :ref="`file_selector${ref_index}`" @change="" />
            <div v-for="(file, file_index) in ref.files">
              <v-chip x-small class="px-1" style="max-width: 90px">{{file.name}}</v-chip>
              <v-icon x-small color="pink lighten-2" style="cursor: pointer" @click="ref.files.splice(ref_index,1)" v-if="!loading">mdi-trash-can-outline</v-icon>
            </div>
          </div>
        </div>

      </v-card>

      <v-btn x-small text outlined color="teal" class="rounded-lg text-normal" @click="refers.push({recipients: [], transcripts: [], files: [], body: '', urgency: 'Add Refer', confidential: false})" :disabled="loading">
        <v-icon small>mdi-plus</v-icon>
        Add Refer
      </v-btn>

    </v-card-text>

    <v-card-actions class="teal lighten-4 d-flex justify-space-around py-4">
      <v-btn small dark color="teal lighten-1" class="mx-auto caption rounded-lg text-normal" width="140" :loading="loading" @click="sendRefer('inbox')">Send</v-btn>
      <v-btn small dark color="teal lighten-1" class="mx-auto caption rounded-lg text-normal" width="140" :loading="loading" @click="sendRefer('archive')" v-if="is_in_inbox">Send & Archive</v-btn>
      <v-btn small dark color="teal lighten-1" class="mx-auto caption rounded-lg text-normal" width="140" :loading="loading" @click="sendRefer('trash')" v-if="is_in_inbox">Send & Remove</v-btn>
    </v-card-actions>


    <v-menu v-model="frequent.show" :position-x="frequent.x" :position-y="frequent.y" absolute offset-y>
      <v-list dense>
        <v-list-item link v-for="text in frequent_text_list" class="caption" @click="refers[frequent.index].body=text.body">{{text.body}}</v-list-item>
        <v-divider />
        <v-list-item link class="caption" @click="dialog_setting=true; $nextTick(() => $refs.letter_setting.initialize())">
          <v-icon small class="mr-2">mdi-cog</v-icon>
          Configurations
        </v-list-item>
      </v-list>
    </v-menu>

    <v-dialog v-model="dialog_setting" width="800">
      <LetterSettingModal ref="letter_setting" @closeDialog="dialog_setting=false" />
    </v-dialog>

  </v-card>
</template>

<script>
  import {mapGetters} from 'vuex'

  export default {
    name: 'ReferModal',
    props: ['ids', 'is_in_inbox', 'reply_me'],
    computed: {
      ...mapGetters(['']),
      recipient_list() { return this.$store.state.letter.recipient_list },
      frequent_text_list() { return this.$store.state.letter.frequent_text_list },
    },
    data() {
      return {
        loading: false,
        refers: [{recipients: [], transcripts: [], files: [], body: '', urgency: 'normal', confidential: false}],
        show_transcript: false,
        frequent: {show: false, index: 0, x: 0, y: 0},
        dialog_setting: false,
      }
    },
    mounted() {
      if (!this.recipient_list.length) this.$axios.$get('recipient-list', {headers: {Authorization: 'token '+this.$cookies.get('userToken')}})
        .then(res => this.$store.commit('letter/setRecipientList', res))
      if (!this.frequent_text_list.length) this.$axios.$get('frequent-text-list/', {headers: {Authorization: 'token '+this.$cookies.get('userToken')}})
          .then(res => this.$store.commit('letter/setFrequentTextList', res))
      if (!this.$store.state.letter.recipient_group_list.length) this.$axios.$get('recipient-group-list/', {headers: {Authorization: 'token '+this.$cookies.get('userToken')}})
          .then(res => this.$store.commit('letter/setRecipientGroupList', res))
    },
    methods: {
      initialize() {
        this.loading = false
        this.refers = [{recipients: [], transcripts: [], files: [], body: '', urgency: 'normal', confidential: false}]
        this.show_transcript = false
        this.frequent = {show: false, index: 0, x: 0, y: 0}
      },
      sendRefer(then) {
        if (this.refers.filter(item => !item.recipients.length).length) {
          this.$toast.error('Specify at least one recipient')
          return
        }
        this.loading = true
        let formData = new FormData
        this.ids.forEach(item => formData.append('parents', item))
        formData.append('then', then)
        // "reply_me" will be true when modal is opened via "Letter`s Detail" page, not from "Letter`s List" page. so after referring the table of refers should be updated
        if (this.reply_me) formData.append('reply_me', true)
        this.refers.forEach((item, item_index) => {
          formData.append('refer'+item_index, JSON.stringify(item))
          item.files.forEach(file => formData.append('files'+item_index, file, file.name))
        })
        this.$axios.$post('add-refer/', formData, {headers: {Authorization: 'token '+this.$cookies.get('userToken')}})
          .then(res => {
            this.$toast.success('Referral registered')
            if (!then && this.reply_me) this.$store.commit('letter/setLetterRefers', res)
            this.$emit('closeModal', then)
          })
          .catch(err => this.$toast.error(err.response.data.detail))
          .finally(() => this.loading = false)
      },
    },
  }
</script>
