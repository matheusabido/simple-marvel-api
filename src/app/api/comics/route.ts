import api from "@/utils/api";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const titleStartsWith = request.nextUrl.searchParams
    .get("titleStartsWith")
    ?.trim();
  const orderBy = request.nextUrl.searchParams.get("orderBy") === "desc";
  const character = Number(
    request.nextUrl.searchParams.get("characters")?.trim()
  );
  const page = Math.max(
    Number(request.nextUrl.searchParams.get("page")) || 1,
    1
  );

  const { data } = await api.get("/comics", {
    params: {
      titleStartsWith: titleStartsWith ? titleStartsWith : undefined,
      orderBy: orderBy ? "-title" : "title",
      offset: (page - 1) * 20,
      characters: isNaN(character) ? undefined : character,
      noVariants: true,
    },
  });

  return Response.json(data);
}
