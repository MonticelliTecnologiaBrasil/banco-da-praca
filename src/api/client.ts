const API_BASE = "http://localhost:8080/api/v1";

export function getToken(): string | null {
  return localStorage.getItem("token");
}

export function setToken(token: string | null) {
  if (token) {
    localStorage.setItem("token", token);
  } else {
    localStorage.removeItem("token");
  }
}

export function getTokenPayload(): Record<string, unknown> | null {
  const token = getToken();
  if (!token) return null;
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;
    return JSON.parse(atob(parts[1]));
  } catch {
    return null;
  }
}

async function request<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const token = getToken();
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string>),
  };
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers,
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.detail || body.message || `Erro ${res.status}`);
  }

  if (res.status === 204) return null as T;
  return res.json();
}

export const api = {
  auth: {
    login: (email: string, password: string) =>
      request<{ token: string; user: { id: string; fullName: string; email: string; roles: string[] } }>(
        "/auth/login",
        { method: "POST", body: JSON.stringify({ email, password }) }
      ),
    register: (fullName: string, email: string, password: string) =>
      request<{ token: string; user: { id: string; fullName: string; email: string; roles: string[] } }>(
        "/auth/register",
        { method: "POST", body: JSON.stringify({ fullName, email, password }) }
      ),
    me: () =>
      request<{ id: string; fullName: string; email: string; phone: string | null; company: string | null; roles: string[] }>(
        "/auth/me"
      ),
  },
  solutions: {
    list: () =>
      request<Array<{
        id: string; name: string; slug: string; shortDescription: string;
        fullDescription: string; category: string; icon: string;
        features: string; isActive: boolean; isFeatured: boolean;
      }>>("/solutions"),
    getBySlug: (slug: string) =>
      request<{
        id: string; name: string; slug: string; shortDescription: string;
        fullDescription: string; category: string; icon: string;
        features: string; isActive: boolean; isFeatured: boolean;
      }>(`/solutions/${slug}`),
  },
  plans: {
    list: () =>
      request<Array<{
        id: string; solutionId: string; name: string;
        priceMonthly: number | null; priceOnce: number | null;
        billingType: string; features: string;
        isPopular: boolean; sortOrder: number;
      }>>("/plans"),
    bySolution: (solutionId: string) =>
      request<Array<{
        id: string; solutionId: string; name: string;
        priceMonthly: number | null; priceOnce: number | null;
        billingType: string; features: string;
        isPopular: boolean; sortOrder: number;
      }>>(`/plans/solution/${solutionId}`),
  },
  requests: {
    list: () =>
      request<Array<{
        id: string; userId: string; title: string; category: string;
        description: string; budgetRange: string | null; urgency: string | null;
        status: string; adminNotes: string | null;
        createdAt: string; updatedAt: string;
        profile: { id: string; fullName: string; email: string; phone: string | null; company: string | null; roles: string[] } | null;
      }>>("/requests"),
    create: (data: { title: string; category?: string; description?: string; budgetRange?: string; urgency?: string }) =>
      request<{
        id: string; userId: string; title: string; category: string;
        description: string; budgetRange: string | null; urgency: string | null;
        status: string; adminNotes: string | null;
        createdAt: string; updatedAt: string;
        profile: null;
      }>("/requests", { method: "POST", body: JSON.stringify(data) }),
  },
  admin: {
    listRequests: () =>
      request<Array<{
        id: string; userId: string; title: string; category: string;
        description: string; budgetRange: string | null; urgency: string | null;
        status: string; adminNotes: string | null;
        createdAt: string; updatedAt: string;
        profile: { id: string; fullName: string; email: string; phone: string | null; company: string | null; roles: string[] } | null;
      }>>("/admin/requests"),
    updateRequest: (id: string, data: { status?: string; adminNotes?: string }) =>
      request<{
        id: string; userId: string; title: string; category: string;
        description: string; budgetRange: string | null; urgency: string | null;
        status: string; adminNotes: string | null;
        createdAt: string; updatedAt: string;
        profile: null;
      }>(`/admin/requests/${id}`, { method: "PATCH", body: JSON.stringify(data) }),
  },
};
