export type RenameByT<T, U> = {
	[K in keyof U as K extends keyof T ? (T[K] extends string ? T[K] : never) : K]: K extends keyof U ? U[K] : never;
};

type Enumerate<N extends number, Acc extends number[] = []> = Acc["length"] extends N
	? Acc[number]
	: Enumerate<N, [...Acc, Acc["length"]]>;

export type IntRange<F extends number, T extends number> = Exclude<Enumerate<T>, Enumerate<F>>;
