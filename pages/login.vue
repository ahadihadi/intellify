<template>
  <div class="text-center">
    <v-form @submit.prevent="login">
      <span class="loginFormLogo"><img src="~/assets/image/logo-no-border.png"></span>
      <h1 class="mt-10 mb-8 white--text">Login to Intellify</h1>
      <v-text-field v-model="username" dark label="username" :disabled="loading" append-icon="mdi-account" autofocus />
      <v-text-field v-model="password" dark label="password" :disabled="loading" append-icon="mdi-lock" type="password" />
      <div class="text-center mt-5">
        <v-btn rounded x-large color="white" style="width: 140px" :loading="loading" type="submit">Enter</v-btn>
      </div>
    </v-form>
  </div>
</template>

<script>
  import backgroundUrl from '~/assets/image/bg.jpg'

  export default {
    name: 'login',
    layout: 'prime',
    data() {
      return {
        username: null,
        password: null,
        show_password: false,
        loading: false,
        backgroundUrl,
      }
    },
    head: {
      title: 'Intellify'
    },
    mounted() {
    },
    methods: {
      async login() {
        if (!this.username || !this.password) {
          this.$toast.error('please fill username & password')
          return
        }
        this.loading = true
        await this.$axios.$post('login/', {'username': this.username, 'password': this.password})
          .then(res => {
            this.$cookies.set('userToken', res.token)
            this.$router.push('/')
            this.$toast.success('welcome')
          })
          .catch(() => this.$toast.error('username or password is invalid'))
          .finally(() => this.loading = false)
      }
    }
  }
</script>

<style scoped>

  .loginFormLogo {
    color: #333333;
    display: -webkit-box;
    display: -webkit-flex;
    display: -moz-box;
    display: -ms-flexbox;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 120px;
    height: 120px;
    border-radius: 50%;
    background-color: #fff;
    margin: 0 auto;
    border: thin solid darkgray;
  }

  .loginFormLogo>img{
    width: 165px;
    padding: 30px;
  }

</style>
