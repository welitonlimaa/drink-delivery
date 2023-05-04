const dataValidate = (data) => {
  const regex = /\S+@\S+\.\S+/;
  const emailValidation = data.email.match(regex);

  const minPassword = 6;
  const passwordValidation = data.password.length >= minPassword;

  const minName = 12;
  const nameValidation = data.name.length >= minName;

  return {
    name: nameValidation,
    email: emailValidation,
    password: passwordValidation,
  };
};

export default dataValidate;
