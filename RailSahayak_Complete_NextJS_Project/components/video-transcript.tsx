import { videoTranscripts } from "@/lib/video-transcripts";
export function VideoTranscript({topic,hi}:{topic:keyof typeof videoTranscripts;hi:boolean}){
 return <details><summary>{hi?"वीडियो का पाठ पढ़ें":"Read the video text"}</summary>{videoTranscripts[topic][hi?"hi":"en"].map((line,index)=><p key={index}>{line}</p>)}</details>;
}
