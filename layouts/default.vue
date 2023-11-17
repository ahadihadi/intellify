<template>
  <v-app>
    <v-app-bar fixed app clipped-right class="py-0 top-navigation" height="56px">
      <img src="@/assets/image/logo-no-border.png" height="70" class="mb-2">
      <v-spacer />

<!--      Notifications Menu -->
      <v-menu rounded="Large" offset-y v-if="CurrentUser.notifications.length">
        <template v-slot:activator="{attrs, on}">
          <v-badge color="red" :content="CurrentUser.notifications.length" overlap>
            <v-btn v-bind="attrs" v-on="on" icon small>
              <v-icon class="white--text" size="22">mdi-bell</v-icon>
            </v-btn>
          </v-badge>
        </template>
        <v-list style="max-height: 410px" scrolabel>
          <div v-for="(notification, i) in CurrentUser.notifications" :key="notification.id" class="white">
            <v-list-item link dense @click="setNotificationSeen(notification)">
              <v-icon color="" size="20" class="ml-3">mdi-check-circle</v-icon>
              <v-list-item-content>
                <v-list-item-title>{{notification.title}}</v-list-item-title>
                <v-list-item-subtitle>{{notification.body}}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-divider v-if="i!==CurrentUser.notifications.length-1" />
          </div>
          <div style="position: sticky; bottom: 0" class="white">
            <v-divider class="teal" />
            <div class="py-2">
              <v-btn small rounded color="teal lighten-1" class="mx-auto subtitle-2 d-block" min-width="100px" @click='removeAllNotifications' dark><v-icon>mdi-trash-can-outline mdi-18px</v-icon>remove all</v-btn>
            </div>
          </div>
        </v-list>
      </v-menu>

<!--      User Menu-->
      <v-menu rounded="Large" offset-y>
        <template v-slot:activator="{attrs, on}">
          <v-btn v-bind="attrs" v-on="on" text>
            <v-avatar size="30" class="mx-2">
              <img v-if="CurrentUser.photo" :src="MediaUrl+CurrentUser.photo">
            </v-avatar>
            <small class="body-2 white--text">{{CurrentUser.name}}</small>
          </v-btn>
        </template>
        <v-list>
          <div class="text-center mt-1 px-2">
            <v-avatar size="60">
              <img v-if="CurrentUser.photo" :src="MediaUrl+CurrentUser.photo" style="border: lightgray thin solid">
            </v-avatar><br>
            <v-chip small class="my-3 teal white--text font-weight-bold">{{CurrentUser.post}}</v-chip><br>
          </div>
          <v-divider />
          <v-list-item link dense @click="profile={dialog: true, loading: false, src: '', photo: null}">
            <v-list-item-title>Change Profile</v-list-item-title>
          </v-list-item>
          <v-list-item link dense @click="password={dialog: true, loading: false, old: '', new: '', confirm: ''}">
            <v-list-item-title>Change Password</v-list-item-title>
          </v-list-item>
          <v-list-item link dense @click="dialog_structure_chart=true; $nextTick(() => $refs.chart.loadStructureChart())">
            <v-list-item-title>Structure Chart</v-list-item-title>
          </v-list-item>
          <v-list-item link dense @click="logout">
            <v-list-item-title>Log out</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>

    <v-main>
      <v-container class="pr-15 pt-10">
        <Nuxt />
      </v-container>
    </v-main>

    <v-dialog width="90%" v-model="dialog_structure_chart" scrollable>
      <StructureChart ref="chart" />
    </v-dialog>

    <v-dialog v-model="profile.dialog" width="400">
      <v-card>
        <v-card-title class="teal lighten-4">Change Profile Photo</v-card-title>
        <v-card-text class="pt-6">
          <v-file-input v-if="!profile.src" accept="image/*" placeholder="load image" @change="loadImage($event)" outlined dense />
          <div v-if="profile.src">
            <cropper class="cropper" ref="cropper" :src="profile.src" stencil-component="circle-stencil" />
            <div class="d-flex justify-space-between mt-5">
              <v-btn rounded color="teal lighten-1" class="mx-auto subtitle-2 text-normal" min-width="100px" :loading="profile.loading" @click="profile.photo=null; profile.src=''">Pick Another File</v-btn>
              <v-btn rounded color="teal lighten-1" class="mx-auto subtitle-2 text-normal" min-width="100px" :loading="profile.loading" @click="changePhoto">Crop & Save</v-btn>
            </div>
          </div>
        </v-card-text>
      </v-card>
    </v-dialog>

    <v-dialog v-model="password.dialog" width="400">
      <v-form ref="password_form" @submit.prevent="changePassword">
        <v-card>
          <v-card-title class="teal lighten-4">Change Password</v-card-title>
          <v-card-text class="pt-6">
            <v-text-field outlined dense :rules="required" v-model="password.old" label="Current Password" type="password" />
            <v-text-field outlined dense :rules="required" v-model="password.new" label="New Password" type="password" />
            <v-text-field outlined dense :rules="required" v-model="password.confirm" label="Confirm New Password" type="password" />
          </v-card-text>
          <v-card-actions class="teal lighten-4 text-center py-4">
            <v-btn rounded color="teal lighten-1" class="mx-auto subtitle-2 text-normal" :loading="password.loading" @click="changePassword">Change My Password</v-btn>
          </v-card-actions>
        </v-card>
      </v-form>
    </v-dialog>

    <v-overlay :value="loading">
      <v-progress-circular indeterminate size="40" />
    </v-overlay>
  </v-app>
</template>

<script>
  import { mapGetters } from 'vuex'
  import StructureChart from '~/components/StructureChart.vue'
  import {Cropper} from 'vue-advanced-cropper'
  import 'vue-advanced-cropper/dist/style.css'

  export default {
    name: 'DefaultLayout',
    components: {StructureChart, Cropper},
    computed: {
      ...mapGetters(['CurrentUser', 'MediaUrl', 'StructureChart']),
    },
    data() {
      return {
        loading: false,
        profile: {dialog: false, loading: false, src: '', photo: null},
        password: {dialog: false, loading: false, old: '', new: '', confirm: ''},
        dialog_structure_chart: false,
        required: [v => !!v || '*'],
      }
    },
    created() {
      if (!this.$cookies.get('userToken')) this.$router.push('/login')
      else {
        this.$axios.$get('get-user/', {headers: {Authorization: 'token ' + this.$cookies.get('userToken')}})
          .then(res => {
            this.$store.commit('setCurrentUser', res)
          })
          .catch(err => {
              this.$toast.error(err.response.data.detail)
              this.$cookies.removeAll()
              this.$router.push('/login')
            }
          )
      }
    },
    methods: {
      logout() {
        this.$cookies.removeAll()
        this.$router.push('/login')
        this.$store.commit('setCurrentUser', {id: null, username: null, is_staff: null, name: null, post: null, photo: null, letter_count: 0, notifications: [], is_admin: false})
      },
      setNotificationSeen(notification) {
        this.$router.push(notification.url)
        this.$axios.$get('set-notification-seen/'+notification.id+'/', {headers: {'Authorization': 'token '+this.$cookies.get('userToken')}})
          .then(() => this.$store.commit('removeNotification', notification.id))
      },
      removeAllNotifications() {
        if (confirm('clear all notifications?')) {
          this.loading = true
          this.$axios.$post('remove-all-notifications/', {site: 'portal'}, {headers: {Authorization: 'token ' + this.$cookies.get('userToken')}})
            .then(() => {
              this.$toast.success('all notifications cleared')
              this.$store.commit('removeAllNotifications')
            })
            .catch(() => this.$toast.error('something went wrong. please refresh and try again'))
            .finally(() => this.loading = false)
        }
      },
      loadImage(file) {
        if (file) {
          if (this.profile.src) URL.revokeObjectURL(this.profile.src)
          this.profile.src = URL.createObjectURL(file)
        }
      },
      changePhoto() {
        const {canvas}=this.$refs.cropper.getResult()
        if (canvas) {
          let formData = new FormData()
          canvas.toBlob(blob => {
            formData.append('photo', blob, this.CurrentUser.username+'.jpg')
            this.profile.loading=true
            this.$axios.$post('profile-photo-update/'+this.CurrentUser.id+'/', formData, {headers: {'Authorization': 'token '+this.$cookies.get('userToken')}})
              .then(res => {
                this.$store.commit('setUserPhoto', res)
                this.$toast.success('Done')
                this.profile = {dialog: false, loading: false, src: '', photo: null}
              })
              .catch(() => this.$toast.error('Something went wrong'))
              .finally(() => this.profile.loading = false)
          }, 'image/jpeg')
        }
      },
      changePassword() {
        if (!this.$refs.password_form.validate()) {
          this.$toast.error('please fill in fields')
          return
        }
        if (this.password.new !== this.password.confirm) {
          this.$toast.error('Confirm Not Matching')
          return
        }
        this.password.loading = true
        this.$axios.$post('change-password/', {old: this.password.old, new: this.password.new}, {headers: {'Authorization': 'token '+this.$cookies.get('userToken')}})
          .then(res => {
            this.$toast.success(res.detail)
            this.password = {dialog: false, loading: false, old: '', new: '', confirm: ''}
          })
          .catch(err => this.$toast.error(err.response.data.detail))
          .finally(() => this.password.loading = false)
      },
    },
  }
</script>
<style scoped>
  .side-navigation{
    background: #00796B;
    background: -webkit-linear-gradient(to top, #00897B, #DCE775);
    background: -o-linear-gradient(to top, #00897B, #DCE775);
    background: -moz-linear-gradient(to top, #00897B, #DCE775);
    background: -moz-linear-gradient(to top, #00897B, #DCE775);
    background: linear-gradient(to top, #00897B, #DCE775);
  }
  .top-navigation{
    background: #00796B;
    background: -webkit-linear-gradient(to left, #00897B, #DCE775);
    background: -o-linear-gradient(to left, #00897B, #DCE775);
    background: -moz-linear-gradient(to left, #00897B, #DCE775);
    background: -moz-linear-gradient(to left, #00897B, #DCE775);
    background: linear-gradient(to left, #00897B, #DCE775);
  }
</style>
