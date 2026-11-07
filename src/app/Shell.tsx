import { useIsMobile } from "../lib/useIsMobile";
import DesktopShell from "./DesktopShell";
import MobileShell from "../mobile/MobileShell";

// One app, two layouts. Both use the same routes, hooks and stores.
export default function Shell() {
  return useIsMobile() ? <MobileShell /> : <DesktopShell />;
}
