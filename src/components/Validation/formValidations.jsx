import PasswordValidator from "password-validator";

// Create a schema
var schema = new PasswordValidator();

// Add properties to it
schema
  .is()
  .min(8) // Minimum length 8
  .is()
  .max(20) // Maximum length 100
  .has()
  .uppercase(1) // Must have uppercase letters
  .has()
  .lowercase(1) // Must have lowercase letters
  .has()
  .digits(1) // Must have at least 2 digits
  .has()
  .not()
  .spaces() // Should not have spaces
  .is()
  .not()
  .oneOf(["Passw0rd", "Password123"]); // Blacklist these values

const formValidations = (event) => {
  // name and value are variable
  const { name, value } = event.target;

  switch (name) {
    case "name":
    case "username":
    case "color":
      if (value.length === 0) {
        return name + " Field is Mendatory";
      } else if (value.length < 3 || value.length > 50) {
        return name + " field length must be greater then 3 or less then 30";
      } else {
        return "";
      }

    case "email":
      if (value.length === 0) {
        return name + " Field is Mendatory";
      } else if (value.length < 13 || value.length > 50) {
        return name + " field length must be greater then 13 or less then 50";
      } else {
        return "";
      }

    case "password":
      if (schema.validate(value)) {
        return;
      } else {
        return "Invalid Password! Its Length Should be 8 or more but less then 20, Should contains atleast 1 digit, 1 upper case character, 1 lower case chracter should not contain white space";
      }
      break;

    case "phone":
      if (value.length === 0) {
        return name + " Field is Mendatory";
      } else if (value.length !== 10) {
        return name + " field length must be 10";
      } else if (value[0] >= "0" && value[0] <= "5") {
        return name + " filed must start with 6 or 7 or 8 or 9";
      } else {
        return "";
      }

    case "message":
    case "subject":
      if (value.length === 0) {
        return name + " Field is Mendatory";
      } else if (value.length < 3) {
        return name + " field length must be greater then 3";
      } else {
        return "";
      }

    case "size":
      if (value.length === 0) {
        return name + " Field is Mendatory";
      } else if (value.length > 10) {
        return name + " field length must be less then 10";
      } else {
        return "";
      }

    case "baseprice":
    case "quantity":
      if (!value) {
        return name + " Field is Mendatory";
      } else if (value < 0) {
        return name + "should not less then 1";
      } else {
        return "";
      }

    case "discount":
      if (!value) {
        return name + " Field is Mendatory";
      } else if (value < 0 || value > 100) {
        return "Discount should be in Range 1 - 100";
      } else {
        return "";
      }
    default:
      return "";
  }
};

export default formValidations;
