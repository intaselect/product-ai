import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const { data } = await supabase
    .from("customer_offers")
    .select("image_url")
    .eq("id", id)
    .eq("status", "approved")
    .single();

  if (!data?.image_url) {
    return NextResponse.redirect("https://www.bpschat.com/og-image.png");
  }

  try {
    const imageRes = await fetch(data.image_url, {
      headers: {
        "User-Agent": "Mozilla/5.0",
      },
    });

    const contentType = imageRes.headers.get("content-type") || "image/jpeg";
    const buffer = await imageRes.arrayBuffer();

    return new NextResponse(buffer, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=86400",
      },
    });
  } catch {
    return NextResponse.redirect("https://www.bpschat.com/og-image.png");
  }
}