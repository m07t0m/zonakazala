// https://gist.github.com/telekosmos/3b62a31a5c43f40849bb
// Caution: If you have properties with Date they will be replaced with their JSON representation (toISOString()).
export const uniqueArray = (a: Array<any>) => Array.from(new Set(a.map(o => JSON.stringify(o)))).map(s => JSON.parse(s))

export const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1)

export const deepcopy = <T>(o: T): T => JSON.parse(JSON.stringify(o))  

export const toUrl = (s: string | undefined) => (s || '').toLowerCase().trim().replace(/\s+/g, '-')