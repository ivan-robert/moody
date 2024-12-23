export const LoginRedirect = () => {
  // Redirect to login page if not authenticated
  const isAuthenticatedFromLocalStorage = localStorage.getItem("username");

  if (
    !isAuthenticatedFromLocalStorage &&
    window.location.pathname !== "/login"
  ) {
    window.location.href = "/login";
  }

  if (
    isAuthenticatedFromLocalStorage &&
    window.location.pathname === "/login"
  ) {
    window.location.href = "/";
  }

  return null;
};
