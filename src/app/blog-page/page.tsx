import { getBlogPage } from "@/lib/blogApi";
import Image from "next/image";

const BlogPage = async () => {
  const { items } = await getBlogPage(1, false);
  const landingPage = items[0];
  console.log(landingPage);
  console.log(
    "landingPage.topPostsCollection.items",
    landingPage.topPostsCollection.items,
  );
  return (
    <div className="flex flex-col gap-y-10">
      <p className="text-black"> {JSON.stringify(landingPage)}</p>
      <h2 className="text-black text-2xl">{landingPage.title}</h2>

      <div className="mb-10 block">
        {/* <Image
          className="max-h-[200px]"
          src={landingPage.hero.image.url}
          alt="Image"
          fill
        /> */}
      </div>

      <div className="flex gap-6 mt-4">
        {landingPage.topPostsCollection.items?.map((item: any) => (
          <div key={item.title} className="block">
            <p className="text-black font-bold text-2xl">{item.title}</p>
            <Image src={item.image?.url} alt="Image" width={400} height={400} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogPage;
