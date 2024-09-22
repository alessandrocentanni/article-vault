// biome-ignore lint/suspicious/noExplicitAny: unkown types
export default function debounce(func: (...args: any[]) => void, wait: number) {
	let timeout: NodeJS.Timeout;
	// biome-ignore lint/suspicious/noExplicitAny: unknown types
	return function executedFunction(...args: any[]) {
		const later = () => {
			clearTimeout(timeout);
			func(...args);
		};
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
	};
}
