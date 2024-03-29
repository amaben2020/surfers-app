// GraphQL Content API

import { configureEnvironment } from "@/utils/configManager";
import { BlogPostPageFragment } from "./graphql/fragments/blogArticles";

const BASE_URL = "https://graphql.contentful.com";
// make 1 reusable fetch for all instances
const configureContentfulUrl = (space: string) => {
  if (!space || typeof space !== "string") {
    throw Error("Space and Environments must be provided");
  }
  // return `${BASE_URL}/content/v1/spaces/${space}/environments/${process.env.CONTENTFUL_ENVIRONMENT!}`;
  return `${BASE_URL}/content/v1/spaces/${space}/environments/staging`;
};

const fetchContentfulData = async (query: any, preview = false) => {
  try {
    // const url = configureContentfulUrl(process.env.CONTENTFUL_SPACE_ID!);
    // const config = configureEnvironment(process.env.CONTENTFUL_ENVIRONMENT!);
    const url = configureContentfulUrl("jeqa1wtiqf6k");
    const config = configureEnvironment("staging");

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${
          preview ? config.previewToken : config.accessToken
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
      blogArticleCollection(where:{slug: "${slug}"}, preview: ${
        isDraftMode ? "true" : "false"
      }){
        items{
          title
          slug
          image{
            url
            title
            description
          }
          cloudinaryImage
          details{
            json
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
