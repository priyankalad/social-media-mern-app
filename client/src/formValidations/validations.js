const validate = (values, formName) => {
  const errors = {};
  let form = formName.toLowerCase();

  let {
    password,
    username,
    displayName,
    confirmPassword,
    age,
    location,
    gender,
    title,
  } = values;
  let email_regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
  let username_regex = /^[a-zA-Z0-9_-]{3,20}$/;
  //email
  if (form === "register" || form === "forgotpassword") {
    if (!username) errors.username = "Username is required";
    else if (!username_regex.test(username))
      errors.username = "Please provide valid Username";
  }
  //username
  if (form === "editprofile") {
    if (!username) errors.username = "Username is required";
    else if (!username_regex.test(username))
      errors.username = "Please provide valid username";
  }
  //email or username
  if (form === "login") {
    if (!username) errors.username = "Username is required";
    else if (!username_regex.test(username))
      errors.username = "Invalid Username";
  }
  //name
  if (form === "register" || form === "editprofile") {
    if (!displayName) errors.displayName = "Display Name is required";
  }

  //password
  if (form === "register" || form === "login" || form === "resetpassword") {
    if (!password) errors.password = "Password is required";
    else if (password.length < 8)
      errors.password = "Password must be minimum 8 character long";
  }

  //confirmPassword
  if (form === "register" || form === "resetpassword") {
    if (!confirmPassword)
      errors.confirmPassword = "Confirm Password is required";
    else if (confirmPassword !== password)
      errors.confirmPassword = "Password and Confirm Password are not matching";
  }

  if (form === "editprofile") {
    //age
    if (!age) errors.age = "Age is required";
    else if (age.toString().indexOf(".") !== -1 || age < 10 || age > 105) {
      errors.age = "Please enter valid age";
    }

    //location
    if (!location) errors.location = "Location is required";

    //gender
    if (!gender) errors.gender = "Gender is required";
  }

  //post title
  if (form === "createpost") {
    if (!title) errors.title = "Title is required";
    else if (title.length > 500) errors.title = "Title is too long.";
  }
  return errors;
};

export default validate;
