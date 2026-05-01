import { fetchRealProducts } from "@/lib/fetchRealProducts";

export async function POST(req) {
  try {
    const { query } = await req.json();

    const results = await fetchRealProducts(query);

    return Response.json({
      value: results
    });

  } catch (err) {
    return Response.json(
      { error: "Search failed", details: err.message },
      { status: 500 }
    );
  }
}