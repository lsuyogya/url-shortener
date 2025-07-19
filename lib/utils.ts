const BASE62_CHARS = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

export function encodeBase62(num: number): string {
  if (num === 0) {
    return BASE62_CHARS[0];
  }

  let encoded = "";
  while (num > 0) {
    encoded = BASE62_CHARS[num % 62] + encoded;
    num = Math.floor(num / 62);
  }
  return encoded;
}

export function decodeBase62(str: string): number {
  let decoded = 0;
  for (let i = 0; i < str.length; i++) {
    decoded = decoded * 62 + BASE62_CHARS.indexOf(str[i]);
  }
  return decoded;
}
