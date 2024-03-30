import { gql, GraphQLClient } from "graphql-request";

export const createContentfulGraphqlClient = async (
  url: string,
  query: string,
) => {
  // const document = gql`
  //   {
  //     company {
  //       ceo
  //     }
  //   }
  // `;

  const client = new GraphQLClient(url, {
    headers: {
      authorization: "Bearer woe5rO8bj3-doSNi4ZdgIyU88XtkgjCF549wHeRIAuA",
    },
  });

  return await client.request(gql`
    ${query}
  `);
};

// export const getBlogPageGQL = async () => {
//   const url = configureContentfulUrl(process.env.CONTENTFUL_SPACE_ID!);
//   const config = configureEnvironment(process.env.CONTENTFUL_ENVIRONMENT!);
//   let isDraftMode = true;
//   let limit = 1;
//   const data = await createContentfulGraphqlClient(
//     url,
//     `
//     blogPageCollection {
//       items {
//         ${BlogPostPageFragment}
//       }
//     }
//  `,
//   );
//   console.log("data", data);
//   return data;
// };
