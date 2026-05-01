export default function TypingIndicator() {
  return (
    <div className="flex items-end gap-3 animate-fade-in">
      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-500 to-violet-600
                      flex items-center justify-center text-sm shrink-0">
        🤖
      </div>
      <div className="glass px-4 py-3 rounded-2xl rounded-bl-sm">
        <div className="flex items-center gap-1 h-4">
          <span className="typing-dot" />
          <span className="typing-dot" />
          <span className="typing-dot" />
        </div>
      </div>
    </div>
  )
}
