import contentfulClient from "@/utils/contentfulClient";
import { NextRequest, NextResponse } from "next/server";

// using Contentful as a backend
export const POST = async (request: NextRequest) => {
  const { name, address, email, price } = await request.json();

  const newEntry = contentfulClient.entry.create(
    {
      spaceId: process.env.CONTENTFUL_SPACE_ID,
      environmentId: process.env.CONTENTFUL_ENVIRONMENT,
      contentTypeId: "quoteRequest",
    },
    {
      fields: {
        name: {
          "en-US": name,
        },
        address: {
          "en-US": address,
        },
        email: {
          "en-US": email,
        },
        price: {
          "en-US": price,
        },
      },
    },
  );

  console.log("newEntry", newEntry);
  return NextResponse.json({ message: "Created successfully" });
};
