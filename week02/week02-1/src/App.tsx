import './App.css'
import Todo from '../components/Todo'
import { TodoProvider } from '../src/context/TodoContext'

function App() {

  return (
    <TodoProvider>
      <Todo></Todo>
    </TodoProvider>
  )
}

export default App
