import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Toolset.cloud - Your workspace for repeatable tasks'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#0A0A0A',
          backgroundImage: 'radial-gradient(circle at 20% 20%, rgba(255, 140, 66, 0.08) 0%, transparent 38%), radial-gradient(circle at 80% 0%, rgba(255, 184, 122, 0.06) 0%, transparent 32%)',
        }}
      >
        {/* Main content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '80px',
          }}
        >
          {/* Logo/Title */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '40px',
            }}
          >
            <span
              style={{
                fontSize: 72,
                fontWeight: 600,
                color: '#FFFFFF',
                letterSpacing: '-0.02em',
              }}
            >
              toolset
            </span>
            <span
              style={{
                fontSize: 72,
                fontWeight: 600,
                fontStyle: 'italic',
                background: 'linear-gradient(to right, #FCD34D, #FBBF24, #FB923C)',
                backgroundClip: 'text',
                color: 'transparent',
                marginLeft: '8px',
              }}
            >
              .cloud
            </span>
          </div>

          {/* Tagline */}
          <div
            style={{
              fontSize: 42,
              fontWeight: 500,
              color: '#E5E5E5',
              textAlign: 'center',
              lineHeight: 1.3,
              maxWidth: '900px',
              marginBottom: '24px',
            }}
          >
            Your workspace for repeatable tasks
          </div>

          {/* Description */}
          <div
            style={{
              fontSize: 24,
              color: '#A1A1A1',
              textAlign: 'center',
              maxWidth: '800px',
              lineHeight: 1.5,
            }}
          >
            Pick up where you left off. Run the same task again without redoing the setup.
          </div>

          {/* Stats bar */}
          <div
            style={{
              display: 'flex',
              gap: '48px',
              marginTop: '48px',
              borderTop: '1px solid rgba(255, 140, 66, 0.2)',
              paddingTop: '32px',
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <span
                style={{
                  fontSize: 32,
                  fontWeight: 600,
                  color: '#FF8C42',
                }}
              >
                38+ Tools
              </span>
              <span
                style={{
                  fontSize: 16,
                  color: '#737373',
                  marginTop: '4px',
                }}
              >
                & growing
              </span>
            </div>
            <div
              style={{
                width: '1px',
                height: '60px',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
              }}
            />
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <span
                style={{
                  fontSize: 32,
                  fontWeight: 600,
                  color: '#FF8C42',
                }}
              >
                12,000+
              </span>
              <span
                style={{
                  fontSize: 16,
                  color: '#737373',
                  marginTop: '4px',
                }}
              >
                Active users
              </span>
            </div>
            <div
              style={{
                width: '1px',
                height: '60px',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
              }}
            />
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <span
                style={{
                  fontSize: 32,
                  fontWeight: 600,
                  color: '#FF8C42',
                }}
              >
                Secure
              </span>
              <span
                style={{
                  fontSize: 16,
                  color: '#737373',
                  marginTop: '4px',
                }}
              >
                Client-side first
              </span>
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
