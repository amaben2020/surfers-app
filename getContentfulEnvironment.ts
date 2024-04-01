const strict = require("assert");
// const contentfulManagement = require("contentful-management");
// import { EnvironmentGetter } from "contentful-typescript-codegen";

// const { CONTENTFUL_ACCESS_TOKEN, CONTENTFUL_SPACE_ID, CONTENTFUL_ENVIRONMENT } =
//   process.env;

// strict.assert(CONTENTFUL_ACCESS_TOKEN);
// strict.assert(CONTENTFUL_SPACE_ID);
// strict.assert(CONTENTFUL_ENVIRONMENT);

// const getContentfulEnvironment: EnvironmentGetter = () => {
//   const contentfulClient = contentfulManagement.createClient({
//     accessToken: CONTENTFUL_ACCESS_TOKEN,
//   });

//   return contentfulClient
//     .getSpace(CONTENTFUL_SPACE_ID)
//     .then((space: any) => space.getEnvironment(CONTENTFUL_ENVIRONMENT));
// };

// module.exports = getContentfulEnvironment;

const contentfulManagement = require("contentful-management");
// const dotenv = require("dotenv");
// dotenv.config({ path: ".env.local" });
module.exports = function () {
  const contentfulClient = contentfulManagement.createClient({
    accessToken: "4bRiN8wwBmbnY-GZkUO8O88sSdjIAbfX6RwE6ffUv0c",
  });
  return contentfulClient
    .getSpace("jeqa1wtiqf6k")
    .then((space: any) =>
      space.getEnvironment(process.env.CONTENTFUL_ENVIRONMENT || "master")
    );
};
