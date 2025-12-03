export class DateHelper {
  static toLocalDatetime(d: Date | string): string {
    const date = typeof d === 'string' ? new Date(d) : d;
    const pad = (n: number) => n.toString().padStart(2, '0');
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
  }

  static toISOString(local: string): string {
    return new Date(local).toISOString();
  }
}
