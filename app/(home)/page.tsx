

import styles from "@/app/(home)/home.module.css";
import NewsArticles from "../ui/newsArticles";
import { Suspense } from "react";
import SkelNewsArticles from "../ui/skeletons";
import { Metadata } from "next";
import Link from "next/link";


export const metadata: Metadata = {
  title: "News",
};

export default async function Home({
  searchParams,
}: {
  searchParams?: {
    page?: string;
  };
}) {
  const currentPage = Number(searchParams?.page) || 1;
  
  return (
    <div className={styles.sectionHome + " container section"}>
      <h1>{"Новини"}</h1>
      <Link
        key={'admin'}
        href={'/admin'}
        className={`${styles.navLink} btn }`}
        
      >
        Вхід для вченого секретаря
      </Link>
      <Suspense fallback={<SkelNewsArticles />}>
        <NewsArticles currentPage={currentPage} />
      </Suspense>
    </div>
  );
}
