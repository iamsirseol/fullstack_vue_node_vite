<template>
  <div>
    <header class="header-bar">
      <button class="logout-btn" @click="logoutHandler">{{ $t("button.logout") }}</button>
    </header>
    <Teleport to="body">
      <!-- use the modal component, pass in the prop -->
      <AlertModal>
        <template #footer>
          <button @click="CLOSE_MODAL">{{ $t("button.close") }}</button>
          <button @click="applyHandler">{{ $t("button.apply") }}</button>
        </template>
      </AlertModal>
    </Teleport>
  </div>
</template>

<script>
import AlertModal from "../components/modal/AlertModal.vue";
import * as ModalStore from "../store/module/modal";

export default {
  name: "Home",
  components: {
    AlertModal,
  },
  data() {
    return {
      isModalOpen: false,
    };
  },
  methods: {
    ...ModalStore.mapActions(["CLOSE_MODAL", "OPEN_MODAL"]),
    logoutHandler() {
      this.OPEN_MODAL({
        header: this.$i18n.t("modalMessage.header.confirm"),
        body: this.$i18n.t("modalMessage.askLogout"),
      });
    },
    applyHandler() {
      this.CLOSE_MODAL();
      this.$router.push("/signin");
    },
  },
};
</script>

<style scoped lang="less">
.header-bar {
  height: 60px;
  width: 100%;
  background-color: #969191;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  .logout-btn {
    margin-right: 20px;
  }
}
</style>
