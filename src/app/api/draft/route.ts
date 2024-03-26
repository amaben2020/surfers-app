// import { getArticle } from "@/lib/api";
// import { draftMode } from "next/headers";
// import { redirect } from "next/navigation";
// import { NextRequest } from "next/server";

// export async function GET(request: NextRequest) {
//   const { searchParams } = new URL(request.url);
//   const secret = searchParams.get("secret");
//   const slug = searchParams.get("slug");

//   if (!secret || !slug) {
//     return new Response("Missing parameters", { status: 400 });
//   }

//   if (secret !== process.env.CONTENTFUL_PREVIEW_SECRET) {
//     return new Response("Invalid token", { status: 401 });
//   }

//   const article = await getArticle(slug);

//   if (!article) {
//     return new Response("Article not found", { status: 404 });
//   }

//   draftMode().enable();
//   redirect(`/articles/${article.slug}`);
// }

import { getBlogArticle } from "@/lib/blogApi";

import { draftMode } from "next/headers";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const secret = searchParams.get("secret");
  const slug = searchParams.get("slug");
  console.log(slug);

  console.log(secret);

  // if (  !slug) {
  //   return new Response("Missing parameters", { status: 400 });
  // }

  // if (secret !== process.env.CONTENTFUL_PREVIEW_SECRET) {
  //   return new Response("Invalid token", { status: 401 });
  // }

  //@ts-ignore
  const { data } = await getBlogArticle(slug, true);

  console.log(data);

  const blogPost = data?.blogArticleCollection?.items[0];

  console.log(blogPost?.slug);
  if (!blogPost) {
    return new Response("Article not found", { status: 404 });
  }

  draftMode().enable();

  redirect(`/blog-page/${blogPost?.slug}`);
}
