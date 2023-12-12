import HomeHero from "@/components/HomeHero/HomeHero";
import { buttonVariants } from "@/components/ui/button";
import Wrapper from "@/layouts/Wrapper/Wrapper";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa6";

import LatestUpdateList from "@/components/LatestUpdateList/LatestUpdateList";
import HorizontalList from "@/components/HorizontalList/HorizontalList";
import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations('Home');
  return (
    <main >
      <HomeHero />
      <section className="pt-6">
        <Wrapper>
          <h2 className="text-xl sm:text-2xl font-semibold flex items-center justify-between">
            <span>{t('titles.latestList')}</span>
            <Link href={"/"} className={cn(buttonVariants({ variant: "outline", size: "icon" }), "rounded-full text-xl")}>
              <FaArrowRight />
            </Link>
          </h2>
          <LatestUpdateList />
        </Wrapper>
      </section>
      <section className="pt-6">
        <Wrapper>
          <h2 className="text-xl sm:text-2xl font-semibold flex items-center justify-between">
            <span>{t('titles.seasonalList')}</span>
            <Link href={"/"} className={cn(buttonVariants({ variant: "outline", size: "icon" }), "rounded-full text-xl")}>
              <FaArrowRight />
            </Link>
          </h2>
        </Wrapper>
        <div className="mt-4">
          <HorizontalList />
        </div>
      </section>

      <section className="pt-6 pb-6">
        <Wrapper>
          <h2 className="text-xl sm:text-2xl font-semibold flex items-center justify-between">
            <span>{t('titles.recentlyList')}</span>
            <Link href={"/"} className={cn(buttonVariants({ variant: "outline", size: "icon" }), "rounded-full text-xl")}>
              <FaArrowRight />
            </Link>
          </h2>
        </Wrapper>
        <div className="mt-4">
          <HorizontalList slideClassName="sm:w-32" />
        </div>
      </section>
    </main>
  )
}
