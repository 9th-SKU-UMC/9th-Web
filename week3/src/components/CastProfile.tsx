import React from 'react';
import type { Cast } from '../types/MovieDetail';

// 배우 프로필 컴포넌트
const CastProfile = ({ cast }: { cast: Cast }) => {
    return (
        <>
        <div key={cast.cast_id} className="flex flex-col items-center">
            <img
                src={
                    cast.profile_path
                    ? `https://image.tmdb.org/t/p/w200${cast.profile_path}`
                    : 'https://via.placeholder.com/200x300?text=No+Image'
                }
                alt={cast.name}
                className="w-24 h-24 object-cover rounded-full mb-2"
            />
            <p className="text-sm font-semibold text-center">{cast.name}</p>
            <p className="text-xs text-gray-400 text-center">{cast.character}</p>
        </div>
        </>
    )
}

export default CastProfile;