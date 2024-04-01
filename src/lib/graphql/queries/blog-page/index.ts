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

const BlogPageItems = gql`
  # fragment BlogPageData on BlogPage {
    title
    hero {
      name
      title
      description
      image {
        url
        fileName
        title
        description
      }
    }
    cta {
      name
      link {
        url
        isExternal
        title
      }
    }
    topPostsCollection(limit: 30) {
      total
      items {
        slug
        title
        image {
          url
        }

        venue {
          lat
          lon
        }
      }
    }
  # }
`;

// reusable query with fragments
export const BLOG_PAGE_QUERY_GQL = gql`
  query FetchBlogPage($isDraftMode: Boolean!, $limit: Int!) {
    blogPageCollection( preview: $isDraftMode, limit: $limit) {
      items {
        ${BlogPageItems}
      }
    }
  }
`;
