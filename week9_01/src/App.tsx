import { useState } from 'react'
import Item from './components/Item'
import cartItems from './constants/cartItem'
import Footer from './components/Footer'
import Modal from './components/Modal'
import useModalStore from './store/useModalStore'

function App() {
  const [isFooterOpen, setIsFooterOpen] = useState(true);

  const toggleFooter = () => {
    setIsFooterOpen(!isFooterOpen);
  }

  const isModalOpen = useModalStore((state) => state.isOpen);

  return (
    <>
      {isModalOpen && <Modal/>}
      <button 
        onClick={toggleFooter}
        className="w-10 h-10 fixed bottom-10 right-10 cursor-pointer text-white bg-black rounded-full">
          +
      </button>
      <main className="w-full flex gap-0">
        <section className="flex-1 h-screen" onClick={toggleFooter}/>
        <div 
          className="w-full overflow-y-auto"
        >
          {cartItems.map((item) => (
            <Item key={item.id} item={item} />
          ))}
        </div>
        <section className="flex-1 h-screen" onClick={toggleFooter}/>
      </main>
      <Footer isOpen={isFooterOpen} onClose={() => setIsFooterOpen(false)}/>
    </>
  )
}

export default App
