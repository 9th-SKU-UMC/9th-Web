import { Children, useEffect, useMemo, useState, isValidElement } from "react"
import type { RouteProps } from "../types/RouteProps"
import { getCurrentPath } from "../utils/getCurrentPath"

// 경로 매칭 함수
const matchPath = (routePath: string, currentPath: string) => {
    if (routePath === "*") return true; // 와일드카드 매칭
    return routePath === currentPath;
}

type RouterProps = {
    children: React.ReactNode;
}

// 현재 pathname에 맞는 Route 컴포넌트만 찾아서 렌더링
export const Router =({children}: RouterProps) => {
    // 현재 경로 상태 저장
    const [path, setPath] = useState(getCurrentPath());

    useEffect(() => {
        // 경로 변경 시 실행되는 핸들러
        const onChange = () => setPath(getCurrentPath());
        window.addEventListener("popstate", onChange); // 브라우저 내비게이션 이벤트
        window.addEventListener("locationchange", onChange); // 커스텀 이벤트

        // cleanup: 언마운트 시 이벤트 리스너 제거
        return () => {
            window.removeEventListener("popstate", onChange);
            window.removeEventListener("locationchange", onChange);
        }
    }, []);

    // children으로 받은 <Route/>들의 props(path, component)만 추출
    // 라우팅 테이블 역할
    const routes = useMemo(() => {
        const list: RouteProps[] = [];
        Children.forEach(children, (child) => {
            if(isValidElement(child)) {
                const props = child.props as RouteProps;
                if(props?.path && props?.component) {
                    list.push({path: props.path, component: props.component});
                }
            }
        })

        return list;
    }, [children])

    // 현재 경로와 매칭되는 라우트 찾기
    const matched = routes.find((r) => matchPath(r.path, path));
    
    if (!matched) return null; // 매칭 실패 시 아무것도 렌더링 하지 않음

    // 매칭된 컴포넌트 렌더링
    const MatchedComponent = matched.component;
    return <MatchedComponent />;
}