// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";
// Taken from Amplify docs
if (typeof window.URL.createObjectURL === "undefined") {
  window.URL.createObjectURL = jest.fn();
}

/*
This will create a mock when the useAuthenticator method is referenced throughout the code. Since useAuthenicator
will be used very often through the applicaction it makes sense to have it as part of setup. Here we can configure a mock user
that will be available in the context of the tests. 
*/
jest.mock("@aws-amplify/ui-react", () => ({
  useAuthenticator: () => {
    return {
      user: {
        attributes: {
          given_name: "John",
          family_name: "Doe",
          email: "johndoe@example.com",
          phone_number: "+14071234567",
          total_balance: 57901.34,
        },
      },
      signOut: jest.fn(),
    };
  },
}));
