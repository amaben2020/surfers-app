//@ts-nocheck
import { getBlogArticleCategory } from "@/api/blog-page/blog-page";
import Link from "next/link";

const BlogCategoryPage = async ({
  params,
}: {
  params: { category: string };
}) => {
  const blogArticle = await getBlogArticleCategory(params.category);
  console.log(blogArticle);
  console.log(
    blogArticle.data.categoryCollection.items.map((item: any) => {
      return item.linkedFrom.blogArticleCollection.items;
    })
  );

  const articles = blogArticle.data.categoryCollection.items
    .map((item: any) => {
      return item.linkedFrom.blogArticleCollection.items;
    })
    .flat();
  return (
    <div className="text-black">
      {/* {JSON.stringify(blogArticle)} */}

      {/* <h1>{blogArticle.data.categoryCollection.items}</h1> */}
      <div className="flex gap-x-6">
        {articles.map((item: any) => (
          <Link href={`/blog-page/${item.slug}`} key={item.title}>
            <h1 className="text-black">{item.title}</h1>

            {/* <RichText document={item.details} /> */}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BlogCategoryPage;
