export const ARTICLE_GRAPHQL_FIELDS = `
sys {
  id
}
title
slug
summary
details {
  json
  links {
    assets {
      block {
        sys {
          id
        }
        url
        description
      }
    }
  }
}
date
authorName
categoryName
articleImage {
  url
}
`;