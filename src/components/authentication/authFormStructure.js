// The components object is used as a prop in amplify's Authenticator connected component.
// FormFields is an object that dictates the order of the inputs on the authentication forms.

const formFields = {
  signIn: {},
  signUp: {
    email: {
      label: "Email:",
      placeholder: "Enter your Email:",
      isRequired: true,
      order: 1,
    },
    given_name: {
      label: "First Name:",
      placeholder: "Enter your First Name:",
      isRequired: true,
      order: 2,
    },
    family_name: {
      label: "Last Name:",
      placeholder: "Enter your Last Name:",
      isRequired: true,
      order: 3,
    },
    phone_number: {
      label: "Phone Number:",
      placeholder: "Enter your Phone Number:",
      isRequired: true,
      order: 4,
    },
    password: {
      label: "Password:",
      placeholder: "Enter your Password:",
      isRequired: true,
      order: 5,
    },
    confirm_password: {
      label: "Confirm Password:",
      isRequired: true,
      order: 6,
    },
  },
  resetPassword: {
    username: {
      placeholder: "Enter your email:",
    },
  },
  confirmResetPassword: {
    confirmation_code: {
      placeholder: "Enter your Confirmation Code:",
      label: "New Label",
      isRequired: false,
    },
    confirm_password: {
      placeholder: "Enter your Password Please:",
    },
  },
};

export default formFields;
