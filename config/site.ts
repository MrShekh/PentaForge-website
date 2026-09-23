const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
if (configuredUrl && !/^https?:\/\//.test(configuredUrl)) throw new Error('NEXT_PUBLIC_SITE_URL must be an absolute HTTP(S) URL.');
export const site = {
  companyName: 'PentaForge',
  siteUrl: configuredUrl ? new URL(configuredUrl).origin : undefined,
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
