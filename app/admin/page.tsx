import Image from "next/image";
import styles from "@/app/admin/admin.module.css";
import { fetchNewsB, deleteNews} from "../lib/action";
import Link from "next/link";
import { signOut } from "@/auth";
import { redirect } from "next/navigation";

import { Metadata } from "next";


export const metadata: Metadata = {
  title: "Admin",
};

export default async function Admin() {
  // const news = await (await fetchNewsB()).reverse()
  const news = (await fetchNewsB())
    .sort((a, b) => {
      const dateA = a.date;
      const dateB = b.date;
      if (dateA < dateB) {
        return -1;
      } else {
        return 1;
      }
    })
    .reverse();

  return (
    <div className={"container " + styles.sectionAdmin}>
      <form
        className={styles.signOutBtn}
        action={async () => {
          "use server";
          await signOut({ redirectTo: "/" });
        }}
      >
        <button className="btn">Sign Out</button>
      </form>

      <h1 className={styles.h1}>Admin page</h1>

      <h2>News</h2>
     
    </div>
  );
}
