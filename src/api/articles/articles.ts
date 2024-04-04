import { contentfulGQLClient } from "@/base/config/gql-contentful";
import { configureEnvironment } from "@/base/environments/contentfulEnvManager";
import {
  ARTICLE_QUERY,
  ARTICLES_QUERY,
} from "../graphql/queries/articles/articles";

const config = configureEnvironment(process.env.CONTENTFUL_ENVIRONMENT!);

const URL = `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}/environments/${process.env.CONTENTFUL_ENVIRONMENT!}`;

function extractArticleEntries(articles: any) {
  return Array.isArray(articles?.knowledgeArticlesCollection?.items)
    ? articles?.knowledgeArticlesCollection?.items
    : [];
}

export async function getAllArticles(limit = 3, isDraftMode = false) {
  const articles = await contentfulGQLClient(
    URL,
    ARTICLES_QUERY,
    { isDraftMode: isDraftMode, limit },
    isDraftMode ? config.previewToken : config.accessToken
  );

  return extractArticleEntries(articles);
}

export async function getArticle(slug: string, isDraftMode = false) {
  try {
    const article = await contentfulGQLClient(
      URL,

      ARTICLE_QUERY,
      { isDraftMode, slug },
      isDraftMode ? config.previewToken : config.accessToken
    );

    return extractArticleEntries(article)[0];
  } catch (error) {
    console.log(error);
  }
}
