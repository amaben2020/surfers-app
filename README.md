https://www.contentful.com/blog/integrate-contentful-next-js-app-router/

https://surfers-app.vercel.app/

$ export $(cat .env.local | awk '!/^\\s*#/' | awk '!/^\\s*$/')
$ cf-content-types-generator \
 --spaceId $CONTENTFUL_SPACE_ID \
 --token $CONTENTFUL_MANAGEMENT_TOKEN \
 -o src/contentful/types \
 -X
