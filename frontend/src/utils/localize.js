/**
 * Pick the localized value of a CMS field.
 * Falls back to the English field if the French sibling field is missing/empty,
 * so untranslated content never breaks the French view.
 *
 * @param {object} item - the CMS document (e.g. a Program, Membership, etc.)
 * @param {string} field - the base (English) field name, e.g. 'title'
 * @param {string} lang - current language code, e.g. 'en' | 'fr'
 * @returns {*} the localized value
 */
export function pick(item, field, lang) {
  if (!item) return item;
  if (lang === 'fr') {
    const frValue = item[`${field}Fr`];
    if (Array.isArray(frValue)) {
      if (frValue.length && frValue.some((v) => v && String(v).trim())) return frValue;
      return item[field];
    }
    if (frValue !== undefined && frValue !== null && String(frValue).trim() !== '') {
      return frValue;
    }
    return item[field];
  }
  return item[field];
}

export default pick;
