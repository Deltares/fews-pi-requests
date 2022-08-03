export interface OrderBy {
    // Name of the first column that should be used for sorting the results
    column: string;
    // Direction the first column should be sorted. Value is either asc (ascending) or desc (descending).
    dir: 'asc' | 'desc';
}
