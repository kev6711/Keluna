import { CircleCheck } from "lucide-react";

const Toast = ({ message, type = "success" }) => {
    if (!message) return null;

    return (
        <div className={`toast toast--${type}`} role='alert'>
            <CircleCheck />
            <span className='toast__message'>{message}</span>
        </div>
    );
};

export default Toast;
