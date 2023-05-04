const dataValidate = (data) => {
  // const validateEmail = () => {
  const regex = /\S+@\S+\.\S+/;
  const emailValidation = data.email.match(regex);

  // setValidate({ ...validate, email: emailValidation });
  // };

  // const validatePassword = () => {
  const minPassword = 6;
  const passwordValidation = data.password.length >= minPassword;
  // if (data.password.length >= minPassword) {
  //   passwordValidation = true;
  // }
  // };

  // const validateName = () => {
  const minName = 12;
  const nameValidation = data.completeName.length >= minName;

  // };

  return {
    completeName: nameValidation,
    email: emailValidation,
    password: passwordValidation,
  };
};

export default dataValidate;
