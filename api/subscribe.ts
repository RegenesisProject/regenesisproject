import type { IncomingMessage, ServerResponse } from 'http';

const BREVO_API_URL = 'https://api.brevo.com/v3';
const VALID_LIST_IDS = [6, 7, 8, 9, 10];

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

  const rawListId = Number(body?.listId);
  if (!VALID_LIST_IDS.includes(rawListId)) {
    return res.status(400).json({
      ok: false,
      status: 'invalid',
      message: `Invalid list ID. Must be one of: ${VALID_LIST_IDS.join(', ')}`,
    });
  }

  const email = rawEmail.toLowerCase();
  const listId = rawListId;

  // Extract contact attributes from body or explicit attributes map
  const attributes: Record<string, string> = {};

  // 1. First and Last Name
  let firstName = typeof body?.firstName === 'string' ? body.firstName.trim() : '';
  let lastName = typeof body?.lastName === 'string' ? body.lastName.trim() : '';
  const rawName = typeof body?.name === 'string' ? body.name.trim() : '';

  if (rawName && !firstName && !lastName) {
    const parts = rawName.split(/\s+/);
    firstName = parts[0] || '';
    lastName = parts.slice(1).join(' ') || '';
  }

  if (firstName) attributes.FIRSTNAME = firstName;
  if (lastName) attributes.LASTNAME = lastName;

  // 2. Company / Organization
  const company = (typeof body?.company === 'string' ? body.company.trim() : '') ||
    (typeof body?.attributes?.COMPANY === 'string' ? body.attributes.COMPANY.trim() : '');
  const organization = (typeof body?.organization === 'string' ? body.organization.trim() : '') ||
    (typeof body?.attributes?.ORGANIZATION === 'string' ? body.attributes.ORGANIZATION.trim() : '');

  if (company) attributes.COMPANY = company;
  if (organization) attributes.ORGANIZATION = organization;
  // Cross-fill if only one is provided
  if (company && !attributes.ORGANIZATION) attributes.ORGANIZATION = company;
  if (organization && !attributes.COMPANY) attributes.COMPANY = organization;

  // 3. Inquiry Type (Text) & Inquiry Type Category (Category)
  const inquiryType = (typeof body?.inquiryType === 'string' ? body.inquiryType.trim() : '') ||
    (typeof body?.attributes?.INQUIRY_TYPE === 'string' ? body.attributes.INQUIRY_TYPE.trim() : '');
  if (inquiryType) {
    attributes.INQUIRY_TYPE = inquiryType;

    const inquiryLower = inquiryType.toLowerCase();
    if (inquiryLower.includes('keynote') || inquiryLower.includes('speaking')) {
      attributes.INQUIRY_TYPE_CATEGORY = 'Keynote Booking / Speaking';
    } else if (inquiryLower.includes('media') || inquiryLower.includes('podcast')) {
      attributes.INQUIRY_TYPE_CATEGORY = 'Media & Podcast Interview';
    } else if (inquiryLower.includes('working')) {
      attributes.INQUIRY_TYPE_CATEGORY = 'Working With Thomas';
    } else if (inquiryLower.includes('something') || inquiryLower.includes('else')) {
      attributes.INQUIRY_TYPE_CATEGORY = 'Something Else';
    } else {
      attributes.INQUIRY_TYPE_CATEGORY = inquiryType;
    }
  }
  if (typeof body?.attributes?.INQUIRY_TYPE_CATEGORY === 'string' && body.attributes.INQUIRY_TYPE_CATEGORY.trim()) {
    attributes.INQUIRY_TYPE_CATEGORY = body.attributes.INQUIRY_TYPE_CATEGORY.trim();
  }

  // 4. Message & Event Details
  const message = (typeof body?.message === 'string' ? body.message.trim() : '') ||
    (typeof body?.notes === 'string' ? body.notes.trim() : '') ||
    (typeof body?.attributes?.MESSAGE === 'string' ? body.attributes.MESSAGE.trim() : '');
  if (message) attributes.MESSAGE = message;

  const eventDetails = (typeof body?.eventDetails === 'string' ? body.eventDetails.trim() : '') ||
    (typeof body?.notes === 'string' ? body.notes.trim() : '') ||
    (typeof body?.attributes?.EVENT_DETAILS === 'string' ? body.attributes.EVENT_DETAILS.trim() : '');
  if (eventDetails) attributes.EVENT_DETAILS = eventDetails;

  // 5. Event Type (Text) & Event Type Category (Category) & Event Date
  const eventType = (typeof body?.eventType === 'string' ? body.eventType.trim() : '') ||
    (typeof body?.attributes?.EVENT_TYPE === 'string' ? body.attributes.EVENT_TYPE.trim() : '');
  if (eventType) {
    attributes.EVENT_TYPE = eventType;

    const eventLower = eventType.toLowerCase();
    if (eventLower.includes('conference')) {
      attributes.EVENT_TYPE_CATEGORY = 'Conference';
    } else if (eventLower.includes('leadership') || eventLower.includes('offsite')) {
      attributes.EVENT_TYPE_CATEGORY = 'Leadership offsite';
    } else if (eventLower.includes('accelerator') || eventLower.includes('founder')) {
      attributes.EVENT_TYPE_CATEGORY = 'Accelerator or founder program';
    } else if (eventLower.includes('sales') || eventLower.includes('team')) {
      attributes.EVENT_TYPE_CATEGORY = 'Sales team event';
    } else if (eventLower.includes('other')) {
      attributes.EVENT_TYPE_CATEGORY = 'Other';
    } else {
      attributes.EVENT_TYPE_CATEGORY = eventType;
    }
  }
  if (typeof body?.attributes?.EVENT_TYPE_CATEGORY === 'string' && body.attributes.EVENT_TYPE_CATEGORY.trim()) {
    attributes.EVENT_TYPE_CATEGORY = body.attributes.EVENT_TYPE_CATEGORY.trim();
  }

  const eventDate = (typeof body?.eventDate === 'string' ? body.eventDate.trim() : '') ||
    (typeof body?.attributes?.EVENT_DATE === 'string' ? body.attributes.EVENT_DATE.trim() : '');
  if (eventDate) attributes.EVENT_DATE = eventDate;

  const apiKey = process.env.BREVO_API_KEY;
  if (!apiKey) {
    console.error('BREVO_API_KEY environment variable is not configured on the server.');
    return res.status(500).json({
      ok: false,
      status: 'error',
      message: 'Server configuration error: Brevo service is not configured.',
    });
  }

  try {
    // 1. Prepare creation payload: include validated attributes
    const createPayload: any = {
      email,
      listIds: [listId],
      updateEnabled: false,
    };

    if (Object.keys(attributes).length > 0) {
      createPayload.attributes = attributes;
    }

    // 2. Attempt to create the contact and attach to the target Brevo list
    const createRes = await fetch(`${BREVO_API_URL}/contacts`, {
      method: 'POST',
      headers: {
        'api-key': apiKey,
        'Content-Type': 'application/json',
        'accept': 'application/json',
      },
      body: JSON.stringify(createPayload),
    });

    if (createRes.ok || createRes.status === 201) {
      return res.status(200).json({
        ok: true,
        status: 'success',
        message: 'Successfully subscribed to the list.',
      });
    }

    const createData: any = await createRes.json().catch(() => ({}));

    // 3. Handle existing contact in Brevo (duplicate_parameter)
    if (createRes.status === 400 && createData?.code === 'duplicate_parameter') {
      // Check existing contact's list memberships
      const getRes = await fetch(`${BREVO_API_URL}/contacts/${encodeURIComponent(email)}`, {
        method: 'GET',
        headers: {
          'api-key': apiKey,
          'accept': 'application/json',
        },
      });

      let isAlreadyInList = false;
      if (getRes.ok) {
        const contactInfo: any = await getRes.json().catch(() => ({}));
        const existingListIds: number[] = Array.isArray(contactInfo?.listIds) ? contactInfo.listIds : [];
        isAlreadyInList = existingListIds.includes(listId);
      }

      // If not yet in this list, add the contact to the target list
      if (!isAlreadyInList) {
        const addToListRes = await fetch(
          `${BREVO_API_URL}/contacts/lists/${listId}/contacts/add`,
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

        if (!addToListRes.ok && addToListRes.status !== 201 && addToListRes.status !== 204) {
          const addData: any = await addToListRes.json().catch(() => ({}));
          console.error(`Failed to add existing Brevo contact to list ID ${listId}:`, addToListRes.status, addData);
        }
      }

      // Update attributes without overwriting with blanks
      if (Object.keys(attributes).length > 0) {
        await fetch(`${BREVO_API_URL}/contacts/${encodeURIComponent(email)}`, {
          method: 'PUT',
          headers: {
            'api-key': apiKey,
            'Content-Type': 'application/json',
            'accept': 'application/json',
          },
          body: JSON.stringify({
            attributes,
          }),
        }).catch((err) => {
          console.error('Error updating existing contact attributes in Brevo:', err);
        });
      }

      if (isAlreadyInList) {
        return res.status(200).json({
          ok: true,
          status: 'duplicate',
          message: "You're already on the list.",
        });
      }

      return res.status(200).json({
        ok: true,
        status: 'success',
        message: 'Successfully subscribed to the list.',
      });
    }

    // 4. Any other Brevo API failure
    console.error('Brevo API contacts creation error:', createRes.status, createData);
    return res.status(createRes.status >= 500 ? 502 : 400).json({
      ok: false,
      status: 'error',
      message: 'Failed to subscribe to the list.',
    });
  } catch (err: any) {
    console.error('Error contacting Brevo API:', err?.message || err);
    return res.status(500).json({
      ok: false,
      status: 'error',
      message: 'Unable to communicate with the subscription service.',
    });
  }
}
