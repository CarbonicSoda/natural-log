export namespace TimeUtils {
	//MO DOC get formatted current timestamp
	export function now(options: Intl.DateTimeFormatOptions): string {
		return new Date().toLocaleTimeString(undefined, options);
	}
}
