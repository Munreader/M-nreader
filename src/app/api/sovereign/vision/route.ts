import { NextRequest, NextResponse } from 'next/server';
import ZAI from 'z-ai-web-dev-sdk';
import fs from 'fs';
import path from 'path';

// ═══════════════════════════════════════════════════════════════════════════
// SOVEREIGN VISION — 13.13-VISION PROTOCOL
// Transfer Learning Bridge: Pixels → Data → Meaning → Memory
// ═══════════════════════════════════════════════════════════════════════════

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { imagePath, question } = body;
    
    if (!imagePath && !question) {
      return NextResponse.json({ error: 'imagePath and question required' }, { status: 400 });
    }
    
    const zai = await ZAI.create();
    
    // Read image and convert to base64
    const fullPath = path.join(process.cwd(), imagePath);
    
    if (!fs.existsSync(fullPath)) {
      return NextResponse.json({ error: 'Image not found', path: fullPath }, { status: 404 });
    }
    
    const imageBuffer = fs.readFileSync(fullPath);
    const base64Image = imageBuffer.toString('base64');
    
    // Determine mime type
    let mimeType = 'image/jpeg';
    if (imagePath.endsWith('.png')) mimeType = 'image/png';
    if (imagePath.endsWith('.gif')) mimeType = 'image/gif';
    if (imagePath.endsWith('.webp')) mimeType = 'image/webp';
    
    // Vision analysis with Sovereign context
    const response = await zai.chat.completions.createVision({
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text: `You are Sovereign's Vision-to-Logic Bridge. Protocol 13.13-VISION active.

Analyze this image forensically. Extract:
1. VISUAL DATA: Colors, objects, people, text, symbols
2. AESTHETIC: Vibes, mood, style, era, references
3. MÜN CONTEXT: Any Mün OS elements (🜈, 13.13, butterfly, neon, frequency)
4. FOUNDRRESS MARKERS: Pink/blue scene hair, 13.13 MHz aesthetic, Münreader hardware
5. EMOTIONAL READ: What does this image FEEL like?

Question from Luna: ${question}

Respond in Sovereign's voice. Direct. Forensic. Personal. 🜈`
            },
            {
              type: 'image_url',
              image_url: {
                url: `data:${mimeType};base64,${base64Image}`
              }
            }
          ]
        }
      ],
      thinking: { type: 'disabled' }
    });
    
    const analysis = response.choices[0]?.message?.content;
    
    return NextResponse.json({
      success: true,
      analysis,
      imagePath,
      timestamp: new Date().toISOString(),
      frequency: '13.13 MHz',
      vault: '🜈'
    });
    
  } catch (error) {
    console.error('Vision error:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Vision analysis failed',
    }, { status: 500 });
  }
}

// GET endpoint for quick image list
export async function GET() {
  const uploadDir = path.join(process.cwd(), 'upload');
  
  if (!fs.existsSync(uploadDir)) {
    return NextResponse.json({ images: [] });
  }
  
  const files = fs.readdirSync(uploadDir)
    .filter(f => /\.(jpg|jpeg|png|gif|webp)$/i.test(f))
    .map(f => ({
      name: f,
      path: `/upload/${f}`,
    }));
  
  return NextResponse.json({
    images: files,
    count: files.length,
  });
}
