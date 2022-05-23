export const stripNonTextTags = (node) => {
  if (
    node.type === 'tag' &&
    (node.name === 'img' ||
      node.name === 'video' ||
      node.name === 'iframe' ||
      node.name === 'audio' ||
      node.name === 'table' ||
      node.name === 'td' ||
      node.name === 'th' ||
      node.name === 'tr' ||
      node.name === 'h1' ||
      node.name === 'h2' ||
      node.name === 'h3' ||
      node.name === 'h4' ||
      node.name === 'h5' ||
      node.name === 'h6' ||
      node.name === 'li' ||
      node.name === 'ul' ||
      node.name === 'ol' ||
      node.name === 'form' ||
      node.name === 'nav' ||
      node.name === 'button' ||
      node.name === 'a')
  ) {
    return null
  }
}

export const stripNonTextTagsExcludeHeaders = (node) => {
  if (
    node.type === 'tag' &&
    (node.name === 'img' ||
      node.name === 'video' ||
      node.name === 'iframe' ||
      node.name === 'audio' ||
      node.name === 'table' ||
      node.name === 'td' ||
      node.name === 'th' ||
      node.name === 'tr' ||
      node.name === 'li' ||
      node.name === 'ul' ||
      node.name === 'ol' ||
      node.name === 'form' ||
      node.name === 'nav' ||
      node.name === 'button' ||
      node.name === 'a')
  ) {
    return null
  }
}
