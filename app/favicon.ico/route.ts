import { readFileSync } from 'fs';
import { join } from 'path';

export async function GET() {
  // Read the ajuy-seal.png file
  const filePath = join(process.cwd(), 'public', 'images', 'ajuy-seal.png');
  const imageBuffer = readFileSync(filePath);
  
  return new Response(imageBuffer, {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
}
