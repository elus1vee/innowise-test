import { ref } from "vue";

const loading = ref<boolean>(false);

export const useLoadingStatus = () => {
  const setLoadingStatus = (status: boolean) => {
    loading.value = status;
  };
  return { loading, setLoadingStatus };
};
