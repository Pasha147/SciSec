"use client";

import { useState } from "react";
import { INewsMassage } from "../lib/definitions";
// import EditForm from "./editForm";
import classes from "./editCurNews.module.css";
import { editNews } from "@/app/lib/action";

export default function EditCurNews({ curNews }: { curNews: INewsMassage }) {
  const [isForm, setIsForm] = useState(false);
  const updateNewsWithId = editNews.bind(null, curNews.id);

  return (
    <>
      <button className="btn" onClick={() => setIsForm((prev) => !prev)}>
        Edit news
      </button>
      {
        //  isForm && <EditForm curNews={curNews}/>
        isForm && (
          <div className={classes.editForm}>
            <form action={updateNewsWithId}>
              <h2 className={classes.h2}>Edit current news</h2>
              <button
                className={`btn ${classes.closeBtn}`}
                onClick={() => setIsForm(false)}
              >
                X
              </button>
              <label htmlFor="date" className={classes.label}>
                Date
              </label>
              <input
                id="date"
                name="date"
                type="text"
                placeholder="dd/mm/YYYY"
                className={classes.dateInp}
                defaultValue={curNews.date}
              />
              <label htmlFor="title" className={classes.label}>
                Title
              </label>
              <input
                id="title"
                name="title"
                type="text"
                placeholder="Title"
                className={classes.titleInp}
                defaultValue={curNews.title}
              />
              <label htmlFor="img" className={classes.label}>
                img
              </label>
              <input
                id="img"
                name="img"
                type="text"
                placeholder="img"
                className={classes.titleInp}
                defaultValue={curNews.img}
              />
              <label htmlFor="text" className={classes.label}>
                Text
              </label>
              <textarea
                id="text"
                name="text"
                className={classes.textArea}
                placeholder="Text"
                defaultValue={curNews.text}
              ></textarea>
              <button type="submit" className={classes.submitBtn}>
                Seve news
              </button>
            </form>
          </div>
        )
      }
    </>
  );
}
