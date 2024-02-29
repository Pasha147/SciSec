
import { fetchNewsById } from "@/app/lib/action";
import classes from '@/app/admin/[id]/editNews/editNewsForm.module.css'
import { editNews } from "@/app/lib/action";
import { notFound } from 'next/navigation';

export default async function Page({ params }: { params: { id: string } }) {

    const id = params.id;
    const news = await fetchNewsById(id)
    

    if (!news) {
        console.log('news-->',news)
        notFound();
    }

    
    const updateNewsWithId = editNews.bind(null, news.id);

    return (
        <div>
            <h1>Edit news article</h1>
            <form
                action={updateNewsWithId}
                className={classes.editForm}
            >
                <h2 className={classes.h2}>Edit news</h2>
                <label
                    htmlFor="date"
                    className={classes.label}
                >
                    Date
                </label>
                <input
                    id="date"
                    name="date"
                    type="text"
                    placeholder="dd/mm/YYYY"
                    className={classes.dateInp}
                    defaultValue={news.date}
                />
                <label
                    htmlFor="title"
                    className={classes.label}
                >
                    Title
                </label>
                <input
                    id="title"
                    name="title"
                    type="text"
                    placeholder="Title"
                    className={classes.titleInp}
                    defaultValue={news.title}
                />
                <label
                    htmlFor="img"
                    className={classes.label}
                >
                    img
                </label>
                <input
                    id="img"
                    name="img"
                    type="text"
                    placeholder="img"
                    className={classes.titleInp}
                    defaultValue={news.img}
                />
                <label
                    htmlFor="text"
                    className={classes.label}
                >
                    Text
                </label>
                <textarea
                    id="text"
                    name="text"
                    className={classes.textArea}
                    placeholder="Text"
                    defaultValue={news.text}
                ></textarea>
                <button
                    type="submit"
                    className={classes.submitBtn}>Seve news</button>
            </form>
        </div>
    )
}