const fs = require('fs');
const path = require('path');
const { createClient } = require('@sanity/client');
const https = require('https');

const client = createClient({
  projectId: 'p65whnge',
  dataset: 'production',
  apiVersion: '2024-03-01',
  token: 'skAwvgz5ogMWAoA9K5lgRdsL90vQOMu7m4s1PkpJBiQePaNQNnKABPK0U68r7pRZgXnwxPgGg2NL3tPc9',
  useCdn: false
});

async function downloadImage(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode !== 200) {
        return reject(new Error(`Failed to download image: ${res.statusCode}`));
      }
      
      const chunks = [];
      res.on('data', chunk => chunks.push(chunk));
      res.on('end', () => resolve(Buffer.concat(chunks)));
      res.on('error', reject);
    }).on('error', reject);
  });
}

async function run() {
  const data = JSON.parse(fs.readFileSync('../parsed_blogs.json', 'utf8'));
  
  for (const blog of data) {
    console.log(`Processing ${blog.slug}...`);
    let imageAssetId = null;
    
    if (blog.imageUrl) {
      try {
        console.log(`  Downloading image ${blog.imageUrl}...`);
        const imageBuffer = await downloadImage(blog.imageUrl);
        console.log(`  Uploading image to Sanity...`);
        const asset = await client.assets.upload('image', imageBuffer, {
          filename: path.basename(blog.imageUrl)
        });
        imageAssetId = asset._id;
      } catch (err) {
        console.error(`  Failed to process image:`, err.message);
      }
    }
    
    const safeSlug = blog.slug.replace(/[^a-zA-Z0-9_.-]/g, '').substring(0, 100);
    const docId = `drafts.blog-${safeSlug}`;
    const doc = {
      _id: docId,
      _type: 'post',
      title: blog.title,
      slug: { _type: 'slug', current: blog.slug },
      publishedAt: blog.publishedAt
    };
    
    if (imageAssetId) {
      doc.image = {
        _type: 'image',
        asset: {
          _type: 'reference',
          _ref: imageAssetId
        }
      };
    }
    
    await client.createOrReplace(doc);
    console.log(`  Created/replaced document ${docId}`);
  }
  
  console.log('Done!');
}

run().catch(console.error);
