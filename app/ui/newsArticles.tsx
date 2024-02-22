
import cl from '@/app/ui/newsArticles.module.css'
import { fetchNewsC, newsCount } from '../lib/action';
import Image from 'next/image';
import Pagination from './pagination';

export default async function NewsArticles({ currentPage }: { currentPage: number }) {

    // const news = await (await fetchNewsB()).reverse()
    // const news = (await fetchNewsC()).sort(
    //     (a, b) => {
    //         const dateA = a.date;
    //         const dateB = b.date;
    //         if (dateA < dateB) {
    //             return -1;
    //         }else
    //        {
    //             return 1;
    //         }
    //     }
    // ).reverse()
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
                            {/* <p>{`id: ${nw.id}`}</p> */}
                            <p>{`date: ${nw.date}`}</p>
                            <hr />
                            <h2>{nw.title}</h2>
                            <div className={cl.imgCont}>
                                <Image
                                    className={cl.imgNext}
                                    src={`/img/${nw.img}`}
                                    width={300}
                                    height={1}
                                    // priority={true}
                                    // className={}
                                    // style={{
                                    //     height: '100px',
                                    //     objectFit: 'contain', // cover, contain, none
                                    // }}
                                    // className="hidden md:block"
                                    alt="Logo"
                                />
                            </div>
                            {/* <p>{`img: ${nw.img}`}</p> */}
                            <p>{nw.text}</p>

                        </div>
                    )
                })
            }
            <Pagination totalPage={totalPage}/>
        </>
    )
}