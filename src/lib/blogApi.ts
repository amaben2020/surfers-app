import { configureEnvironment } from "@/utils/configManager";
import { createContentfulGraphqlClient } from "./config/gql-contentful";
import { configureContentfulUrl, fetchContentfulData } from "./graphql/config";
import { BlogPostPageFragment } from "./graphql/fragments/blogArticles";
import { BLOG_PAGE_QUERY } from "./graphql/queries/blog-page";

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
      "blogPost"
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

export const getBlogArticleCategory = async (
  slug: string,
  isDraftMode = false
) => {
  try {
    const BLOG_ARTICLE_QUERY = `{
   
      categoryCollection(where:{slug:"${slug}"}){
        items{
          title
          slug
          linkedFrom{
            blogArticleCollection{
              items{
                title
                slug
                details{
                  json  
                  }
                }
              }
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

export const getBlogArticleCategories = async (isDraftMode = false) => {
  try {
    const BLOG_ARTICLE_QUERY = `
    query{ 
      categoryCollection{
        items{
          title
          slug
        }
      }
    }
      `;

    const data = await fetchContentfulData(BLOG_ARTICLE_QUERY, isDraftMode);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getBlogPageGQL = async (isDraftMode = false, limit = 3) => {
  const url = configureContentfulUrl(process.env.CONTENTFUL_SPACE_ID!);

  const config = configureEnvironment(process.env.CONTENTFUL_ENVIRONMENT!);

  const data = await createContentfulGraphqlClient(
    url,
    BLOG_PAGE_QUERY,
    {
      isDraftMode,
      limit,
    },
    isDraftMode ? config.previewToken : config.accessToken
  );

  return data;
};

export const getBlogPostPageGQL = async (isDraftMode = false, limit = 3) => {
  const url = configureContentfulUrl(process.env.CONTENTFUL_SPACE_ID!);

  const config = configureEnvironment(process.env.CONTENTFUL_ENVIRONMENT!);

  const data = await createContentfulGraphqlClient(
    url,
    BLOG_PAGE_QUERY,
    {
      isDraftMode,
      limit,
    },
    isDraftMode ? config.previewToken : config.accessToken
  );

  return data;
};
