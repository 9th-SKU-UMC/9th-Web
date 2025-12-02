import { useRef, useEffect } from "react";

interface UseDebounceProps {
    function: (...args: any[]) => void;
    delay: number;
}

const useDebounce = ({ function: func, delay }: UseDebounceProps) => {
    const timeRef = useRef<number | null>(null);

    const debouncedFunction = (...args: any[]) => {
        if (timeRef.current) {
            clearTimeout(timeRef.current);
        }

        timeRef.current = setTimeout(() => {
            func(...args);
        }, delay);
    }

    useEffect(() => {
        return () => {
            if (timeRef.current) {
                clearTimeout(timeRef.current);
            }
        };
    }, []);

    return debouncedFunction;
}

export default useDebounce;