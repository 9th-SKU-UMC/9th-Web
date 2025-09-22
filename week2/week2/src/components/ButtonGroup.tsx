import Button from "./Button";
import { useCount } from "../context/CounterProvider";

const ButtonGroup = () => {
    const { handleIncrement,  handleDecrement } = useCount();
    return (
        <>
            <Button onClick={handleIncrement} text="+" />
            <Button onClick={handleDecrement} text="-" />
        </>
    )
}

export default ButtonGroup;