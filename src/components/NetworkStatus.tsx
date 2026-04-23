import { useEffect } from "react";
import { useOnlineStatus } from "@/hooks/use-online-status";
import { toast } from "sonner";
import { WifiOff, Wifi } from "lucide-react";

const NetworkStatus = () => {
  const isOnline = useOnlineStatus();

  useEffect(() => {
    if (!isOnline) {
      toast.error("You are currently offline", {
        description: "Some images and features may not load correctly.",
        icon: <WifiOff className="w-4 h-4" />,
        duration: Infinity,
        id: "offline-toast",
      });
    } else {
      toast.dismiss("offline-toast");
      // Only show "Back online" if it was previously offline
      // We can track this with a ref if needed, but sonner handles dismiss well
    }
  }, [isOnline]);

  return null;
};

export default NetworkStatus;
