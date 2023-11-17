import Vue from 'vue'

export const state = () => ({
  letter_list: {count: 0, list: []},
  letter: {
    id: 0, title: '', body: '', pdf_url: '', external_sender: '', user:'', post: '', sign_url: '', watch: false,
    appendices: [{id: 0, file_url: ''}],
    relations: [{id: '', title: ''}],
    refers: [{id: 0, body: '', user: '', post: '', urgency: '', confidential: false, transcript: false, time: '', recipients: [{id: 0, user: '', post: '', seen_time: ''}]}]
  },
  frequent_text_list: [],
  recipient_list: [],
  recipient_group_list: [],
  menu: {page: 0, q: null, tag: 'inbox'},
})

export const mutations = {
  setLetterList(state, payload) {
    state.letter_list = payload
    state.menu.page = payload.page
  },
  setLetter(state, {letter, ref}) {
    state.letter = letter
    let i = state.letter_list.list.map(item => item.id).indexOf(ref)
    if (i > -1) state.letter_list.list[i].seen_time = new Date()
    state.letter_list.list.forEach(item => {
      if (item.letter_id === letter.id) {
        item.signer = {name: letter.user, post: letter.post}
        item.external_sender = letter.external_sender
      }
    })
  },
  setLetterRefers(state, payload) { Vue.set(state.letter, 'refers', payload) },
  setLetterWatch(state, payload) { state.letter.watch = payload },
  setFrequentTextList(state, payload) { state.frequent_text_list = payload },
  setRecipientList(state, payload) { state.recipient_list = payload },
  setRecipientGroupList(state, payload) { state.recipient_group_list = payload },
  setLetterMenu(state, payload) { state.menu = {...payload} },
  saveSetting(state, payload) {
    state.recipient_group_list = payload.groups
    state.frequent_text_list = payload.texts
  },
  setMenuPage(state, payload) { state.menu.page = payload },
  removeLetters(state, payload) {
    let i
    payload.forEach(item => {
      i = state.letter_list.list.map(l => l.id).indexOf(item)
      if (i > -1) state.letter_list.list.splice(i,1)
    })
  },
  signLetter(state, payload) {
    Vue.set(state.letter, 'user', payload.user)
    Vue.set(state.letter, 'post', payload.post)
    Vue.set(state.letter, 'sign_url', payload.sign_url)
    state.letter_list.list.forEach(item => {
      if (item.letter_id === payload.id) item.signer = {name: payload.user, post: payload.post}
    })
  },
  addLetterAppendix(state, payload) { state.letter.appendices.push(payload) },
  removeLetterAppendix(state, payload) {
    let i = state.letter.appendices.map(item => item.id).indexOf(payload)
    if (i > -1) state.letter.appendices.splice(i,1)
  },
  addLetterRelation(state, payload) { state.letter.relations.push(payload) },
  removeLetterRelation(state, payload) {
    let i = state.letter.relations.map(item => item.id).indexOf(payload)
    if (i > -1) state.letter.relations.splice(i,1)
  },
}
