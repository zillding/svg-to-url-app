import { stringToUrl } from "svg-to-url";

export async function POST(request: Request) {
  let data, svgoConfig;
  try {
    ({ data, svgoConfig } = await request.json());
  } catch (error) {
    return new Response((error as Error).message, { status: 400 });
  }
  if (typeof data !== "string")
    return new Response("Invalid data type", { status: 400 });
  try {
    const result = await stringToUrl(svgoConfig)(data);
    return new Response(result);
  } catch (error) {
    const { name, message } = error as Error;
    return new Response(message, {
      status: name === "SvgoParserError" ? 400 : 500,
    });
  }
}
