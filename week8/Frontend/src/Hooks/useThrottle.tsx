import { useRef, useState } from "react";

interface UseThrottleProps {
    function: (...args: any[]) => void;
    threshold: number;
}

const useThrottle = ({function: func, threshold}: UseThrottleProps) => {
    const lastCall = useRef<number>(0);
    const timeRef = useRef<number | null>(null);

    const throttledFunction = (...args: any[]) => {
        const now = Date.now();

        if (now-lastCall.current >= threshold) {
            // 마지막 실행으로부터 충분한 시간(threshold)이 지났음
            console.log("Throttled: Function executed.");
            func(...args);
            lastCall.current = now;
        } else {
            // 마지막 실행으로부터 충분한 시간이 지나지 않음
            console.log("Throttled: Function call ignored to prevent excessive calls.");
            if (timeRef.current) {
                clearTimeout(timeRef.current);
            }

            const remainingTime = threshold - (now - lastCall.current);
            timeRef.current = setTimeout(() => {
                func(...args);
                lastCall.current = Date.now();
            }, remainingTime);
        }
    }

    return throttledFunction;
}

export default useThrottle;