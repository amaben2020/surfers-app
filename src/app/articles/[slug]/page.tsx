import { getAllArticles, getArticle } from "@/lib/api";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { draftMode } from "next/headers";
import Image from "next/image";

export async function generateStaticParams() {
  // grabbing all the article slugs and cache during build time
  const allArticles = await getAllArticles();

  return allArticles?.map((article: any) => ({
    slug: article?.slug,
  }));
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
              src={article?.articleImage.url}
              width="650"
            />
            <div className="space-y-4 md:space-y-6">
              <div className="space-y-2">
                <div className="max-w-[900px] text-zinc-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-zinc-400">
                  {documentToReactComponents(article?.details.json)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default KnowledgeArticle;
