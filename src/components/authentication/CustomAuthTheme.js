// Using Amplify Libaries, Styling is done through themes. AuthForm Style returns a JSON object containing the styling of the authentication forms. Used as a prop on Amplify's Theme Provider component.

import { useTheme } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";

const CustomAuthTheme = () => {
  const { tokens } = useTheme();
  const theme = {
    name: "Auth Theme",
    tokens: {
      colors: {
        background: {
          primary: { value: "#F0F0F2" },
          secondary: { value: "1f302b" },
        },
        font: {
          interactive: {
            value: "1f302b",
          },
        },
        brand: {
          primary: {
            10: "#1f302b",
            80: "#1f302b",
            90: "#1f302b",
            100: "#1f302b",
          },
        },
      },
      components: {
        tabs: {
          item: {
            _focus: {
              color: {
                value: "1f302b",
              },
            },
            _hover: {
              color: {
                value: tokens.colors.black.value,
              },
            },
            _active: {
              color: {
                value: "1f302b",
              },
            },
          },
        },
      },
    },
  };
  return theme;
};

export default CustomAuthTheme;
