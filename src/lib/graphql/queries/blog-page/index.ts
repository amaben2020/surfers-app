import { gql } from "graphql-request";

export const BLOG_PAGE_QUERY = gql`
  query getBlogPageData($limit: Int!, $isDraftMode: Boolean) {
    blogArticleCollection(limit: $limit, preview: $isDraftMode) {
      items {
        title
        slug
      }
    }
  }
`;
