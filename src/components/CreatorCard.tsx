"use client";

import Image from "next/image";
import { Creator } from "../../types/api";

type Props = {
  creator: Creator;
};

export default function CreatorCard({ creator }: Props) {
  return (
    <div className="w-full p-2 rounded-lg border hover:bg-gray-200 cursor-pointer hover:scale-[105%] transition-all">
      <Image
        alt="creator picture"
        width={300}
        height={300}
        src={`${creator.thumbnail.path}.${creator.thumbnail.extension}`}
        className="w-full aspect-square rounded object-cover"
      />
      <p className="font-bold my-2">
        {creator.firstName} {creator.lastName}
      </p>

      <p className="mt-4">Escreveu:</p>
      <p>
        <span className="font-bold">Comics: </span>
        {creator.comics.available}
      </p>
      <p>
        <span className="font-bold">Séries: </span>
        {creator.series.available}
      </p>
      <p>
        <span className="font-bold">Histórias: </span>
        {creator.stories.available}
      </p>
    </div>
  );
}
