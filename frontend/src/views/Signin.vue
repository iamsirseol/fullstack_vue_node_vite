<script>
import * as AccountStore from "../store/module/account";
import axiosInstance from "../util";
import AlertModal from "../componenets/modal/AlertModal.vue";
import common from "../util/common";

export default {
  name: "Signin",
  components: { AlertModal },
  data() {
    return {
      id: "",
      password: "",
      isModalOpen: false,
    };
  },

  methods: {
    ...AccountStore.mapActions(["SIGNIN_USER"]),
    async siginFunction() {
      try {
        if (this.id && common.passwordValidator(this.password)) {
          const payload = {
            id: this.id,
            password: common.encodeToBase64(this.password),
          };
          // const { data } = await this.SIGNIN_USER(payload);
          const res = await axiosInstance.post("/api/v1/account/signin", payload);
          if (res.status === 200) this.$router.push("/home");
        } else {
          throw Error;
        }
      } catch (e) {
        this.isModalOpen = true;
        console.log(e);
      }
    },
  },
};
</script>

<template>
  <div>
    <form class="signin-box" @submit.prevent="siginFunction">
      <div class="id-div"><label for="id">ID</label><input id="id" type="text" v-model="id" /></div>
      <div class="pw-div">
        <label for="password">PASSWORD</label><input id="password" type="password" v-model="password" />
      </div>
      <button class="signin-btn" type="submit">Signin</button>
      <br />
      <router-link to="/signup">
        <button class="signup-btn">signup</button>
      </router-link>
    </form>
    <Teleport to="body">
      <!-- use the modal component, pass in the prop -->
      <AlertModal @close="isModalOpen = false" :isModalOpen="isModalOpen">
        <template #header>
          <h3>Info</h3>
        </template>
        <template #body>
          <p>로그인 실패하였습니다.</p>
        </template>
        <template #footer>
          <button @click="isModalOpen = false">Close</button>
        </template>
      </AlertModal>
    </Teleport>
  </div>
</template>

<style scoped lang="less">
.signin-box {
  width: 758px;
  height: 558px;
  border: 1px solid #ccc;
  padding: 20px;
  margin: 12% auto;

  input {
    width: 85%;
  }
  button {
    margin-bottom: 20px;
  }
  .id-div {
    width: 90%;
    display: flex;
    justify-content: space-between;
    font-size: 15px;
    margin-bottom: 15px;
    margin-top: 250px;
  }
  .pw-div {
    width: 90%;
    display: flex;
    justify-content: space-between;
    font-size: 15px;
    margin-bottom: 20px;
  }
  .signup-btn {
    padding: 0;
    border: none;
    background: none;
    color: #6eb9ff;
    text-decoration: underline;
  }
}
</style>
