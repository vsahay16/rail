/** Representative conventional numbering, not a live rake or allocation feed. */
export const berthNames: Record<string, [string,string]> = {
 LB: ["Lower berth", "लोअर बर्थ"], MB: ["Middle berth", "मिडिल बर्थ"], UB: ["Upper berth", "अपर बर्थ"], SL: ["Side lower", "साइड लोअर"], SU: ["Side upper", "साइड अपर"],
};
export const berthProfiles = [
 {id:"sl72", en:"Sleeper · standard 72-berth pattern", hi:"स्लीपर · सामान्य 72 बर्थ पैटर्न", capacity:72, pattern:["LB","MB","UB","LB","MB","UB","SL","SU"]},
 {id:"3a64", en:"3A · standard 64-berth pattern", hi:"3A · सामान्य 64 बर्थ पैटर्न", capacity:64, pattern:["LB","MB","UB","LB","MB","UB","SL","SU"]},
 {id:"3a72", en:"3A · standard 72-berth pattern", hi:"3A · सामान्य 72 बर्थ पैटर्न", capacity:72, pattern:["LB","MB","UB","LB","MB","UB","SL","SU"]},
 {id:"2a46", en:"2A · standard 46-berth pattern", hi:"2A · सामान्य 46 बर्थ पैटर्न", capacity:46, pattern:["LB","UB","LB","UB","SL","SU"]},
 {id:"2a54", en:"2A · standard 54-berth pattern", hi:"2A · सामान्य 54 बर्थ पैटर्न", capacity:54, pattern:["LB","UB","LB","UB","SL","SU"]},
];
export function findBerth(profileId: string, seat: number) {
 const profile=berthProfiles.find(p=>p.id===profileId);
 if(!profile || !Number.isInteger(seat) || seat<1 || seat>profile.capacity) return null;
 return {code:profile.pattern[(seat-1)%profile.pattern.length], bay:Math.floor((seat-1)/profile.pattern.length)+1};
}
