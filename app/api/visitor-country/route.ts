import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const countryMap: Record<string, string> = {
  SA: "sa",
  AE: "ae",
  KW: "kw",
  QA: "qa",
  BH: "bh",
  EG: "eg",
};

export async function GET(req: Request) {
  const vercelCountry = req.headers.get("x-vercel-ip-country") || "";
  const country = countryMap[vercelCountry.toUpperCase()] || "sa";

  return NextResponse.json({ country });
}