export const renderContentBasedOnPreview = (isPreview: boolean) =>
  isPreview
    ? process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN!
    : process.env.CONTENTFUL_ACCESS_TOKEN!;
