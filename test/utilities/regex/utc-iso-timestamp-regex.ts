/**
 * Regex pattern for simplified ISO 8601 timestamp with UTC offset.
 */
const utcIsoTimestampRegex =
    /^([+-]\d{2})?(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}\.\d{3})Z$/;

export { utcIsoTimestampRegex };
