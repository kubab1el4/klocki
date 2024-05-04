import { debounce } from "lodash";
import { useEffect, useMemo, useRef } from "react";

export const useDebounce = (callback: () => void) => {
    const ref = useRef<() => void>();
    useEffect(() => {
        ref.current = callback;
    }, [callback]);

    const debounceCallback = useMemo(() => {
        const func = () => ref.current?.();

        return debounce(func, 300);
    }, []);

    return debounceCallback;
};
