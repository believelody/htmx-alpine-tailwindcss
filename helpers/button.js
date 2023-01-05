import expressHbs from 'express-hbs';

export default function({ fn, hash }) {
  delete hash.spread.body;
  if (!hash.spread.class) {
    let className = ["px-4 py-2 rounded border border-red-500 btn"];
    if (hash.spread.color) {
      if (hash.spread.outlined) {
        className.push(`btn-${hash.spread.color}-outlined`);
        delete hash.spread.outlined;
      } else {
        className.push(`btn-${hash.spread.color}`);
      }
      delete hash.spread.color;
    } else {
      if (hash.spread.outlined) {
        className.push("btn-outlined");
        delete hash.spread.outlined;
      }
    };
    if (hash.spread.block) {
      className.push("w-full");
    }
    hash.spread.class = className.join(" ");
  }
  const contentProps = {};
  ['label', 'icon', 'image', 'sr-only'].forEach(item => {
    if (hash.spread[item]) {
      contentProps[item] = hash.spread[item];
      delete hash.spread[item];
    }
  });
  const dataLoadingProps = {};
  ['data-loading-text', 'data-loading-icon'].forEach(item => {
    if (hash.spread[item]) {
      dataLoadingProps[item] = hash.spread[item];
      delete hash.spread[item];
    }
  });
  const spreadAttrs = expressHbs.handlebars.helpers['spread'].call(this, hash.spread);
  return "<button " + spreadAttrs + ">" + fn({ ...contentProps, ...dataLoadingProps }) + "</button>";
}