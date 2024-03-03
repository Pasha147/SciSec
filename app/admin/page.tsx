import Image from "next/image";
import styles from "@/app/admin/admin.module.css";
import { fetchNewsB, deleteNews } from "../lib/action";
import Link from "next/link";
import { signOut } from "@/auth";
import { redirect } from "next/navigation";
import EditCurNews from "@/app/ui/editCurNews";
import CreateNews from "@/app/ui/createNews";

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

      <CreateNews news={news} />

      <h2>News</h2>
      {news.map((nw, n) => {
        const deleteNewsId = deleteNews.bind(null, nw.id);
        // const editNewsIdB = editNewsId.bind(null, nw.id);

        return (
          <div className={"article " + styles.admArt} key={`news ${nw.id}`}>
            <p>{`id: ${nw.id}`}</p>
            <p>{`date: ${nw.date}`}</p>
            <p>{`title: ${nw.title}`}</p>
            <p>{`img: ${nw.img}`}</p>
            <p>{`text: ${nw.text}`}</p>
            <div className={styles.btnCont}>
              <form className={styles.artBtn} action={deleteNewsId}>
                <button className="btn" type="submit">
                  Del
                </button>
              </form>
              <form
                className={styles.artBtn}
                // action={editNewsIdB}>
                action={async () => {
                  "use server";
                  redirect(`/admin/${nw.id}/editNews`);
                }}
              >
                {/* <button className="btn" type="submit">
                  Edit
                </button> */}
              </form>
            </div>
            <EditCurNews curNews={nw} />
          </div>
        );
      })}
    </div>
  );
}
