"use client"
const AnimatedSphere = () => {
    return (
      <div className="relative w-64 h-64 max-w-full">
        <div className="absolute inset-0 rounded-full overflow-hidden">
          {/* Base sphere with color switching layers */}
          <div className="relative w-full h-full">
            {/* Glow effect container */}
            <div className="glow-container absolute inset-0 rounded-full" />
            
            {/* First state (0-180 degrees) */}
            <div className="absolute inset-0">
              {/* Left side (Yin - B&W) */}
              <div 
                className="absolute inset-0"
                style={{
                  clipPath: 'polygon(0 0, 50% 0, 50% 100%, 0 100%)'
                }}
              >
                <img 
                  src="/sideguy.png" 
                  alt="Left half" 
                  className="w-full h-full object-cover grayscale"
                />
              </div>
  
              {/* Right side (Yang - Color) */}
              <div 
                className="absolute inset-0"
                style={{
                  clipPath: 'polygon(50% 0, 100% 0, 100% 100%, 50% 100%)'
                }}
              >
                <img 
                  src="/sideguy.png" 
                  alt="Right half" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
  
            {/* Second state (180-360 degrees) - colors reversed */}
            <div 
              className="absolute inset-0"
              style={{
                opacity: 0,
                animation: 'colorSwitch 4s linear infinite'
              }}
            >
              {/* Left side (Yang - Color) */}
              <div 
                className="absolute inset-0"
                style={{
                  clipPath: 'polygon(0 0, 50% 0, 50% 100%, 0 100%)'
                }}
              >
                <img 
                  src="/sideguy.png"
                  alt="Left half" 
                  className="w-full h-full object-cover"
                />
              </div>
  
              {/* Right side (Yin - B&W) */}
              <div 
                className="absolute inset-0"
                style={{
                  clipPath: 'polygon(50% 0, 100% 0, 100% 100%, 50% 100%)'
                }}
              >
                <img 
                  src="/sideguy.png" 
                  alt="Right half" 
                  className="w-full h-full object-cover grayscale"
                />
              </div>
            </div>
  
            {/* Radar Overlay */}
            <div className="radar-sweep absolute inset-0">
              {/* Particle trails */}
              <div className="particles absolute inset-0">
                {[...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    className={`particle-${i} absolute w-1 h-1 bg-gradient-to-r from-gray-200 to-green-200 rounded-full opacity-0`}
                  />
                ))}
              </div>
            </div>
            
            {/* Center point pulse */}
            <div className="center-point absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-ping" />
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  // Add animations
  if (typeof document !== 'undefined') {
    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
      @keyframes colorSwitch {
        0% { opacity: 0; }
        24.99% { opacity: 0; }
        25% { opacity: 1; }
        74.99% { opacity: 1; }
        75% { opacity: 0; }
      }
  
      .radar-sweep {
        animation: radarSweep 4s linear infinite;
      }
  
      .radar-sweep::before {
        content: '';
        position: absolute;
        width: 50%;
        height: 100%;
        top: 0;
        left: 50%;
        transform-origin: left;
        background: linear-gradient(90deg, 
            rgba(75, 85, 99, 0) 0%,
            rgba(34, 197, 94, 0.4) 50%,
            rgba(75, 85, 99, 0) 100%
        );
        filter: blur(5px);
        pointer-events: none;
      }
  
      .glow-container::before {
        content: '';
        position: absolute;
        inset: -2px;
        background: radial-gradient(circle at var(--x, 50%) var(--y, 50%), 
          rgba(96, 165, 200, 0.3) 0%,
          rgba(96, 165, 200, 0) 60%
        );
        animation: moveGlow 4s linear infinite;
      }
  
      @keyframes moveGlow {
        0% { --x: 50%; --y: 0%; }
        25% { --x: 100%; --y: 50%; }
        50% { --x: 50%; --y: 100%; }
        75% { --x: 0%; --y: 50%; }
        100% { --x: 50%; --y: 0%; }
      }
  
      @keyframes radarSweep {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }
  
      /* Particle animations */
      .particles div {
        animation: particleFade 1s ease-out infinite;
      }
  
      ${[...Array(8)].map((_, i) => `
        .particle-${i} {
          left: 50%;
          top: 50%;
          transform: rotate(${i * 45}deg) translateY(${20 + (i % 3) * 10}px);
          animation-delay: ${i * 0.5}s !important;
        }
      `).join('')}
  
      @keyframes particleFade {
        0% {
          opacity: 0;
          transform: scale(0);
        }
        20% {
          opacity: 0.8;
          transform: scale(1);
        }
        100% {
          opacity: 0;
          transform: scale(1.5);
        }
      }
    `;
    document.head.appendChild(styleSheet);
  }
  
  export default AnimatedSphere;