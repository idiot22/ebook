import CreateAPI from 'vue-create-api'
import Vue from 'vue'
import Toast from '../components/Toast'
import Popup from '../components/shelf/popup'
import GroupDialog from '../components/shelf/ShelfGroupDialog.vue'
Vue.use(CreateAPI)
Vue.createAPI(Toast, true)
Vue.createAPI(Popup, true)
Vue.createAPI(GroupDialog, true)
Vue.mixin({
  name: 'toast',
  methods: {
    toast(data) {
      return this.$createToast({
        $props: data
      })
    },
    simpleToast(data) {
      this.toast(data).show()
    },
    popup(data) {
      return this.$createPopup({
        $props: data
      })
    },
    groupDialog(data) {
      return this.$createGroupDialog({
        $props: data
      })
    }
  }
})
