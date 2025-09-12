import clsx from 'clsx'
import type { ElementType, JSX } from 'react'

import type { TTypographyVariant } from '@/theme/tokens'

import styles from './Typography.module.css'
import type { TTypographyProps } from './types'

/**
 * Make sure this Record covers every key in TTypographyVariant.
 * If your TTypographyVariant includes 'subtitle1', 'link', etc. they must
 * appear here so indexing defaultTag[variant] is statically safe.
 */
const defaultTag: Record<TTypographyVariant, keyof JSX.IntrinsicElements> = {
  body: 'p',
  button: 'span',
  caption: 'span',
  code: 'code',
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  label: 'span',
  link: 'a',
  overline: 'span',
  subtitle1: 'h6',
  subtitle2: 'h6'
}

const Typography = ({
  as,
  className,
  children,
  ref,
  variant,
  size = 'rg',
  ...props
}: TTypographyProps) => {
  const Tag = (as ?? defaultTag[variant]) as ElementType

  const classes = clsx(className, {
    [styles[`typography--${variant}`]]: variant,
    [styles[size]]: size
  })

  return (
    <Tag className={classes} {...props}>
      {children}
    </Tag>
  )
}

Typography.displayName = 'Typography'

export default Typography
