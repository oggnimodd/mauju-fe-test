import { Handler } from "@netlify/functions";
import axios from "axios";

export const handler: Handler = async (event, context) => {
  const { pathname } = new URL(event.rawUrl);

  const isSlugUrl = pathname.indexOf("/s/") === 0;

  if (isSlugUrl) {
    // Get slug:
    const slug = pathname.split("/").pop();

    // Get data from getLink function:
    const data = await axios.get(
      `http://${event.headers.host}/.netlify/functions/getLink`,
      {
        params: {
          slug: slug,
        },
      },
    );

    // Convert data to JSON:
    const dataToJson = data.data;

    // Return (/) if not found (404):
    if (data.status === 404) {
      return {
        statusCode: 302,
        headers: {
          Location: `${event.headers.host}/`,
        },
      };
    }

    if (dataToJson?.url) {
      return {
        statusCode: 302,
        headers: {
          Location: dataToJson.url,
        },
      };
    }
  }

  return {
    statusCode: 200,
  };
};
