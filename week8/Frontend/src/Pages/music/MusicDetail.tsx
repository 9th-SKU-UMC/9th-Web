import { useParams } from "react-router-dom";
import { useLPDetail } from "../../apis/lps/caching/queryHooks";

const MusicDetail = () => {
    const { lpId } = useParams<{ lpId: string }>();
    const { data, isPending, isError, error } = useLPDetail(lpId ? Number(lpId) : 0);

    return (
        <>
            <h1>Music Detail Page</h1>
            {isPending && <p>Loading...</p>}
            {isError && <p>Error: {error.message}</p>}
            {data && (
                <div>
                    <h2>{data.title}</h2>
                </div>
            )}
        </>
    )
}

export default MusicDetail;