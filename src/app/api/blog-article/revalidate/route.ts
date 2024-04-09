import { revalidateTag } from "next/cache";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export const POST = () => {
  // get secret from header
  const headersList = headers();

  // Specify Secret Header: Add a secret header named x-vercel-reval-key and enter the value of the CONTENTFUL_REVALIDATE_SECRET from before.

  const secret = headersList.get("x-vercel-reval-key");

  if (secret !== process.env.CONTENTFUL_REVALIDATE_SECRET) {
    return NextResponse.json(
      {
        message: "Incorrect secret key",
      },
      {
        status: 401,
      }
    );
  }

  //purges the cache for our components that are fetching Contentful article content.
  revalidateTag("blogPost");
  // return ok with date if ok
  NextResponse.json({
    revalidate: true,
    now: Date.now(),
  });
};

// https://surfers-app.vercel.app/api/blog-article/revalidate

// https://surfers-app.vercel.app/api/revalidation
