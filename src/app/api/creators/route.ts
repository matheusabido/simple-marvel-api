import api from "@/utils/api";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const nameStartsWith = request.nextUrl.searchParams
    .get("nameStartsWith")
    ?.trim();
  const orderBy = request.nextUrl.searchParams.get("orderBy") === "desc";
  const page = Math.max(
    Number(request.nextUrl.searchParams.get("page")) || 1,
    1
  );

  const { data } = await api.get("/creators", {
    params: {
      nameStartsWith: nameStartsWith ? nameStartsWith : undefined,
      orderBy: orderBy ? "-firstName" : "firstName",
      offset: (page - 1) * 20,
    },
  });

  return Response.json(data);
}
