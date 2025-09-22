import './App.css'
import List from "../components/List"

const Practice1 = () => {
    const nickname = '모니';
    const noodle = '냉면';
    const array = [
    'REACT', 
    'NEXT', 
    'VUE', 
    'SVELTE', 
    'ANGULAR',
    'REACT-NATIVE'
    ] as const;

    return (
    <>
        <strong className='school'>서경대학교</strong>  
        <p style={{color: 'purple', fontWeight:'bold', fontSize: '3rem'}}>{nickname}/황무원</p>
        <h1>{`${nickname}는 ${noodle}을 좋아합니다.`}</h1>
        <ul style={{padding: 0, margin: 0}}>
        {array.map((item, index) =>{
            return <List key={index} tech={item}/>
        })}
        </ul>
    </>
    )
}

export default Practice1;