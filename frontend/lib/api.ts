const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000';

export async function apiGet<T>(path: string): Promise<{ data: T | null; error: string | null }> {
  try {
    const response = await fetch(`${BASE_URL}${path}`);
    if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
    const data = await response.json();
    return { data, error: null };
  } catch (err: any) {
    return { data: null, error: err.message };
  }
}

export async function apiPost<T>(path: string, body: any): Promise<{ data: T | null; error: string | null }> {
  try {
    const response = await fetch(`${BASE_URL}${path}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
    const data = await response.json();
    return { data, error: null };
  } catch (err: any) {
    return { data: null, error: err.message };
  }
}

export async function apiUpload<T>(path: string, formData: FormData): Promise<{ data: T | null; error: string | null }> {
  try {
    const response = await fetch(`${BASE_URL}${path}`, {
      method: 'POST',
      body: formData,
    });
    if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
    const data = await response.json();
    return { data, error: null };
  } catch (err: any) {
    return { data: null, error: err.message };
  }
}
