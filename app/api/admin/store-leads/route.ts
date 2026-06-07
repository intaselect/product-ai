import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

function getPlatform(url: string) {
  if (url.includes("salla")) return "salla";
  if (url.includes("zid")) return "zid";
  if (url.includes("shahbandr")) return "shahbandr";
  return "custom";
}

function cleanUrl(url: string) {
  let u = url.trim();
  if (!u.startsWith("http")) u = "https://" + u;
  return u.replace(/\/$/, "");
}

async function extractLead(url: string) {
  const website = cleanUrl(url);
const controller = new AbortController();
const timeout = setTimeout(() => controller.abort(), 8000);

const res = await fetch(website, {
  headers: {
    "user-agent": "Mozilla/5.0 BPSChatBot/1.0",
  },
  cache: "no-store",
  signal: controller.signal,
}).finally(() => clearTimeout(timeout));

  const html = await res.text();

  const title =
    html.match(/<title[^>]*>(.*?)<\/title>/i)?.[1]
      ?.replace(/\s+/g, " ")
      .trim() || website;

  const email =
    html.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i)?.[0] || null;

  const whatsapp =
    html.match(/https?:\/\/wa\.me\/[0-9]+/i)?.[0] ||
    html.match(/https?:\/\/api\.whatsapp\.com\/send\?phone=[0-9]+/i)?.[0] ||
    html.match(/(?:\+966|00966|966)5[0-9]{8}/)?.[0] ||
    null;

  const instagram =
    html.match(/https?:\/\/(?:www\.)?instagram\.com\/[A-Za-z0-9._-]+/i)?.[0] ||
    null;

  const contactPage =
    html.match(/href=["']([^"']*(?:contact|تواصل|اتصل)[^"']*)["']/i)?.[1] ||
    null;

  return {
    store_name: title,
    website,
    platform: getPlatform(website),
    email,
    whatsapp,
    instagram,
    contact_page: contactPage
      ? contactPage.startsWith("http")
        ? contactPage
        : website + "/" + contactPage.replace(/^\//, "")
      : null,
  };
}

export async function GET() {
  const { data, error } = await supabase
    .from("store_leads")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(500);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ leads: data });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const urls: string[] = Array.isArray(body.urls) ? body.urls : [body.url];

    const results = [];

   for (const url of urls.filter(Boolean)) {
  try {
    const lead = await extractLead(url);

    const { data, error } = await supabase
      .from("store_leads")
      .upsert(lead, { onConflict: "website" })
      .select()
      .single();

    results.push({ url, data, error: error?.message || null });
  } catch (e: any) {
    results.push({
      url,
      data: null,
      error: e.message || "failed to import",
    });
  }
}

    return NextResponse.json({ ok: true, results });
  } catch (e: any) {
    return NextResponse.json(
      { error: e.message || "Import failed" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: Request) {
  const body = await req.json();

  const { id, status, notes } = body;

  const { data, error } = await supabase
    .from("store_leads")
    .update({
      status,
      notes,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ lead: data });
}