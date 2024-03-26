import { ARTICLE_GRAPHQL_FIELDS } from "./graphql/articles";

async function fetchGraphQL(query: any, preview = false) {
  return fetch(
    `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}`,
    {
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
      // Associate all fetches for articles with an "articles" cache tag so content can be revalidated or updated from Contentful on publish
      next: { tags: ["articles"] },
    },
  ).then((response) => response.json());
}

function extractArticleEntries(fetchResponse: any) {
  return fetchResponse?.data?.knowledgeArticlesCollection?.items;
}

export async function getAllArticles(limit = 3, isDraftMode = false) {
  const articles = await fetchGraphQL(
    `query {
        knowledgeArticlesCollection(where:{slug_exists: true}, order: date_DESC, limit: ${limit}, preview: ${
          isDraftMode ? "true" : "false"
        }) {
          items {
            ${ARTICLE_GRAPHQL_FIELDS}
          }
        }
      }`,
    isDraftMode,
  );
  return extractArticleEntries(articles);
}

export async function getArticle(slug: string, isDraftMode = false) {
  const article = await fetchGraphQL(
    `query {
        knowledgeArticlesCollection(where:{slug: "${slug}"}, limit: 1, preview: ${
          isDraftMode ? "true" : "false"
        }) {
          items {
            ${ARTICLE_GRAPHQL_FIELDS}
          }
        }
      }`,
    isDraftMode,
  );

  return extractArticleEntries(article)[0];
}
