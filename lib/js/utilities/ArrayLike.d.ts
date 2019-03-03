export declare class CSSBorders {
    private _data;
    constructor(top: string, rigth?: string, bottom?: string, left?: string);
    get(): {
        top: string;
        right: string;
        bottom: string;
        left: string;
    };
    top: any;
    right: any;
    bottom: any;
    left: any;
    forEach(fn: (elt: string) => void): void;
}
