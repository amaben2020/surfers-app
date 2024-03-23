// GraphQL Content API

const BASE_URL = "https://graphql.contentful.com";
const configureContentfulUrl = (space: string) => {
  if (!space || typeof space !== "string") {
    throw Error("Space and Environments must be provided");
  }
  return `${BASE_URL}/content/v1/spaces/${space}`;
};

const fetchContentfulData = async (query: string, preview = false) => {
  try {
    const url = configureContentfulUrl(process.env.CONTENTFUL_SPACE_ID!);
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${
          preview
            ? process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN
            : process.env.CONTENTFUL_ACCESS_TOKEN
        }`,
      },
    });
  } catch (error) {
    console.log(error);
  }
};
