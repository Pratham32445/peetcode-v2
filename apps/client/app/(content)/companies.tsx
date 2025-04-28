import Image from "next/image";
import Link from "next/link";
import React from "react";

const companiesData = [
  {
    name: "Top Google Premium Problems",
    image: "/google.avif",
    link: "/problem-set/google",
  },
  {
    name: "Top Meta Premium Problems",
    image: "/meta.png",
    link: "/problem-set/google",
  },
  {
    name: "Top Apple Premium Problems",
    image: "/apple.png",
    link: "/problem-set/google",
  },
];

const Companies = () => {
  return (
    <div className="p-10">
      <div>
        <p className="text-lg">Problem Set</p>
      </div>
      <div className="mt-[30px]">
        <div className="flex gap-4">
          {companiesData.map(({ name, image, link }, idx) => (
            <Link
              href={link}
              key={idx}
              className="relative w-[400px] h-[150px] bg-white overflow-hidden rounded-lg cursor-pointer flex justify-center items-center shadow-custom"
            >
              <div className="absolute bottom-[10px]">
                <p className="text-black text-lg font-bold">{name}</p>
              </div>
              <Image
                src={image}
                alt={name}
                width={100}
                height={100}
                objectFit="contain"
                priority
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Companies;
