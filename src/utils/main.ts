// форматирует размер в байтах в читаемую строку с автоматическим подбором подходящей единицы измерения

export const formatBytes = (bytes: number, decimals = 2) => {
	if (!+bytes) return "0 Bytes";

	const k = 1024;
	const dm = decimals < 0 ? 0 : decimals;
	const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

	const i = Math.floor(Math.log(bytes) / Math.log(k));

	return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
};

// обрезает строку и добавляет многоточие, если она превышает максимальную длину

export const reduceString = (string: string, maxSymbols: number) => {
	return string.length > maxSymbols ? string.substring(0, maxSymbols - 3) + "..." : string;
};

// вычисляет процентное соотношение одного числа от другого

export const getPercentage = (valueNow: number, valueMax: number) => {
	return Math.round((valueNow / valueMax) * 100);
};

// отложенное выполнение - технику, которая откладывает вызов функции до тех пор, пока не пройдет определенное время без новых вызовов

// eslint-disable-next-line
export const debounce = <T extends Function>(cb: T, wait = 500) => {
	let h: NodeJS.Timeout;
	return (...args: unknown[]) => {
		clearTimeout(h);
		h = setTimeout(() => cb(...args), wait);
	};
};

/*
 Эта функция преобразует файл или Blob-объект в строку Base64
 
 file - файл или Blob-объект для конвертации
 removeDataPart - опциональный параметр для удаления префикса Data URL
 */

export const toBase64 = (file: File | Blob, removeDataPart?: boolean): Promise<string> =>
	new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => {
			const base64String = reader.result as string;
			if (!removeDataPart) return resolve(base64String);
			resolve(base64String.replace("data:", "").replace(/^.+,/, ""));
		};
		reader.onerror = error => reject(error);
	});
