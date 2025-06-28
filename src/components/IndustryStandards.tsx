export default function IndustryStandards() {
  return <section className="bg-gray-50 py-12">
      <div className="container max-w-4xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Industry Standards & Certifications</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4 text-center">Safety Standards</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>• ANSI/ACCT safety protocols compliance</li>
              <li>• DOT-certified equipment and procedures</li>
              <li>• OSHA workplace safety standards</li>
              <li>• Regular safety training and certification</li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4 text-center">Quality Assurance</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>• ISO 9001:2015 quality management</li>
              <li>• AAA-approved service standards</li>
              <li>• Continuous technician training programs</li>
              <li>• Customer satisfaction guarantee</li>
            </ul>
          </div>
        </div>
      </div>
    </section>;
}