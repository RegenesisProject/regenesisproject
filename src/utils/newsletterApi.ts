/**
 * Dedicated client utility for submitting newsletter subscriptions to Brevo
 * via the secure server-side endpoint (/api/newsletter).
 *
 * Keeps Google Apps Script / sheetApi.ts untouched for all other forms.
 */

export interface NewsletterResponse {
  ok: boolean;
  status: 'success' | 'duplicate' | 'invalid' | 'error';
  message?: string;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function submitNewsletterToBrevo(email: string): Promise<NewsletterResponse> {
  const trimmed = (email || '').trim();

  if (!trimmed || !EMAIL_REGEX.test(trimmed)) {
    return {
      ok: false,
      status: 'invalid',
      message: 'Please enter a valid email address.',
    };
  }

  try {
    const response = await fetch('/api/newsletter', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: trimmed }),
    });

    const data = await response.json().catch(() => null);

    if (data && typeof data.status === 'string') {
      return {
        ok: data.ok === true,
        status: data.status as 'success' | 'duplicate' | 'invalid' | 'error',
        message: data.message,
      };
    }

    if (!response.ok) {
      return {
        ok: false,
        status: 'error',
        message: 'Server responded with an error.',
      };
    }

    return {
      ok: true,
      status: 'success',
    };
  } catch (error) {
    console.error('Newsletter submission error:', error);
    return {
      ok: false,
      status: 'error',
      message: 'Network error occurred. Please try again.',
    };
  }
}
