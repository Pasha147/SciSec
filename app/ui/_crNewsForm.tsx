"use client";

import classes from "@/app/ui/crNewsForm.module.css";
import { createNewsC } from "../lib/action";
import { useState, FormEvent } from "react";

export function CreateNewsForm({ setIsForm }: { setIsForm: Function }) {
  //   const [isSaving, setIsSaving]=useState('')
  const date = new Date().toISOString().split("T")[0];

  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true); // Set loading to true when the request starts
    const formData = new FormData(event.currentTarget); //get formData from event
    await createNewsC(formData); //upload formData
    setIsLoading(false); // Set loading to false when the request completes
  }

  return (
    <>
      <form onSubmit={onSubmit} className={classes.createForm}>
        <button
          className={`btn ${classes.closeBtn}`}
          onClick={() => setIsForm(false)}
        >
          X
        </button>
        <h2 className={classes.h2}>Create news</h2>
        <label htmlFor="date" className={classes.label}>
          Date
        </label>
        <input
          id="date"
          name="date"
          type="text"
          placeholder="dd/mm/YYYY"
          className={classes.dateInp}
          defaultValue={date}
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
          required
        />
        <label htmlFor="text" className={classes.label}>
          Text
        </label>
        <textarea
          id="text"
          name="text"
          className={classes.textArea}
          placeholder="Text"
          required
        ></textarea>
        <button type="submit" className="btn" disabled={isLoading}>
          {isLoading ? "Loading..." : "Submit"}
        </button>
      </form>
    </>
  );
}
