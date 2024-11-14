import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs';

export default function BlogPageBtn({ id }) {
    const [prevPost, setPrevPost] = useState(null);
    const [nextPost, setNextPost] = useState(null);

    useEffect(() => {
        const blogPage = async () => {
            try {
                // 上一頁
                let prevId = id - 1;
                let prevPostData = null;
                while (prevId > 0) {
                    const prevPage = await fetch(`http://localhost:3005/api/blog/${prevId}`);
                    const prevData = await prevPage.json();
                    if (prevData[0] && prevData[0].Status === 1) {
                        prevPostData = prevData[0];
                        break;
                    }
                    prevId--;
                }
                setPrevPost(prevPostData);

                // 下一頁
                let nextId = parseInt(id) + 1;
                let nextPostData = null;
                let round = 0; 
                const maxRound = 5; 
                while (nextPostData === null && round < maxRound) {
                    try {
                        const nextPage = await fetch(`http://localhost:3005/api/blog/${nextId}`);
                        if (!nextPage.ok) break; 
                        const nextData = await nextPage.json();
                        if (nextData[0] && nextData[0].Status === 1) {
                            nextPostData = nextData[0];
                            break;
                        }
                    } catch (error) {
                        console.error('無法獲取下一頁資料:', error);
                        break;
                    }
                    nextId++;
                    round++;
                }
                setNextPost(nextPostData);

            } catch (error) {
                console.error('無法獲取資料:', error);
            }
        };
        blogPage();
    }, [id]);

    return (
        <div className="prev-next">
            {prevPost && (
                <Link href={`/blog/${prevPost.ID}`} className="prev text-decoration-none">
                    <div className="arrow-container">
                        <BsArrowLeft className="arrow-icon" />
                    </div>
                    <div className="prev-content">
                        <div className="prev-title">
                            <span>上一篇</span>
                        </div>
                        <h5 className="article-title">{prevPost.Title}</h5>
                    </div>
                </Link>
            )}
            {nextPost && (
                <Link href={`/blog/${nextPost.ID}`} className="next text-decoration-none">
                    <div className="arrow-container">
                        <BsArrowRight className="arrow-icon" />
                    </div>
                    <div className="next-content">
                        <div className="next-title">下一篇</div>
                        <h5 className="article-title">{nextPost.Title}</h5>
                    </div>
                </Link>
            )}
        </div>
    );
}
