import { GraphQLClient } from "graphql-request";

export const contentfulGQLClient = async (
  url: string,
  query: string,
  variables: Record<string, string | boolean | number>,
  token: string
) => {
  try {
    const client = new GraphQLClient(url, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

    return await client.request(query, variables);
  } catch (error) {
    console.log(error);
  }
};
