//@ts-nocheck
import {
  getBlogArticleCategories,
  getBlogPostPageGQL,
} from "@/api/blog-page/blog-page";
import Select from "@/components/Select";
import { draftMode } from "next/headers";
import Image from "next/image";
import Link from "next/link";

const BlogPage = async () => {
  const { isEnabled } = draftMode();
  // const data = await getBlogPage(10, isEnabled);

  const blogArticlecTags = await getBlogArticleCategories();
  const data = await getBlogPostPageGQL(isEnabled, 10);
  console.log(data);
  // console.log(blogData);
  // const blogGqlRequestData = await getBlogPageGQL(false, 2);
  const landingPage = data?.items[0];

  console.log(landingPage?.topPostsCollection?.items);

  return (
    <div className="flex flex-col gap-y-10">
      <p className="text-black"> {JSON.stringify(landingPage)}</p>
      <Select />
      <h2 className="text-black text-2xl">{landingPage?.title}</h2>

      <div className="mb-10 block"></div>

      <div className="flex gap-x-6">
        {blogArticlecTags?.data.categoryCollection?.items.map((elem: any) => (
          <Link
            href={`/blog-page/category/${elem.slug}`}
            className="text-black p-3 border rounded-md"
            key={elem.title}
          >
            <p>{elem.title}</p>
          </Link>
        ))}
      </div>

      <div className="flex gap-6 mt-4">
        {landingPage?.topPostsCollection?.items?.map((item: any) => {
          console.log(item.cloudinaryImage);

          return (
            <Link
              href={`/blog-page/${item?.slug}`}
              key={item?.title}
              className="block cursor-pointer"
            >
              <p className="text-black font-bold text-2xl">{item?.title}</p>
              {Array.isArray(item?.cloudinaryImage) ? (
                <Image
                  src={item?.cloudinaryImage[0]?.secure_url}
                  alt="Image"
                  width={400}
                  height={400}
                />
              ) : (
                <Image
                  src={item?.image?.url}
                  alt="Image"
                  width={400}
                  height={400}
                />
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default BlogPage;
