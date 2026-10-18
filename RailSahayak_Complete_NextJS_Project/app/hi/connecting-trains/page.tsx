// Explicit route takes precedence over the Hindi catch-all dispatcher.
// Reuse the existing bilingual planner and its localized metadata.
export { default, generateMetadata } from "@/app/connecting-trains/page";
