"use client"

import Link from "next/link"
import Image from "next/image"
import { Star } from "lucide-react"
import { motion, useReducedMotion } from "motion/react"
import type { Place } from "@/lib/places"
import { cn } from "@/lib/utils"

export function DestinationCard({
  place,
  index,
  featured = false,
  priority = false,
}: {
  place: Place
  index: number
  featured?: boolean
  priority?: boolean
}) {
  const reduce = useReducedMotion()

  return (
    <motion.article
      whileHover={reduce ? undefined : { y: -6 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "group relative isolate flex flex-col",
        featured && "md:col-span-2"
      )}
    >
      <Link
        href={`/destinations/${place.slug}`}
        className="relative block overflow-hidden rounded-[4px] bg-brand-900"
      >
        <div
          className={cn(
            "relative w-full overflow-hidden",
            featured ? "aspect-4/3 md:aspect-16/10" : "aspect-4/5"
          )}
        >
          <Image
            src={place.image}
            alt={`${place.name} — ${place.region}`}
            fill
            priority={priority}
            sizes={
              featured
                ? "(max-width: 768px) 100vw, 66vw"
                : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            }
            className="object-cover transition-transform duration-[1.1s] [transition-timing-function:var(--ease-out-expo)] group-hover:scale-[1.05]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-950/70 via-brand-950/5 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-95" />
        </div>

        {/* index marker */}
        {
        <span className="absolute top-4 left-4 font-display text-xs tracking-[0.18em] text-sand-100/70 tabular-nums">
          {String(index + 1).padStart(2, "0")}
        </span>
        }

        {/* price sits on the image, right where the eye lands last */}
        <span className="tnum absolute bottom-4 left-4 rounded-full bg-sand-200 px-3 py-1 text-[0.78rem] font-semibold text-brand-900">
          ${place.price}
        </span>
      </Link>

      <div className="mt-4 flex flex-1 flex-col">
        <p className="eyebrow text-ink-300">{place.region}</p>

        <h3
          className={cn(
            "mt-1.5 font-display tracking-[-0.025em] text-brand-900",
            featured ? "text-3xl md:text-4xl" : "text-[1.4rem]"
          )}
        >
          <Link
            href={`/destinations/${place.slug}`}
            className="link-underline"
          >
            {place.name}
          </Link>
        </h3>

        <p
          className={cn(
            "mt-2 text-ink-500",
            featured ? "max-w-md text-[0.95rem] leading-relaxed" : "text-sm"
          )}
        >
          {featured ? place.description : place.tagline}
        </p>

        <div className="mt-4 flex items-center justify-between border-t border-sand-300/70 pt-3 text-[0.8rem] text-ink-500">
          <span className="tnum flex items-center gap-1.5">
            <Star className="h-3.5 w-3.5 fill-sand-400 text-sand-400" />
            {place.rating}
          </span>
          <span className="tnum">
            {place.days} &middot; {place.best}
          </span>
        </div>
      </div>
    </motion.article>
  )
}

