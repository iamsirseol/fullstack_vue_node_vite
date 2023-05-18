<template>
  <div class="signin-container">
    <form class="signin-box" @submit.prevent="siginFunction">
      <div class="id-div">
        <label for="id">{{ $t("account.id") }}</label
        ><input id="id" type="text" v-model="formData.id" />
      </div>
      <div class="pw-div">
        <label for="password">{{ $t("account.password") }}</label
        ><input id="password" type="password" v-model="formData.password" />
      </div>
      <button class="signin-btn" type="submit">{{ $t("account.signin") }}</button>
      <br />
      <router-link to="/signup">
        <button class="signup-btn">{{ $t("account.signup") }}</button>
      </router-link>
    </form>
    <Teleport to="body">
      <AlertModal
        ><template #footer>
          <button @click="CLOSE_MODAL">{{ $t("button.close") }}</button>
        </template>
      </AlertModal>
    </Teleport>
  </div>
</template>

<script>
import * as AccountStore from "../store/module/account";
import * as ModalStore from "../store/module/modal";
import AlertModal from "../components/modal/AlertModal.vue";
import common from "../util/common";

export default {
  name: "Signin",
  components: { AlertModal },
  data() {
    return {
      formData: {
        id: "",
        password: "",
      },
      isModalOpen: false,
    };
  },
  computed: {
    ...AccountStore.mapState(["SIGNIN_RESULT"]),
    ...ModalStore.mapState(["MODAL_DATA", "IS_OPEN"]),
  },
  methods: {
    ...AccountStore.mapActions(["SIGNIN_USER"]),
    ...ModalStore.mapActions(["OPEN_MODAL", "CLOSE_MODAL"]),
    async siginFunction() {
      try {
        if (this.formData.id && common.passwordValidator(this.formData.password)) {
          const payload = {
            id: this.formData.id,
            password: common.encodeToBase64(this.formData.password),
          };
          await this.SIGNIN_USER(payload);
          this.$router.push("/home");
        } else {
          // alert("값을 입력되지 않았습니다.");
          throw Error("input not filled");
        }
      } catch (error) {
        // this.isModalOpen = true;
        this.OPEN_MODAL({
          header: this.$i18n.t("modalMessage.header.info"),
          body: this.$i18n.t("modalMessage.loginFailed"),
        });
        console.log(error);
      }
    },
  },
};
</script>

<style scoped lang="less">
.signin-container {
  height: auto;
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
}
</style>
