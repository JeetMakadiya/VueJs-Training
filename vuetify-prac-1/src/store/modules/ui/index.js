const state = {
  carFormDialog: {
    type: "add", //type: "add" or "edit"
    isDialogOpen: false,
  },
};

const getters = {
  getIsDialogOpen(state) {
    return state.carFormDialog.isDialogOpen;
  },
  getDialogType(state) {
    return state.carFormDialog.type;
  },
};

const mutations = {
  openDialog(state, payload) {
    state.carFormDialog.type = payload.type;
    state.carFormDialog.isDialogOpen = true;
  },
  closeDialog(state) {
    state.carFormDialog.isDialogOpen = false;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
};
