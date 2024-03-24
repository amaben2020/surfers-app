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
    <div>
      BlogPage
      <p className="text-black"> {JSON.stringify(landingPage)}</p>
      <h2 className="text-black text-2xl">{landingPage.title}</h2>
      <div className="flex gap-3">
        {landingPage.topPostsCollection.items?.map((item: any) => (
          <div key={item.title} className="block">
            <p className="text-black">{item.title}</p>
            <Image src={item.image?.url} alt="Image" width={400} height={400} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogPage;
