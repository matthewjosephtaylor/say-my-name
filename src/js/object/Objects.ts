export function toMany<T>(obj: T | T[]): T[] {
  if (obj === undefined) {
    return undefined;
  }
  return obj instanceof Array ? obj : [obj];
}
