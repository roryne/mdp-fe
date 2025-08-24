// utils/html/classNames.ts

/**
 * Toggle a class name based on a boolean condition
 */
export function conditionalClass(
  className: string,
  condition: boolean
): string {
  return condition ? className : ''
}

/**
 * Combine multiple classes
 */
export function mergeClasses(
  ...classes: (string | false | null | undefined)[]
): string {
  return classes.filter(Boolean).join(' ')
}

/**
 * Ensure a string is a valid CSS identifier (basic sanitization)
 */
export function sanitizeClassName(name: string): string {
  return name.replace(/[^\w-]/g, '_')
}
