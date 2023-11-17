export const state = () => ({
  current_user: {
    id: null,
    username: null,
    is_staff: null,
    name: null,
    post: null,
    photo: null,
    letter_count: 0,
    notifications: [],
    is_admin: false,
  },
  // media_url: 'https://hadiahadi.pythonanywhere.com/media/',
  media_url: 'http://127.0.0.1:656/media/',
})

export const getters = {
  CurrentUser: state => state.current_user,
  MediaUrl: state => state.media_url,
}

export const mutations = {
  setCurrentUser(state, payload) { state.current_user = payload },
  removeNotification(state, payload) { state.current_user.notifications.splice(state.current_user.notifications.map(item => item.id).indexOf(payload), 1) },
  removeAllNotifications(state) { state.current_user.notifications=[] },
  setCurrentUserLetterCount(state, payload) { state.current_user.letter_count = payload },

  setUserPhoto(state, payload) { state.current_user.photo = payload },
  setUserSignature(state, payload) { state.current_user.signature = payload },
}

export const actions = {

}
