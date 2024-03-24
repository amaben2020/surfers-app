import { formatBlogArticlesSlug } from "@/lib/adapters/formatBlogArticlesSlug";
import { getBlogArticle, getBlogPage } from "@/lib/blogApi";
import { draftMode } from "next/headers";
import Image from "next/image";
import { notFound } from "next/navigation";

interface BlogPostPageParams {
  slug: string;
}

export async function generateStaticParams() {
  const posts = await getBlogPage();

  return formatBlogArticlesSlug(posts);
}

// For each blog post, tell Next.js which metadata
// (e.g. page title) to display.
export async function generateMetadata({
  params,
}: {
  params: BlogPostPageParams;
}): Promise<{
  title: string;
}> {
  const { data } = await getBlogArticle(params.slug, false);

  const blogPost = data?.blogArticleCollection?.items[0];
  if (!blogPost) {
    return notFound();
  }

  return {
    title: blogPost.title,
  };
}

const BlogPage = async ({ params }: { params: { slug: string } }) => {
  const { isEnabled } = draftMode();
  const { data } = await getBlogArticle(params.slug, isEnabled);

  const blogPost = data?.blogArticleCollection?.items[0];

  // if (!blogPost) {

  //   return notFound();
  // }

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
