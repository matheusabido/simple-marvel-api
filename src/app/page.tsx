"use client";

import Header from "@/components/Header";
import Image from "next/image";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";

export default function Home() {
  return (
    <>
      <Header />
      <main className="p-4 max-w-[1200px] m-auto">
        <div className="flex">
          <Image
            className="border rounded-lg"
            alt="Stan lee"
            src="/Stan_Lee.webp"
            width={300}
            height={300}
          />
          <div className="p-4 flex-1">
            <p className="text-3xl font-bold">Stan Lee</p>
            <p className="mt-2">
              Stan Lee foi um escritor e editor de quadrinhos que co-criou
              icônicos personagens da Marvel, como Homem-Aranha, X-Men, Homem de
              Ferro e Quarteto Fantástico. Ele revolucionou o gênero ao
              humanizar os heróis, dando-lhes falhas e dilemas pessoais.
            </p>
            <p className="mt-4 text-gray-600 italic">
              Também o personagem mais icônico dos filmes do MCU.
            </p>
            <div className="flex mt-4">
              <Link
                className="flex px-4 py-2 gap-2 font-medium items-center hover:bg-red-600 hover:translate-x-1 transition-all bg-red-500 shadow-lg rounded-lg text-white"
                href="/personagens"
              >
                <FaArrowRight /> Ver personagens
              </Link>
            </div>
          </div>
        </div>
        <p className="mt-4 text-gray-500">
          Esse é um site super simples para consumir a API da Marvel. Feito como
          atividade avaliativa para a disciplina de Algoritmos II.
        </p>
      </main>
    </>
  );
}
