import RichText from "@/components/RichText";
import { formatBlogArticlesSlug } from "@/lib/adapters/formatBlogArticlesSlug";
import { getBlogArticle, getBlogPage } from "@/lib/blogApi";
import { draftMode } from "next/headers";
import Image from "next/image";

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
  const data = await getBlogArticle(params.slug, false);

  const blogPost = data?.data?.blogArticleCollection?.items[0];
  // if (!blogPost) {
  //   return notFound();
  // }

  return {
    title: blogPost?.title,
  };
}

const BlogPage = async ({ params }: { params: { slug: string } }) => {
  const { isEnabled } = draftMode();

  const { data } = await getBlogArticle(params.slug, isEnabled);

  const blogPost = data?.blogArticleCollection?.items[0];

  console.log(data);

  // if (!blogPost) {
  //stging
  //   return notFound();
  // }

  return (
    <div>
      <h2 className="text-black">{blogPost?.title}</h2>
      <div className="max-w-[800px] h-[500px] relative">
        {Array.isArray(blogPost?.cloudinaryImage) &&
        blogPost?.cloudinaryImage[0]?.secure_url > 0 ? (
          <Image
            className="absolute top-0 left-0 w-full"
            src={blogPost.cloudinaryImage[0].secure_url}
            alt=""
            fill
          />
        ) : (
          <Image
            className="absolute top-0 left-0 w-full"
            src={blogPost?.image?.url}
            alt=""
            fill
          />
        )}
      </div>

      <div>
        {" "}
        <RichText document={blogPost?.details?.json} />{" "}
      </div>
    </div>
  );
};

export default BlogPage;
