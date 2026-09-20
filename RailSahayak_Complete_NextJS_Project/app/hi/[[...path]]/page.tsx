// Explicit Hindi routes share the existing page implementations.
// Keeping /hi in the request path preserves the language.
import { notFound } from "next/navigation";
import Home, { generateMetadata as homeMeta } from "@/app/page";
import Tools, { generateMetadata as toolsMeta } from "@/app/tools/page";
import Guides, { generateMetadata as guidesMeta } from "@/app/guides/page";
import Dashboard, { generateMetadata as dashboardMeta } from "@/app/dashboard/page";
import Pnr, { generateMetadata as pnrMeta } from "@/app/pnr-status/page";
import Tool, { generateMetadata as toolMeta } from "@/app/[tool]/page";
import Guide, { generateMetadata as guideMeta } from "@/app/guides/[topic]/page";
import Train, { generateMetadata as trainMeta } from "@/app/train/[trainNumber]/page";
import Station, { generateMetadata as stationMeta } from "@/app/station/[stationCode]/page";
import Route, { generateMetadata as routeMeta } from "@/app/trains/[route]/page";

type Props = {
  params: Promise<{ path?: string[] }>;
};

export async function generateMetadata({ params }: Props) {
  const { path = [] } = await params;

  if (!path.length) return homeMeta();

  if (path.length === 1) {
    if (path[0] === "tools") return toolsMeta();
    if (path[0] === "guides") return guidesMeta();
    if (path[0] === "dashboard") return dashboardMeta();
    if (path[0] === "pnr-status") return pnrMeta();

    return toolMeta({
      params: Promise.resolve({ tool: path[0] }),
    });
  }

  if (path.length === 2) {
    if (path[0] === "guides") {
      return guideMeta({
        params: Promise.resolve({ topic: path[1] }),
      });
    }
    if (path[0] === "train") {
      return trainMeta({
        params: Promise.resolve({ trainNumber: path[1] }),
      });
    }
    if (path[0] === "station") {
      return stationMeta({
        params: Promise.resolve({ stationCode: path[1] }),
      });
    }
    if (path[0] === "trains") {
      return routeMeta({
        params: Promise.resolve({ route: path[1] }),
      });
    }
  }

  return {};
}

export default async function Page({ params }: Props) {
  const { path = [] } = await params;

  if (!path.length) return <Home />;

  if (path.length === 1) {
    if (path[0] === "tools") return <Tools />;
    if (path[0] === "guides") return <Guides />;
    if (path[0] === "dashboard") return <Dashboard />;
    if (path[0] === "pnr-status") return <Pnr />;

    return <Tool params={Promise.resolve({ tool: path[0] })} />;
  }

  if (path.length === 2) {
    if (path[0] === "guides") {
      return <Guide params={Promise.resolve({ topic: path[1] })} />;
    }
    if (path[0] === "train") {
      return <Train params={Promise.resolve({ trainNumber: path[1] })} />;
    }
    if (path[0] === "station") {
      return <Station params={Promise.resolve({ stationCode: path[1] })} />;
    }
    if (path[0] === "trains") {
      return <Route params={Promise.resolve({ route: path[1] })} />;
    }
  }

  notFound();
}
