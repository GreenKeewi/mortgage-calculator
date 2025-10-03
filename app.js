class ErrorBoundary extends React.Component {
    constructor(props) {
      super(props);
      this.state = { hasError: false, error: null };
    }
  
    static getDerivedStateFromError(error) {
      return { hasError: true, error };
    }
  
    componentDidCatch(error, errorInfo) {
      console.error('ErrorBoundary caught an error:', error, errorInfo.componentStack);
    }
  
    render() {
      if (this.state.hasError) {
        return (
          <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-gray-900 mb-4">Something went wrong</h1>
              <p className="text-gray-600 mb-4">We're sorry, but something unexpected happened.</p>
              <button
                onClick={() => window.location.reload()}
                className="btn btn-black"
              >
                Reload Page
              </button>
            </div>
          </div>
        );
      }
  
      return this.props.children;
    }
  }
  
  function App() {
    try {
      const [mortgageData, setMortgageData] = React.useState({
        homePrice: 500000,
        downPayment: 100000,
        downPaymentType: 'amount', // 'percentage' or 'amount'
        interestRate: 5.25,
        amortizationPeriod: 25,
        paymentFrequency: 'monthly'
      });
  
      const results = React.useMemo(() => {
        return calculateMortgage(mortgageData);
      }, [mortgageData]);
  
      return (
        <div className="min-h-screen py-8 px-4" data-name="app" data-file="app.js" style={{backgroundColor: 'hsl(var(--background))'}}>
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold mb-2" style={{color: 'hsl(var(--foreground))'}}>
                Canadian Mortgage Calculator
              </h1>
              <p className="text-lg" style={{color: 'hsl(var(--muted-foreground))'}}>
                Calculate your mortgage payments with CMHC insurance included
              </p>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-8">
              <MortgageForm 
                mortgageData={mortgageData} 
                setMortgageData={setMortgageData} 
              />
              <ResultsCard results={results} />
            </div>
            
            <footer className="text-center mt-12 pt-8" style={{borderTop: '1px solid hsl(var(--border))'}}>
              <p className="text-sm" style={{color: 'hsl(var(--muted-foreground))'}}>
                For official CMHC information, visit{' '}
                <a 
                  href="https://www.cmhc-schl.gc.ca" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:underline"
                  style={{color: 'hsl(var(--primary))'}}
                >
                  CMHC-SCHL.gc.ca
                </a>
                {' '}• © 2025 Canadian Mortgage Calculator
              </p>
            </footer>
          </div>
        </div>
      );
    } catch (error) {
      console.error('App component error:', error);
      return null;
    }
  }
  
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  );