import { getArticle } from "@/lib/api";

const BlogPost = async ({ params }: { params: { slug: string } }) => {
  console.log(params);
  const article = await getArticle(params.slug);

  console.log(article);
  return (
    <div>
      BlogPost
      <h1>{article.title}</h1>
    </div>
  );
};

export default BlogPost;
