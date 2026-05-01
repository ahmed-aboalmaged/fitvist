export default function WorkoutCard({ workout, style = {} }) {
  const difficultyColor = {
    Easy: 'bg-emerald-500/20 text-emerald-400',
    Medium: 'bg-yellow-500/20 text-yellow-400',
    Hard: 'bg-red-500/20 text-red-400',
  }

  return (
    <div
      className="relative rounded-2xl overflow-hidden glass group cursor-pointer
                 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-violet-900/30 animate-fade-in-up"
      style={style}
    >
      {/* Gradient header */}
      <div className={`h-28 bg-gradient-to-br ${workout.color} flex items-center justify-center relative`}>
        <span className="text-5xl drop-shadow-lg">{workout.emoji}</span>
        {workout.completed && (
          <span className="absolute top-3 right-3 bg-white/20 rounded-full px-2 py-0.5 text-xs text-white font-semibold">
            ✓ Done
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="font-bold text-white text-base leading-tight">{workout.title}</h3>
            <p className="text-white/50 text-xs mt-0.5">{workout.category}</p>
          </div>
          <span className={`text-xs px-2 py-1 rounded-full font-medium shrink-0 ${difficultyColor[workout.difficulty]}`}>
            {workout.difficulty}
          </span>
        </div>

        <div className="flex items-center gap-4 text-white/60 text-sm">
          <span>⏱ {workout.duration}</span>
          <span>🔥 {workout.calories} kcal</span>
          <span>📋 {workout.exercises} ex</span>
        </div>

        <button
          className={`w-full py-2 rounded-xl text-sm font-semibold transition-all duration-200
            ${workout.completed
              ? 'bg-white/10 text-white/50 cursor-default'
              : 'bg-violet-600/80 hover:bg-violet-600 text-white hover:shadow-lg hover:shadow-violet-900/40'
            }`}
        >
          {workout.completed ? 'Completed ✓' : 'Start Workout →'}
        </button>
      </div>
    </div>
  )
}
