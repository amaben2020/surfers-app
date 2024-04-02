// another option for generating codegen

const { createClient } = require("contentful-management");
const dotenv = require("dotenv");
dotenv.config({ path: ".env.local" });
module.exports = function () {
  const contentfulClient = createClient({
    accessToken: process.env.CONTENTFUL_MANAGEMENT_TOKEN,
  });
  return contentfulClient
    .getSpace(process.env.CONTENTFUL_SPACE_ID)
    .then((space) => space.getEnvironment("master"));
};
