import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { name, tel, message } = await request.json();
    
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;
    
    const text = `🆕 New Studio 36 Contact Request

Name: ${name}
Phone: ${tel}
Message: ${message}

---
Sent from Studio 36 website`;

    const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: text,
      }),
    });

    const result = await response.json();
    
    if (result.ok) {
      return NextResponse.json({ success: true });
    } else {
      throw new Error(result.description || 'Failed to send message');
    }
  } catch (error) {
    console.error('Telegram API Error:', error);
    return NextResponse.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    }, { status: 500 });
  }
}