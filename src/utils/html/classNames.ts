export function stripClasses(el: Node): string {
  const clone = el.cloneNode(true)

  if (!(clone instanceof HTMLElement)) return ''

  clone.removeAttribute('class')

  clone.querySelectorAll('*').forEach((node) => {
    node.removeAttribute('class')
  })
  return clone.outerHTML
}
