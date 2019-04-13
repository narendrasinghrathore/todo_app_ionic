export interface Todo {
    title?: string;
    type?: string;
    desc?: any;
    timestamp?: number;
    key?: string;
    date?: string;
    exist?: () => boolean;
    isOnline?: boolean;
}
