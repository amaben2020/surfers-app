import { getBlogPage } from "@/lib/blogApi";

const BlogPage = async () => {
  const data = await getBlogPage(1, false);
  console.log(data);
  return (
    <div>
      BlogPage
      <p className="text-black"> {JSON.stringify(data)} </p>
    </div>
  );
};

export default BlogPage;
