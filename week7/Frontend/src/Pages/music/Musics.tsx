import { useState, useRef, useEffect } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useInfiniteLPList } from "../../apis/lps/caching/queryHooks";
import MusicCard from "../../Components/MusicCard";
import SortToggle from "../../Components/buttons/SortToggle";
import AddButton from "../../Components/buttons/AddButton";
import { useModalControll } from "../../Hooks/ModalControllProvider";
import { ModalShell } from "../../Components/Modal";

const Musics = () => {
    const navigate = useNavigate();
    const [order, setOrder] = useState<"asc" | "desc">("asc");

    const { 
        data, 
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isPending,
        isError,
        error
    } = useInfiniteLPList({ limit: 15, order});

    console.log('Musics page - musics data:', data);
    
    const showLPDetail = (lpId: number) => {
        if (!isFetchingNextPage && lpId) navigate(`/music/${lpId}`);
    };

    const sentinelRef = useRef<HTMLDivElement | null>(null);
    useEffect(()=> {
        if (!sentinelRef.current) return;
        
        const el = sentinelRef.current;

        const observer = new IntersectionObserver((entries) => {
            const first = entries[0];

            if (first.isIntersecting && hasNextPage && !isFetchingNextPage) {
                fetchNextPage();
            }
        });

        observer.observe(el);

        return () => {observer.disconnect();};
    }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

    const { openModal } = useModalControll();

    if (isPending) return <p>Loading music list...</p>;
    if (isError) return <p>Error loading music list: {error.message}</p>;

    return (
        <>
        <ModalShell />
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6">
            <AddButton 
                className="fixed bottom-8 right-8 z-50"
                onClick={() => openModal('ADD_LP')} 
            />

            {/* toggle */}
            <div className="mt-4 flex items-center justify-end gap-3">
                <SortToggle sort={order} onChange={setOrder} />
            </div>

            {/* Grid */}
            <section className="p-3 sm:p-4">
                <ul className="grid grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-3">
                    {data?.pages.map((d, idx) => (
                        <React.Fragment key={idx}>
                            {d.data.map((music) => (
                                <MusicCard
                                    key={music.id}
                                    title={music.title}
                                    createdAt={music.createdAt}
                                    likes={music.likes}
                                    thumbnail={music.thumbnail}
                                    onClick={() => showLPDetail(music.id)}
                                />
                            ))}
                        </React.Fragment>
                    ))}
                </ul>

                <div ref={sentinelRef} style={{height:1}}></div>
            </section>
        </div>
        </>
    )
}

export default Musics;