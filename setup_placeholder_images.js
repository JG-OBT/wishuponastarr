import fs from 'fs';
import path from 'path';

const IMAGES_DIR = path.join(process.cwd(), 'assets', 'images');

// Ensure directory exists
if (!fs.existsSync(IMAGES_DIR)) {
  fs.mkdirSync(IMAGES_DIR, { recursive: true });
}

const assets = [
  {
    name: 'logo-main.png',
    title: 'Wish Upon a Starre',
    subtitle: 'Logo Placeholder',
    bg: '#fdf2f8', // soft pink
    fg: '#4c1d95', // deep navy purple
    shape: 'star',
    aspect: '1:1'
  },
  {
    name: 'hero-main-character-party.jpg',
    title: 'Add some magic to your little one\'s special day',
    subtitle: 'Main Hero Image Placeholder (1200x630)',
    bg: '#faf5ff', // lavender
    fg: '#1e1b4b', // deep navy
    shape: 'sparkles',
    aspect: '16:9'
  },
  {
    name: 'home-gallery-01-princess-party.jpg',
    title: 'Princess Party Magic',
    subtitle: 'Gallery Image 1 (600x600)',
    bg: '#fdf2f8',
    fg: '#5b21b6',
    shape: 'crown',
    aspect: '1:1'
  },
  {
    name: 'home-gallery-02-character-visit.jpg',
    title: 'Magical Character Visits',
    subtitle: 'Gallery Image 2 (600x600)',
    bg: '#faf5ff',
    fg: '#5b21b6',
    shape: 'star',
    aspect: '1:1'
  },
  {
    name: 'home-gallery-03-party-entertainment.jpg',
    title: 'Hosted Party Games',
    subtitle: 'Gallery Image 3 (600x600)',
    bg: '#fffbeb', // warm gold/yellow
    fg: '#78350f',
    shape: 'sparkles',
    aspect: '1:1'
  },
  {
    name: 'home-gallery-04-sensory-song.jpg',
    title: 'Sensory & Song Sessions',
    subtitle: 'Gallery Image 4 (600x600)',
    bg: '#f0fdf4', // soft green
    fg: '#166534',
    shape: 'music',
    aspect: '1:1'
  },
  {
    name: 'event-sensory-song-ms-rachel.jpg',
    title: 'Sensory & Song Session',
    subtitle: 'Event Card (600x400)',
    bg: '#fdf2f8',
    fg: '#5b21b6',
    shape: 'music',
    aspect: '3:2'
  },
  {
    name: 'event-science-session.jpg',
    title: 'Seriously Fun Science',
    subtitle: 'Event Card (600x400)',
    bg: '#f0fdfa', // soft teal
    fg: '#115e59',
    shape: 'flask',
    aspect: '3:2'
  },
  {
    name: 'event-hiring-performers.jpg',
    title: 'We Are Hiring Performers!',
    subtitle: 'Audition/Careers Card (600x400)',
    bg: '#fff1f2', // soft rose
    fg: '#9f1239',
    shape: 'mask',
    aspect: '3:2'
  },
  {
    name: 'owner-abbie.jpg',
    title: 'Abbie - Founder',
    subtitle: 'Profile Photograph (600x600)',
    bg: '#fdf2f8',
    fg: '#4c1d95',
    shape: 'heart',
    aspect: '1:1'
  },
  {
    name: 'sensory-and-song-main.jpg',
    title: 'Sensory and Song',
    subtitle: 'Main Page Banner (1200x500)',
    bg: '#faf5ff',
    fg: '#5b21b6',
    shape: 'music',
    aspect: '16:9'
  },
  {
    name: 'parties-main.jpg',
    title: 'Parties for Little Starres',
    subtitle: 'Main Page Banner (1200x500)',
    bg: '#fdf2f8',
    fg: '#5b21b6',
    shape: 'crown',
    aspect: '16:9'
  },
  {
    name: 'characters-princess.jpg',
    title: 'Princess Characters',
    subtitle: 'Princess Selection (600x800)',
    bg: '#fdf2f8',
    fg: '#5b21b6',
    shape: 'crown',
    aspect: '3:4'
  },
  {
    name: 'characters-superhero.jpg',
    title: 'Superhero Characters',
    subtitle: 'Superhero Selection (600x800)',
    bg: '#eff6ff', // soft blue
    fg: '#1e40af',
    shape: 'shield',
    aspect: '3:4'
  },
  {
    name: 'characters-fairy.jpg',
    title: 'Fairies & Magical Friends',
    subtitle: 'Fairy Selection (600x800)',
    bg: '#fdf4ff', // soft fuchsia
    fg: '#86198f',
    shape: 'wand',
    aspect: '3:4'
  },
  {
    name: 'characters-science-professor.jpg',
    title: 'Educational Characters',
    subtitle: 'Science Professor (600x800)',
    bg: '#f0fdfa',
    fg: '#115e59',
    shape: 'flask',
    aspect: '3:4'
  },
  {
    name: 'packages-main.jpg',
    title: 'Packages & Prices',
    subtitle: 'Main Page Banner (1200x500)',
    bg: '#fffbeb',
    fg: '#78350f',
    shape: 'sparkles',
    aspect: '16:9'
  },
  {
    name: 'footer-star-detail.png',
    title: 'Sparkle Detail',
    subtitle: 'Decorative Accent',
    bg: '#fdf2f8',
    fg: '#d97706',
    shape: 'star',
    aspect: '1:1'
  },
  {
    name: 'OBT.png',
    title: 'OBT Partner',
    subtitle: 'Outstanding Business Trust',
    bg: '#fffbeb',
    fg: '#b45309',
    shape: 'trust',
    aspect: '1:1'
  }
];

function getShapeSvg(shape, fg) {
  switch (shape) {
    case 'star':
      return `<polygon points="100,30 120,70 170,75 130,110 140,150 100,130 60,150 70,110 30,75 80,70" fill="${fg}" opacity="0.3" transform="scale(1.5) translate(100, 50)" />`;
    case 'crown':
      return `<path d="M40 100 L60 50 L100 80 L140 50 L160 100 Z" fill="${fg}" opacity="0.3" transform="scale(1.5) translate(80, 50)" />`;
    case 'shield':
      return `<path d="M50 30 L150 30 L150 110 C150 150 50 180 50 180 C50 180 -50 150 -50 110 L-50 30 Z" fill="${fg}" opacity="0.3" transform="scale(1.2) translate(150, 70)" />`;
    case 'wand':
      return `<g fill="${fg}" opacity="0.3" transform="scale(1.5) translate(100, 50)">
        <line x1="20" y1="130" x2="100" y2="50" stroke="${fg}" stroke-width="8" stroke-linecap="round"/>
        <polygon points="100,30 105,45 120,45 108,55 112,70 100,60 88,70 92,55 80,45 95,45"/>
      </g>`;
    case 'flask':
      return `<path d="M80 40 L120 40 M100 40 L100 80 L60 150 L140 150 Z" stroke="${fg}" stroke-width="8" fill="none" opacity="0.3" transform="scale(1.5) translate(100, 50)" />`;
    case 'music':
      return `<path d="M50 120 A20 20 0 1 1 30 100 L30 30 L100 20 L100 90 A20 20 0 1 1 80 70 L80 40 L40 45 L40 100" fill="${fg}" opacity="0.3" transform="scale(1.5) translate(100, 50)" />`;
    case 'mask':
      return `<path d="M30 60 Q50 30 100 30 Q150 30 170 60 Q180 90 100 110 Q20 90 30 60" fill="${fg}" opacity="0.3" transform="scale(1.5) translate(80, 50)" />`;
    case 'heart':
      return `<path d="M12 21.35 l-1.45-1.32 C5.4 15.36 2 12.28 2 8.5 C2 5.42 4.42 3 7.5 3 c1.74 0 3.41 .81 4.5 2.09 C13.09 3.81 14.76 3 16.5 3 C19.58 3 22 5.42 22 8.5 c0 3.78-3.4 6.86-8.55 11.54 L12 21.35 z" fill="${fg}" opacity="0.3" transform="scale(8) translate(10, 5)" />`;
    case 'trust':
      return `<circle cx="100" cy="100" r="60" stroke="${fg}" stroke-width="8" fill="none" opacity="0.3" transform="scale(1.5) translate(100, 50)" />`;
    case 'sparkles':
    default:
      return `<g fill="${fg}" opacity="0.2" transform="scale(1.5) translate(100, 50)">
        <path d="M50 10 Q50 50 10 50 Q50 50 50 90 Q50 50 90 50 Q50 50 50 10 Z"/>
        <path d="M120 30 Q120 50 100 50 Q120 50 120 70 Q120 50 140 50 Q120 50 120 30 Z" opacity="0.7"/>
      </g>`;
  }
}

assets.forEach(asset => {
  const dest = path.join(IMAGES_DIR, asset.name);
  
  // Calculate width and height based on aspect ratio
  let width = 800;
  let height = 800;
  if (asset.aspect === '16:9') {
    width = 1200;
    height = 675;
  } else if (asset.aspect === '3:2') {
    width = 900;
    height = 600;
  } else if (asset.aspect === '3:4') {
    width = 600;
    height = 800;
  }

  const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}">
    <defs>
      <linearGradient id="grad-${asset.name.replace(/\.[^/.]+$/, "")}" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#ffffff;stop-opacity:1" />
        <stop offset="100%" style="stop-color:${asset.bg};stop-opacity:1" />
      </linearGradient>
    </defs>
    <rect width="100%" height="100%" fill="url(#grad-${asset.name.replace(/\.[^/.]+$/, "")})" />
    
    <!-- Background grid decoration -->
    <g opacity="0.05" stroke="${asset.fg}" stroke-width="2">
      <line x1="0" y1="${height * 0.25}" x2="${width}" y2="${height * 0.25}" />
      <line x1="0" y1="${height * 0.5}" x2="${width}" y2="${height * 0.5}" />
      <line x1="0" y1="${height * 0.75}" x2="${width}" y2="${height * 0.75}" />
      <line x1="${width * 0.25}" y1="0" x2="${width * 0.25}" y2="${height}" />
      <line x1="${width * 0.5}" y1="0" x2="${width * 0.5}" y2="${height}" />
      <line x1="${width * 0.75}" y1="0" x2="${width * 0.75}" y2="${height}" />
    </g>
    
    <!-- Custom shape decoration -->
    ${getShapeSvg(asset.shape, asset.fg)}

    <g transform="translate(0, ${height / 2 - 20})">
      <text x="50%" y="0" dominant-baseline="middle" text-anchor="middle" font-family="'Inter', system-ui, -apple-system, sans-serif" font-size="${width > 600 ? '42' : '28'}" font-weight="bold" fill="${asset.fg}">
        ${asset.title}
      </text>
      <text x="50%" y="${width > 600 ? '55' : '40'}" dominant-baseline="middle" text-anchor="middle" font-family="'JetBrains Mono', monospace" font-size="${width > 600 ? '18' : '14'}" fill="${asset.fg}" letter-spacing="1" opacity="0.7">
        ${asset.subtitle}
      </text>
      <text x="50%" y="${width > 600 ? '110' : '80'}" dominant-baseline="middle" text-anchor="middle" font-family="'Inter', sans-serif" font-size="14" fill="${asset.fg}" opacity="0.5">
        Wish Upon a Starre Dorset • Client Image Asset: /assets/images/${asset.name}
      </text>
    </g>

    <!-- Star clusters in corners -->
    <path d="M30 40 L35 55 L50 55 L38 65 L42 80 L30 70 L18 80 L22 65 L10 55 L25 55 Z" fill="#eab308" opacity="0.3" />
    <path d="M${width - 50} ${height - 60} L${width - 45} ${height - 45} L${width - 30} ${height - 45} L${width - 42} ${height - 35} L${width - 38} ${height - 20} L${width - 50} ${height - 30} L${width - 62} ${height - 20} L${width - 58} ${height - 35} L${width - 70} ${height - 45} L${width - 55} ${height - 45} Z" fill="#eab308" opacity="0.3" />
  </svg>`;

  fs.writeFileSync(dest, svgContent);
  console.log(`Successfully generated vector placeholder: ${asset.name}`);
});

console.log('All image placeholders generated successfully!');
