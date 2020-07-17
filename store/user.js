export const state = () => ({
  userInfo: {
    token: "",
    user: {}
  }
});

export const mutations = {
  setUserInfo(state, data) {
    state.userInfo = data;
  },
  clearUserInfo(state) {
    state.userInfo = {};
  }
};

export const actions = {
  login({ commit }, data) {
    return this.$axios({
      url: "/accounts/login",
      method: "POST",
      data
    }).then(res => {
      console.log(res.data);
      if (res.data.token) {
        commit("setUserInfo", res.data);
      }
      return res;
    });
  }
};
