const configureEnvironment = (environment: "staging" | "production") => {
  switch (environment) {
    case "staging":
      return {
        accessToken: process.env.CONTENTFUL_STAGING_ACCESS_TOKEN!,
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

module.exports = {
  configureEnvironment,
};
