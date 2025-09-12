type Variant<T> = Partial<T> & { meta: string }

export function cartesianProductWithProps<T>(
  groups: Variant<T>[][]
): { props: Partial<T>; title: string }[] {
  const initial = [{ props: {} as Partial<T>, title: '' }]

  return groups.reduce(
    (acc, group) =>
      acc.flatMap((a) =>
        group.map((b) => {
          const { meta, ...rest } = b
          const mergedProps = { ...a.props, ...rest }

          const titleParts = [a.title, meta].filter(Boolean)
          const title = titleParts.join(' | ')

          return { props: mergedProps, title }
        })
      ),
    initial
  )
}
