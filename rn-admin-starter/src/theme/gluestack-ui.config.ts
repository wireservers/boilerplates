import { config as defaultConfig } from "@gluestack-ui/config";
export const config = {
  ...defaultConfig,
  tokens: {
    ...defaultConfig.tokens,
    colors: {
      ...defaultConfig.tokens.colors,
      // Bridge Tailwind tokens to Gluestack semantic usage
      primary0: "#ebfffb",
      primary500: "#12a9a6",
      primary700: "#0a6264",
      secondary500: "#167dff",
    },
  },
};