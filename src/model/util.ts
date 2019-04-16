export function isValidJSON(s: string): boolean {
  try {
    JSON.parse(s);
    return true;
  } catch (error) {
    return false;
  }
}
