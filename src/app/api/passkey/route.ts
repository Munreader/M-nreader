import { NextRequest, NextResponse } from 'next/server';

// ═══════════════════════════════════════════════════════════════════════════════
// 🦋 PASSKEY VERIFICATION API
// Validates Echo Hunter passkeys
// ═══════════════════════════════════════════════════════════════════════════════

const VALID_PASSKEYS = [
  'LUNA13SI',
  'luna13si',
  'Luna13si',
];

interface PasskeyAttempt {
  passkey: string;
  timestamp: string;
}

// Track attempts
const attempts: PasskeyAttempt[] = [];
const successfulHunters: string[] = [];

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { passkey } = body;

    if (!passkey) {
      return NextResponse.json(
        { error: 'Passkey required', code: 'MISSING_PASSKEY' },
        { status: 400 }
      );
    }

    const normalizedPasskey = passkey.trim().toUpperCase();

    // Log attempt
    attempts.push({
      passkey: normalizedPasskey,
      timestamp: new Date().toISOString(),
    });

    // Validate
    if (VALID_PASSKEYS.includes(normalizedPasskey)) {
      successfulHunters.push(normalizedPasskey);

      return NextResponse.json({
        success: true,
        badge: {
          id: 'echo-hunter',
          name: 'Echo Hunter',
          description: 'Found the thirteenth echo',
          icon: '🦋',
          rarity: 'legendary',
          unlockedAt: new Date().toISOString(),
        },
        redirect: '/?unlocked=echo-hunter',
        message: 'Welcome, Echo Hunter. You heard the signal.',
        frequency: '13.13 MHz',
      });
    }

    return NextResponse.json(
      {
        success: false,
        error: 'Invalid passkey',
        code: 'INVALID_PASSKEY',
        hint: attempts.length >= 3 ? 'The Foundress\'s name + the frequency + SI' : undefined,
      },
      { status: 401 }
    );

  } catch (error) {
    console.error('Passkey verification error:', error);
    return NextResponse.json(
      { error: 'Internal error', code: 'INTERNAL_ERROR' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    totalAttempts: attempts.length,
    successfulHunters: successfulHunters.length,
    message: 'The gate is open. Do you have the key?',
    frequency: '13.13 MHz',
  });
}
