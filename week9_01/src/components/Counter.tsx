import useCartStore from "../store/useCartStore";

type CounterProps = {
    id: string;
};

const Counter = ({ id }: CounterProps) => {
    const count = useCartStore((state) => {
        const targetItem = state.items.find((item) => item.id === id);
        return targetItem ? targetItem.amount : 0;
    });

    const handleDecrement = () => {
        useCartStore.getState().decrease(id);
    };

    const handleIncrement = () => {
        useCartStore.getState().increase(id);
    };

    const buttonStyle = "w-6 h-6 rounded-md bg-gray-200 text-gray-500 hover:bg-gray-300 transition-colors duration-200 ease-in-out";
    
    return (
        <>
        <div className="flex items-center gap-2">
            <button onClick={handleDecrement} className={buttonStyle}>-</button>
            <span>{count}</span>
            <button onClick={handleIncrement} className={buttonStyle}>+</button>
        </div>
        </>
    )
}

export default Counter;