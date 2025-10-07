

import React, { useEffect, useRef } from "react";
import styles from "./Chat.module.css";
import api from "../../api/api";

const Chat = () => {
  const [userInput, setUserInput] = React.useState("");
  const [messages, setMessages] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const lastMessageRef = useRef(null);

  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);
  useEffect(() => {
  setMessages([]); 
  }, []);

  // Fetch messages on component mount
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await api.get("messages/");
        if (Array.isArray(res.data)) {
          setMessages(res.data);
          // res.data.forEach(msg => api.delete(`messages/${msg.id}/`));
        } else {
          console.error("Expected array from API, got:", res.data);
        }
      } catch (err) {
        console.error("Failed to fetch messages:", err);
      }
    };
    fetchMessages();
  }, []);



  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    const trimmedInput = userInput.trim()
    // if (userInput.trim() === "") return;
    if (trimmedInput === "") return;
    if (trimmedInput.toLowerCase() === "clear") {
    setMessages([]);
    setUserInput("");
    setLoading(false)
    return;
    }
    

    try {
      const res = await api.post("messages/", {
        text: userInput,
        sender: "me",
      });
      // if (res.data && res.data.text) {
      //   setMessages((prev) => [...prev, res.data]);
      //   setUserInput("");
      // } 
      if (res.data && res.data.text) {
      setMessages((prev) => [...prev, res.data]);
      setUserInput("");

      // 2️⃣ ✅ CHANGED: call ChatGPT API endpoint
      try {
        const gptRes = await api.post("chatgpt/", { text: userInput });
        if (gptRes.data && gptRes.data.text) {
          // ✅ CHANGED: append GPT reply to messages
          setMessages((prev) => [...prev, gptRes.data]);
        }
      } catch (err) {
        console.error("Failed to get ChatGPT reply:", err);
        console.log(err.response?.data);
      }

    }
      else {
        console.error("Invalid message returned from API:", res.data);
        console.log(res.data);
      }
    } catch (err) {
      console.error("Failed to send message:", err);
      console.log(err.response?.data);
    }
    finally{
      setLoading(false)
    }
  };

  return (
    <>
      <h1>Chat Page</h1>
      <div className={styles.chatArea}>
        <div className={styles.displayArea}>
          <div className={styles.messageContainer}>
            {messages.map((msg, idx) =>
              msg?.text ? (
                <div
                  key={msg.id ?? idx}
                  ref={idx === messages.length - 1 ? lastMessageRef : null}
                  className={msg.sender === "chatgpt"
                      ? styles.chatgptMessage
                      : styles.message}
                >
                  <div className={styles.messageText}>{msg.text}</div>
                  <div className={styles.messageMeta}>
                    {msg.sender} •{" "}
                    {msg.created_at
                      ? new Date(msg.created_at).toLocaleTimeString()
                      : new Date().toLocaleTimeString()}
                  </div>
                </div>
              ) : null
            )}
          </div>
        </div>

        <div className={styles.divForm}>
          <form className={styles.chatForm} onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Type a message..."
              className={styles.inputBar}
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
            />
            {
              loading?(
                <div className={styles.loading} disabled>Loading...</div>
              ):(
                            <button type="submit" className={styles.senBtn}>
              Send
            </button>
              )
            }
            {/* <button type="submit" className={styles.senBtn}>Send</button> */}
          </form>
        </div>
      </div>
    </>
  );
};

export default Chat;
