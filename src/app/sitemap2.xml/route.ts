import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { DataNote } from '@/models/DataNote';

export const revalidate = 3600;

export async function GET() {
  const baseUrl = 'https://xn--65bhgnma6ggn7ifo.xn--45bl4db.xn--54b7fta0cc';

  let noteEntries: string[] = [];
  let categoryEntries: string[] = [];

  try {
    await connectDB();
    const notes = await DataNote.find({
      status: 'approved',
      slug: { $exists: true, $ne: null }
    }).select('slug updatedAt').lean();

    noteEntries = notes
      .filter((note) => note.slug && (note.slug as string).trim() !== '')
      .map((note) => `
  <url>
    <loc>${baseUrl}/data-note/${note.slug}</loc>
    <lastmod>${new Date((note as any).updatedAt || new Date()).toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`);

    const categoriesList = [
      'meter-manual',
      'equipment-manual',
      'instruction',
      'document',
      'application-form',
      'general-data',
      'online-data',
    ];

    categoryEntries = categoriesList.map((cat) => `
  <url>
    <loc>${baseUrl}/search?category=${cat}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>`);

  } catch (error) {
    console.error('Sitemap2 fetch error:', error);
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${baseUrl}/search</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>${categoryEntries.join('')}
  <url>
    <loc>${baseUrl}/terms</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.3</priority>
  </url>
  <url>
    <loc>${baseUrl}/privacy</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.3</priority>
  </url>
  <url>
    <loc>${baseUrl}/support</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>${noteEntries.join('')}
</urlset>`;

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': `public, max-age=${revalidate}, stale-while-revalidate`,
    },
  });
}
