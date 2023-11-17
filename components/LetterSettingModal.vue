<template>
  <v-form @submit.prevent="saveSetting" ref="form">
    <v-card :loading="loading">
      <v-card-title class="teal lighten-4 font-weight-bold"><small>Configuration</small></v-card-title>
      <v-card-text>
        <v-tabs fixed-tabs>

          <v-tab class="caption text-normal">Referral Groups</v-tab>
          <v-tab class="caption text-normal">Frequent Text`s</v-tab>
          <v-tab class="caption text-normal">Followed Letter`s</v-tab>
          <v-tab class="caption text-normal">My Sign</v-tab>

          <v-tab-item class="pt-5 pb-2">
            <v-simple-table>
              <tbody>
                <tr v-for="(group, index) in groups">
                  <td>
                    <v-text-field dense outlined hide-details color="teal" v-model="group.title" label="title" class="caption" :rules="required" />
                  </td>
                  <td>
                    <v-autocomplete dense outlined hide-details color="teal" v-model="group.recipients" multiple :items="recipient_list.filter(item => item.id>0)" item-value="id" item-text="title" menu-props="offsetY" small-chips class="caption" :rules="required">
                      <template #selection="{item,index}">
                        <v-chip small v-if="index === 0" color="teal lighten-3">
                          <span>{{item.title}}</span>
                        </v-chip>
                        <span v-if="index === 1">
                          (+{{group.recipients.length - 1}} more)
                        </span>
                      </template>
                    </v-autocomplete>
                  </td>
                  <td class="text-left" width="40">
                    <v-btn small outlined icon color="pink lighten-2" title="remove" @click="groups.splice(index,1)">
                      <v-icon small>mdi-trash-can-outline</v-icon>
                    </v-btn>
                  </td>
                </tr>
              </tbody>
            </v-simple-table>
            <v-btn small rounded color="success" class="subtitle-2 ma-4 text-normal" @click="groups.push({id: 0, title: '', recipients: []})">New</v-btn>
          </v-tab-item>

          <v-tab-item class="pt-5 pb-2">
            <v-simple-table>
              <tbody>
                <tr v-for="(text, index) in texts">
                  <td>
                    <v-text-field dense solo hide-details color="teal" v-model="text.body" label="text" class="caption" :rules="required" />
                  </td>
                  <td class="text-left" width="40">
                    <v-btn small outlined icon color="pink lighten-2" class="text-normal" title="remove" @click="texts.splice(index,1)">
                      <v-icon small>mdi-trash-can-outline</v-icon>
                    </v-btn>
                  </td>
                </tr>
              </tbody>
            </v-simple-table>
            <v-btn small rounded color="success" class="subtitle-2 ma-4 text-normal" @click="texts.push({id: 0, body: ''})">New</v-btn>
          </v-tab-item>

          <v-tab-item class="pt-5 pb-2">
            <v-list dense v-if="watch_list.list.length">
              <v-list-item dense v-for="watch in watch_list.list" :to="`/letter/ref${watch.id}`" style="border: lightgray thin solid" class="rounded-10 mb-1">{{watch.title}}</v-list-item>
            </v-list>
            <v-pagination color="teal lighten-3" v-model="watch_list.page" :length="Math.ceil(watch_list.count/10)" total-visible="9" @input="loadWatchList" v-show="watch_list.count>10" />
          </v-tab-item>

          <v-tab-item class="pt-5 pb-2">
            <div class="text-center" v-if="CurrentUser.signature">
              <img :src="MediaUrl+CurrentUser.signature" alt="" height="200px" style="border: lightgray thin solid" />
              <v-chip small>to change your sign photo contact administrator</v-chip>
            </div>
            <div v-else>
              <v-alert type="info" prominent color="info lighten-3" class="mx-5">
                <ul class="mr-5 black--text">
                  <li>you can register you signature only once</li>
                  <li>signature background should be white</li>
                </ul>
              </v-alert>
              <div class="text-center">
                <v-btn small color="cyan" class="rounded-10 text-normal" @click="sign.dialog=true">register</v-btn>
              </div>

              <v-dialog v-model="sign.dialog" width="400">
                <v-card>
                  <v-card-title class="teal lighten-4">Signature Register</v-card-title>
                  <v-card-text class="pt-6">
                    <div v-if="sign.src">
                      <cropper class="cropper" ref="cropper" :src="sign.src" />
                      <div class="d-flex justify-space-between mt-5">
                        <v-btn rounded color="teal lighten-1" class="mx-auto subtitle-2 text-normal" min-width="100px" :loading="sign.loading" @click="sign.file=null; sign.src=''">Change Image</v-btn>
                        <v-btn rounded color="teal lighten-1" class="mx-auto subtitle-2 text-normal" min-width="100px" :loading="sign.loading" @click="changeSign">Crop and Save</v-btn>
                      </div>
                    </div>
                    <v-file-input v-else accept="image/*" placeholder="Load Image" @change="loadSign($event)" outlined dense />
                  </v-card-text>
                </v-card>
              </v-dialog>



            </div>
          </v-tab-item>

        </v-tabs>
      </v-card-text>
        <v-card-actions class="teal lighten-4 py-4">
          <v-btn rounded dark class="mx-auto text-normal" color="teal lighten-1" type="submit" title="Save Changes"><v-icon dark>mdi-content-save-outline</v-icon></v-btn>
        </v-card-actions>
    </v-card>
  </v-form>
</template>

<script>
  import {mapGetters} from 'vuex'
  import {Cropper} from 'vue-advanced-cropper'
  import 'vue-advanced-cropper/dist/style.css'

  export default {
    name: 'LetterSettingModal',
    components: {Cropper},
    computed: {
      ...mapGetters(['MediaUrl', 'CurrentUser']),
      recipient_group_list() { return this.$store.state.letter.recipient_group_list },
      recipient_list() { return this.$store.state.letter.recipient_list },
      frequent_text_list() { return this.$store.state.letter.frequent_text_list },
    },
    data() {
      return {
        loading: false,
        groups: [{id: 0, title: '', recipients: []}],
        texts: [{id: 0, body: ''}],
        required: [v => !!v || '*'],
        watch_list: {page: 1, count: 0, list: []},
        sign: {dialog: false, loading: false, src: '', file: null},
      }
    },
    methods: {
      initialize() {
        this.groups = []
        this.recipient_group_list.forEach(item => this.groups.push({id: item.id, title: item.title, recipients: item.recipients.map(r => r.id)}))
        this.texts = []
        this.watch_list = {page: 1, count: 0, list: []}
        this.frequent_text_list.forEach(item => this.texts.push({id: item.id, body: item.body}))
        this.$refs.form.resetValidation()
        this.loadWatchList()
      },
      saveSetting() {
        if (!this.$refs.form.validate()) {
          this.$toast.error('Incomplete Information`s')
          return
        }
        this.loading = true
        this.$axios.$post('save-setting/', {groups: JSON.stringify(this.groups), texts: JSON.stringify(this.texts)}, {headers: {Authorization: 'token '+this.$cookies.get('userToken')}})
          .then(res => {
            this.$store.commit('letter/saveSetting', res)
            this.$toast.success('Done')
            this.$emit('closeDialog')
          })
          .catch(err => this.$toast.error(err.response.data.detail))
          .finally(() => this.loading = false)

      },
      loadWatchList() {
        this.$axios.$get(`watch-list/${this.watch_list.page}`, {headers: {Authorization: 'token '+this.$cookies.get('userToken')}})
          .then(res => {
            this.watch_list.list = res.list
            this.watch_list.count = res.count
          })
      },
      loadSign(file) {
        if (file) {
          if (this.sign.src) URL.revokeObjectURL(this.sign.src)
          this.sign.src = URL.createObjectURL(file)
        }

      },
      changeSign() {
        const {canvas}=this.$refs.cropper.getResult()
        if (canvas) {
          let formData=new FormData()
          canvas.toBlob(blob => {
            formData.append('file', blob, this.CurrentUser.username+'.jpg')
            this.sign.loading=true
            this.$axios.$post('save-user-signature/', formData, {headers: {'Authorization': 'token '+this.$cookies.get('userToken')}})
              .then(res => {
                this.$store.commit('setUserSignature', res)
                this.$toast.success('Done')
                this.sign.file = null
                this.sign.src = ''
                this.sign.dialog = false
              })
              .catch(() => this.$toast.error('something went wrong'))
              .finally(() => this.sign.loading = false)
          }, 'image/jpeg')
        }
      },
    },
  }
</script>

<style scoped>

</style>
