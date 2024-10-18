import { SitemapStream, streamToPromise } from 'sitemap';
import { createWriteStream } from 'fs';
import { Readable } from 'stream';

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
  createWriteStream('./public/sitemap.xml').write(sitemap.toString());
  console.log('Sitemap generated successfully');
}

generateSitemap().catch(console.error);
