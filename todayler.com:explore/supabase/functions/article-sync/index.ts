type ArticleSyncAction = 'list' | 'upsert' | 'delete';

type ArticlePayload = {
  id?: string;
  slug: string;
  language: 'el' | 'en';
  title: string;
  subtitle?: string | null;
  body_markdown: string;
  category: string;
  baby_age_min: number;
  baby_age_max: number;
  tags?: string[] | null;
  featured_image_url?: string | null;
  author_name: string;
  authorId?: string | null;
  expert_reviewed: boolean;
  published_at: string;
  status?: 'published' | 'draft';
};

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

function jsonResponse(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      ...corsHeaders,
      'Content-Type': 'application/json',
    },
  });
}

function getRequiredEnv(name: string) {
  const value = Deno.env.get(name)?.trim() ?? '';
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

function normalizeEmail(email: string | undefined | null) {
  return (email ?? '').trim().toLowerCase();
}

function isUuid(value: string | undefined | null) {
  return Boolean(value && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(value));
}

function sanitizeTags(tags: string[] | null | undefined) {
  return Array.isArray(tags) ? tags.filter((tag) => typeof tag === 'string' && tag.trim().length > 0) : [];
}

async function verifyAdminSession(req: Request) {
  const supabaseUrl = getRequiredEnv('SUPABASE_URL').replace(/\/$/, '');
  const supabaseAnonKey = getRequiredEnv('SUPABASE_ANON_KEY');
  const adminEmail = normalizeEmail(getRequiredEnv('ARTICLE_ADMIN_EMAIL'));
  const authHeader = req.headers.get('Authorization');

  if (!authHeader) {
    return { ok: false as const, response: jsonResponse({ error: 'Missing authorization header.' }, 401) };
  }

  const userResponse = await fetch(`${supabaseUrl}/auth/v1/user`, {
    headers: {
      apikey: supabaseAnonKey,
      Authorization: authHeader,
    },
  });

  if (!userResponse.ok) {
    return { ok: false as const, response: jsonResponse({ error: 'Invalid or expired admin session.' }, 401) };
  }

  const user = (await userResponse.json()) as { email?: string | null };
  if (normalizeEmail(user.email) !== adminEmail) {
    return { ok: false as const, response: jsonResponse({ error: 'This account is not allowed to edit articles.' }, 403) };
  }

  return { ok: true as const };
}

function articleToRowPayload(article: ArticlePayload) {
  const payload: Record<string, unknown> = {
    slug: article.slug,
    language: article.language,
    title: article.title,
    subtitle: article.subtitle ?? null,
    body_markdown: article.body_markdown,
    category: article.category,
    baby_age_min: article.baby_age_min,
    baby_age_max: article.baby_age_max,
    tags: sanitizeTags(article.tags),
    featured_image_url: article.featured_image_url ?? null,
    author_name: article.author_name,
    author_id: article.authorId ?? null,
    expert_reviewed: Boolean(article.expert_reviewed),
    published_at: article.published_at,
    status: article.status ?? 'published',
  };

  if (isUuid(article.id)) {
    payload.id = article.id;
  }

  return payload;
}

async function listArticles() {
  const supabaseUrl = getRequiredEnv('SUPABASE_URL').replace(/\/$/, '');
  const serviceRoleKey = getRequiredEnv('SUPABASE_SERVICE_ROLE_KEY');

  const response = await fetch(`${supabaseUrl}/rest/v1/explore_articles?select=*&order=published_at.desc`, {
    headers: {
      apikey: serviceRoleKey,
      Authorization: `Bearer ${serviceRoleKey}`,
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || 'Failed to load articles.');
  }

  return await response.json();
}

async function upsertArticle(article: ArticlePayload) {
  const supabaseUrl = getRequiredEnv('SUPABASE_URL').replace(/\/$/, '');
  const serviceRoleKey = getRequiredEnv('SUPABASE_SERVICE_ROLE_KEY');
  const payload = articleToRowPayload(article);

  const response = await fetch(`${supabaseUrl}/rest/v1/explore_articles?on_conflict=slug`, {
    method: 'POST',
    headers: {
      apikey: serviceRoleKey,
      Authorization: `Bearer ${serviceRoleKey}`,
      'Content-Type': 'application/json',
      Prefer: 'resolution=merge-duplicates,return=representation',
    },
    body: JSON.stringify([payload]),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || 'Failed to save article.');
  }

  return await response.json();
}

async function deleteArticle(slug: string) {
  const supabaseUrl = getRequiredEnv('SUPABASE_URL').replace(/\/$/, '');
  const serviceRoleKey = getRequiredEnv('SUPABASE_SERVICE_ROLE_KEY');

  const response = await fetch(`${supabaseUrl}/rest/v1/explore_articles?slug=eq.${encodeURIComponent(slug)}`, {
    method: 'DELETE',
    headers: {
      apikey: serviceRoleKey,
      Authorization: `Bearer ${serviceRoleKey}`,
      Prefer: 'return=representation',
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || 'Failed to delete article.');
  }

  return await response.json();
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  if (req.method !== 'POST') {
    return jsonResponse({ error: 'Method not allowed.' }, 405);
  }

  let body: { action?: ArticleSyncAction; article?: ArticlePayload };
  try {
    body = await req.json();
  } catch {
    return jsonResponse({ error: 'Invalid JSON payload.' }, 400);
  }

  const authCheck = await verifyAdminSession(req);
  if (!authCheck.ok) {
    return authCheck.response;
  }

  try {
    switch (body.action) {
      case 'list': {
        const articles = await listArticles();
        return jsonResponse({ articles });
      }
      case 'upsert': {
        if (!body.article) {
          return jsonResponse({ error: 'Missing article payload.' }, 400);
        }
        const articles = await upsertArticle(body.article);
        return jsonResponse({ articles });
      }
      case 'delete': {
        if (!body.article?.slug) {
          return jsonResponse({ error: 'Missing article slug.' }, 400);
        }
        const articles = await deleteArticle(body.article.slug);
        return jsonResponse({ articles });
      }
      default:
        return jsonResponse({ error: 'Unknown action.' }, 400);
    }
  } catch (error) {
    return jsonResponse(
      { error: error instanceof Error ? error.message : 'Unknown article sync failure.' },
      500,
    );
  }
});
