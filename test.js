import mongoose from 'mongoose';
import { DataNote } from './src/models/DataNote.js';
import slugify from './src/lib/slugify.js';

async function test() {
  await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/test');
  
  try {
    let title = 'বাংলা টেস্ট';
    let baseSlug = slugify(title);
    let slug = baseSlug;
    console.log("slufigied:", baseSlug);

    const contributor = {
      username: 'test',
      full_name: 'test user',
      designation: 'dev',
      profile_pic_url: 'http://foo.com/pic.jpg',
      facebook: 'fb.com',
    };

    const note = await DataNote.create({
      slug,
      category: 'meter-manual',
      title,
      icon: '📄',
      item: '',
      type: '',
      details: '',
      status: 'pending',
      likes: [],
      createdBy: contributor,
      specifications: { rows: [], contributors: [], status: 'approved' },
      manualSections: [],
      comments: [],
      photos: [],
    });
    console.log("Created successfully", note.slug);
  } catch (err) {
    console.error("Error creating:", err);
  } finally {
    mongoose.connection.close();
  }
}
test();
