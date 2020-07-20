export const checkValidity = (value, rules) => {
  let isValid = true;
  let errorMessage = null;
  if (!rules) {
    return true;
  }
  if (rules.required) {
    isValid = value.trim() !== "" && isValid;
    errorMessage = "Field is required!";
  }
  if (rules.minLength) {
    isValid = value.length >= rules.minLength && isValid;
    errorMessage = "Input is too short!";
  }

  if (rules.maxLength) {
    isValid = value.length <= rules.maxLength && isValid;
    errorMessage = "Input is too long!";
  }

  if (rules.isEmail) {
    const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    isValid = pattern.test(value) && isValid;
    errorMessage = "Incorrect value: Email should be like email@mail.com";
  }

  if (isValid) {
    errorMessage = null;
  }

  return { isValid, errorMessage };
};
// this func is for create deep copies of state
export const updateObject = (state, updates) => {
  return {
    ...state,
    ...updates,
  };
};

export const saveUserDataToLocalStorage = (
  userId,
  token,
  refreshToken,
  expiresIn
) => {
  const expriationDate = new Date(new Date().getTime() + expiresIn * 1000);
  localStorage.setItem("localId", userId);
  localStorage.setItem("token", token);
  localStorage.setItem("refreshToken", refreshToken);
  localStorage.setItem("expirationDate", expriationDate);
};

export const clearLocalStorage = () => {
  localStorage.removeItem("localId");
  localStorage.removeItem("token");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("expirationDate");
};

export const getUserDataFromStorage = () => ({
  localId: localStorage.getItem("localId"),
  idToken: localStorage.getItem("token"),
  refreshToken: localStorage.getItem("refreshToken"),
  expiresIn: 3600,
});
