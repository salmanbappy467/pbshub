export default function slugify(text: string): string {
  const result = text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[\s-]+/g, '-') // Replace spaces and dashes with a single dash
    .replace(/[^\w\-\u0980-\u09FF]+/g, '') // Keep alphanumeric, dashes, and Bengali characters
    .replace(/^-+|-+$/g, '')
    .substring(0, 80);
    
  // If the result is empty after stripping (e.g., symbols only), fallback to a random string
  return result || `note-${Date.now()}`;
}
