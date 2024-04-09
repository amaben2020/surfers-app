import type { Preview } from "@storybook/react";
// import { AppRouterContext } from "next/dist/shared/lib/app-router-context.shared-runtime";

const preview: Preview = {
  parameters: {
    // nextRouter: {
    //   Provider: AppRouterContext.Provider,
    // },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
