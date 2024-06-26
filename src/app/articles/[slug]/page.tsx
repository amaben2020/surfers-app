//@ts-nocheck
import { getAllArticles, getArticle } from "@/api/articles/articles";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { draftMode } from "next/headers";
import Image from "next/image";

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  // grabbing all the article slugs and cache during build time
  const allArticles = await getAllArticles();
  // add "404" as default
  // const paths = posts.map(({ slug }) => ({ params: { slug: slug || "404" } }));
  return Array.isArray(allArticles)
    ? allArticles.map((article: any) => ({
        slug: article.slug || "404",
      }))
    : [{ slug: "" }];
}

const KnowledgeArticle = async ({ params }: { params: { slug: string } }) => {
  const { isEnabled } = draftMode();
  const article = await getArticle(params.slug, isEnabled);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-white">
      <section className="w-full">
        <div className="container space-y-12 px-4 md:px-6">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl text-black">
              {article?.title}
            </h1>
            <p className="max-w-[900px] text-zinc-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-zinc-400">
              {article?.summary}
            </p>
          </div>
          <div className="space-y-8 lg:space-y-10">
            <Image
              alt="Article Image"
              className="aspect-video w-full overflow-hidden rounded-xl object-cover"
              height="365"
              src={article?.articleImage?.url}
              width="650"
            />
            {Object.keys(article?.details?.json).length && (
              <div className="space-y-4 md:space-y-6">
                <div className="space-y-2">
                  <div className="max-w-[900px] text-zinc-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-zinc-400">
                    {documentToReactComponents(article?.details?.json)}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
};

export default KnowledgeArticle;
