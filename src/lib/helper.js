export function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export function bearerToken(contentType) {
  const token = localStorage.getItem('token');
  const headers = {};

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  return headers;
}

export function numberToRupiah(number) {
  return Intl.NumberFormat('id', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(number);
}
