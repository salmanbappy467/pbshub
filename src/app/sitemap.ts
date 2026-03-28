import { MetadataRoute } from 'next';
import { connectDB } from '@/lib/db';
import { DataNote } from '@/models/DataNote';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://pbshub.vercel.app';

  let noteEntries: any[] = [];
  let categoryEntries: any[] = [];
  try {
    await connectDB();
    const notes = await DataNote.find({ 
      status: 'approved',
      slug: { $exists: true, $ne: null }
    }).select('slug updatedAt').lean();
    
    noteEntries = notes
      .filter((note) => note.slug && note.slug.trim() !== '')
      .map((note) => ({
        url: `${baseUrl}/data-note/${note.slug}`,
        lastModified: note.updatedAt || new Date(),
        changeFrequency: 'weekly',
        priority: 0.7,
      }));
    const categoriesList = [
      'meter-manual',
      'equipment-manual',
      'instruction',
      'document',
      'application-form',
      'general-data',
      'online-data'
    ];

    categoryEntries = categoriesList.map((cat) => ({
      url: `${baseUrl}/search?category=${cat}`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.8,
    }));

  } catch (error) {
    console.error('Sitemap fetch error:', error);
  }

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/search`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    ...categoryEntries,
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/support`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    ...noteEntries,
  ];
}
