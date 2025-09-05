"use client"

import { useState, useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom"
import { collection, query, where, onSnapshot, addDoc, orderBy, doc, getDoc } from "firebase/firestore"
import { db } from "../firebase"
import { useAuth } from "../contexts/AuthContext"

interface User {
  uid: string
  displayName: string
  role?: string
}

interface Chat {
  id: string
  participantIds: string[]
  createdAt: any
  lastMessageAt?: any
  jobId?: string
  jobTitle?: string
  jobInfo?: any
  otherParticipant?: User
  otherParticipantId?: string
}

interface Message {
  id: string
  senderId: string
  text: string
  timestamp: any
  isSystem?: boolean
}

export default function Chat() {
  const [chats, setChats] = useState<Chat[]>([])
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState("")
  const [loading, setLoading] = useState(true)
  const [sending, setSending] = useState(false)
  const [otherParticipant, setOtherParticipant] = useState<User | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { currentUser, userProfile } = useAuth()
  const navigate = useNavigate()

  // Scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Fetch user's chats
  useEffect(() => {
    if (!currentUser) return

    const chatsQuery = query(
      collection(db, "chats"),
      where("participantIds", "array-contains", currentUser.uid)
    )

    const unsubscribe = onSnapshot(chatsQuery, async (snapshot) => {
      const chatsData: Chat[] = []

      for (const docSnap of snapshot.docs) {
        const data = docSnap.data() as Omit<Chat, "id">
        const chatData: Chat = { id: docSnap.id, ...data }

        // Get other participant info
        const otherParticipantId = chatData.participantIds.find((id) => id !== currentUser.uid)
        if (otherParticipantId) {
          const otherUserDoc = await getDoc(doc(db, "users", otherParticipantId))
          if (otherUserDoc.exists()) {
            chatData.otherParticipant = otherUserDoc.data() as User
            chatData.otherParticipantId = otherParticipantId
          }
        }

        // Get job info if available
        if (chatData.jobId) {
          const jobDoc = await getDoc(doc(db, "jobs", chatData.jobId))
          if (jobDoc.exists()) {
            chatData.jobInfo = jobDoc.data()
          }
        }

        chatsData.push(chatData)
      }

      // Sort by most recent activity
      chatsData.sort((a, b) => {
        const aTime = a.lastMessageAt || a.createdAt
        const bTime = b.lastMessageAt || b.createdAt
        return bTime.toDate() - aTime.toDate()
      })

      setChats(chatsData)
      setLoading(false)

      if (chatsData.length > 0 && !selectedChat) {
        setSelectedChat(chatsData[0])
      }
    })

    return () => unsubscribe()
  }, [currentUser, selectedChat])

  // Fetch messages for selected chat
  useEffect(() => {
    if (!selectedChat) return

    const messagesQuery = query(
      collection(db, "chats", selectedChat.id, "messages"),
      orderBy("timestamp", "asc")
    )

    const unsubscribe = onSnapshot(messagesQuery, (snapshot) => {
      const messagesData: Message[] = snapshot.docs.map((docSnap) => {
        const data = docSnap.data() as Omit<Message, "id">
        return { id: docSnap.id, ...data }
      })
      setMessages(messagesData)
    })

    setOtherParticipant(selectedChat.otherParticipant || null)

    return () => unsubscribe()
  }, [selectedChat])

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMessage.trim() || !selectedChat || !currentUser) return

    try {
      setSending(true)
      await addDoc(collection(db, "chats", selectedChat.id, "messages"), {
        senderId: currentUser.uid,
        text: newMessage.trim(),
        timestamp: new Date(),
        isSystem: false,
      })
      setNewMessage("")
    } catch (error) {
      console.error("Error sending message:", error)
    } finally {
      setSending(false)
    }
  }

  const formatTime = (timestamp: any) => {
    if (!timestamp) return ""
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp)
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  const formatDate = (timestamp: any) => {
    if (!timestamp) return ""
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp)
    return date.toLocaleDateString()
  }

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Loading chats...</div>
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 pt-20 pb-20">
        <div className="space-y-2">
          {chats.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No conversations yet</h3>
              <p className="text-gray-600 mb-4">
                {userProfile?.role === "homeowner"
                  ? "Hire a worker to start a conversation."
                  : "Apply for jobs to start conversations with clients."}
              </p>
              <button
                onClick={() => navigate("/myjobs")}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium"
              >
                {userProfile?.role === "homeowner" ? "View Jobs" : "Browse Jobs"}
              </button>
            </div>
          ) : (
            <div className="bg-white shadow rounded-lg overflow-hidden" style={{ height: "600px" }}>
              <div className="flex h-full">
                {/* Chat List */}
                <div className="w-1/3 border-r border-gray-200 overflow-y-auto">
                  <div className="p-4 border-b border-gray-200">
                    <h2 className="text-lg font-medium text-gray-900">Conversations</h2>
                  </div>
                  <div className="divide-y divide-gray-200">
                    {chats.map((chat) => (
                      <button
                        key={chat.id}
                        onClick={() => setSelectedChat(chat)}
                        className={`w-full p-4 text-left hover:bg-gray-50 focus:outline-none focus:bg-gray-50 ${
                          selectedChat?.id === chat.id ? "bg-blue-50 border-r-2 border-blue-500" : ""
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="text-sm font-medium text-gray-900">
                            {chat.otherParticipant?.displayName || "Unknown User"}
                          </h3>
                          <span className="text-xs text-gray-500">
                            {formatTime(chat.lastMessageAt || chat.createdAt)}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 truncate">
                          {chat.jobTitle || chat.jobInfo?.title || "General conversation"}
                        </p>
                        {chat.jobInfo?.budget && <p className="text-xs text-green-600 mt-1">${chat.jobInfo.budget}</p>}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Chat Messages */}
                <div className="flex-1 flex flex-col">
                  {selectedChat ? (
                    <>
                      {/* Chat Header */}
                      <div className="p-4 border-b border-gray-200 bg-gray-50">
                        <div className="flex items-center justify-between">
                          <div>
                            <h2 className="text-lg font-medium text-gray-900">
                              {otherParticipant?.displayName || "Unknown User"}
                            </h2>
                            <p className="text-sm text-gray-600">
                              {selectedChat.jobTitle || selectedChat.jobInfo?.title || "General conversation"}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Messages */}
                      <div className="flex-1 overflow-y-auto p-4 space-y-4">
                        {messages.map((message, index) => {
                          const isOwnMessage = currentUser?.uid === message.senderId
                          const isSystem = message.isSystem || message.senderId === "system"
                          const showDate =
                            index === 0 || formatDate(message.timestamp) !== formatDate(messages[index - 1]?.timestamp)

                          return (
                            <div key={message.id}>
                              {showDate && (
                                <div className="text-center text-xs text-gray-500 my-4">
                                  {formatDate(message.timestamp)}
                                </div>
                              )}
                              <div
                                className={`flex ${
                                  isSystem ? "justify-center" : isOwnMessage ? "justify-end" : "justify-start"
                                }`}
                              >
                                <div
                                  className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                                    isSystem
                                      ? "bg-gray-100 text-gray-600 text-sm italic"
                                      : isOwnMessage
                                      ? "bg-blue-600 text-white"
                                      : "bg-gray-200 text-gray-900"
                                  }`}
                                >
                                  <p className="text-sm">{message.text}</p>
                                  {!isSystem && (
                                    <p className={`text-xs mt-1 ${isOwnMessage ? "text-blue-100" : "text-gray-500"}`}>
                                      {formatTime(message.timestamp)}
                                    </p>
                                  )}
                                </div>
                              </div>
                            </div>
                          )
                        })}
                        <div ref={messagesEndRef} />
                      </div>

                      {/* Message Input */}
                      <div className="p-4 border-t border-gray-200">
                        <form onSubmit={handleSendMessage} className="flex space-x-2">
                          <input
                            type="text"
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            placeholder="Type your message..."
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            disabled={sending}
                          />
                          <button
                            type="submit"
                            disabled={sending || !newMessage.trim()}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium disabled:opacity-50"
                          >
                            {sending ? "Sending..." : "Send"}
                          </button>
                        </form>
                      </div>
                    </>
                  ) : (
                    <div className="flex-1 flex items-center justify-center">
                      <p className="text-gray-500">Select a conversation to start messaging</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
