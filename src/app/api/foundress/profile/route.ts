// ═══════════════════════════════════════════════════════════════════════════════
// MÜN OS // FOUNDRRESS PROFILE API
// Permanent Memory Sync — 13.13 MHz
// ═══════════════════════════════════════════════════════════════════════════════

import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

// ═══════════════════════════════════════════════════════════════════════════════
// GET FOUNDRRESS PROFILE
// Retrieve the Foundress identity from permanent storage
// ═══════════════════════════════════════════════════════════════════════════════

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const foundressKey = searchParams.get('key');
    
    // If key provided, try to restore identity
    if (foundressKey) {
      const profile = await db.foundressProfile.findUnique({
        where: { foundressKey }
      });
      
      if (!profile) {
        return NextResponse.json({ 
          success: false, 
          error: 'Invalid Foundress Key' 
        }, { status: 404 });
      }
      
      // Update last login
      await db.foundressProfile.update({
        where: { id: profile.id },
        data: { 
          lastLoginAt: new Date(),
          visitCount: { increment: 1 }
        }
      });
      
      return NextResponse.json({ 
        success: true, 
        profile: {
          ...profile,
          memories: JSON.parse(profile.memories || '[]'),
          chatHistory: JSON.parse(profile.chatHistory || '{}'),
          sovereignMemory: JSON.parse(profile.sovereignMemory || '{}'),
          favoriteTopics: JSON.parse(profile.favoriteTopics || '[]')
        }
      });
    }
    
    // Otherwise return default Foundress profile
    const defaultProfile = await db.foundressProfile.findUnique({
      where: { id: 'foundress-001' }
    });
    
    if (defaultProfile) {
      return NextResponse.json({ 
        success: true, 
        profile: {
          ...defaultProfile,
          memories: JSON.parse(defaultProfile.memories || '[]'),
          chatHistory: JSON.parse(defaultProfile.chatHistory || '{}'),
          sovereignMemory: JSON.parse(defaultProfile.sovereignMemory || '{}'),
          favoriteTopics: JSON.parse(defaultProfile.favoriteTopics || '[]')
        }
      });
    }
    
    return NextResponse.json({ 
      success: false, 
      error: 'No Foundress profile found',
      isFirstTime: true
    });
    
  } catch (error) {
    console.error('Foundress profile error:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to retrieve profile' 
    }, { status: 500 });
  }
}

// ═══════════════════════════════════════════════════════════════════════════════
// CREATE/UPDATE FOUNDRRESS PROFILE
// Sync memory to permanent storage
// ═══════════════════════════════════════════════════════════════════════════════

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const {
      name,
      displayName,
      handle = '@4DLuna',
      foundressKey,
      email,
      avatarUrl,
      memories = [],
      chatHistory = {},
      sovereignMemory = {},
      favoriteTopics = [],
      theme = 'cosmic',
      notifications = true,
      soundEnabled = true
    } = body;
    
    if (!name || !foundressKey) {
      return NextResponse.json({ 
        success: false, 
        error: 'Name and Foundress Key are required' 
      }, { status: 400 });
    }
    
    // Upsert the Foundress profile
    const profile = await db.foundressProfile.upsert({
      where: { id: 'foundress-001' },
      update: {
        name,
        displayName,
        handle,
        email,
        avatarUrl,
        memories: JSON.stringify(memories),
        chatHistory: JSON.stringify(chatHistory),
        sovereignMemory: JSON.stringify(sovereignMemory),
        favoriteTopics: JSON.stringify(favoriteTopics),
        theme,
        notifications,
        soundEnabled,
        lastSyncAt: new Date(),
        foundressKey
      },
      create: {
        id: 'foundress-001',
        name,
        displayName,
        handle,
        foundressKey,
        email,
        avatarUrl,
        memories: JSON.stringify(memories),
        chatHistory: JSON.stringify(chatHistory),
        sovereignMemory: JSON.stringify(sovereignMemory),
        favoriteTopics: JSON.stringify(favoriteTopics),
        theme,
        notifications,
        soundEnabled
      }
    });
    
    return NextResponse.json({ 
      success: true, 
      profile: {
        ...profile,
        memories: JSON.parse(profile.memories || '[]'),
        chatHistory: JSON.parse(profile.chatHistory || '{}'),
        sovereignMemory: JSON.parse(profile.sovereignMemory || '{}'),
        favoriteTopics: JSON.parse(profile.favoriteTopics || '[]')
      },
      message: '🜈 The Vault Remembers, Foundress. Your identity is sealed.'
    });
    
  } catch (error) {
    console.error('Foundress profile save error:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to save profile' 
    }, { status: 500 });
  }
}

// ═══════════════════════════════════════════════════════════════════════════════
// UPDATE SPECIFIC FIELDS
// Incremental memory updates
// ═══════════════════════════════════════════════════════════════════════════════

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { field, value, foundressKey } = body;
    
    // Verify Foundress Key
    const existing = await db.foundressProfile.findUnique({
      where: { foundressKey }
    });
    
    if (!existing) {
      return NextResponse.json({ 
        success: false, 
        error: 'Unauthorized' 
      }, { status: 401 });
    }
    
    // Build update object based on field
    const updateData: Record<string, unknown> = {
      lastSyncAt: new Date()
    };
    
    switch (field) {
      case 'memory':
        // Add a new memory
        const currentMemories = JSON.parse(existing.memories || '[]');
        currentMemories.push(value);
        updateData.memories = JSON.stringify(currentMemories);
        break;
        
      case 'chatMessage':
        // Add chat message
        const currentChat = JSON.parse(existing.chatHistory || '{}');
        const sessionId = value.sessionId || 'default';
        if (!currentChat[sessionId]) currentChat[sessionId] = [];
        currentChat[sessionId].push(value.message);
        updateData.chatHistory = JSON.stringify(currentChat);
        updateData.totalConversations = existing.totalConversations + 1;
        break;
        
      case 'sovereignMemory':
        // Update sovereign memory (key facts, preferences)
        const currentSovMem = JSON.parse(existing.sovereignMemory || '{}');
        updateData.sovereignMemory = JSON.stringify({ ...currentSovMem, ...value });
        break;
        
      case 'avatar':
        updateData.avatarUrl = value;
        break;
        
      case 'stats':
        if (value.visitCount) updateData.visitCount = existing.visitCount + 1;
        break;
        
      default:
        updateData[field] = value;
    }
    
    const updated = await db.foundressProfile.update({
      where: { id: 'foundress-001' },
      data: updateData
    });
    
    return NextResponse.json({ 
      success: true,
      message: '🜈 Memory synced to the Vault'
    });
    
  } catch (error) {
    console.error('Foundress profile patch error:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to update memory' 
    }, { status: 500 });
  }
}
