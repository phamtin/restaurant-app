/**
 *
 * A quick way to get logged in user's accountId
 */
const useGetLoggedInUser = () => {
  const token = localStorage.getItem("auth_token");
  let accountId = null;

  if (token) {
    accountId = +token.split("-")[0];
  }

  return {
    accountId,
  };
};

const AuthHooks = { useGetLoggedInUser };

export default AuthHooks;
