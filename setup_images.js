import fs from 'fs';
import path from 'path';
import https from 'https';

const IMAGES_DIR = path.join(process.cwd(), 'assets', 'images');

// Ensure directory exists
if (!fs.existsSync(IMAGES_DIR)) {
  fs.mkdirSync(IMAGES_DIR, { recursive: true });
}

const assets = [
  {
    name: 'logo-main.png',
    url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&h=400&fit=crop&q=80' // Beautiful abstract magical pastel background
  },
  {
    name: 'hero-main-character-party.jpg',
    url: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=1200&h=630&fit=crop&q=80' // Colorful balloons, festive celebration
  },
  {
    name: 'home-gallery-01-princess-party.jpg',
    url: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=600&h=600&fit=crop&q=80' // Whimsical magical princess dress/fairytale vibe
  },
  {
    name: 'home-gallery-02-character-visit.jpg',
    url: 'https://images.unsplash.com/photo-1547082299-de196ea013d6?w=600&h=600&fit=crop&q=80' // Happy children playing together
  },
  {
    name: 'home-gallery-03-party-entertainment.jpg',
    url: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=600&h=600&fit=crop&q=80' // Children chasing magical bubbles
  },
  {
    name: 'home-gallery-04-sensory-song.jpg',
    url: 'https://images.unsplash.com/photo-1596464716127-f2a82984de30?w=600&h=600&fit=crop&q=80' // Colorful sensory toys and play
  },
  {
    name: 'event-sensory-song-ms-rachel.jpg',
    url: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=600&h=400&fit=crop&q=80' // Happy, friendly child/teacher smiling
  },
  {
    name: 'event-science-session.jpg',
    url: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=600&h=400&fit=crop&q=80' // Fun, colorful science experiments
  },
  {
    name: 'event-hiring-performers.jpg',
    url: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&h=400&fit=crop&q=80' // Performing arts stage and spotlight
  },
  {
    name: 'owner-abbie.jpg',
    url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600&h=600&fit=crop&q=80' // High-quality, friendly headshot of Abbie
  },
  {
    name: 'sensory-and-song-main.jpg',
    url: 'https://images.unsplash.com/photo-1515488042361-404e9250afef?w=1200&h=600&fit=crop&q=80' // Warm sensory session with babies and parents
  },
  {
    name: 'parties-main.jpg',
    url: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=1200&h=600&fit=crop&q=80' // Beautifully styled birthday party decorations
  },
  {
    name: 'characters-princess.jpg',
    url: 'https://images.unsplash.com/photo-1509248961158-e54f6934749c?w=600&h=800&fit=crop&q=80' // Elegant female fairytale/starry fantasy style
  },
  {
    name: 'characters-superhero.jpg',
    url: 'https://images.unsplash.com/photo-1608889174637-3c44f6326f1a?w=600&h=800&fit=crop&q=80' // Child/entertainer wearing superhero cape
  },
  {
    name: 'characters-fairy.jpg',
    url: 'https://images.unsplash.com/photo-1505673542670-a5e3ff5b14a3?w=600&h=800&fit=crop&q=80' // Fairy lights and magic fairytale atmosphere
  },
  {
    name: 'characters-science-professor.jpg',
    url: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&h=800&fit=crop&q=80' // Dynamic fun educational learning experiment
  },
  {
    name: 'packages-main.jpg',
    url: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?w=1200&h=600&fit=crop&q=80' // Gift boxes, sparkles and balloons
  },
  {
    name: 'footer-star-detail.png',
    url: 'https://images.unsplash.com/photo-1502481851512-e9e2529bbbf9?w=200&h=200&fit=crop&q=80' // Glowing golden star effect
  },
  {
    name: 'OBT.png',
    url: 'https://images.unsplash.com/photo-1589156191108-c762ff4b96ab?w=150&h=150&fit=crop&q=80' // Clean, golden circular trust symbol or badge
  }
];

function downloadImage(url, filename) {
  const dest = path.join(IMAGES_DIR, filename);
  const file = fs.createWriteStream(dest);

  https.get(url, (response) => {
    if (response.statusCode === 302 || response.statusCode === 301) {
      // Handle redirect
      downloadImage(response.headers.location, filename);
      return;
    }

    if (response.statusCode !== 200) {
      console.error(`Failed to download ${filename}: Status code ${response.statusCode}`);
      writeFallbackImage(dest, filename);
      return;
    }

    response.pipe(file);
    file.on('finish', () => {
      file.close();
      console.log(`Successfully downloaded: ${filename}`);
    });
  }).on('error', (err) => {
    console.error(`Error downloading ${filename}: ${err.message}`);
    writeFallbackImage(dest, filename);
  });
}

// Fallback: Write a valid tiny 1x1 transparent PNG if download fails
function writeFallbackImage(dest, filename) {
  // A tiny valid 1x1 PNG file as base64
  const png1x1 = Buffer.from(
    'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=',
    'base64'
  );
  fs.writeFileSync(dest, png1x1);
  console.log(`Wrote fallback empty image for: ${filename}`);
}

console.log('Starting image downloads...');
assets.forEach(asset => {
  downloadImage(asset.url, asset.name);
});
