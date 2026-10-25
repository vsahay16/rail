/** Stable editorial date text across server and browser ICU versions. */
export function contentDate(value: string, hi: boolean) {
 const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
 if (!match) return value;
 const month = Number(match[2]), day = Number(match[3]);
 if (month < 1 || month > 12 || day < 1 || day > 31) return value;
 const months = hi
  ? ["जनवरी", "फ़रवरी", "मार्च", "अप्रैल", "मई", "जून", "जुलाई", "अगस्त", "सितंबर", "अक्टूबर", "नवंबर", "दिसंबर"]
  : ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
 return `${day} ${months[month-1]} ${match[1]}`;
}
