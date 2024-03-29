import { getBlogPage } from "@/lib/blogApi";
import { draftMode } from "next/headers";
import Image from "next/image";
import Link from "next/link";

const BlogPage = async () => {
  const { isEnabled } = draftMode();
  const data = await getBlogPage(10, isEnabled);
  const landingPage = data?.items[0];
  console.log(data);
  console.log(landingPage);

  return (
    <div className="flex flex-col gap-y-10">
      <p className="text-black"> {JSON.stringify(landingPage)}</p>
      <h2 className="text-black text-2xl">{landingPage?.title}</h2>

      <div className="mb-10 block"></div>

      <div className="flex gap-6 mt-4">
        {landingPage?.topPostsCollection.items?.map((item: any) => {
          console.log(item);

          return (
            <Link
              href={`/blog-page/${item?.slug}`}
              key={item?.title}
              className="block cursor-pointer"
            >
              <p className="text-black font-bold text-2xl">{item.title}</p>
              <Image
                src={item?.image?.url}
                alt="Image"
                width={400}
                height={400}
              />
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default BlogPage;
