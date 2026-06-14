import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function normalizeQuery(q: string) {
  return String(q || "")
    .trim()
    .replace(/\s+/g, " ")
    .slice(0, 120);
}

function slugifyArabic(text: string) {
  return text
    .toString()
    .trim()
    .toLowerCase()
    .replace(/[^\u0600-\u06FFa-z0-9]+/gi, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 90);
}

function detectCountry(page: string) {
  if (page.includes("-eg") || page.includes("country=eg")) return "eg";
  if (page.includes("-ae") || page.includes("country=ae")) return "ae";
  if (page.includes("-kw") || page.includes("country=kw")) return "kw";
  if (page.includes("-qa") || page.includes("country=qa")) return "qa";
  if (page.includes("-bh") || page.includes("country=bh")) return "bh";
  return "sa";
}

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const secret = url.searchParams.get("secret");

    if (secret !== process.env.CRON_SECRET) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const { data, error } = await supabase
      .from("search_console_queries")
      .select("query,page,clicks,impressions,ctr,position")
      .gte("impressions", 20)
      .lte("position", 40)
      .order("impressions", { ascending: false })
      .limit(100);

    if (error) throw error;

    let created = 0;
    let skipped = 0;

    for (const row of data || []) {
      const query = normalizeQuery(row.query);

      if (!query || query.length < 3) {
        skipped++;
        continue;
      }

      if (
        query.includes("bps") ||
        query.includes("بي بي اس") ||
        query.includes("login") ||
        query.includes("admin")
      ) {
        skipped++;
        continue;
      }

      const country = detectCountry(row.page || "");
      const slug = `${slugifyArabic(query)}-${country}`;

      const { data: exists } = await supabase
        .from("search_terms")
        .select("id")
        .eq("slug", slug)
        .maybeSingle();

      if (exists) {
        skipped++;
        continue;
      }

      const { error: insertError } = await supabase.from("search_terms").insert({
        query,
        country,
        slug,
        search_count: Math.max(1, Number(row.clicks || 0)),
      });

      if (insertError) {
        console.error("Insert failed:", query, insertError);
        skipped++;
        continue;
      }

      created++;
    }

    return NextResponse.json({
      success: true,
      checked: data?.length || 0,
      created,
      skipped,
    });
  } catch (error: any) {
    console.error("Generate pages error:", error);

    return NextResponse.json(
      {
        success: false,
        error: error?.message || "Unknown error",
      },
      { status: 500 }
    );
  }
}