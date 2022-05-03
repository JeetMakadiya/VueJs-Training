// import Axios from "axios";

// local state
const state = {
  cardData: [],
  selectedCardData: {
    carId: "",
    carName: "",
    carDetails: "",
    carPrice: "",
    carImgURL: "",
  },
  isLoading: false,
  successMsg: "",
  errorMsg: "",
};

const getters = {
  // state is module's local state
};

const mutations = {
  isLoading(state, status) {
    state.isLoading = status;
  },
  setSuccessMsg(state, msg) {
    state.successMsg = msg;
  },
  setErrorMsg(state, msg) {
    state.errorMsg = msg;
  },
};

const actions = {
  // first param is context object
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
