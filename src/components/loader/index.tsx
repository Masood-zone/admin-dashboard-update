import { Loader2 } from "lucide-react";
import { Button } from "../ui/button";

function Loader() {
  return <div className="loader"></div>;
}

export default Loader;

export function ButtonLoading({ loading }: { loading: boolean }) {
  return (
    <Button disabled={loading} className="w-full">
      <Loader2 className="mr-2 h-4 w-4 animate-spin " />
      Please wait
    </Button>
  );
}
