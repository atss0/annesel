// app/api/comments/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { author_name, author_email, content, post, parent = 0 } = body;

    // Gerekli alanları kontrol et
    if (!author_name || !author_email || !content || !post) {
      return NextResponse.json(
        { error: 'Gerekli alanlar eksik' },
        { status: 400 }
      );
    }

    // WordPress API'ye yorum gönder
    const wordpressApiUrl = process.env.WORDPRESS_API_URL;
    const wordpressUsername = process.env.WORDPRESS_USERNAME; // WordPress kullanıcı adı
    const wordpressPassword = process.env.WORDPRESS_APP_PASSWORD; // WordPress uygulama şifresi

    if (!wordpressApiUrl || !wordpressUsername || !wordpressPassword) {
      return NextResponse.json(
        { error: 'WordPress API yapılandırması eksik' },
        { status: 500 }
      );
    }

    // Basic Auth için credentials oluştur
    const credentials = Buffer.from(`${wordpressUsername}:${wordpressPassword}`).toString('base64');

    const commentData = {
      author_name,
      author_email,
      content,
      post,
      parent: parent || 0,
      status: 'hold' // Yorumları moderasyon için bekletme durumunda tut
    };

    const response = await fetch(`${wordpressApiUrl}/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${credentials}`,
      },
      body: JSON.stringify(commentData),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('WordPress API Error:', errorData);
      return NextResponse.json(
        { error: 'Yorum gönderilemedi' },
        { status: response.status }
      );
    }

    const result = await response.json();
    return NextResponse.json({ success: true, comment: result });

  } catch (error) {
    console.error('Comment submission error:', error);
    return NextResponse.json(
      { error: 'Sunucu hatası' },
      { status: 500 }
    );
  }
}