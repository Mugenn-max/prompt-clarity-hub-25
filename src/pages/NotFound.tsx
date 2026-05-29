import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  return (
    <div className="container py-24 text-center">
      <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">404</p>
      <h1 className="mt-2 text-4xl font-bold tracking-tight">We couldn't find that page.</h1>
      <p className="mx-auto mt-3 max-w-md text-muted-foreground">
        The link may be broken or the page may have moved. Try one of the routes below.
      </p>
      <div className="mt-6 flex flex-wrap justify-center gap-2">
        <Button asChild><Link to="/">Home</Link></Button>
        <Button variant="outline" asChild><Link to="/prompt-audit">Prompt Audit</Link></Button>
        <Button variant="outline" asChild><Link to="/commons">Prompt Commons</Link></Button>
        <Button variant="outline" asChild><Link to="/learn">Learn</Link></Button>
      </div>
    </div>
  );
};

export default NotFound;
