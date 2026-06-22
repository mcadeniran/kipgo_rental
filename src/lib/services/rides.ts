import { rtdb } from '@/app/[locale]/firebase/config';
import {
  ref,
  get,
  query,
  orderByChild,
  startAfter,
  limitToFirst,
} from 'firebase/database';

export type Ride = {
  id: string;
  driverId: string;
  driverName: string;
  driverPhone: string;
  userId: string;
  username: string;
  userPhone: string;
  originAddress: string;
  destinationAddress: string;
  status: string;
  // time: number;
  time: string | number | Date;
};

const PAGE_SIZE = 20;

export async function getAllRides(): Promise<Ride[]> {
  const ridesRef = ref(rtdb, 'All Ride Requests'); // 👈 adjust path if needed
  const snapshot = await get(ridesRef);

  if (!snapshot.exists()) return [];

  const data = snapshot.val();
  return Object.keys(data).map((key) => ({
    id: key,
    ...data[key],
  }));
}

export async function getRidesPage(
  lastKey: string | null = null,
): Promise<{ rides: Ride[]; lastKey: string | null }> {
  let ridesQuery;

  if (lastKey) {
    ridesQuery = query(
      ref(rtdb, 'All Ride Requests'),
      orderByChild('time'),
      startAfter(lastKey),
      limitToFirst(PAGE_SIZE),
    );
  } else {
    ridesQuery = query(
      ref(rtdb, 'All Ride Requests'),
      orderByChild('time'),
      limitToFirst(PAGE_SIZE),
    );
  }

  const snapshot = await get(ridesQuery);
  if (!snapshot.exists()) return { rides: [], lastKey: null };

  const data = snapshot.val();
  const rides = Object.keys(data).map((key) => ({
    id: key,
    ...data[key],
  }));

  // lastKey will be the last ride’s "time"
  const newLastKey = rides.length > 0 ? rides[rides.length - 1].time : null;

  return { rides, lastKey: newLastKey };
}

// export async function getRidesPage(
//   lastKey: string | number | null = null
// ): Promise<{ rides: Ride[]; lastKey: string | number | null }> {
//   let ridesQuery;

//   if (lastKey) {
//     ridesQuery = query(
//       ref(rtdb, 'All Ride Requests'),
//       orderByChild('time'),
//       startAfter(lastKey),
//       limitToFirst(PAGE_SIZE)
//     );
//   } else {
//     ridesQuery = query(
//       ref(rtdb, 'All Ride Requests'),
//       orderByChild('time'),
//       limitToFirst(PAGE_SIZE)
//     );
//   }

//   const snapshot = await get(ridesQuery);
//   if (!snapshot.exists()) return { rides: [], lastKey: null };

//   const data = snapshot.val();

//   const rides: Ride[] = Object.keys(data).map((key) => ({
//     id: key,
//     ...data[key],
//   }));

//   // Ensure `time` is a number (for pagination & sorting)
//   const normalized = rides.map((r) => ({
//     ...r,
//     time:
//       typeof r.time === 'string' || r.time instanceof Date
//         ? new Date(r.time).getTime()
//         : r.time,
//   }));

//   const newLastKey =
//     normalized.length > 0 ? normalized[normalized.length - 1].time : null;

//   return { rides: normalized, lastKey: newLastKey };
// }

export function searchRides(rides: Ride[], query: string): Ride[] {
  if (!query) return rides;
  const lower = query.toLowerCase();
  return rides.filter(
    (ride) =>
      ride.username.toLowerCase().includes(lower) ||
      ride.userPhone.toLowerCase().includes(lower) ||
      ride.driverName.toLowerCase().includes(lower) ||
      ride.driverPhone.toLowerCase().includes(lower) ||
      ride.originAddress.toLowerCase().includes(lower) ||
      ride.destinationAddress.toLowerCase().includes(lower),
  );
}
