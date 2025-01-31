import { createSession } from "@/lib/api/clientSession";
import { getSettings } from "@/lib/api/clientSettings";
import type { NextApiRequest, NextApiResponse } from "next";
import { captureTelemetry } from "@formbricks/lib/telemetry";

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const environmentId = req.query.environmentId?.toString();

  if (!environmentId) {
    return res.status(400).json({ message: "Missing environmentId" });
  }

  // CORS
  if (req.method === "OPTIONS") {
    res.status(200).end();
  }
  // GET
  else if (req.method === "POST") {
    const { personId } = req.body;

    if (!personId) {
      return res.status(400).json({ message: "Missing personId" });
    }

    try {
      const session = await createSession(personId);
      const settings = await getSettings(environmentId, personId);

      captureTelemetry("session created");

      return res.json({ session, settings });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  // Unknown HTTP Method
  else {
    throw new Error(`The HTTP ${req.method} method is not supported by this route.`);
  }
}
