import { useState, useRef, useEffect, useCallback } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useInfiniteLPList } from "../../apis/lps/caching/queryHooks";
import MusicCard from "../../Components/MusicCard";
import SortToggle from "../../Components/buttons/SortToggle";
import AddButton from "../../Components/buttons/AddButton";
import { useModalControll } from "../../Hooks/ModalControllProvider";
import { ModalShell } from "../../Components/Modal";
import { useToggleSearchSection } from "../../Hooks/ToggleSearchSection";
import SearchInput from "../../Components/forms/SearchInput";
import clsx from "clsx";
import useDebounce from "../../Hooks/useDebounce";
import useThrottle from "../../Hooks/useThrottle";

const Musics = () => {
    const navigate = useNavigate();
    const [order, setOrder] = useState<"asc" | "desc">("asc");
    const [searchValue, setSearchValue] = useState<string>(""); // 무한 스크롤용 검색어 상태

    const { 
        data, 
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isPending,
        isError,
        error
    } = useInfiniteLPList({ limit: 15, order, search: searchValue });

    console.log('Musics page - musics data:', data);
    
    const showLPDetail = (lpId: number) => {
        if (!isFetchingNextPage && lpId) navigate(`/music/${lpId}`);
    };

    const throttledScroll = useThrottle({function: fetchNextPage, threshold: 5000});

    const sentinelRef = useRef<HTMLDivElement | null>(null);
    useEffect(()=> {
        if (!sentinelRef.current) return;
        
        const el = sentinelRef.current;

        const observer = new IntersectionObserver((entries) => {
            const first = entries[0];

            if (first.isIntersecting && hasNextPage && !isFetchingNextPage) {
                throttledScroll();
            }
        });

        observer.observe(el);

        return () => {observer.disconnect();};
    }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

    const { openModal } = useModalControll();

    const { isSearchSectionOpen } = useToggleSearchSection();

    const handleSearch = useCallback((search: string) => {
        console.log("Searching LPs with:", search);
        if (!search) return;
        setSearchValue(search);
    }, []);

    const debouncedSearch = useDebounce({ function: handleSearch, delay: 300 });

    return (
        <>
        <ModalShell />
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6">
            <AddButton 
                className="fixed bottom-8 right-8 z-50"
                onClick={() => openModal('ADD_LP')} 
            />


            <section
                className={clsx(
                    "mt-4 p-4 transition-all duration-300 ease-in-out overflow-hidden",
                    isSearchSectionOpen
                        ? "max-h-32 opacity-100 translate-y-0"
                        : "max-h-0 opacity-0 transform -translate-y-2 pointer-events-none"
                )}
            >
                <SearchInput onSearch={debouncedSearch} />
            </section>

            {/* toggle */}
            <div className="mt-4 flex items-center justify-end gap-3">
                <SortToggle sort={order} onChange={setOrder} />
            </div>

            {/* Grid */}
            {/* 1. 검색 결과 */}
            {!isPending && data &&(
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
            )}

             {/* 2. pending */}
            {isPending && (
                <>
                    <p>Loading music list...</p>
                </>
            )}

            {/* 3. error */}
            {isError && (
                <>
                    <p>Error loading music list</p>
                </>
            )}

            {/* 4. 없는 결과 */}
            {!isPending && data && data.pages[0].data.length === 0 && (
                <>
                    <p>검색 결과가 없습니다.</p>
                </>
            )}
        </div>
        </>
    )
}

export default Musics;