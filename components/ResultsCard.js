function ResultsCard({ results }) {
    try {
      if (results.error) {
        return (
          <div className="card p-6" data-name="results-card" data-file="components/ResultsCard.js">
            <div className="text-center py-8">
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-red-100 flex items-center justify-center">
                <div className="icon-alert-circle text-xl text-red-600"></div>
              </div>
              <h3 className="text-lg font-semibold mb-2" style={{color: 'hsl(var(--foreground))'}}>
                Validation Error
              </h3>
              <p className="text-red-600">{results.error}</p>
            </div>
          </div>
        );
      }
  
      const getFrequencyLabel = (frequency) => {
        switch (frequency) {
          case 'weekly': return 'Weekly';
          case 'biweekly': return 'Bi-weekly';
          case 'monthly': return 'Monthly';
          default: return 'Monthly';
        }
      };
  
      return (
        <div className="card p-6" data-name="results-card" data-file="components/ResultsCard.js">
          <h2 className="text-2xl font-semibold mb-6" style={{color: 'hsl(var(--card-foreground))'}}>
            Mortgage Breakdown
          </h2>
          
          <div className="space-y-6">
            {/* Main Payment */}
            <div className="rounded-lg p-4" style={{backgroundColor: 'hsl(var(--primary) / 0.1)'}}>
              <div className="text-center">
                <p className="text-sm mb-1" style={{color: 'hsl(var(--muted-foreground))'}}>
                  {getFrequencyLabel(results.paymentFrequency)} Payment
                </p>
                <p className="text-3xl font-bold" style={{color: 'hsl(var(--primary))'}}>
                  {results.formatted.payment}
                </p>
              </div>
            </div>
  
            {/* Key Details */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm" style={{color: 'hsl(var(--muted-foreground))'}}>Home Price</p>
                <p className="text-lg font-semibold">{results.formatted.homePrice}</p>
              </div>
              <div>
                <p className="text-sm" style={{color: 'hsl(var(--muted-foreground))'}}>Down Payment</p>
                <p className="text-lg font-semibold">
                  {results.formatted.downPaymentAmount}
                  <span className="text-sm ml-1" style={{color: 'hsl(var(--muted-foreground))'}}>
                    ({results.downPaymentPercentage}%)
                  </span>
                </p>
              </div>
            </div>
  
            <hr style={{borderColor: 'hsl(var(--border))'}} />
  
            {/* Mortgage Details */}
            <div className="space-y-4">
              <div>
                <p className="text-sm" style={{color: 'hsl(var(--muted-foreground))'}}>Mortgage Amount</p>
                <p className="text-lg font-semibold">{results.formatted.mortgageAmount}</p>
              </div>
              
              {results.cmhcInsurance > 0 && (
                <div>
                  <p className="text-sm" style={{color: 'hsl(var(--muted-foreground))'}}>CMHC Insurance Premium</p>
                  <p className="text-lg font-semibold">{results.formatted.cmhcInsurance}</p>
                </div>
              )}
            </div>
  
            <hr style={{borderColor: 'hsl(var(--border))'}} />
  
            {/* Summary */}
            <div className="space-y-4">
              <div>
                <p className="text-sm" style={{color: 'hsl(var(--muted-foreground))'}}>Total Interest</p>
                <p className="text-lg font-semibold">{results.formatted.totalInterest}</p>
              </div>
              <div className="rounded-lg p-4" style={{backgroundColor: 'hsl(var(--secondary))'}}>
                <p className="text-sm mb-1" style={{color: 'hsl(var(--muted-foreground))'}}>Total Cost</p>
                <p className="text-xl font-bold" style={{color: 'hsl(var(--foreground))'}}>
                  {results.formatted.totalCost}
                </p>
              </div>
            </div>
  
            {/* CMHC Info */}
            {results.downPaymentPercentage < 20 && (
              <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded">
                <div className="flex">
                  <div className="w-5 h-5 mr-3 mt-0.5">
                    <div className="icon-info text-lg text-blue-600"></div>
                  </div>
                  <div>
                    <p className="text-sm text-blue-800">
                      <strong>CMHC Insurance Required:</strong> With less than 20% down payment, 
                      CMHC mortgage insurance of {results.formatted.cmhcInsurance} is added to protect the lender.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      );
    } catch (error) {
      console.error('ResultsCard component error:', error);
      return null;
    }
  }
  