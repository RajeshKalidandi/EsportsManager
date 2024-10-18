import { SitemapStream, streamToPromise } from 'sitemap';
import { createWriteStream, existsSync, mkdirSync } from 'fs';
import { Readable } from 'stream';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const hostname = 'https://esports-manager-mu.vercel.app';

const urls = [
  { url: '/', changefreq: 'daily', priority: 1 },
  { url: '/tournaments', changefreq: 'daily', priority: 0.8 },
  { url: '/teams', changefreq: 'daily', priority: 0.8 },
  { url: '/games/free-fire', changefreq: 'weekly', priority: 0.7 },
  { url: '/games/pubg', changefreq: 'weekly', priority: 0.7 },
  { url: '/about', changefreq: 'monthly', priority: 0.5 },
  { url: '/contact', changefreq: 'monthly', priority: 0.5 },
];

async function generateSitemap() {
  const stream = new SitemapStream({ hostname });
  const data = Readable.from(urls).pipe(stream);
  
  const sitemap = await streamToPromise(data);
  
  const publicDir = './public';
  const sitemapPath = `${publicDir}/sitemap.xml`;

  // Create the public directory if it doesn't exist
  if (!existsSync(dirname(sitemapPath))) {
    mkdirSync(dirname(sitemapPath), { recursive: true });
  }

  createWriteStream(sitemapPath).write(sitemap.toString());
  console.log('Sitemap generated successfully');
}

generateSitemap().catch(console.error);
