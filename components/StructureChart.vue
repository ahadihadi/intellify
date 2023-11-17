<template>
  <v-card color="teal lighten-4">
    <v-card-title>Structure Tree</v-card-title>
    <v-card-text class="pt-5 white">
      <div>
        <org-chart :datasource="chart" style="height: 95%" >
          <template slot-scope="data">
            <v-card color="teal lighten-3">
              <v-card-title class="px-1 py-0 caption" dir="rtl" style="height: 40px">
                <div class="text-center subtitle-2" style="width: 100%; line-height: 11px">
                  <span style="font-size: small; word-break: break-word">
                    {{data.nodeData.title}}
                  </span>
                </div>
              </v-card-title>
              <v-card-text class="white caption py-2 px-0" style="height: 80px;line-height: 12px">
                <v-avatar size="35" style="border: thin lightgray solid" class="mb-1" v-if="data.nodeData.user_photo">
                  <img :src="MediaUrl+data.nodeData.user_photo" alt="user photo">
                </v-avatar>
                <br>
                <b class="caption font-weight-bold" style="line-height: 12px">{{data.nodeData.user_name}}</b>
              </v-card-text>
            </v-card>
          </template>
        </org-chart>
      </div>
    </v-card-text>
    <v-overlay :value="loading">
      <v-progress-circular indeterminate size="40" />
    </v-overlay>
  </v-card>
</template>

<script>
  import {mapGetters} from 'vuex'
  import OrgChart from 'vue-organization-chart'
  import 'vue-organization-chart/dist/orgchart.css'

  export default {
    name: 'StructureChart',
    components: {OrgChart},
    computed: { ...mapGetters(['MediaUrl']) },
    data() {
      return {
        loading: false,
        chart: {}
      }
    },
    methods: {
      loadStructureChart() {
        this.loading = true
        this.$axios.$get('structure-chart/', {headers: {Authorization: 'token '+this.$cookies.get('userToken')}})
          .then(res => this.chart = res)
          .catch(() => this.$toast.error('structure not loaded'))
          .finally(() => this.loading = false)
      }
    },
  }
</script>

<style>
  .v-text-field.v-text-field--solo .v-input__control { min-height: 10px; border: thin solid lightgray; font-size: small; font-weight: bold }
</style>
