import type { IncomingMessage, ServerResponse } from 'http';

const BREVO_API_URL = 'https://api.brevo.com/v3';
const NEWSLETTER_LIST_ID = 5;

// Standard RFC 5322 compatible email validation regex
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

interface VercelRequest extends IncomingMessage {
  body?: any;
  query?: Record<string, string | string[]>;
  cookies?: Record<string, string>;
  method?: string;
}

interface VercelResponse extends ServerResponse {
  status: (statusCode: number) => VercelResponse;
  json: (jsonBody: any) => VercelResponse;
  send?: (body: any) => VercelResponse;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Ensure status and json helper methods are present on res
  if (typeof res.status !== 'function') {
    res.status = function (code: number) {
      res.statusCode = code;
      return res;
    };
  }
  if (typeof res.json !== 'function') {
    res.json = function (data: any) {
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(data));
      return res;
    };
  }

  // Set secure CORS and content headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({
      ok: false,
      status: 'error',
      message: 'Method Not Allowed. Only POST is accepted.',
    });
  }

  // Parse body: handles pre-parsed body (Vercel) as well as raw stream (Vite/Node)
  let body: any = req.body;
  if (!body) {
    body = await new Promise((resolve) => {
      let rawData = '';
      req.on('data', (chunk) => {
        rawData += chunk;
      });
      req.on('end', () => {
        try {
          resolve(rawData ? JSON.parse(rawData) : {});
        } catch {
          resolve({});
        }
      });
      req.on('error', () => resolve({}));
    });
  } else if (typeof body === 'string') {
    try {
      body = JSON.parse(body);
    } catch {
      body = {};
    }
  }

  const rawEmail = typeof body?.email === 'string' ? body.email.trim() : '';

  if (!rawEmail || !EMAIL_REGEX.test(rawEmail)) {
    return res.status(400).json({
      ok: false,
      status: 'invalid',
      message: 'Please enter a valid email address.',
    });
  }

  const email = rawEmail.toLowerCase();
  const apiKey = process.env.BREVO_API_KEY;

  if (!apiKey) {
    console.error('BREVO_API_KEY environment variable is not configured on the server.');
    return res.status(500).json({
      ok: false,
      status: 'error',
      message: 'Server configuration error: newsletter service is not configured.',
    });
  }

  try {
    // 1. Attempt to create the contact and attach to Brevo Newsletter list ID 5
    const createRes = await fetch(`${BREVO_API_URL}/contacts`, {
      method: 'POST',
      headers: {
        'api-key': apiKey,
        'Content-Type': 'application/json',
        'accept': 'application/json',
      },
      body: JSON.stringify({
        email,
        listIds: [NEWSLETTER_LIST_ID],
        updateEnabled: false,
      }),
    });

    if (createRes.ok || createRes.status === 201) {
      return res.status(200).json({
        ok: true,
        status: 'success',
        message: 'Successfully subscribed to the newsletter.',
      });
    }

    const createData: any = await createRes.json().catch(() => ({}));

    // 2. Handle duplicate contact in Brevo
    if (createRes.status === 400 && createData?.code === 'duplicate_parameter') {
      // Check existing contact's list memberships
      const getRes = await fetch(`${BREVO_API_URL}/contacts/${encodeURIComponent(email)}`, {
        method: 'GET',
        headers: {
          'api-key': apiKey,
          'accept': 'application/json',
        },
      });

      if (getRes.ok) {
        const contactInfo: any = await getRes.json().catch(() => ({}));
        const existingListIds: number[] = Array.isArray(contactInfo?.listIds) ? contactInfo.listIds : [];

        // If contact is already in List 5, return duplicate status
        if (existingListIds.includes(NEWSLETTER_LIST_ID)) {
          return res.status(200).json({
            ok: true,
            status: 'duplicate',
            message: "You're already on the list.",
          });
        }
      }

      // 3. Contact exists in Brevo but is NOT yet on Newsletter list ID 5.
      // Add existing contact to list 5.
      const addToListRes = await fetch(
        `${BREVO_API_URL}/contacts/lists/${NEWSLETTER_LIST_ID}/contacts/add`,
        {
          method: 'POST',
          headers: {
            'api-key': apiKey,
            'Content-Type': 'application/json',
            'accept': 'application/json',
          },
          body: JSON.stringify({
            emails: [email],
          }),
        }
      );

      if (addToListRes.ok || addToListRes.status === 201 || addToListRes.status === 204) {
        return res.status(200).json({
          ok: true,
          status: 'success',
          message: 'Successfully subscribed to the newsletter.',
        });
      }

      const addData: any = await addToListRes.json().catch(() => ({}));
      console.error('Failed to add existing Brevo contact to list ID 5:', addToListRes.status, addData);

      return res.status(500).json({
        ok: false,
        status: 'error',
        message: 'Unable to add contact to newsletter list.',
      });
    }

    // 4. Any other Brevo API failure
    console.error('Brevo API contacts creation error:', createRes.status, createData);
    return res.status(createRes.status >= 500 ? 502 : 400).json({
      ok: false,
      status: 'error',
      message: 'Failed to subscribe to the newsletter.',
    });
  } catch (err: any) {
    console.error('Error contacting Brevo API:', err?.message || err);
    return res.status(500).json({
      ok: false,
      status: 'error',
      message: 'Unable to communicate with the newsletter service.',
    });
  }
}
