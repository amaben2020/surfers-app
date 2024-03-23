// GraphQL Content API

import { BlogPostPageFragment } from "./graphql/fragments/blogArticles";

const BASE_URL = "https://graphql.contentful.com";
const configureContentfulUrl = (space: string) => {
  if (!space || typeof space !== "string") {
    throw Error("Space and Environments must be provided");
  }
  return `${BASE_URL}/content/v1/spaces/${space}`;
};

const fetchContentfulData = async (query: any, preview = false) => {
  try {
    const url = configureContentfulUrl(process.env.CONTENTFUL_SPACE_ID!);
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${
          preview
            ? process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN
            : process.env.CONTENTFUL_ACCESS_TOKEN
        }`,
      },
      body: JSON.stringify({ query }),
    });

    console.log(response);
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

export const getBlogPage = async (limit = 1, isDraftMode = false) => {
  try {
    const data = await fetchContentfulData(
      `query {
        blogPageCollection( preview: ${
          isDraftMode ? "true" : "false"
        }, limit: ${limit}) {
          items {
            ${BlogPostPageFragment}
          }
        }
      }`,
      isDraftMode,
    );
    console.log("DATA", data);
    return data.data?.blogPageCollection;
  } catch (error) {
    console.log(error);
  }
};

// export const getBlogArticle = async (
//   limit = 3,
//   slug: string,
//   isDraftMode = false,
// ) => {
//   try {
//     const data = await fetchContentfulData(
//       `query {
//         knowledgeArticlesCollection(where:{slug: "${slug}"}, limit: 1, preview: ${
//         isDraftMode ? "true" : "false"
//       }) {
//           items {
//             ${ARTICLE_GRAPHQL_FIELDS}
//           }
//         }
//       }`,
//       isDraftMode,
//     );
//   } catch (error) {}
// };
