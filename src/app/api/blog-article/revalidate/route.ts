import { revalidateTag } from "next/cache";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const POST = (request: NextRequest) => {
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
      },
    );
  }
  revalidateTag("blogPost");
  // return ok with date if ok
  NextResponse.json({
    revalidate: true,
    now: Date.now(),
  });
};
