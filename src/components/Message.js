import { auth } from "../App";
import '../styles/Message.css'

export function Message({ message, avatar, userId }) {
  const msgClass =
    userId === auth.currentUser.uid 
    ? "message--sent" 
    : "message--received";

  return (
    <>
      <div className={`message ${msgClass}`}>
        <img alt="User avatar" src={avatar} />
        <p>{message}</p>
      </div>
    </>
  );
}
