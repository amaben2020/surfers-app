import { gql } from "graphql-request";

export const FRAGMENT_ARTICLE_GRAPHQL_FIELDS = `
sys {
  id
}
title
slug
summary
details {
  json
}
date
authorName
categoryName
articleImage {
  url
}
`;

// do n ot mess up the variables
export const ARTICLES_QUERY = gql`
query GetAllArticles($limit: Int!, $isDraftMode: Boolean!) {
  knowledgeArticlesCollection(where:{slug_exists: true}, order: date_DESC, limit: $limit, preview: $isDraftMode) {
    items {
      ${FRAGMENT_ARTICLE_GRAPHQL_FIELDS}
    }
  }
}`;

export const ARTICLE_QUERY = gql`
query GetArticle($slug: String!,$isDraftMode: Boolean! ){
  knowledgeArticlesCollection(where:{slug: $slug}, limit: 1, preview:  
    $isDraftMode  ) {
    items {
      ${FRAGMENT_ARTICLE_GRAPHQL_FIELDS}
    }
  }
}`;
