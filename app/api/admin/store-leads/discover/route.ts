import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const SERPAPI_KEY = process.env.SERPAPI_KEY!;

const BLOCKED_HOSTS = [
  "google.",
  "youtube.",
  "tiktok.",
  "amazon.",
  "noon.",
  "jarir.",
  "extra.",
];
const discoveryQueries: Record<string, string[]> = {
  sa: [
    "متجر سعودي واتساب منتجات",
    "متجر عطور سعودي واتساب",
    "متجر ملابس سعودي واتساب",
    "متجر جوالات سعودي واتساب",
    "متجر إلكترونيات سعودي واتساب",
    "متجر هدايا سعودي واتساب",
    "متجر مكياج سعودي واتساب",
    "متجر أطفال سعودي واتساب",
    "بائع سعودي واتساب",
"حساب متجر سعودي واتساب",
"متجر انستقرام سعودي واتساب",
"متجر تويتر سعودي واتساب",
"متجر فيسبوك سعودي واتساب",
"بيع منتجات السعودية واتساب",
"بائع سعودي واتساب منتجات",
  "بائعة سعودية واتساب منتجات",
  "متجر سعودي واتساب",
  "حساب متجر سعودي واتساب",
  "متجر انستقرام سعودي واتساب",
  "متجر تويتر سعودي واتساب",
  "متجر فيسبوك سعودي واتساب",
  "بيع منتجات السعودية واتساب",
  "اطلب عبر الواتساب السعودية متجر",
  "للطلب واتساب السعودية منتجات",
  ],
  perfumes: [
    "متجر عطور السعودية تواصل واتساب",
    "متجر عطور الرياض واتساب",
    "متجر عطور جدة واتساب",
  ],
  mobiles: [
    "متجر جوالات السعودية تواصل واتساب",
    "متجر اكسسوارات جوال السعودية واتساب",
  ],
  fashion: [
    "متجر ملابس السعودية تواصل واتساب",
    "متجر عبايات السعودية واتساب",
  ],
};

function cleanRootUrl(url: string) {
  try {
    const u = new URL(url);
    return `${u.protocol}//${u.hostname}`.replace(/\/$/, "");
  } catch {
    return url;
  }
}

function isGoodStoreUrl(url: string) {
  try {
    const u = new URL(url);
    const host = u.hostname.replace(/^www\./, "").toLowerCase();

    if (BLOCKED_HOSTS.some((x) => host.includes(x))) return false;

    if (url.includes("/product") || url.includes("/products")) return true;
    if (url.includes("/store")) return true;
    if (url.includes("/shop")) return true;
    if (url.includes("/collections")) return true;

    return true;
  } catch {
    return false;
  }
}

function getPlatform(url: string) {
  if (url.includes("salla")) return "salla";
  if (url.includes("zid")) return "zid";
  if (url.includes("shahbandr")) return "shahbandr";
  if (url.includes("shopify")) return "shopify";
  if (url.includes("instagram")) return "instagram";
  if (url.includes("facebook")) return "facebook";
  if (url.includes("twitter") || url.includes("x.com")) return "twitter";
  return "custom";
}

async function fetchHtml(url: string) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);

  const res = await fetch(url, {
    headers: {
      "user-agent": "Mozilla/5.0 BPSChatBot/1.0",
    },
    cache: "no-store",
    signal: controller.signal,
  }).finally(() => clearTimeout(timeout));

  return await res.text();
}
function extractContacts(html: string) {
  const badEmails = ["name@example.com", "email@example.com", "test@test.com"];

  const email =
    html.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i)?.[0] || null;

  const cleanEmail =
    email && !badEmails.includes(email.toLowerCase()) ? email : null;

  const phone =
    html.match(/(?:\+966|00966|966)5[0-9]{8}/)?.[0] ||
    html.match(/05[0-9]{8}/)?.[0] ||
    null;

  const whatsapp =
    html.match(/https?:\/\/wa\.me\/[0-9]+/i)?.[0] ||
    html.match(/https?:\/\/api\.whatsapp\.com\/send\?phone=[0-9]+/i)?.[0] ||
    (phone
      ? `https://wa.me/${phone.replace(/\D/g, "")}`
      : null);

  const instagram =
    html.match(/https?:\/\/(?:www\.)?instagram\.com\/[A-Za-z0-9._-]+/i)?.[0] ||
    null;

  return { email: cleanEmail, whatsapp, instagram };
}

function findContactLinks(base: string, html: string) {
  const matches = [...html.matchAll(/href=["']([^"']+)["']/gi)];

  const keywords = [
    "contact",
    "contact-us",
    "customer-care",
    "support",
    "about",
    "تواصل",
    "اتصل",
    "الدعم",
    "من-نحن",
    "من_نحن",
    "whatsapp",
  ];

  return matches
    .map((m) => m[1])
    .filter((href) => keywords.some((k) => href.toLowerCase().includes(k)))
    .map((href) => {
      try {
        return new URL(href, base).toString();
      } catch {
        return null;
      }
    })
    .filter(Boolean)
    .slice(0, 5) as string[];
}

async function extractLead(website: string) {
  const root = cleanRootUrl(website);
  const homeHtml = await fetchHtml(root);

  const title =
    homeHtml.match(/<title[^>]*>(.*?)<\/title>/i)?.[1]
      ?.replace(/\s+/g, " ")
      .trim() || root;

  let contacts = extractContacts(homeHtml);
  let contactPage: string | null = null;

  const contactLinks = findContactLinks(root, homeHtml);

  for (const link of contactLinks) {
    try {
      const contactHtml = await fetchHtml(link);
      const pageContacts = extractContacts(contactHtml);

      contactPage = link;

      contacts = {
        email: contacts.email || pageContacts.email,
        whatsapp: contacts.whatsapp || pageContacts.whatsapp,
        instagram: contacts.instagram || pageContacts.instagram,
      };

      if (contacts.whatsapp || contacts.email || contacts.instagram) break;
    } catch {}
  }

  return {
    store_name: title,
    website: root,
    platform: getPlatform(root),
    country: "sa",
    email: contacts.email,
    whatsapp: contacts.whatsapp,
    instagram: contacts.instagram,
    contact_page: contactPage,
    status: "new",
    notes: "Auto discovered Saudi store",
    updated_at: new Date().toISOString(),
  };
}

async function searchGoogle(query: string) {
  const url = new URL("https://serpapi.com/search.json");
  url.searchParams.set("engine", "google");
  url.searchParams.set("q", query);
  url.searchParams.set("google_domain", "google.com.sa");
  url.searchParams.set("gl", "sa");
  url.searchParams.set("hl", "ar");
  url.searchParams.set("num", "30");
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
    const type = body.type || "sa";

    const queries = discoveryQueries[type] || discoveryQueries.sa;

    const links = new Set<string>();

    for (const q of queries) {
      const found = await searchGoogle(q);

      found
        .filter(isGoodStoreUrl)
        .map(cleanRootUrl)
        .forEach((link: string) => links.add(link));
    }

    const results = [];

    for (const website of Array.from(links).slice(0, 200)) {
      try {
        const lead = await extractLead(website);

        const { data, error } = await supabase
          .from("store_leads")
          .upsert(lead, { onConflict: "website" })
          .select()
          .single();

        results.push({ website, data, error: error?.message || null });
      } catch (e: any) {
        results.push({
          website,
          data: null,
          error: e.message || "failed",
        });
      }
    }

    return NextResponse.json({
      ok: true,
      found: links.size,
      saved: results.filter((x) => x.data).length,
      results,
    });
  } catch (e: any) {
    return NextResponse.json(
      { error: e.message || "Discovery failed" },
      { status: 500 }
    );
  }
}