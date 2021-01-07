export function getFormattedRuntime(runtime: number): string | null {
  if (runtime === 0) {
    return null;
  }
  const m = runtime % 60;

  const h = (runtime - m) / 60;
  return `${h} h ${m} min`;
}
