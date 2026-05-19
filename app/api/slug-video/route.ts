import { NextRequest } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { bundle } from "@remotion/bundler";
import { renderMedia, selectComposition } from "@remotion/renderer";
import path from "path";
import os from "os";
import { readFile } from "fs/promises";

export const runtime = "nodejs";
export const maxDuration = 60;

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const query = searchParams.get("query") || "";
  const country = searchParams.get("country") || "sa";

  if (!query) {
    return new Response("Missing query", { status: 400 });
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  // كاش فقط — لا يوجد SerpAPI
  const { data: cache } = await supabase
    .from("product_cache")
    .select("results")
    .eq("cache_key", `${country}:${query.toLowerCase().trim()}`)
    .maybeSingle();

  const products = cache?.results || [];

  if (!products.length) {
    return new Response("No cached products found", { status: 404 });
  }

  const countryNames: Record<string, string> = {
    sa: "السعودية",
    ae: "الإمارات",
    kw: "الكويت",
    qa: "قطر",
    bh: "البحرين",
    eg: "مصر",
  };

  const inputProps = {
    query,
    countryName: countryNames[country] || country,
    products,
  };

  const entry = path.join(process.cwd(), "remotion/index.tsx");

  const bundleLocation = await bundle({
    entryPoint: entry,
  });

  const composition = await selectComposition({
    serveUrl: bundleLocation,
    id: "MarketingVideo",
    inputProps,
  });

  const outputLocation = path.join(
    os.tmpdir(),
    `${query}-${country}-bpschat.mp4`.replace(/[^\w\u0600-\u06FF.-]/g, "-")
  );

  await renderMedia({
    composition,
    serveUrl: bundleLocation,
    codec: "h264",
    outputLocation,
    inputProps,
  });

  const file = await readFile(outputLocation);

  return new Response(file, {
    headers: {
      "Content-Type": "video/mp4",
      "Content-Disposition": `attachment; filename="${query}-${country}-bpschat.mp4"`,
    },
  });
}