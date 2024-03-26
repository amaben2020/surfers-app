import { draftMode } from "next/headers";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const url = new URL(request.url);

  const redirectToPath = url.searchParams.get("redirect");

  const baseUrl =
    process.env.NODE_ENV === "development"
      ? process.env.BASE_URL_DEVELOPMENT
      : process.env.BASE_URL_PRODUCTION;

  draftMode().disable();

  redirect(`${baseUrl}/${redirectToPath}`);
}
