interface LogoProps {
  size?: 'sm' | 'md' | 'lg'
  showText?: boolean
}

export default function Logo({ size = 'md', showText = true }: LogoProps) {
  const dimensions = {
    sm: { width: 32, height: 32, text: 'text-lg' },
    md: { width: 40, height: 40, text: 'text-2xl' },
    lg: { width: 48, height: 48, text: 'text-3xl' }
  }

  const { width, height, text } = dimensions[size]

  return (
    <div className="flex items-center space-x-3">
      <div className={`flex items-center justify-center`} style={{ width, height }}>
        <svg
          width={width}
          height={height}
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-sm"
        >
          {/* Самовар корпус */}
          <ellipse
            cx="20"
            cy="25"
            rx="12"
            ry="10"
            fill="url(#samovarGradient)"
            stroke="#8B4513"
            strokeWidth="1"
          />
          
          {/* Самовар крышка */}
          <ellipse
            cx="20"
            cy="15"
            rx="8"
            ry="3"
            fill="url(#lidGradient)"
            stroke="#8B4513"
            strokeWidth="0.5"
          />
          
          {/* Труба */}
          <rect
            x="18.5"
            y="8"
            width="3"
            height="8"
            rx="1.5"
            fill="url(#pipeGradient)"
            stroke="#8B4513"
            strokeWidth="0.5"
          />
          
          {/* Краник */}
          <circle
            cx="32"
            cy="25"
            r="2"
            fill="url(#tapGradient)"
            stroke="#8B4513"
            strokeWidth="0.5"
          />
          <rect
            x="30"
            y="24"
            width="4"
            height="2"
            rx="1"
            fill="url(#tapGradient)"
            stroke="#8B4513"
            strokeWidth="0.5"
          />
          
          {/* Ручки */}
          <path
            d="M8 20 C5 20, 4 22, 4 25 C4 28, 5 30, 8 30"
            stroke="#8B4513"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M32 20 C35 20, 36 22, 36 25 C36 28, 35 30, 32 30"
            stroke="#8B4513"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
          />
          
          {/* Декоративные элементы */}
          <circle cx="15" cy="22" r="1" fill="#FFD700" opacity="0.7" />
          <circle cx="25" cy="22" r="1" fill="#FFD700" opacity="0.7" />
          <circle cx="20" cy="28" r="1" fill="#FFD700" opacity="0.7" />
          
          {/* Градиенты */}
          <defs>
            <linearGradient id="samovarGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FF6B6B" />
              <stop offset="50%" stopColor="#FF8E8E" />
              <stop offset="100%" stopColor="#FFB3B3" />
            </linearGradient>
            <linearGradient id="lidGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#45B7D1" />
              <stop offset="100%" stopColor="#6BC5D8" />
            </linearGradient>
            <linearGradient id="pipeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#DDA0DD" />
              <stop offset="100%" stopColor="#E6B8E6" />
            </linearGradient>
            <linearGradient id="tapGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFD700" />
              <stop offset="100%" stopColor="#FFF176" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      
      {showText && (
        <span className={`font-bold text-gray-800 ${text}`}>
          Карамельный чай
        </span>
      )}
    </div>
  )
}