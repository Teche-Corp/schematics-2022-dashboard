import axios from 'axios';

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

export const defaultToastMessage = {
  loading: 'Loading...',
  success: 'Berhasil',
  error: (err) =>
    err?.response?.data?.msg ?? 'Terjadi kesalahan, mohon coba lagi',
};

/**
 * @param {number} percentage in percentage number. Ex: 5
 */
export function calculateDiscount(base, percentage) {
  return base * (1 - percentage / 100);
}

export const formatUTC = (dateInt, addOffset = false) => {
  let date = !dateInt || dateInt.length < 1 ? new Date() : new Date(dateInt);
  if (typeof dateInt === 'string') {
    return date;
  } else {
    const offset = addOffset
      ? date.getTimezoneOffset()
      : -date.getTimezoneOffset();
    const offsetDate = new Date();
    offsetDate.setTime(date.getTime() + offset * 60000);
    return offsetDate;
  }
};

export function getNLCTeamStatus(team) {
  console.log(team);
  if (team.status !== 'payment_verified') {
    return team.status;
  }
  return team.status;
}

export function isAbleNLCBingo(team) {
  const members = team.members;
  for (let member of members) {
    if (member.bingo_file_url === null) {
      return false;
    }
  }
  return true;
}

export function isNLCMemberHasBingo(team, name) {
  const members = team.members;
  const member = members.find((member) => {
    return member.name === name;
  });
  return member.bingo_file_url === null;
}

export function getTicketOption(n) {
  const res = [];
  for (let i = 1; i <= n; i++) {
    res.push({
      text: i.toString(),
      value: i,
    });
  }
  return res;
}

export function getTimeByTimeZone(offset) {
  // create Date object for current location
  var d = new Date();

  // convert to msec
  // subtract local time zone offset
  // get UTC time in msec
  var utc = d.getTime() + d.getTimezoneOffset() * 60000;

  // create new Date object for different city
  // using supplied offset
  var nd = new Date(utc + 3600000 * offset);

  return nd;
}
