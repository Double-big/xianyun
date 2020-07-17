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
  // 封装一个异步 函数
  //   写法一
  //   login(store, data) {
  //     this.$axios({
  //       url: "/accounts/login",
  //       method: "POST",
  //       data
  //     }).then(res => {
  //       console.log(res.data);
  //       if (res.data.token) {
  //         //   this.$store.dispach("user/setUserInfo", res.data);
  //         store.commit("setUserInfo", res.data);
  //       }
  //     });
  //   },
  //   写法二
  //解构写法, 将commit 从 store 中解构出来可以直接用
  login({ commit }, data) {
    return this.$axios({
      url: "/accounts/login",
      method: "POST",
      data
    }).then(res => {
      console.log(res.data);
      if (res.data.token) {
        //   this.$store.dispach("user/setUserInfo", res.data);
        commit("setUserInfo", res.data);
      }
      return res;
    });
  }
};
