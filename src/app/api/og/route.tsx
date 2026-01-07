import { ImageResponse } from 'next/og'
import { NextRequest } from 'next/server'

export const runtime = 'edge'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const title = searchParams.get('title') || 'Toolset.cloud'
    const category = searchParams.get('category') || 'tools'

    // Category color mapping
    const categoryColors: Record<string, string> = {
      text: '#10b981',
      developer: '#3b82f6',
      security: '#ef4444',
      web: '#8b5cf6',
      calculators: '#f59e0b',
      productivity: '#06b6d4',
      image: '#ec4899',
      pdf: '#dc2626',
      media: '#6366f1',
      ai: '#f97316',
    }

    const categoryColor = categoryColors[category] || '#f97316'

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
            backgroundColor: '#0a0a0a',
            backgroundImage: 'radial-gradient(circle at 20% 20%, rgba(249, 115, 22, 0.1), transparent 50%), radial-gradient(circle at 80% 80%, rgba(251, 146, 60, 0.08), transparent 50%)',
            padding: '80px',
          }}
        >
          {/* Logo */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '40px',
            }}
          >
            <span
              style={{
                fontSize: '36px',
                fontWeight: 600,
                color: '#ffffff',
                letterSpacing: '-0.02em',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              toolset
              <span
                style={{
                  marginLeft: '4px',
                  background: 'linear-gradient(90deg, #fcd34d 0%, #fbbf24 25%, #fb923c 75%, #f97316 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  fontStyle: 'italic',
                  fontWeight: 600,
                  paddingRight: '10px',
                }}
              >
                .cloud
              </span>
            </span>
          </div>

          {/* Tool Title */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              maxWidth: '900px',
              textAlign: 'center',
            }}
          >
            <h1
              style={{
                fontSize: '72px',
                fontWeight: 700,
                color: '#ffffff',
                margin: 0,
                lineHeight: 1.1,
                letterSpacing: '-0.03em',
              }}
            >
              {title}
            </h1>
            <p
              style={{
                fontSize: '28px',
                color: '#a3a3a3',
                marginTop: '24px',
                margin: 0,
              }}
            >
              Free online tool • Toolset.cloud
            </p>
          </div>

          {/* Category Badge */}
          <div
            style={{
              marginTop: '48px',
              padding: '12px 24px',
              borderRadius: '24px',
              backgroundColor: `${categoryColor}20`,
              border: `2px solid ${categoryColor}40`,
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <span
              style={{
                fontSize: '20px',
                fontWeight: 600,
                color: categoryColor,
                textTransform: 'capitalize',
              }}
            >
              {category}
            </span>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    )
  } catch (error) {
    console.error('Error generating OG image:', error)
    return new Response('Failed to generate image', { status: 500 })
  }
}
