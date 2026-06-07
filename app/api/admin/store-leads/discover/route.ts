import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const SERPAPI_KEY = process.env.SERPAPI_KEY!;

function cleanUrl(url: string) {
  try {
    const u = new URL(url);
    return `${u.protocol}//${u.hostname}`.replace(/\/$/, "");
  } catch {
    return url;
  }
}

function isRealStore(url: string) {
  try {
    const u = new URL(url);
    const host = u.hostname.replace(/^www\./, "");

    if (host === "salla.sa") return false;
    if (host === "zid.store") return false;
    if (host === "shahbandr.com") return false;

    if (host.endsWith(".salla.sa")) return true;
    if (host.endsWith(".zid.store")) return true;
    if (host.endsWith(".shahbandr.com")) return true;

    return false;
  } catch {
    return false;
  }
}

function getPlatform(url: string) {
  if (url.includes("salla.sa")) return "salla";
  if (url.includes("zid.store")) return "zid";
  if (url.includes("shahbandr")) return "shahbandr";
  return "custom";
}

const discoveryQueries: Record<string, string[]> = {
 salla: [
  "site:*.salla.sa متجر عطور السعودية",
  "site:*.salla.sa متجر ملابس السعودية",
  "site:*.salla.sa متجر جوالات السعودية",
  "site:*.salla.sa متجر هدايا السعودية",
],
zid: [
  "site:*.zid.store متجر عطور السعودية",
  "site:*.zid.store متجر ملابس السعودية",
  "site:*.zid.store متجر جوالات السعودية",
  "site:*.zid.store متجر هدايا السعودية",
],
  perfumes: [
    "متجر عطور السعودية واتساب",
    "متجر عطور سلة السعودية",
    "متجر عطور زد السعودية",
  ],
  mobiles: [
    "متجر جوالات السعودية واتساب",
    "متجر اكسسوارات جوال السعودية",
    "متجر موبايلات سلة السعودية",
  ],
};

async function searchGoogle(query: string) {
  const url = new URL("https://serpapi.com/search.json");
  url.searchParams.set("engine", "google");
  url.searchParams.set("q", query);
  url.searchParams.set("google_domain", "google.com.sa");
  url.searchParams.set("gl", "sa");
  url.searchParams.set("hl", "ar");
  url.searchParams.set("num", "10");
  url.searchParams.set("api_key", SERPAPI_KEY);

  const res = await fetch(url.toString(), { cache: "no-store" });
  const data = await res.json();

  return (data.organic_results || [])
    .map((x: any) => x.link)
    .filter(Boolean);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const type = body.type || "salla";

    const queries = discoveryQueries[type] || discoveryQueries.salla;

    const links = new Set<string>();

    for (const q of queries) {
      const found = await searchGoogle(q);
      found.forEach((link: string) => links.add(cleanUrl(link)));
    }

   const rows = Array.from(links)
  .filter((url) => url.startsWith("http"))
  .filter(isRealStore)
      .map((website) => ({
        website,
        store_name: website,
        platform: getPlatform(website),
        country: "sa",
        status: "new",
        notes: `Auto discovered: ${type}`,
        updated_at: new Date().toISOString(),
      }));

    if (!rows.length) {
      return NextResponse.json({ ok: true, inserted: 0, leads: [] });
    }

    const { data, error } = await supabase
      .from("store_leads")
      .upsert(rows, { onConflict: "website" })
      .select();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({
      ok: true,
      inserted: data?.length || 0,
      leads: data,
    });
  } catch (e: any) {
    return NextResponse.json(
      { error: e.message || "Discovery failed" },
      { status: 500 }
    );
  }
}