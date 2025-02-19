import { SquarePen } from 'lucide-react';


export default function NewChat(){
    const handleNewChat = () => {
        window.location.reload();
      };
    return (
        <button onClick={handleNewChat}>
            <SquarePen />
        </button>
    )
}