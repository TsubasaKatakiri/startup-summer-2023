export type Industry = {
    key: string,
    positions: IndustryBranch[],
    title: string,
    title_rus: string,
    title_trimmed: string,
    url_rus: string,
}

export type IndustryBranch = {
    id_parent: string,
    key: string,
    title: string,
    title_rus: string,
    url_rus: string,
}