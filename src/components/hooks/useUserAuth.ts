const useUserAuth = () => {
  const isAuth = Boolean(localStorage.getItem("username"));
  return isAuth;
};

export default useUserAuth;
