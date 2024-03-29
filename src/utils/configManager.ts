export const configureEnvironment = (environment: string) => {
  switch (environment) {
    case "staging":
      return {
        accessToken: "woe5rO8bj3-doSNi4ZdgIyU88XtkgjCF549wHeRIAuA",
        // accessToken: process.env.CONTENTFUL_STAGING_ACCESS_TOKEN!,
        previewToken: process.env.CONTENTFUL_STAGING_PREVIEW_ACCESS_TOKEN!,
      };

    case "production":
      return {
        accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
        previewToken: process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN!,
      };

    default:
      return {
        accessToken: process.env.CONTENTFUL_STAGING_ACCESS_TOKEN!,
        previewToken: process.env.CONTENTFUL_STAGING_PREVIEW_ACCESS_TOKEN!,
      };
  }
};
