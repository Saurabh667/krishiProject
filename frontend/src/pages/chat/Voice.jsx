
import React, { useState, useEffect, useRef } from "react";
import api from "../../api/api";
import styles from "./Voice.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClockRotateLeft ,faMicrophone ,faMicrophoneSlash  } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const Voice = () => {
    const [listening, setListening] = useState(false);
    const [loading, setLoading] = useState(false);
    const [text, setText] = useState("");
    const [botreply, setReply] = useState("");
    const [messages, setMessages] = useState([]);
    const [displayHistory, setDisplayHistory] = useState(true);

    const chatRef = useRef(null);

    // 🎤 Speech recognition setup
    const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = "en-IN";

    // 🗣️ Speak function
    const speak = (msg) => {
        const utterance = new SpeechSynthesisUtterance(msg);
        utterance.lang = "hi-IN";
        utterance.rate = 1;
        window.speechSynthesis.speak(utterance);
    };

    // 🎧 Handle speech recognition result
    recognition.onresult = async (event) => {
        const command = event.results[0][0].transcript.trim();
        setText(command);
        console.log("🎙️ Heard:", command);

        if (!command) return;

        try {
            setLoading(true);

            // 1️⃣ Add user message locally
            speak('कृपया कुछ समय प्रतीक्षा करें, कृषि सखी आपके प्रश्न का उत्तर शीघ्र ही प्रदान करेगी।')
            const userMessage = { text: command, sender: "me" };
            setMessages((prev) => [...prev, userMessage]);
            await api.post("messages/", userMessage);

            // 2️⃣ Get AI reply
            const gptRes = await api.post("chatgpt/", { text: command });
            const replyText = gptRes?.data?.text || "मैं समझ नहीं पाया";
            setReply(replyText);

            const botMessage = { text: replyText, sender: "bot" };
            setMessages((prev) => [...prev, botMessage]); // append after user message
            // await api.post("messages/", botMessage);

            // 3️⃣ Speak AI reply
            speak(replyText);

        } catch (err) {
            console.error("Error during AI call:", err);
            speak("माफ़ कीजिए, मैं उस अनुरोध को संसाधित नहीं कर सका");
        } finally {
            setLoading(false);
        }
    };


    recognition.onerror = (event) => {
        console.error("Speech recognition error:", event.error);
        speak("मैं आपको ठीक से सुन नहीं पाया, कृपया दोबारा बोलें");
        setListening(false);
    };

    // 🎬 Start or stop listening
    const handleVoice = () => {
        if (listening) {
            recognition.stop();
            setListening(false);
        } else {
            recognition.start();
            setListening(true);
        }
    };

    // 📨 Fetch chat history from backend
    const fetchMessages = async () => {
        try {
            const res = await api.get("messages/");
            if (Array.isArray(res.data)) {
                setMessages(res.data);
            }
        } catch (err) {
            console.error("Failed to fetch messages:", err);
        }
    };

    // 🕓 Fetch messages once on mount
    useEffect(() => {
        fetchMessages();
    }, []);

    // 🔽 Auto scroll chat to bottom
    useEffect(() => {
        chatRef.current?.scrollTo({
            top: chatRef.current.scrollHeight,
            behavior: "smooth",
        });
    }, [messages]);
    const handleHistory = () => {
        setDisplayHistory(!displayHistory)
        // console.log(displayHistory)
    }

    return (
        <>
            <button onClick={handleHistory} className={styles.historyBtn}>{displayHistory?(<><FontAwesomeIcon icon={faClockRotateLeft} />History   </>):(<><FontAwesomeIcon icon={faMicrophone} />Voice Ass.</>)}</button>
            <Link to='/chat'><button className={styles.chatBtn}>Chat</button></Link>
            {displayHistory ? (<><div className={styles.voiceContainer}>
                <h2>🎤 Voice Assistant</h2>
                <div className={styles.status}>
                    {loading ? "Processing..." : listening ? "Listening..." : "Idle"}
                </div>
                <button
                    onClick={handleVoice}
                    disabled={loading}
                    className={styles.micButton}
                >
                    {listening ? (<>"🛑 Stop"<button onClick={() => window.speechSynthesis.cancel()} className={styles.muteBtn}><FontAwesomeIcon icon={faMicrophoneSlash} /></button></>) : ("🎙️ Start")}
                </button>
                <p className={styles.text}>{text && `You said: "${text}"`}</p>
            </div>

                <div className={styles.replyBox}>
                    <p className={styles.text}>
                        {botreply && `Krishi Sakhi Reply: "${botreply}"`}
                    </p>
                </div>
            </>) :
                (<>
                    <div ref={chatRef} className={styles.chatHistory}>
                        <h3>🕓 Chat History</h3>
                        {messages.length === 0 ? (
                            <p>No messages yet.</p>
                        ) : (
                            [...messages].reverse().map((msg, index) => (
                                <div
                                    key={index}
                                    className={
                                        msg.sender === "me"
                                            ? styles.userMessage
                                            : styles.botMessage
                                    }
                                >
                                    <strong>
                                        {msg.sender === "me" ? "आप:" : "कृषि सखी:"}
                                    </strong>
                                    <p className={styles.text}>{msg.text}</p>
                                </div>
                            ))
                        )}
                    </div>
                </>)}
            
        </>
    );
};

export default Voice;
