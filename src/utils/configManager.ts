export const configureEnvironment = (environment: string) => {
  console.log(environment);
  switch (environment) {
    case "staging":
      return {
        accessToken: process.env.CONTENTFUL_STAGING_ACCESS_TOKEN!,
        previewToken: process.env.CONTENTFUL_STAGING_PREVIEW_ACCESS_TOKEN!,
      };

    case "production":
      return {
        accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
        previewToken: process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN!,
      };

    default:
      return {
        accessToken: process.env.CONTENTFUL_STAGING_ACCESS_TOKEN!,
        previewToken: process.env.CONTENTFUL_STAGING_PREVIEW_ACCESS_TOKEN!,
      };
  }
};

// creating new eenv
// contentful space list
// contentful space environments -h
// contentful space environment create -n Development -e dev --src master
// deleting an env: contentful space environment delete -e <environment-name i.e staging>

// create management token
//1. contentful login
//1b. contentful logout

// using a space
// contentful space list
//1 contentful space use <space-id>

// contentful-merge create --cda-token 4bRiN8wwBmbnY-GZkUO8O88sSdjIAbfX6RwE6ffUv0c --space jeqa1wtiqf6k --source staging --target master

// contentful-merge apply --space jeqa1wtiqf6k --environment <value> --cma-token <value> [--file <value>] [--yes]

// lr0US7RhhCckcOV - OwnDYHaETo91d8fdZYInfQueAGM

// contentful - merge create--cda - token 4bRiN8wwBmbnY - GZkUO8O88sSdjIAbfX6RwE6ffUv0c--space jeqa1wtiqf6k--source staging--target master

// contentful - merge apply--space jeqa1wtiqf6k--environment "staging" --cma - token lr0US7RhhCckcOV - OwnDYHaETo91d8fdZYInfQueAGM--file changeset.json

// contentful-merge create --cda-token "4bRiN8wwBmbnY-GZkUO8O88sSdjIAbfX6RwE6ffUv0c" --space "jeqa1wtiqf6k" --source "staging" --target "master"

// contentful-merge apply --cma-token lr0US7RhhCckcOV-OwnDYHaETo91d8fdZYInfQueAGM --space jeqa1wtiqf6k --environment master --file <changesetFilePath>

// contentful merge show --te master --se staging
