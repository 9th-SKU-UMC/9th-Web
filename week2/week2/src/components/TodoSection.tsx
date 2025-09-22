import '../styles/mission1.css';
import { Status } from '../types/Todo';
import { Todo } from '../types/Todo';
import TodoUList from '../components/TodoUList';

type todoSectionProps = {
    listType: Status,
    todos: Todo[],
}

const TodoSection = ({listType, todos}: todoSectionProps) => {
    const titleByListType = listType === "todo" ? "할 일" : "완료";

    return (
        <>
        <div className="render-container__section">
            <h2 className="render-container__title">{titleByListType}</h2>
            <ul id="done-list" className="render-container__list">
                {todos
                    .filter(todo => todo.status === listType)
                    .map(todo => (
                        <TodoUList todo={todo}/>
                    ))}
            </ul>
        </div>
        </>
    )
}

export default TodoSection;