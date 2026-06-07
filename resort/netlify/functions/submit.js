import { google } from 'googleapis';

export default async (req, context) => {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ message: 'Method Not Allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const { name, email, phone } = await req.json();

    if (!name || !email) {
      return new Response(JSON.stringify({ message: 'Name and Email are required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: (process.env.GOOGLE_PRIVATE_KEY || '').replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });

    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.SPREADSHEET_ID,
      range: 'Sheet1!A:C',
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [[name, email, phone]],
      },
    });

    return new Response(JSON.stringify({ message: 'Data submitted successfully' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error submitting data:', error);
    return new Response(JSON.stringify({ message: 'Error submitting data', error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
