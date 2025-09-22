export type Tech = 
    | 'REACT' 
    | 'NEXT' 
    | 'VUE' 
    | 'SVELTE' 
    | 'ANGULAR' 
    | 'REACT-NATIVE';

interface ListProps {
    tech: Tech;
}

const List = ({tech} : ListProps) : React.ReactElement => {
    return (
        <>
            <li style={{listStyle: 'none'}}>
                {tech === 'REACT' ? '모니와 함께하는 리액트' : tech}
            </li>
        </>
    )
}

export default List;