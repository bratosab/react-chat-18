import { useEffect, useRef, useState } from "react";
import "../styles/Chatroom.css";
import {
  addDoc,
  collection,
  deleteDoc,
  orderBy,
  query,
} from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { auth, store } from "../App";
import { Message } from "./Message";
import { Pending } from "./Pending";

export function Chatroom() {
  const msgCollection = collection(store, "messages");
  const pendingCollection = collection(store, "pending");
  const q = query(msgCollection, orderBy("timestamp"));
  const [messages] = useCollectionData(q);

  const currentUser = auth.currentUser;
  const scrollRef = useRef();

  let isSending = useRef(false);
  const [message, setMessage] = useState("");
  const [pending, setPending] = useState(null);

  useEffect(() => {
    scrollRef.current.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (!!message && !pending && !isSending.current) {
      writingMessage(true);
    } else if (!message && pending) {
      writingMessage(false);
    }
  }, [message]);

  const sendMessage = (event) => {
    event.preventDefault();

    const newMessage = {
      message,
      timestamp: Date.now(),
      userId: currentUser.uid,
      avatar: currentUser.photoURL,
    };

    addDoc(msgCollection, newMessage);

    setMessage("");
  };

  const writingMessage = (writing) => {
    if (writing) {
      isSending = true;
      addDoc(pendingCollection, {
        userId: currentUser.uid,
        name: currentUser.displayName,
        timestamp: Date.now(),
      }).then((docRef) => {
        setPending(docRef);
        isSending = false;
      });
    } else if (pending) {
      deleteDoc(pending).then(() => setPending(null));
    }
  };

  return (
    <>
      <main className="Chatroom">
        {messages &&
          messages.map((m) => (
            <Message
              key={m.timestamp}
              message={m.message}
              avatar={m.avatar}
              userId={m.userId}
            />
          ))}
        <Pending pendingCollection={pendingCollection} />
        <span ref={scrollRef}></span>
      </main>
      <form onSubmit={sendMessage}>
        <input
          type="text"
          placeholder="Say hi !"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        ></input>
        <button type="submit">Send</button>
      </form>
    </>
  );
}
