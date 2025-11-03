import { describe, it, expect } from 'vitest';
import { strftime } from './builtins'; // 根据实际路径调整

describe('strftime', () => {
  // 创建一个固定的时间对象用于测试
  const testDate = new Date(2023, 9, 23, 14, 30, 45, 123); // 2023年10月23日 14:30:45.123

  it('should format year correctly', () => {
    expect(strftime(testDate, '%Y')).toBe('2023');
    expect(strftime(testDate, '%y')).toBe('23');
  });

  it('should format month correctly', () => {
    expect(strftime(testDate, '%m')).toBe('10');
    expect(strftime(testDate, '%B')).toBe('October');
    expect(strftime(testDate, '%b')).toBe('Oct');
  });

  it('should format day correctly', () => {
    expect(strftime(testDate, '%d')).toBe('23');
    expect(strftime(testDate, '%A')).toBe('Monday');
    expect(strftime(testDate, '%a')).toBe('Mon');
    expect(strftime(testDate, '%w')).toBe('1'); // Monday is 1 (Sunday is 0)
  });

  it('should format time correctly', () => {
    expect(strftime(testDate, '%H')).toBe('14'); // 24-hour format
    expect(strftime(testDate, '%I')).toBe('02'); // 12-hour format
    expect(strftime(testDate, '%p')).toBe('PM'); // AM/PM
    expect(strftime(testDate, '%M')).toBe('30'); // Minutes
    expect(strftime(testDate, '%S')).toBe('45'); // Seconds
    expect(strftime(testDate, '%f')).toBe('123000'); // Microseconds
  });

  it('should handle literal percent sign', () => {
    expect(strftime(testDate, '%%')).toBe('%');
    expect(strftime(testDate, 'Year: %%Y')).toBe('Year: %Y');
  });

  it('should format full datetime strings', () => {
    expect(strftime(testDate, '%Y-%m-%d %H:%M:%S')).toBe('2023-10-23 14:30:45');
    expect(strftime(testDate, '%A, %B %d, %Y')).toBe('Monday, October 23, 2023');
    expect(strftime(testDate, '%m/%d/%Y at %I:%M %p')).toBe('10/23/2023 at 02:30 PM');
  });

  it('should handle localization for months and weekdays', () => {
    // 测试中文本地化
    expect(strftime(testDate, '%B', 'zh-CN')).toBe('十月');
    expect(strftime(testDate, '%b', 'zh-CN')).toBe('10月');
    expect(strftime(testDate, '%A', 'zh-CN')).toBe('星期一');
    expect(strftime(testDate, '%a', 'zh-CN')).toBe('周一');

    // 测试法语本地化
    expect(strftime(testDate, '%B', 'fr-FR')).toBe('octobre');
    expect(strftime(testDate, '%b', 'fr-FR')).toBe('oct.');
    expect(strftime(testDate, '%A', 'fr-FR')).toBe('lundi');
    expect(strftime(testDate, '%a', 'fr-FR')).toBe('lun.');

    // 测试德语本地化
    expect(strftime(testDate, '%B', 'de-DE')).toBe('Oktober');
    expect(strftime(testDate, '%b', 'de-DE')).toBe('Okt');
    expect(strftime(testDate, '%A', 'de-DE')).toBe('Montag');
    expect(strftime(testDate, '%a', 'de-DE')).toBe('Mo');
  });

  it('should handle localized full formats', () => {
    // 注意：不同环境下的本地化结果可能会有细微差别
    const chineseResult = strftime(testDate, '%A, %B %d, %Y', 'zh-CN');
    expect(chineseResult).toContain('2023');
    expect(chineseResult).toContain('星期');

    const frenchResult = strftime(testDate, '%A, %B %d, %Y', 'fr-FR');
    expect(frenchResult).toContain('2023');
    expect(frenchResult).toContain('octobre');
  });

  it('should handle edge cases', () => {
    // 测试午夜
    const midnight = new Date(2023, 0, 1, 0, 0, 0, 0);
    expect(strftime(midnight, '%I:%M %p')).toBe('12:00 AM');

    // 测试中午
    const noon = new Date(2023, 0, 1, 12, 0, 0, 0);
    expect(strftime(noon, '%I:%M %p')).toBe('12:00 PM');

    // 测试12小时制的转换
    const onePM = new Date(2023, 0, 1, 13, 0, 0, 0);
    expect(strftime(onePM, '%I %p')).toBe('01 PM');
  });
});