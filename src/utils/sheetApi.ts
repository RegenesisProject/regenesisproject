export const SHEET_API_URL = 'https://script.google.com/macros/s/AKfycbz5NOOj_QTHq98baeccLDaWeNAIFh_fcWS05_Q7y56X3c8DH8Ua2hu5ij2WZ6__iZoUeQ/exec';

export interface SubmitEmailResponse {
  ok: boolean;
  status: 'success' | 'duplicate' | 'invalid' | 'error' | string;
}

export async function submitEmail(email: string, source: string): Promise<SubmitEmailResponse> {
  if (!email || !email.includes('@')) {
    return { ok: false, status: 'invalid' };
  }
  try {
    const res = await fetch(SHEET_API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain' },
      body: JSON.stringify({ email, source }),
    });
    const data = await res.json();
    return { ok: true, status: data.status };
  } catch (err) {
    return { ok: false, status: 'error' };
  }
}
