// src/store/index.js
import { createStore } from 'vuex';

export default createStore({
  state: {
    isAdmin: false
  },
  mutations: {
    setAdmin(state, isAdmin) {
      state.isAdmin = isAdmin;
    }
  },
  actions: {
    fetchAdminStatus({ commit }, accessToken) {
      fetch("http://localhost:3000/admin-endpoint", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        commit('setAdmin', data.isAdmin);
      })
      .catch(error => {
        console.error("Error fetching admin status:", error);
        commit('setAdmin', false);
      });
    }
  }
});
