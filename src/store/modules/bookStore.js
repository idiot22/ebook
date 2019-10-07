const bookStore = {
  state: {
    hotOffsetY: 0,
    isEditMode: false,
    shelfList: [],
    shelfSelected: [],
    shelfTitleVisible: true,
    shelfCategory: [],
    currentType: 1
  },
  mutations: {
    SET_HOTOFFSETY(state, val) {
      state.hotOffsetY = val
    },
    SET_IS_EDIT_MODE(state, isEditMode) {
      state.isEditMode = isEditMode
    },
    SET_SHELF_LIST(state, list) {
      state.shelfList = list
    },
    SET_SHELF_SELECTED(state, shelfSelected) {
      state.shelfSelected = shelfSelected
    },
    SET_SHELF_TITLE_VISIBLE(state, visible) {
      state.shelfTitleVisible = visible
    },
    SET_SHELF_CATEGORY(state, category) {
      state.shelfCategory = category
    },
    SET_CURRENT_TYPE(state, type) {
      state.currentType = type
    }
  }
}
export default bookStore
