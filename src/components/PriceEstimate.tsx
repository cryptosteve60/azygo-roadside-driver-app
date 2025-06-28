
interface PriceEstimateProps {
  estimatedPrice: number;
}

export default function PriceEstimate({ estimatedPrice }: PriceEstimateProps) {
  return (
    <div className="mb-6 p-4 rounded-lg bg-primary/10 border border-primary/20">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="font-bold">Estimated Cost</h3>
          <p className="text-sm text-muted-foreground">Final price may vary based on your specific needs</p>
        </div>
        <div className="text-2xl font-bold text-primary">${estimatedPrice}</div>
      </div>
    </div>
  );
}
