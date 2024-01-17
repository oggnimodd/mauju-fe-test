import { Handler } from "@netlify/functions";
import { prisma } from "@acme/db";

export const handler: Handler = async (event, context) => {
  const slug = event?.queryStringParameters?.slug;

  if (!slug || typeof slug !== "string") {
    return {
      statusCode: 400,
      body: JSON.stringify({
        error:
          "Error: Missing slug? Remember that urls start like this: /u/yourLink",
      }),
    };
  }

  const data = await prisma.link.findFirst({
    where: {
      slug: {
        equals: slug,
      },
    },
  });

  if (!data) {
    return {
      statusCode: 404,
      body: JSON.stringify({
        error: "Error: Link not found or removed",
      }),
    };
  }

  // Cache:
  return {
    statusCode: 200,
    headers: {
      "Cache-Control": "s-maxage=1000000, stale-while-revalidate",
    },
    body: JSON.stringify(data),
  };
};
