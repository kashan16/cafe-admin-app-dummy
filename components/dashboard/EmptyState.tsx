import { Card, CardContent } from "@/components/ui/card";
import { Users } from "lucide-react";

export default function EmptyState() {
  return (
    <Card className="mt-6 rounded-xl bg-card/60 backdrop-blur-sm border-border shadow-sm">
      <CardContent className="py-12 text-center">
        <Users className="h-14 w-14 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-foreground">No orders found</h3>
        <p className="text-sm text-muted-foreground mt-2">
          No orders were returned for the selected page.
        </p>
      </CardContent>
    </Card>
  );
}