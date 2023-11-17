<template>
  <div class="d-flex" style="height: 100%">
    <div class="align-self-center px-4" style="width: 100%">
      <v-alert outlined color="warning" elevation="5" v-show="error.statusCode === 404" class="mt-5 text-center">
        <q class="white--text caption">Not all those who wander are lost (J. R. R. Tolkien)</q><br>
        <h3 class="my-10 white--text">Page Not Found</h3>
        <NuxtLink to="/">
          <v-btn icon outlined color="white"><v-icon>mdi-home</v-icon></v-btn>
        </NuxtLink>
      </v-alert>
      <v-alert outlined color="error" elevation="5" v-show="error.statusCode !== 404" class="mt-5 text-center">
        <q class="white--text caption">Mistakes are the portals of discovery (James Joyce)</q><br>
        <h3 class="my-10 white--text">Something went wrong</h3>
        <NuxtLink to="/">
          <v-btn icon outlined color="white"><v-icon>mdi-home</v-icon></v-btn>
        </NuxtLink>
      </v-alert>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EmptyLayout',
  layout: 'prime',
  props: {
    error: {type: Object, default: null}
  },
}
</script>

