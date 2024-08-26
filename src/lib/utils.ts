import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const generateSlug = (...args: (string | number)[]): string => {
  const value = args.join(' ');

  const slug = value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9 ]/g, '')
    .replace(/\s+/g, '-');

  const randomId = generateRandomId(6);

  return `${slug}-${randomId}`;
};

export const formatPrice = (value: number): string => {
  const formattedValue = new Intl.NumberFormat('en-US', {
    style: 'decimal',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
  return `$ ${formattedValue}`;
};
export function generateRandomId(length: number) {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters[randomIndex];
  }
  return result;
}
export function generateVariantCombinations(
  variants: { type: string; options: string[] }[]
): string[][] {
  const filteredVariants = variants.filter(
    (variant) => variant.options.length > 0
  );

  if (filteredVariants.length === 0) return [];
  if (filteredVariants.length === 1)
    return filteredVariants[0].options.map((option) => [option]);

  const [first, ...rest] = filteredVariants;
  const combinations = generateVariantCombinations(rest);

  return first.options.flatMap((option) =>
    combinations.map((combination) => [option, ...combination])
  );
}

