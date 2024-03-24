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
      next: { tags: ["blogPost"] }, // could be passed dynamically to many pages
    });

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

    return data.data?.blogPageCollection;
  } catch (error) {
    console.log(error);
  }
};

export const getBlogArticle = async (slug: string, isDraftMode = false) => {
  try {
    const BLOG_ARTICLE_QUERY = `query GetBlogArticle  {
      blogArticleCollection(where:{slug: "${slug}"}){
        items{
          title
          image{
            url
            fileName
            title
            description
          }
          venue{
            lat
            lon
          }
        }
      }
    }`;

    const data = await fetchContentfulData(BLOG_ARTICLE_QUERY, isDraftMode);
    return data;
  } catch (error) {
    console.log(error);
  }
};
