export default interface Results<T> {
    count: number;
    next: number;
    previous: number;
    results: T[];
}