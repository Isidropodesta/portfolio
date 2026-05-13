/**
 * Removes white/gray backgrounds from an image using canvas flood fill.
 *
 * Algorithm: BFS from every border pixel. Any pixel connected to the border
 * whose R, G, and B channels are all above `threshold` is considered background
 * and made fully transparent. Interior pixels (not connected to the border)
 * are never touched, preserving white areas inside the avatar.
 */

const cache = new Map<string, string>();

export function removeBackground(url: string, threshold = 228): Promise<string> {
  if (cache.has(url)) return Promise.resolve(cache.get(url)!);

  return new Promise<string>((resolve) => {
    const img = new window.Image();
    img.crossOrigin = 'anonymous';

    img.onload = () => {
      try {
        const W = img.naturalWidth;
        const H = img.naturalHeight;

        const canvas = document.createElement('canvas');
        canvas.width  = W;
        canvas.height = H;

        const ctx = canvas.getContext('2d', { willReadFrequently: true });
        if (!ctx) { resolve(url); return; }

        ctx.drawImage(img, 0, 0);
        const imageData = ctx.getImageData(0, 0, W, H);
        const { data } = imageData;

        const visited = new Uint8Array(W * H);
        const stack: number[] = [];

        // Returns true if pixel at byte-offset i is a background color
        const isBg = (i: number) =>
          data[i + 3] > 10 &&
          data[i]     > threshold &&
          data[i + 1] > threshold &&
          data[i + 2] > threshold;

        // Seed the stack with every border pixel (by flat pixel index)
        for (let x = 0; x < W; x++) {
          stack.push(x);                 // top row
          stack.push((H - 1) * W + x);  // bottom row
        }
        for (let y = 1; y < H - 1; y++) {
          stack.push(y * W);             // left col
          stack.push(y * W + (W - 1));   // right col
        }

        // BFS flood fill
        while (stack.length > 0) {
          const px = stack.pop()!;
          if (visited[px]) continue;
          visited[px] = 1;

          const pi = px * 4;
          if (!isBg(pi)) continue;

          // Remove pixel
          data[pi + 3] = 0;

          const x = px % W;
          const y = (px - x) / W;

          if (x > 0)     stack.push(px - 1);
          if (x < W - 1) stack.push(px + 1);
          if (y > 0)     stack.push(px - W);
          if (y < H - 1) stack.push(px + W);
        }

        ctx.putImageData(imageData, 0, 0);
        const result = canvas.toDataURL('image/png');
        cache.set(url, result);
        resolve(result);
      } catch {
        // Canvas tainted (CORS) or other error — fall back to original URL
        cache.set(url, url);
        resolve(url);
      }
    };

    img.onerror = () => {
      cache.set(url, url);
      resolve(url);
    };

    img.src = url;
  });
}
