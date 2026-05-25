import { VercelRequest, VercelResponse } from "@vercel/node";

let serverEntryPromise: Promise<any> | undefined;

async function getServerEntry() {
  if (!serverEntryPromise) {
    serverEntryPromise = import("@tanstack/react-start/server-entry");
  }
  return serverEntryPromise;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const serverEntry = await getServerEntry();
    const entry = serverEntry.default || serverEntry;

    // Create a fetch-compatible request
    const url = new URL(
      req.url || "/",
      `http://${req.headers.host || "localhost"}`
    );

    const request = new Request(url, {
      method: req.method,
      headers: req.headers as any,
      body:
        req.method !== "GET" && req.method !== "HEAD"
          ? JSON.stringify(req.body)
          : undefined,
    });

    const response = await entry.fetch(request, {}, {});
    const buffer = await response.arrayBuffer();

    res.status(response.status);
    
    // Copy headers from response
    response.headers.forEach((value, key) => {
      res.setHeader(key, value);
    });

    res.send(Buffer.from(buffer));
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
