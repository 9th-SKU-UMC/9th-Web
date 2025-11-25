// Domain types for LP tags
export type LPTag = {
    id: number;
    name: string;
}

// Domain types for LP likes
export type LPLike = {
    id: number;
    userId: number;
    lpId: number;
}

// Domain type for author information
export type LPAuthor = {
    id: number;
    name: string;
    email: string;
    bio?: string;
    avatar?: string;
    createdAt: string;
    updatedAt: string;
}

// Domain types for LP posts
export type LPPost = {
    id: number;
    title: string;
    content: string;
    thumbnail: string;
    published: boolean;
    authorId: number;
    createdAt: string;  
    updatedAt: string;
    tags?: LPTag[];
    likes?: LPLike[];
}

