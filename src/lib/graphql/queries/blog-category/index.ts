export const BLOG_CATEGORY_QUERY = `
query ($slug:String!){
  # add your query
  categoryCollection(where:{slug:$slug}){
    items{
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
  }

`;
