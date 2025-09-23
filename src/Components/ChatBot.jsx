// src/components/ChatBot.jsx
import React, { useState, useRef, useEffect } from "react";

export default function ChatBot({ onClose }) {
  const [messages, setMessages] = useState([
    { id: 1, role: "system", text: "You are a helpful assistant for the HealthCare app." },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const listRef = useRef(null);

  useEffect(() => {
    if (listRef.current) listRef.current.scrollTop = listRef.current.scrollHeight;
  }, [messages, loading]);

  const send = async () => {
    if (!input.trim()) return;
    const userMsg = { id: Date.now(), role: "user", text: input.trim() };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMsg.text,
          // optionally include context: userId, appointment data, etc.
        }),
      });

      if (!res.ok) {
        const txt = await res.text();
        throw new Error(txt || "Server error");
      }

      const data = await res.json(); // { reply: "..." }
      const botMsg = { id: Date.now() + 1, role: "assistant", text: data.reply };
      setMessages((m) => [...m, botMsg]);
    } catch (err) {
      const errMsg = { id: Date.now() + 1, role: "assistant", text: "Sorry — something went wrong." };
      setMessages((m) => [...m, errMsg]);
      console.error("chat error", err);
    } finally {
      setLoading(false);
    }
  };

  const onKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.card} role="dialog" aria-modal="true" aria-label="AI chat">
        <div style={styles.header}>
          <div>AI Assistant</div>
          <div>
            <button onClick={onClose} style={styles.closeBtn}>✕</button>
          </div>
        </div>

        <div style={styles.messageList} ref={listRef}>
          {messages.map((m) => (
            <div key={m.id} style={m.role === "user" ? styles.userMsg : styles.botMsg}>
              <div style={{ fontSize: 14 }}>{m.text}</div>
            </div>
          ))}

          {loading && <div style={styles.botMsg}><em>Thinking…</em></div>}
        </div>

        <div style={styles.inputArea}>
          <textarea
            placeholder="Ask me about appointments, doctors, or how to use the app..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKey}
            rows={2}
            style={styles.textarea}
          />
          <button onClick={send} disabled={loading || !input.trim()} style={styles.sendBtn}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

/* minimal inline styles — replace with CSS classes if you prefer */
const styles = {
  overlay: {
    position: "fixed", inset: 0, display: "flex", alignItems: "flex-end", justifyContent: "flex-end",
    padding: 20, zIndex: 2000,
    pointerEvents: "auto",
  },
  card: {
    width: 360, maxWidth: "95vw", height: 520, borderRadius: 12, background: "#fff",
    boxShadow: "0 20px 60px rgba(2,6,23,0.2)", display: "flex", flexDirection: "column", overflow: "hidden",
  },
  header: { padding: "12px 16px", display: "flex", justifyContent: "space-between", alignItems: "center", fontWeight: 700, borderBottom: "1px solid #eee" },
  closeBtn: { background: "transparent", border: "none", cursor: "pointer", fontSize: 16 },
  messageList: { padding: 12, overflowY: "auto", flex: 1, display: "flex", flexDirection: "column", gap: 10 },
  userMsg: { alignSelf: "flex-end", background: "#dcf8c6", padding: 8, borderRadius: 8, maxWidth: "85%" },
  botMsg: { alignSelf: "flex-start", background: "#f1f5f9", padding: 8, borderRadius: 8, maxWidth: "85%" },
  inputArea: { padding: 12, display: "flex", gap: 8, borderTop: "1px solid #eee" },
  textarea: { flex: 1, resize: "none", padding: 8, borderRadius: 8, border: "1px solid #ddd", fontSize: 14 },
  sendBtn: { padding: "8px 12px", borderRadius: 8, background: "linear-gradient(90deg,#6d28d9,#06b6d4)", color: "#fff", border: "none", cursor: "pointer", fontWeight: 700 },
};
