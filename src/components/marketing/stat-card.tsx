import {Card, CardContent} from "@/components/ui/card";

interface StatCardProps {
  value: string;
  label: string;
}

export default function StatCard({
  value,
  label,
}: StatCardProps) {
  return (
    <Card className="border-0 bg-k-primary text-white shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">

      <CardContent className="flex h-full flex-col items-center justify-center p-8 text-center">

        <h3 className="text-4xl font-bold tracking-tight">
          {value}
        </h3>

        <p className="mt-3 text-white/85">
          {label}
        </p>

      </CardContent>

    </Card>
  );
}