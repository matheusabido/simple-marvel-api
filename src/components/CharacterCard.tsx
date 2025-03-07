"use client";

import Image from "next/image";
import { Character } from "../../types/api";
import { MdOutlineBlock } from "react-icons/md";

type Props = {
  character: Character;
};

export default function CharacterCard({ character }: Props) {
  return (
    <div className="w-full p-2 rounded-lg border hover:bg-gray-200 cursor-pointer hover:scale-[105%] transition-all">
      <Image
        alt="character picture"
        width={300}
        height={300}
        src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
        className="w-full aspect-square rounded object-cover"
      />
      <p className="font-bold my-2">{character.name}</p>

      {character.description ? (
        <p>{character.description}</p>
      ) : (
        <p className="flex gap-2 text-red-700">
          <MdOutlineBlock size={32} /> Essa descrição é restrita a membros da
          S.H.I.E.L.D.
        </p>
      )}
    </div>
  );
}
