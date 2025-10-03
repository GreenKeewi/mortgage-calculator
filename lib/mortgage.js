// Canadian Mortgage Calculator Utilities

// CMHC Insurance Rates (2024 rates)
const CMHC_RATES = {
    5: 0.04,      // 5-9.99% down payment
    10: 0.031,    // 10-14.99% down payment  
    15: 0.028     // 15-19.99% down payment
  };
  
  function getCMHCRate(downPaymentPercentage) {
    if (downPaymentPercentage >= 20) return 0;
    if (downPaymentPercentage >= 15) return CMHC_RATES[15];
    if (downPaymentPercentage >= 10) return CMHC_RATES[10];
    return CMHC_RATES[5];
  }
  
  function getPaymentsPerYear(frequency) {
    switch (frequency) {
      case 'weekly': return 52;
      case 'biweekly': return 26;
      case 'monthly': return 12;
      default: return 12;
    }
  }
  
  function formatCurrency(amount) {
    return new Intl.NumberFormat('en-CA', {
      style: 'currency',
      currency: 'CAD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  }
  
  function formatNumber(number) {
    return new Intl.NumberFormat('en-CA').format(number);
  }
  
  function calculateMortgage(data) {
    const {
      homePrice,
      downPayment,
      downPaymentType,
      interestRate,
      amortizationPeriod,
      paymentFrequency
    } = data;
  
    // Calculate down payment amount and percentage
    let downPaymentAmount, downPaymentPercentage;
    
    if (downPaymentType === 'percentage') {
      downPaymentPercentage = downPayment;
      downPaymentAmount = (homePrice * downPayment) / 100;
    } else {
      downPaymentAmount = downPayment;
      downPaymentPercentage = (downPayment / homePrice) * 100;
    }
  
    // Validate minimum down payment (5% in Canada)
    const minDownPayment = homePrice * 0.05;
    if (downPaymentAmount < minDownPayment) {
      return {
        error: `Minimum down payment required: ${formatCurrency(minDownPayment)} (5%)`
      };
    }
  
    // Calculate mortgage amount before CMHC insurance
    const mortgageAmount = homePrice - downPaymentAmount;
    
    // Calculate CMHC insurance if needed
    let cmhcInsurance = 0;
    if (downPaymentPercentage < 20) {
      const cmhcRate = getCMHCRate(downPaymentPercentage);
      cmhcInsurance = mortgageAmount * cmhcRate;
    }
  
    // Total mortgage amount including CMHC insurance
    const totalMortgageAmount = mortgageAmount + cmhcInsurance;
  
    // Calculate payment details
    const paymentsPerYear = getPaymentsPerYear(paymentFrequency);
    const totalPayments = amortizationPeriod * paymentsPerYear;
    const monthlyInterestRate = (interestRate / 100) / 12;
    const paymentInterestRate = (interestRate / 100) / paymentsPerYear;
  
    // Calculate payment using mortgage payment formula
    let payment = 0;
    if (paymentInterestRate > 0) {
      payment = totalMortgageAmount * 
        (paymentInterestRate * Math.pow(1 + paymentInterestRate, totalPayments)) /
        (Math.pow(1 + paymentInterestRate, totalPayments) - 1);
    } else {
      payment = totalMortgageAmount / totalPayments;
    }
  
    // Calculate totals
    const totalPaid = payment * totalPayments;
    const totalInterest = totalPaid - totalMortgageAmount;
    const totalCost = homePrice + totalInterest + (cmhcInsurance > 0 ? 0 : 0); // CMHC already included in mortgage
  
    return {
      payment: Math.round(payment),
      totalInterest: Math.round(totalInterest),
      totalCost: Math.round(totalPaid + downPaymentAmount),
      cmhcInsurance: Math.round(cmhcInsurance),
      mortgageAmount: Math.round(totalMortgageAmount),
      downPaymentAmount: Math.round(downPaymentAmount),
      downPaymentPercentage: Math.round(downPaymentPercentage * 100) / 100,
      paymentFrequency,
      homePrice,
      formatted: {
        payment: formatCurrency(payment),
        totalInterest: formatCurrency(totalInterest),
        totalCost: formatCurrency(totalPaid + downPaymentAmount),
        cmhcInsurance: formatCurrency(cmhcInsurance),
        mortgageAmount: formatCurrency(totalMortgageAmount),
        downPaymentAmount: formatCurrency(downPaymentAmount),
        homePrice: formatCurrency(homePrice)
      }
    };
  }