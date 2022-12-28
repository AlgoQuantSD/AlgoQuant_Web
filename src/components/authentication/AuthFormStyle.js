import React from "react";
import { useTheme } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";

const AuthFormStyle = () => {
  const { tokens } = useTheme();
  const theme = {
    name: "Auth Theme",
    tokens: {
      colors: {
        background: {
          primary: {},
          secondary: {},
        },
        font: {
          interactive: {
            value: tokens.colors.green.value,
          },
        },
        brand: {
          primary: {
            10: tokens.colors.green["100"],
            80: tokens.colors.green["40"],
            90: tokens.colors.green["20"],
            100: tokens.colors.green["10"],
          },
        },
      },
      components: {
        tabs: {
          item: {
            _focus: {
              color: {
                value: tokens.colors.green["60"].value,
              },
            },
            _hover: {
              color: {
                value: tokens.colors.black.value,
              },
            },
            _active: {
              color: {
                value: tokens.colors.green["60"].value,
              },
            },
          },
        },
      },
    },
  };
  return theme;
};

export default AuthFormStyle;
