export function timeDiffMoreCurrent(source: Date): number {
  return Math.ceil(((new Date) as any - (source as any)) / 1000);
}
