export namespace TimeUtils {
	export function now(options: Intl.DateTimeFormatOptions): string {
		return new Date().toLocaleTimeString(undefined, options);
	}
}
