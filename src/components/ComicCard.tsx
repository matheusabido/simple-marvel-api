"use client";

import Image from "next/image";
import { Comic } from "../../types/api";
import { MdOutlineBlock } from "react-icons/md";

type Props = {
  comic: Comic;
};

export default function ComicCard({ comic }: Props) {
  return (
    <div className="w-full p-2 rounded-lg border hover:bg-gray-200 cursor-pointer hover:scale-[105%] transition-all">
      <Image
        alt="comic picture"
        width={300}
        height={300}
        src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
        className="w-full aspect-square rounded object-cover"
      />
      <p className="font-bold my-2">{comic.title}</p>

      {comic.description || comic.variantDescription ? (
        <p>{comic.description || comic.variantDescription}</p>
      ) : (
        <p className="flex gap-2 text-red-700">
          <MdOutlineBlock size={32} /> Essa descrição é restrita a membros da
          S.H.I.E.L.D.
        </p>
      )}
      <p className="mt-4">
        <span className="font-bold">Páginas: </span>
        {comic.pageCount}
      </p>
      <p>
        <span className={`font-bold`}>Autores: </span>
        {comic.creators.available
          ? comic.creators.items.map((c) => c.name).join(", ")
          : "Confidencial"}{" "}
        ({comic.creators.available})
      </p>
    </div>
  );
}
