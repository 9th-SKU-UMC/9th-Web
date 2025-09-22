export type Status = "todo" | "done";

export type Todo = {
    id: number; // 고유 id
    text: string; // 할 일 내용
    status: Status; // 상태 (미완 or 완) 
}