"use client";

import Header from "@/components/Header";
import { Suspense, useEffect, useState } from "react";
import { Character, Response } from "../../../types/api";
import axios from "axios";
import { AiOutlineLoading } from "react-icons/ai";
import { FaAngleLeft, FaAngleRight, FaFilter } from "react-icons/fa6";
import CharacterCard from "@/components/CharacterCard";
import { useRouter, useSearchParams } from "next/navigation";

export default function PersonagensPage() {
  return (
    <Suspense
      fallback={
        <div className="justify-center">
          <AiOutlineLoading color="#f00" className="animate-spin" size={32} />
        </div>
      }
    >
      <Personagens />
    </Suspense>
  );
}

function Personagens() {
  const navigation = useRouter();
  const params = useSearchParams();

  const [data, setData] = useState<Response<Character> | undefined>(undefined);

  const [nameStartsWith, setNameStartsWith] = useState("");
  const [nameStartsWithToBe, setNameStartsWithToBe] = useState("");
  const [orderBy, setOrderBy] = useState<"asc" | "desc">("asc");

  const [page, setPage] = useState(
    Math.max(Number(params.get("page")) || 1, 1)
  );

  useEffect(() => {
    const timeout = setTimeout(() => {
      setNameStartsWith(nameStartsWithToBe);
    }, 500);

    return () => clearTimeout(timeout);
  }, [nameStartsWithToBe]);

  useEffect(() => {
    const abortController = new AbortController();
    (async () => {
      const { data } = await axios.get<Response<Character>>("/api/characters", {
        params: { nameStartsWith, orderBy, page },
        signal: abortController.signal,
      });
      setData(data);
    })();

    return () => abortController.abort();
  }, [nameStartsWith, orderBy, page]);

  useEffect(() => {
    setPage(1);
    setData(undefined);
  }, [nameStartsWith, navigation, orderBy]);

  useEffect(() => {
    navigation.replace(
      "/personagens?" +
        new URLSearchParams({ page: `${page}`, nameStartsWith, orderBy })
    );
  }, [page, nameStartsWith, orderBy, navigation]);

  return (
    <>
      <Header />
      <main className="p-4 max-w-[1200px] m-auto">
        <div className="mb-8">
          <p className="text-lg font-medium flex gap-2 items-center">
            <FaFilter /> Filtros de pesquisa
          </p>
          <div className="flex gap-4">
            <div className="flex-1">
              <p>Nome começa com</p>
              <input
                onChange={(e) => setNameStartsWithToBe(e.currentTarget.value)}
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
              <CharacterCard key={c.id} character={c} />
            ))}
          </div>
        ) : (
          <div className="flex justify-center gap-4 items-center text-red-600">
            <AiOutlineLoading color="#f00" className="animate-spin" size={32} />
            Carregando seus heróis e vilões favoritos...
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
