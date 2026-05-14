import sharp from 'sharp';

const img = sharp('src/assets/logo.png').ensureAlpha();
const { data, info } = await img.raw().toBuffer({ resolveWithObject: true });

const { width, height, channels } = info;

// Sample corners to detect background color
const getPixel = (x, y) => {
  const i = (y * width + x) * channels;
  return [data[i], data[i+1], data[i+2]];
};

const corners = [
  getPixel(0, 0), getPixel(width-1, 0),
  getPixel(0, height-1), getPixel(width-1, height-1)
];

// Average background color from corners
const bg = corners.reduce((a, c) => [a[0]+c[0], a[1]+c[1], a[2]+c[2]], [0,0,0])
  .map(v => Math.round(v / corners.length));

console.log('Detected background color:', bg);

const threshold = 40;

for (let i = 0; i < width * height; i++) {
  const idx = i * channels;
  const r = data[idx], g = data[idx+1], b = data[idx+2];
  const diff = Math.abs(r - bg[0]) + Math.abs(g - bg[1]) + Math.abs(b - bg[2]);
  if (diff < threshold) {
    data[idx+3] = 0; // make transparent
  }
}

await sharp(data, { raw: { width, height, channels } })
  .png()
  .toFile('src/assets/logo.png');

console.log('Done! Background removed from logo.png');
