import { getAllArticles, getArticle } from "@/lib/api";

export async function generateStaticParams() {
  // grabbing all the article slugs and cache during build time
  const allArticles = await getAllArticles();

  return allArticles.map((article: any) => ({
    slug: article.slug,
  }));
}

const KnowledgeArticle = async ({ params }: { params: { slug: string } }) => {
  console.log(params);
  const article = await getArticle(params.slug);

  console.log(article);
  return (
    <div>
      KnowledgeArticle
      <h1>{article.title}</h1>
    </div>
  );
};

export default KnowledgeArticle;
