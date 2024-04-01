export const BlogPostPageFragment = `
title
hero{
  name
  title
  description
  image{
    url
    fileName
    title
    description
  }
}
cta{
  name
  link{
    url
    isExternal
    title
  }
}
topPostsCollection(limit: 30){
 total
 items{
  slug
  title
   image{
    url
  }
   
     venue{
      lat
      lon
    }
}
}
`;
