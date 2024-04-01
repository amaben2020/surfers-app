import { createClient } from "contentful-management";
const contentfulClient = createClient(
  {
    accessToken: process.env.CONTENTFUL_MANAGEMENT_TOKEN!,
  },
  {
    type: "plain",
  }
);

export default contentfulClient;
