export const formatBlogArticlesSlug = (posts: any) => {
  console.log(posts);
  return posts?.items[0].topPostsCollection.items.map((post: any) => {
    return post.slug;
  });
};
