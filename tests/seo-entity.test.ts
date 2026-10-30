import { test } from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { resolveSocialUrl } from '../config/site';

function socials(overrides: Record<string, string> = {}) {
  return JSON.parse(execFileSync(process.execPath, ['--import', 'tsx', '-e',
    "console.log(JSON.stringify(require('./config/site.ts').site.socials))",
  ], {
    cwd: process.cwd(), encoding: 'utf8',
    env: { ...process.env, NODE_ENV: 'development', VERCEL_ENV: 'development',
      NEXT_PUBLIC_LINKEDIN_URL: '', NEXT_PUBLIC_INSTAGRAM_URL: '', NEXT_PUBLIC_GITHUB_URL: '', ...overrides },
  }));
}

test('approved social defaults survive missing, blank and invalid overrides without inventing other profiles', () => {
  const expected = [
    { label: 'LinkedIn', url: 'https://www.linkedin.com/company/pentaforge-official/' },
    { label: 'Instagram', url: 'https://www.instagram.com/pentaforge.official/' },
  ];
  assert.deepEqual(socials(), expected);
  assert.deepEqual(socials({ NEXT_PUBLIC_LINKEDIN_URL: 'https://', NEXT_PUBLIC_INSTAGRAM_URL: 'javascript:alert(1)', NEXT_PUBLIC_GITHUB_URL: 'not-a-url' }), expected);
  const fallback = expected[0].url;
  for (const value of [undefined, '', '  ', 'https://', 'https:example.test', 'http://example.test/', 'javascript:alert(1)', 'https://user:password@example.test/']) {
    assert.equal(resolveSocialUrl(value, fallback), fallback);
    assert.equal(resolveSocialUrl(value), undefined);
  }
});

test('valid HTTPS overrides are retained and optional GitHub remains opt-in', () => {
  assert.deepEqual(socials({
    NEXT_PUBLIC_LINKEDIN_URL: ' https://www.linkedin.com/company/approved-override/ ',
    NEXT_PUBLIC_INSTAGRAM_URL: 'https://www.instagram.com/approved.override/',
    NEXT_PUBLIC_GITHUB_URL: 'https://github.com/approved-override',
  }), [
    { label: 'LinkedIn', url: 'https://www.linkedin.com/company/approved-override/' },
    { label: 'Instagram', url: 'https://www.instagram.com/approved.override/' },
    { label: 'GitHub', url: 'https://github.com/approved-override' },
  ]);
});
