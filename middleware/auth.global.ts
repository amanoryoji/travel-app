export default defineNuxtRouteMiddleware(async (to, from) => {
  const { checkAuthState, token, isLoginLoading } = useAuth();
  if (!process.server) {
    await checkAuthState();
    /**  新規会員登録画面はリダイレクトしないようにする */
    if (!token.value && to.path === "/register") {
      to.path = "/register";
    } else if (!token.value && to.path !== "/login") {
      return await navigateTo("/login");
    }
  }
  isLoginLoading.value = true;
});
