<script>
import AlertModal from "../components/modal/AlertModal.vue";
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
  methods: {},
};
</script>

<template>
  <div>
    <header class="header-bar">
      <button class="logout-btn" @click="isModalOpen = true">Logout</button>
    </header>
    <Teleport to="body">
      <!-- use the modal component, pass in the prop -->
      <AlertModal @close="isModalOpen = false" :isModalOpen="isModalOpen">
        <template #header>
          <h3>Confirm</h3>
        </template>
        <template #body>
          <p>로그아웃 하시겠습니까?</p>
        </template>
        <template #footer>
          <button @click="isModalOpen = false">Close</button>
          <button @click="$router.push('/signin')">Apply</button>
        </template>
      </AlertModal>
    </Teleport>
  </div>
</template>

<style scoped lang="less">
.header-bar {
  height: 60px;
  width: 100%;
  background-color: #000;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  .logout-btn {
    margin-right: 20px;
  }
}
</style>
