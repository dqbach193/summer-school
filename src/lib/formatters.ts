const CURRENCY_FORMATTER = new Intl.NumberFormat("vi-VN", {
    currency: "VND",
    style: "currency",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })
  
  export function formatCurrency(amount: number) {
    return CURRENCY_FORMATTER.format(amount)
  }
  
  const NUMBER_FORMATTER = new Intl.NumberFormat("vi-VN")
  
  export function formatNumber(number: number) {
    return NUMBER_FORMATTER.format(number)
  }
  