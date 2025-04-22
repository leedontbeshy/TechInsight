interface RatingBarProps {
    score: number
    label: string
    maxScore?: number
  }
  
  export default function RatingBar({ score, label, maxScore = 10 }: RatingBarProps) {
    const percentage = (score / maxScore) * 100
  
    // Determine color based on score
    let barColor = "bg-red-500"
    if (score >= maxScore * 0.7) {
      barColor = "bg-green-500"
    } else if (score >= maxScore * 0.5) {
      barColor = "bg-yellow-500"
    }
  
    return (
      <div className="mb-3">
        <div className="flex justify-between mb-1">
          <span className="text-sm font-medium">{label}</span>
          <span className="text-sm font-medium">
            {score}/{maxScore}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div className={`h-2.5 rounded-full ${barColor}`} style={{ width: `${percentage}%` }}></div>
        </div>
      </div>
    )
  }
  