"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";

import type { PlatformsListType } from "@/lib/types";

export default function PlatformList({ platforms, title }: { platforms: PlatformsListType[]; title: string }) {
  const platformSLength = platforms.length;

  return (
    <div className="w-full">
      <h3 className="flex items-center font-bold text-3xl mb-5">
        {title} <span className={`ml-4 py-1 px-3 box-border rounded-xl text-[15px] text-red-600`}>{`${platformSLength} Platforms`}</span>
      </h3>
      <ul className="grid gap-5 grid-cols-6 w-full h-auto">
        {platforms.map((platform) => (
          <motion.li key={platform.id} whileHover={{ y: -10, scale: 1.03 }} transition={{ duration: 0.3 }} className="relative block h-0 pt-[100%] shadow-[0_5px_15px_rgba(149,157,165,0.1)] rounded-2xl bg-white">
            <Link className="absolute inset-0 flex flex-col items-center justify-start w-full h-full p-[30px_20px_20px_20px] box-border" href={`/platforms/${platform.slug}`}>
              <figure className="relative w-full h-0 pt-[53.576%] mb-6">
                {platform.platform_logo ? (
                  <Image
                    className="absolute inset-0 m-auto object-contain"
                    src={`https://images.igdb.com/igdb/image/upload/t_logo_med/${platform.platform_logo.image_id}.png`}
                    alt={`${platform.platform_logo.image_id} 로고`}
                    fill
                    sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 16.67vw"
                  />
                ) : (
                  <Image className="absolute inset-0 m-auto object-contain" src="/assets/logos/default-logo.png" alt="기본 로고" fill sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 16.67vw" />
                )}
              </figure>

              <p className="font-medium text-center text-[14px]">{platform.name}</p>
            </Link>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}
