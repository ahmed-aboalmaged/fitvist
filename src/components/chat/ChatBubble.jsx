export default function ChatBubble({ message }) {
  const isUser = message.role === 'user'

  return (
    <div className={`flex items-end gap-3 animate-fade-in-up ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
      {/* Avatar */}
      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm shrink-0
        ${isUser ? 'bg-violet-600' : 'bg-gradient-to-br from-pink-500 to-violet-600'}`}
      >
        {isUser ? '🧑' : '🤖'}
      </div>

      {/* Bubble */}
      <div className={`max-w-[75%] px-4 py-3 rounded-2xl text-sm leading-relaxed
        ${isUser
          ? 'bg-violet-600 text-white rounded-br-sm'
          : 'glass text-white/90 rounded-bl-sm'
        }`}
      >
        {message.content}
        <div className={`text-xs mt-1 ${isUser ? 'text-violet-200' : 'text-white/30'}`}>
          {message.timestamp}
        </div>
      </div>
    </div>
  )
}
