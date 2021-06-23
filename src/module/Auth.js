const storageKeys = {
  TOKEN: 'token',
  USER_DATA: 'userInfo',
};

export const Auth = () => {
  function getToken() {
    return localStorage.getItem(storageKeys.TOKEN);
  }

  function setToken(token) {
    localStorage.setItem(storageKeys.TOKEN, token);
  }

  function getUserData() {
    try {
      return JSON.parse(localStorage.getItem(storageKeys.USER_DATA));
    } catch {
      return null;
    }
  }

  function setUserData(userInfo) {
    localStorage.setItem(storageKeys.USER_DATA, JSON.stringify(userInfo));
  }

  function clearToken() {
    localStorage.removeItem(storageKeys.TOKEN);
  }

  function clearUserData() {
    localStorage.removeItem(storageKeys.USER_DATA);
  }

  return {
    getToken,
    setToken,
    getUserData,
    setUserData,
    clearToken,
    clearUserData,
  };
};
