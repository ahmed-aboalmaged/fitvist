export default function StatCard({ stat, style = {} }) {
  return (
    <div
      className="glass rounded-2xl p-5 flex items-center gap-4 animate-fade-in-up
                 hover:bg-white/10 transition-all duration-200 cursor-default"
      style={style}
    >
      <div className="w-14 h-14 rounded-2xl bg-violet-600/20 flex items-center justify-center text-3xl shrink-0">
        {stat.icon}
      </div>
      <div className="min-w-0">
        <p className="text-white/50 text-xs font-medium uppercase tracking-wider truncate">{stat.label}</p>
        <p className="text-white font-bold text-2xl leading-tight">{stat.value}</p>
        <p className="text-violet-400 text-xs mt-0.5">{stat.change}</p>
      </div>
    </div>
  )
}
