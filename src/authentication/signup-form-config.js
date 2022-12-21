export const SignUpConfig = {
  header: "Create your AlgoQuant account",
  hideAllDefaults: true,
  signUpFields: [
    {
      label: "First Name",
      key: "given_name",
      required: true,
      displayOrder: 1,
      type: "string",
    },
    {
      label: "Last Name",
      key: "family_name",
      required: true,
      displayOrder: 2,
      type: "string",
    },
    {
      label: "Email",
      key: "email",
      required: true,
      displayOrder: 3,
      type: "string",
    },
    {
      label: "Password",
      key: "password",
      required: true,
      displayOrder: 4,
      type: "password",
    },
    {
      label: "Phone Number",
      key: "phone_number",
      required: true,
      displayOrder: 5,
      type: "string",
    },
  ],
};
