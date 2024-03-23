// GraphQL Content API

const BASE_URL = "https://graphql.contentful.com";
const configureContentfulUrl = (space: string, environments: string) => {
  if (
    (!space && !environments) ||
    (typeof space !== "string" && typeof space !== "string")
  ) {
    throw Error("Space and Environments must be provided");
  }
  return `${BASE_URL}/content/v1/spaces/${space}/environments/${environments}`;
};
