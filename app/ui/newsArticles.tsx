
import cl from '@/app/ui/newsArticles.module.css'
import { fetchNewsC, newsCount } from '../lib/action';
import Image from 'next/image';
import Pagination from './pagination';

export default async function NewsArticles({ currentPage }: { currentPage: number }) {

    const { totalNews, totalPage } = { ...(await newsCount()) }

    console.log('Total Pages->', totalPage);
    const news = await fetchNewsC(currentPage)

    return (
        <>
            {
                news.map((nw) => {
                    return (
                        <div
                            key={`news ${nw.id}`}
                            className={cl.newsArticle}
                        >
                            <p>{`date: ${nw.date}`}</p>
                            <hr />
                            <h2>{nw.title}</h2>
                            <p>{nw.text}</p>
                        </div>
                    )
                })
            }
            <Pagination totalPage={totalPage}/>
        </>
    )
}