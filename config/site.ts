export const productionOrigin = 'https://www.pentaforge.co.in';

type IndexingEnvironment = {
  NODE_ENV?: string;
  VERCEL?: string;
  VERCEL_ENV?: string;
  NEXT_PUBLIC_SITE_URL?: string;
};

export function resolveSiteUrl(env: IndexingEnvironment): string | undefined {
  // Preview builds also use NODE_ENV=production. Vercel's deployment environment wins.
  if (env.VERCEL_ENV && env.VERCEL_ENV !== 'production') return undefined;
  if (env.VERCEL === '1' && !env.VERCEL_ENV) return undefined;
  if (env.VERCEL_ENV !== 'production' && env.NODE_ENV !== 'production') return undefined;

  const configuredUrl = env.NEXT_PUBLIC_SITE_URL?.trim();
  if (configuredUrl) {
    const url = new URL(configuredUrl);
    if (url.origin !== productionOrigin || url.username || url.password || url.pathname !== '/' || url.search || url.hash) {
      throw new Error(`NEXT_PUBLIC_SITE_URL must be ${productionOrigin} (an optional trailing slash is accepted).`);
    }
  }
  // The owner's confirmed origin keeps a missing build variable from emptying the sitemap.
  return productionOrigin;
}

export const site = {
  companyName: 'PentaForge',
  siteUrl: resolveSiteUrl({ NODE_ENV: process.env.NODE_ENV, VERCEL: process.env.VERCEL, VERCEL_ENV: process.env.VERCEL_ENV, NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL }),
  description: 'PentaForge designs and develops custom business software, web applications, mobile apps and intelligent digital systems built around real business workflows.',
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || '',
  phone: process.env.NEXT_PUBLIC_CONTACT_PHONE || '',
  socials: [
    { label: 'LinkedIn', url: process.env.NEXT_PUBLIC_LINKEDIN_URL },
    { label: 'Instagram', url: process.env.NEXT_PUBLIC_INSTAGRAM_URL },
    { label: 'GitHub', url: process.env.NEXT_PUBLIC_GITHUB_URL },
  ].filter((item): item is { label: string; url: string } => !!item.url && /^https:\/\//.test(item.url)),
};
export const absoluteUrl = (path: string) => site.siteUrl ? new URL(path, site.siteUrl).toString() : undefined;
