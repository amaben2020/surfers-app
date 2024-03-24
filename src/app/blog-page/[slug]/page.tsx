import { getBlogArticle } from "@/lib/blogApi";

const BlogPage = async ({ params }: { params: { slug: string } }) => {
  console.log(params);
  const data = await getBlogArticle(params.slug, false);
  console.log(data);
  return <div>BlogPage</div>;
};

export default BlogPage;
