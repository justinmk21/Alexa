import {
  LuAtom,
  LuChartArea,
  LuChartBar,
  LuCopy,
  LuFileAudio,
  LuFolder,
  LuImage,
  LuMic,
  LuPaperclip,
  LuPenLine,
  LuPin,
  LuPinOff,
  LuPresentation,
  LuRedo,
  LuSearch,
  LuSend,
  LuSettings,
  LuSettings2,
  LuShare,
  LuSun,
  LuTag,
  LuThumbsDown,
  LuThumbsUp,
  LuTowerControl,
  LuUser,
} from "react-icons/lu";
import logo from "../assets/icons/logo.png";
import SideBar from "../assets/icons/Icons.png";
import MagicPen from "../assets/icons/magicpen.png";
import "../css/mainpage.css";
import { useEffect, useRef, useState } from "react";
import { chatWithGemini, chatWithGroq, generateImage } from "../chatApi";
import { Box, Flex } from "@chakra-ui/react";
import api from "../../api";
import ReactMarkdown from "react-markdown";
import rehypeSanitize from "rehype-sanitize";
import Options from "../components/ui/Menu";
import remarkGFM from "remark-gfm";
import ColorSkeleton from "../components/skeleton";
import { ColorModeButton } from "../components/ui/color-mode";

function MainPage() {
  const [openSidebar, setOpenSidebar] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [conversations, setConversations] = useState([
    { from: "bot", text: "Say Hi" },
  ]);

  const options = ["openai/gpt-oss-20b", "gemini-2.5-flash", "stabilityai"];
  const [model, setModel] = useState(options[0]);

  const conversationRef = useRef(null);

  useEffect(() => {
    conversationRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [conversations]);

  const handleGemini = async () => {
    const reponse = await chatWithGemini(prompt);
    setResponse(reponse);
    return response;
  };

  const handleGroq = async () => {
    const response = await chatWithGroq(prompt);
    setResponse(response);
    return response;
  };

  const handleImage = async () => {
    const url = await generateImage(prompt);
    setResponse(url);
    return url;
  };

  const handleChat = async () => {
    if (!prompt.trim()) return;

    setConversations((prev) => [...prev, { from: "user", text: prompt }]);

    setPrompt("");
    setLoading(true);

    if (model === options[0]) {
      try {
        const reply = await handleGroq();
        setConversations((prev) => [...prev, { from: "bot", text: reply }]);
      } catch (err) {
        console.log(err);
        setConversations((prev) => [
          ...prev,
          { from: "bot", text: "Sorry, something went wrong" },
        ]);
      } finally {
        setLoading(false);
      }
    } else if (model === options[1]) {
      try {
        const reply = await handleGemini();
        setConversations((prev) => [...prev, { from: "bot", text: reply }]);
      } catch (err) {
        console.log(err);
        setConversations((prev) => [
          ...prev,
          { from: "bot", text: "Sorry, something went wrong" },
        ]);
      } finally {
        setLoading(false);
      }
    } else {
      try {
        const imageUrl = await handleImage();
        setConversations((prev) => [...prev, { from: "bot", image: imageUrl }]);
      } catch (err) {
        console.log(err);
        setConversations((prev) => [
          ...prev,
          { from: "bot", text: "Sorry, image generation failed" },
        ]);
      } finally {
        setLoading(false);
      }
    }
  };

  function SideBar() {
    return (
      <article className="sidebar">
        <div className="sidebar-tools">
          <div
            className="side-bar-icon"
            onClick={() => setOpenSidebar(!openSidebar)}
          >
            <LuSettings2 size={32} color="#a3a3a3" />
          </div>
          <div
            className="sidebar-search-icon"
            style={{ margin: "45px 0 0 0 " }}
          >
            <LuSearch size={20} color="#a3a3a3" />
          </div>
          <div className="new-chat-icon">
            <LuPenLine size={20} color="#a3a3a3" />
          </div>
        </div>
        <div className="sidebar-profile">
          <LuUser size={32} color="#a3a3a3" />
        </div>
      </article>
    );
  }

  function SideBarOpen() {
    return (
      <article className="sidebar-open">
        <div className="logo-bar">
          <div className="logo-alexa">
            <img src={logo} alt="logo" className="logo" />
            <p className="alexa">Alexa</p>
          </div>
          <div
            className="side-bar-icon"
            onClick={() => setOpenSidebar(!openSidebar)}
          >
            <LuSettings2 size={32} color="#a3a3a3" />
          </div>
        </div>

        <div className="searching">
          <div className="sidebar-search">
            <LuSearch size={20} color="#a3a3a3" />
          </div>
          <p className="alexa">Search</p>
        </div>

        <div className="chat-box">
          <div className="new-chat">
            <LuPenLine size={20} color="#a3a3a3" />
          </div>
          <p className="alexa">New Chat</p>
        </div>

        <p
          style={{
            color: "#a3a3a3",
            fontSize: "16px",
            margin: "30px 0px 30px 12px",
          }}
        >
          Chats
        </p>

        <div className="translate">
          <p>Translate</p>
          <LuPin size={16} color="#8b79ff" />
        </div>

        <div className="translate">
          <div
            style={{
              gap: "8px",
              height: "44px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <LuFolder size={16} color="#a3a3a3" />
            <p>Work</p>
          </div>
          <LuPin size={16} color="#8b79ff" />
        </div>

        <hr style={{ marginTop: "40px", marginBottom: "10px" }}></hr>

        <div className="chat-history">
          <p>Quick meal Ideas</p>
          <p>Daily journal entry</p>
          <p>Python bug fix</p>
          <p>Write a short Poem</p>
        </div>
      </article>
    );
  }

  return (
    <section className="main-page">
      {openSidebar ? <SideBarOpen /> : <SideBar />}

      <article className="conversation-container">
        <div className="conversation-bar">
          <div className="pin-res">
            <Options
              options={options}
              setModel={setModel}
              icon={<LuAtom size={20} color="#a3a3a3" />}
            />
          </div>
          <div className="conversation-search-bar">
            <LuSearch size={16} color="#a3a3a3" />
            <input
              type="text"
              className="conversation-search-input"
              placeholder="Search"
            />
          </div>
          <p className="conversation-title">{model}</p>
          <div className="share">
            <LuShare size={16} color="#a3a3a3" />
          </div>
        </div>

        <div className="conversation-screen">
          {conversations.map((msg, i) => (
            <Box
              key={i}
              className={msg.from === "user" ? "user-message" : "bot-message"}
              mb="3"
              p="3"
              borderRadius="lg"
              bg={msg.from === "user" ? "#6a0dad" : "#2b2b2b"}
              color={msg.from === "user" ? "#fff" : "#e0e0e0"}
              maxW="75%"
              alignSelf={msg.from === "user" ? "flex-end" : "flex-start"}
              sx={{
                wordBreak: "break-word",
                overflowWrap: "break-word",
                whiteSpace: "pre-wrap",
              }}
            >
              <Box className="messages">
                <ReactMarkdown
                  rehypePlugins={rehypeSanitize}
                  remarkPlugins={remarkGFM}
                  components={{
                    table: ({ node, ...props }) => (
                      <div style={{ overflowX: "auto" }}>
                        <table
                          {...props}
                          style={{ borderCollapse: "collapse", width: "100%" }}
                        />
                      </div>
                    ),
                    th: ({ node, ...props }) => (
                      <th
                        {...props}
                        style={{
                          border: "1px solid #444",
                          padding: "6px",
                          background: "#2b2b2b",
                        }}
                      />
                    ),
                    td: ({ node, ...props }) => (
                      <td
                        {...props}
                        style={{ border: "1px solid #444", padding: "6px" }}
                      />
                    ),
                  }}
                >
                  {msg.text}
                </ReactMarkdown>
                {msg.image && (
                  <img
                    src={msg.image}
                    alt="generated"
                    style={{
                      width: "100%",
                      maxWidth: "525px",
                      height: "auto",
                      borderRadius: "8px",
                      objectFit: "contain",
                      display: "block",
                      margin: "0 auto",
                    }}
                  />
                )}
              </Box>
            </Box>
          ))}

          {loading && (
            <Box
              className="typing-indicator"
              maxW="30%"
            >
              <ColorSkeleton />
            </Box>
          )}

          <div ref={conversationRef} />
        </div>

        <div className="conversation-tools">
          <div className="conversation-tool-group">
            <div className="conversation-tool">
              <LuCopy size={20} color="#a3a3a3" />
            </div>
            <div className="conversation-tool">
              <LuThumbsUp size={20} color="#a3a3a3" />
            </div>
            <div className="conversation-tool">
              <LuThumbsDown size={20} color="#a3a3a3" />
            </div>
            <div className="conversation-tool">
              <LuFileAudio size={20} color="#a3a3a3" />
            </div>
            <div className="conversation-tool">
              <LuRedo size={20} color="#a3a3a3" />
            </div>
            <div className="conversation-tool">
              <LuPin size={20} color="#a3a3a3" />
            </div>
            <div className="conversation-tool">
              <LuShare size={20} color="#a3a3a3" />
            </div>
          </div>

          <p className="time-of-conversation">2 minutes ago</p>
        </div>

        <div className="conversation-input-container">
          <div className="conversation-input-tools">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                maxWidth: "1280px",
                width: "100%",
              }}
            >
              <img src={MagicPen} alt="magic-pen" className="magic-pen" />
              <input
                value={prompt}
                type="text"
                placeholder="Type a message..."
                className="conversation-input"
                onChange={(e) => setPrompt(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleChat()}
              />
            </div>

            <div className="pin" onClick={handleChat}>
              <LuSend size={20} color="#a3a3a3" />
            </div>
          </div>

          <div className="conversation-input-options">
            <div className="conversation-input-group-1">
              <div className="attach-option">
                <LuPaperclip size={20} color="#525252" />
              </div>
              <div className="image-option">
                <LuImage size={20} color="#525252" />
              </div>
            </div>

            <div className="conversation-input-group-2">
              <div className="audio-option">
                <LuMic size={20} color="#525252" />
              </div>
            </div>
          </div>
        </div>
      </article>

      <article className="mode">
        <div className="theme">
          <LuSun size={32} color="#a3a3a3" />
          
        </div>

        <div>
          <div className="pin">
            <LuPin size={20} color="#a3a3a3" />
          </div>

          <div className="pin">
            <Options
              options={options}
              setModel={setModel}
              icon={<LuAtom size={20} color="#a3a3a3" />}
            />
          </div>
        </div>

        <div className="upgrade">
          <LuSettings size={20} color="#a3a3a3" /><ColorModeButton />
        </div>
      </article>
    </section>
  );
}

export default MainPage;
