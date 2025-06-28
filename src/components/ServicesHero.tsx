
import { Clock, Shield, Star } from "lucide-react";

export default function ServicesHero() {
  return (
    <section className="bg-gradient-to-b from-orange-50 to-white py-12">
      <div className="container max-w-7xl mx-auto px-4 text-center">
        <h1 className="text-4xl font-bold mb-4">Professional Roadside Assistance</h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
          Industry-leading roadside services available 24/7. Our certified technicians follow strict safety protocols and industry standards to get you back on the road safely.
        </p>
        
        <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
          <div className="flex items-center gap-3">
            <Clock className="h-8 w-8 text-primary" />
            <div className="text-left">
              <h3 className="font-semibold">Fast Response</h3>
              <p className="text-sm text-muted-foreground">Average 20-30 min arrival</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Shield className="h-8 w-8 text-primary" />
            <div className="text-left">
              <h3 className="font-semibold">Fully Insured</h3>
              <p className="text-sm text-muted-foreground">Licensed & bonded technicians</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Star className="h-8 w-8 text-primary" />
            <div className="text-left">
              <h3 className="font-semibold">Rated 4.9/5</h3>
              <p className="text-sm text-muted-foreground">50,000+ satisfied customers</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
