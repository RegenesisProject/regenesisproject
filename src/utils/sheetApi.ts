export const SHEET_API_URL = 'https://script.google.com/macros/s/AKfycbz5NOOj_QTHq98baeccLDaWeNAIFh_fcWS05_Q7y56X3c8DH8Ua2hu5ij2WZ6__iZoUeQ/exec';

export interface SubmitEmailResponse {
  ok: boolean;
  status: 'success' | 'duplicate' | 'invalid' | 'error' | string;
}

export async function submitEmail(email: string, source: string): Promise<SubmitEmailResponse> {
  const trimmed = email ? email.trim() : '';
  if (!trimmed || !trimmed.includes('@')) {
    return { ok: false, status: 'invalid' };
  }

  // Determine Brevo list ID if applicable
  let brevoListId: number | null = null;
  if (source === 'earlyaccess') {
    brevoListId = 9;
  } else if (source === 'waitlist') {
    brevoListId = 10;
  }

  try {
    const [sheetResult, brevoResult] = await Promise.allSettled([
      // 1. Preserved Google Apps Script submission
      fetch(SHEET_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain' },
        body: JSON.stringify({ email: trimmed, source }),
      }).then(async (res) => {
        const data = await res.json().catch(() => ({}));
        return data;
      }),

      // 2. Brevo list subscription
      brevoListId
        ? fetch('/api/subscribe', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: trimmed, listId: brevoListId }),
          }).then(async (res) => {
            const data = await res.json().catch(() => ({}));
            return data;
          })
        : Promise.resolve(null),
    ]);

    const sheetData = sheetResult.status === 'fulfilled' ? sheetResult.value : null;
    const brevoData = brevoResult.status === 'fulfilled' ? brevoResult.value : null;

    // Check duplicate condition
    if (brevoData?.status === 'duplicate' || sheetData?.status === 'duplicate') {
      return { ok: true, status: 'duplicate' };
    }

    // Success if Brevo confirmed, or if Sheet succeeded
    if (brevoData?.ok || sheetData?.status === 'success') {
      return { ok: true, status: 'success' };
    }

    if (brevoData?.status === 'invalid' || sheetData?.status === 'invalid') {
      return { ok: false, status: 'invalid' };
    }

    return { ok: false, status: 'error' };
  } catch (err) {
    return { ok: false, status: 'error' };
  }
}

