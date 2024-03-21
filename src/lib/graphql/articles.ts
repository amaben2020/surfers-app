export const ARTICLE_GRAPHQL_FIELDS = `
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

// links {
//   assets {
//     block {
//       sys {
//         id
//       }
//       url
//       description
//     }
//   }
// }
