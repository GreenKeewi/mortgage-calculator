function ResultsCard({ results }) {
    try {
      if (results.error) {
        return (
          <div role="alert" className="alert alert-error">
            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <span>{results.error}</span>
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
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title text-2xl mb-4">Mortgage Breakdown</h2>
            
            <div className="stats stats-vertical shadow-inner bg-base-200">
              <div className="stat">
                <div className="stat-title"> {getFrequencyLabel(results.paymentFrequency)} Payment</div>
                <div className="stat-value text-primary">{results.formatted.payment}</div>
              </div>
            </div>

            <div className="flex flex-wrap -mx-2 mt-4">
                <div className="w-full md:w-1/2 px-2 mb-4">
                    <div className="stat">
                        <div className="stat-title">Home Price</div>
                        <div className="stat-value text-lg">{results.formatted.homePrice}</div>
                    </div>
                </div>
                <div className="w-full md:w-1/2 px-2 mb-4">
                    <div className="stat">
                        <div className="stat-title">Down Payment</div>
                        <div className="stat-value text-lg">{results.formatted.downPaymentAmount}</div>
                        <div className="stat-desc">{results.downPaymentPercentage}%</div>
                    </div>
                </div>
            </div>
            
            <div className="divider"></div>

            <div className="space-y-2">
                <div className="flex justify-between">
                    <span className="font-medium">Mortgage Amount</span>
                    <span className="font-mono">{results.formatted.mortgageAmount}</span>
                </div>
                {results.cmhcInsurance > 0 && (
                    <div className="flex justify-between">
                        <span className="font-medium">CMHC Insurance</span>
                        <span className="font-mono">{results.formatted.cmhcInsurance}</span>
                    </div>
                )}
            </div>

            <div className="divider"></div>

            <div className="stats stats-vertical shadow-inner bg-base-200">
                <div className="stat">
                    <div className="stat-title">Total Interest</div>
                    <div className="stat-value">{results.formatted.totalInterest}</div>
                </div>
                <div className="stat">
                    <div className="stat-title">Total Cost</div>
                    <div className="stat-value">{results.formatted.totalCost}</div>
                </div>
            </div>

            {results.downPaymentPercentage < 20 && (
              <div role="alert" className="alert alert-info mt-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                <div>
                  <h3 className="font-bold">CMHC Insurance Required</h3>
                  <div className="text-xs">With less than 20% down payment, CMHC mortgage insurance of {results.formatted.cmhcInsurance} is added to protect the lender.</div>
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
  