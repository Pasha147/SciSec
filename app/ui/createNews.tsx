"use client";

import { useState, FormEvent } from "react";
import { NewsMassageC } from "../lib/definitions";
import { createNewsC } from "../lib/action";
import cl from "@/app/ui/createNews.module.css";

export default function CreateNews({ news }: { news: NewsMassageC[] }) {
  const [isForm, setIsForm] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true); // Set loading to true when the request starts
    const formData = new FormData(event.currentTarget); //get formData from event
    await createNewsC(formData); //upload formData
    setIsLoading(false); // Set loading to false when the request completes
    setIsForm(false)
  }

  const date = new Date().toISOString().split("T")[0];

  return (
    <>
      <button className="btn" onClick={() => setIsForm((prev) => !prev)}>
        Create news
      </button>
      {
        //  isForm && <CreateNewsForm setIsForm={setIsForm}/>
        isForm && (
          <form onSubmit={onSubmit} className={cl.createForm}>
            <button
              className={`btn ${cl.closeBtn}`}
              onClick={() => setIsForm(false)}
            >
              X
            </button>
            <h2 className={cl.h2}>Create news</h2>
            <label htmlFor="date" className={cl.label}>
              Date
            </label>
            <input
              id="date"
              name="date"
              type="text"
              placeholder="dd/mm/YYYY"
              className={cl.dateInp}
              defaultValue={date}
            />
            <label htmlFor="title" className={cl.label}>
              Title
            </label>
            <input
              id="title"
              name="title"
              type="text"
              placeholder="Title"
              className={cl.titleInp}
              required
            />
            <label htmlFor="text" className={cl.label}>
              Text
            </label>
            <textarea
              id="text"
              name="text"
              className={cl.textArea}
              placeholder="Text"
              required
            ></textarea>
            <button type="submit" className="btn" disabled={isLoading}>
              {isLoading ? "Loading..." : "Save"}
            </button>
          </form>
        )
      }
    </>
  );
}
