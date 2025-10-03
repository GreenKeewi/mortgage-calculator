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
        <div className="card bg-base-100 shadow-xl p-6">
          <h2 className="text-2xl font-semibold mb-6">
            Mortgage Details
          </h2>
          
          <div className="space-y-6">
            {/* Home Price */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Home Price (CAD)</span>
              </label>
              <input
                type="number"
                className={`input input-bordered ${errors.homePrice ? 'input-error' : ''}`}
                value={mortgageData.homePrice}
                onChange={(e) => handleInputChange('homePrice', e.target.value)}
                placeholder="500,000"
              />
              {errors.homePrice && (
                <label className="label">
                  <span className="label-text-alt text-error">{errors.homePrice}</span>
                </label>
              )}
            </div>
  
            {/* Down Payment */}
            <div className="form-control">
                <label className="label">
                    <span className="label-text">Down Payment</span>
                </label>
                <div className="join">
                    <input
                        type="number"
                        className={`input input-bordered join-item ${errors.downPayment ? 'input-error' : ''}`}
                        value={mortgageData.downPayment}
                        onChange={(e) => handleInputChange('downPayment', e.target.value)}
                        placeholder={mortgageData.downPaymentType === 'percentage' ? '20' : '100,000'}
                    />
                    <button 
                        className="btn join-item"
                        onClick={toggleDownPaymentType}
                    >
                        {mortgageData.downPaymentType === 'percentage' ? '%' : '$'}
                    </button>
                </div>
                {errors.downPayment && (
                    <label className="label">
                        <span className="label-text-alt text-error">{errors.downPayment}</span>
                    </label>
                )}
            </div>
  
            {/* Interest Rate */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Interest Rate (%)</span>
              </label>
              <input
                type="number"
                step="0.01"
                className={`input input-bordered ${errors.interestRate ? 'input-error' : ''}`}
                value={mortgageData.interestRate}
                onChange={(e) => handleInputChange('interestRate', e.target.value)}
                placeholder="5.25"
              />
              {errors.interestRate && (
                <label className="label">
                  <span className="label-text-alt text-error">{errors.interestRate}</span>
                </label>
              )}
            </div>
  
            {/* Amortization Period */}
            <div className="form-control">
                <label className="label">
                    <span className="label-text">Amortization Period</span>
                </label>
                <select
                    className="select select-bordered"
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
            <div className="form-control">
                <label className="label">
                    <span className="label-text">Payment Frequency</span>
                </label>
                <select
                    className="select select-bordered"
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