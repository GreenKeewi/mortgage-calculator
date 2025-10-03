function MortgageForm({ mortgageData, setMortgageData }) {
    try {
      const [errors, setErrors] = React.useState({});
  
      const validateInput = (name, value) => {
        const newErrors = { ...errors };
        
        switch (name) {
          case 'homePrice':
            if (value <= 0) {
              newErrors[name] = 'Home price must be positive';
            } else {
              delete newErrors[name];
            }
            break;
          case 'downPayment':
            const minDownPayment = mortgageData.downPaymentType === 'percentage' ? 5 : mortgageData.homePrice * 0.05;
            if (value < minDownPayment) {
              newErrors[name] = mortgageData.downPaymentType === 'percentage' 
                ? 'Minimum 5% down payment required'
                : `Minimum ${formatCurrency(minDownPayment)} required`;
            } else {
              delete newErrors[name];
            }
            break;
          case 'interestRate':
            if (value < 0 || value > 20) {
              newErrors[name] = 'Interest rate must be between 0-20%';
            } else {
              delete newErrors[name];
            }
            break;
        }
        
        setErrors(newErrors);
      };
  
      const handleInputChange = (name, value) => {
        const numericValue = parseFloat(value) || 0;
        setMortgageData(prev => ({ ...prev, [name]: numericValue }));
        validateInput(name, numericValue);
      };
  
      const toggleDownPaymentType = () => {
        const newType = mortgageData.downPaymentType === 'percentage' ? 'amount' : 'percentage';
        let newDownPayment;
        
        if (newType === 'percentage') {
          newDownPayment = Math.round((mortgageData.downPayment / mortgageData.homePrice) * 100 * 100) / 100;
        } else {
          newDownPayment = Math.round((mortgageData.homePrice * mortgageData.downPayment) / 100);
        }
        
        setMortgageData(prev => ({
          ...prev,
          downPaymentType: newType,
          downPayment: newDownPayment
        }));
      };
  
      return (
        <div className="card p-6" data-name="mortgage-form" data-file="components/MortgageForm.js">
          <h2 className="text-2xl font-semibold mb-6" style={{color: 'var(--card-foreground)'}}>
            Mortgage Details
          </h2>
          
          <div className="space-y-6">
            {/* Home Price */}
            <div>
              <label className="block text-sm font-medium mb-2" style={{color: 'var(--foreground)'}}>
                Home Price (CAD)
              </label>
              <input
                type="number"
                className={`input ${errors.homePrice ? 'border-red-500' : ''}`}
                value={mortgageData.homePrice}
                onChange={(e) => handleInputChange('homePrice', e.target.value)}
                placeholder="500,000"
              />
              {errors.homePrice && (
                <p className="text-red-500 text-sm mt-1">{errors.homePrice}</p>
              )}
            </div>
  
            {/* Down Payment */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium" style={{color: 'var(--foreground)'}}>
                  Down Payment
                </label>
                <div className="flex items-center space-x-2">
                  <span className="text-sm" style={{color: 'var(--muted-foreground)'}}>$</span>
                  <div 
                    className="toggle"
                    data-state={mortgageData.downPaymentType === 'percentage' ? 'checked' : 'unchecked'}
                    onClick={toggleDownPaymentType}
                  >
                    <div className="toggle-thumb"></div>
                  </div>
                  <span className="text-sm" style={{color: 'var(--muted-foreground)'}}>%</span>
                </div>
              </div>
              <input
                type="number"
                className={`input ${errors.downPayment ? 'border-red-500' : ''}`}
                value={mortgageData.downPayment}
                onChange={(e) => handleInputChange('downPayment', e.target.value)}
                placeholder={mortgageData.downPaymentType === 'percentage' ? '20' : '100,000'}
              />
              {errors.downPayment && (
                <p className="text-red-500 text-sm mt-1">{errors.downPayment}</p>
              )}
            </div>
  
            {/* Interest Rate */}
            <div>
              <label className="block text-sm font-medium mb-2" style={{color: 'var(--foreground)'}}>
                Interest Rate (%)
              </label>
              <input
                type="number"
                step="0.01"
                className={`input ${errors.interestRate ? 'border-red-500' : ''}`}
                value={mortgageData.interestRate}
                onChange={(e) => handleInputChange('interestRate', e.target.value)}
                placeholder="5.25"
              />
              {errors.interestRate && (
                <p className="text-red-500 text-sm mt-1">{errors.interestRate}</p>
              )}
            </div>
  
            {/* Amortization Period */}
            <div>
              <label className="block text-sm font-medium mb-2" style={{color: 'var(--foreground)'}}>
                Amortization Period
              </label>
              <select
                className="select"
                value={mortgageData.amortizationPeriod}
                onChange={(e) => setMortgageData(prev => ({ ...prev, amortizationPeriod: parseInt(e.target.value) }))}
              >
                {[5, 10, 15, 20, 25, 30].map(years => (
                  <option key={years} value={years}>
                    {years} years
                  </option>
                ))}
              </select>
            </div>
  
            {/* Payment Frequency */}
            <div>
              <label className="block text-sm font-medium mb-2" style={{color: 'var(--foreground)'}}>
                Payment Frequency
              </label>
              <select
                className="select"
                value={mortgageData.paymentFrequency}
                onChange={(e) => setMortgageData(prev => ({ ...prev, paymentFrequency: e.target.value }))}
              >
                <option value="monthly">Monthly</option>
                <option value="biweekly">Bi-weekly</option>
                <option value="weekly">Weekly</option>
              </select>
            </div>
          </div>
        </div>
      );
    } catch (error) {
      console.error('MortgageForm component error:', error);
      return null;
    }
  }