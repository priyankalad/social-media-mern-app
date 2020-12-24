let Validator = require("validatorjs");
module.exports = function(rules) {
  return function(req, res, next) {
    let validation = new Validator(req.body, rules, error_messages);
    if (validation.fails()) {
      let errors = validation.errors.all();
      return res.status(422).json({
        message: "Please correct below fields",
        errors: errors
      });
    }
    return next();
  };
};

let error_messages = {
  // "required.email": "Email is required",
  "regex.displayName": "Only letters are allowed for Display name",
  "required.displayName": "Display name is required",
  "required.password": "Password is required",
  "required.username": "Username is required",
  "regex.username":
    "Username should be alphanumeric(small letters only) value with length 3-15",
  "min.password": "Password length should be 8 to 15 characters",
  "max.password": "Password length should be 8 to 15 characters",
  "regex.password": "Password must contain atleast 1 digit",
  "regex.location": "Location should contain only alpha numeric values",
  "same.confirmPassword": "Password and Confirm password must be same",
  "required.confirmPassword": "Confirm password is required"
};

let refactorErrorMessages = function(errors) {
  let error_keys = Object.keys(errors);
  let errors_arr = [];
  error_keys.forEach(key => {
    for (let i = 0; i < errors[key].length; i++) {
      errors_arr.push(errors[key][i]);
    }
  });
  return errors_arr;
};

// module.exports = validateRequest;
