import { formatBlogArticlesSlug } from "@/lib/adapters/formatBlogArticlesSlug";
import { getBlogArticle, getBlogPage } from "@/lib/blogApi";
import Image from "next/image";

export async function generateStaticParams() {
  const posts = await getBlogPage();

  return formatBlogArticlesSlug(posts);
}

const BlogPage = async ({ params }: { params: { slug: string } }) => {
  const { data } = await getBlogArticle(params.slug, false);
  const blogPost = data?.blogArticleCollection?.items[0];

  return (
    <div>
      <h2 className="text-black">{blogPost.title}</h2>
      <div className="max-w-[800px] h-[500px] relative">
        <Image
          className="absolute top-0 left-0 w-full"
          src={blogPost.image.url}
          alt=""
          fill
        />
      </div>
    </div>
  );
};

export default BlogPage;
