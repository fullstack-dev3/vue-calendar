export const Fragment = {
  bind() {},

  inserted(el){
    el.replaceWith(...el.childNodes)
  },
}