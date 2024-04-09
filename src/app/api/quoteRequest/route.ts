import contentfulClient from "@/utils/contentfulClient";
import { NextRequest, NextResponse } from "next/server";

// using Contentful as a backend
export const POST = async (request: NextRequest) => {
  try {
    const { name, address, email, price } = await request.json();

    const newEntry = await contentfulClient.entry.create(
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
      }
    );

    return NextResponse.json({
      message: "Created successfully",
      data: newEntry,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Something went wrong" });
  }
};
