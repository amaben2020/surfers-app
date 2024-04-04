export const formatBlogArticlesSlug = (posts: any) => {
  return posts?.items[0].topPostsCollection.items.map((post: any) => {
    return { slug: post.slug };
  });
};
