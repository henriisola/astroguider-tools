import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const body = await req.json();
  const code = body.code;

  const clientId = process.env.COGNITO_CLIENT_ID;
  const domain = process.env.COGNITO_DOMAIN;
  const redirect = process.env.COGNITO_REDIRECT;

  console.log("Loaded env:", { clientId, domain, redirect });

  if (!clientId || !domain || !redirect) {
    console.error('Missing environment variables:', { clientId, domain, redirect });
    return NextResponse.json({ error: 'Missing environment variables' }, { status: 500 });
  }

  const tokenRes = await fetch(`${domain}/oauth2/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      client_id: clientId,
      code,
      redirect_uri: redirect,
    }),
  });

  const text = await tokenRes.text();
  console.log("Raw token response:", text);

  try {
    const tokenData = JSON.parse(text);
    return NextResponse.json(tokenData);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to parse token response', raw: text }, { status: 500 });
  }
}
