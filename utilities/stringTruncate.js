export const stringTruncate = ( string, no_words ) => { 
    if(!string) return ''
    return string.split(" ").splice(0,no_words).join(" ");
}
