import { configureEnvironment } from "@/utils/configManager";

const BASE_URL = "https://graphql.contentful.com";
// make 1 reusable fetch for all instances
export const configureContentfulUrl = (space: string) => {
  if (!space || typeof space !== "string") {
    throw Error("Space and Environments must be provided");
  }
  // we are using multiple environments
  return `${BASE_URL}/content/v1/spaces/${space}/environments/${process.env.CONTENTFUL_ENVIRONMENT!}`;
};

export const fetchContentfulData = async (
  query: any,
  preview = false,
  tag = ""
) => {
  try {
    const url = configureContentfulUrl(process.env.CONTENTFUL_SPACE_ID!);
    const config = configureEnvironment(process.env.CONTENTFUL_ENVIRONMENT!);

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${
          preview ? config.previewToken : config.accessToken
        }`,
      },
      body: JSON.stringify({ query }),
      next: { tags: [tag] }, // could be passed dynamically to many pages
    });

    return await response.json();
  } catch (error) {
    console.log(error);
  }
};
