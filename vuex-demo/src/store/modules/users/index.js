import Vue from "vue";

let lastId = 3;

// local state
const state = {
  prj_name: "vue prj",
  users: [
    {
      id: 1,
      name: "Oleg",
      age: 20,
    },
    {
      id: 2,
      name: "Alex",
      age: 21,
    },
    {
      id: 3,
      name: "Igor",
      age: 22,
    },
  ],
};

const getters = {
  // state is module's local state
  sortedByName: (state) => {
    return state.users.sort((a, b) => a.name < b.name);
  },
};

const mutations = {
  ADD_USER(state, user) {
    lastId++;

    state.users.push({
      id: lastId,
      name: user.name,
      age: user.age,
    });
  },

  DELETE_USER(state, userId) {
    const ind = state.users.findIndex((user) => user.id === userId);

    if (ind !== -1) {
      state.users.splice(ind, 1);
    }
  },

  EDIT_USER(state, { userId, data }) {
    const ind = state.users.findIndex((user) => user.id === userId);

    if (ind !== -1) {
      const updatedUser = {
        id: userId,
        name: data.name,
        age: data.age,
      };

      Vue.set(state.users, ind, updatedUser);
    }
  },
};

const actions = {
  // first param is context object
  addUser({ commit }, data) {
    return new Promise((resolve) => {
      console.log(data);
      setTimeout(() => {
        commit("ADD_USER", data);
        resolve();
      }, 250);
    });
  },

  deleteUser({ commit }, userId) {
    return new Promise((resolve) => {
      setTimeout(() => {
        commit("DELETE_USER", userId);
        resolve();
      }, 250);
    });
  },

  editUser({ commit }, data) {
    return new Promise((resolve) => {
      setTimeout(() => {
        commit("EDIT_USER", data);
        resolve();
      }, 250);
    });
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
