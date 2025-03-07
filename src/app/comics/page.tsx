"use client";

import Header from "@/components/Header";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FaAngleLeft, FaAngleRight, FaFilter } from "react-icons/fa6";
import { Response, Comic } from "../../../types/api";
import { AiOutlineLoading } from "react-icons/ai";
import ComicCard from "@/components/ComicCard";

export default function ComicsPage() {
  const navigation = useRouter();
  const params = useSearchParams();

  const [data, setData] = useState<Response<Comic> | undefined>(undefined);

  const [titleStartsWith, setTitleStartsWith] = useState("");
  const [titleStartsWithToBe, setTitleStartsWithToBe] = useState("");
  const [orderBy, setOrderBy] = useState<"asc" | "desc">("asc");

  const [page, setPage] = useState(
    Math.max(Number(params.get("page")) || 1, 1)
  );

  useEffect(() => {
    const timeout = setTimeout(() => {
      setTitleStartsWith(titleStartsWithToBe);
    }, 500);

    return () => clearTimeout(timeout);
  }, [titleStartsWithToBe]);

  useEffect(() => {
    const abortController = new AbortController();
    (async () => {
      const { data } = await axios.get<Response<Comic>>("/api/comics", {
        params: { titleStartsWith, orderBy, page },
        signal: abortController.signal,
      });
      setData(data);
    })();

    return () => abortController.abort();
  }, [titleStartsWith, orderBy, page]);

  useEffect(() => {
    setPage(1);
    setData(undefined);
  }, [titleStartsWith, navigation, orderBy]);

  useEffect(() => {
    navigation.replace(
      "/comics?" +
        new URLSearchParams({ page: `${page}`, titleStartsWith, orderBy })
    );
  }, [page, titleStartsWith, orderBy, navigation]);

  return (
    <>
      <Header />
      <main className="p-4 m-auto max-w-[1200px]">
        <div className="mb-8">
          <p className="text-lg font-medium flex gap-2 items-center">
            <FaFilter /> Filtros de pesquisa
          </p>
          <div className="flex gap-4">
            <div className="flex-1">
              <p>Nome começa com</p>
              <input
                onChange={(e) => setTitleStartsWithToBe(e.currentTarget.value)}
                className="border rounded p-1 w-full"
              />
            </div>
            <div className="flex-1">
              <p>Ordenar nome</p>
              <select
                onChange={(e) =>
                  setOrderBy(e.currentTarget.value as "asc" | "desc")
                }
                className="border rounded p-1 py-[.4rem] w-full"
              >
                <option value="asc">ASC</option>
                <option value="desc">DESC</option>
              </select>
            </div>
          </div>
        </div>
        {data ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {data.data.results.map((c) => (
              <ComicCard key={c.id} comic={c} />
            ))}
          </div>
        ) : (
          <div className="flex justify-center gap-4 items-center text-red-600">
            <AiOutlineLoading color="#f00" className="animate-spin" size={32} />
            Carregando suas histórias favoritas...
          </div>
        )}
        <div className="flex mt-4 justify-center gap-2">
          {data && data.data.offset > 0 && (
            <button
              onClick={() => {
                setPage(page - 1);
                setData(undefined);
              }}
              className="flex text-white bg-red-500 items-center cursor-pointer hover:bg-red-600 transition-all p-2 rounded-lg gap-2 px-4"
            >
              <FaAngleLeft /> Página Anterior
            </button>
          )}
          {data && data.data.count + data.data.offset < data.data.total && (
            <button
              onClick={() => {
                setPage(page + 1);
                setData(undefined);
              }}
              className="flex text-white bg-red-500 items-center p-2 cursor-pointer hover:bg-red-600 transition-all rounded-lg gap-2 px-4"
            >
              <FaAngleRight color="#fff" /> Próxima Página
            </button>
          )}
        </div>
      </main>
    </>
  );
}
