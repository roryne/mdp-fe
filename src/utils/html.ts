export default class HtmlUtils {
  static getClassName(...classes: (string | false | null | undefined)[]) {
    return classes.filter(Boolean).join(' ')
  }
}
