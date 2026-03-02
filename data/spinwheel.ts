export interface WheelSegment {
  label: string;
  color: string;
  textColor: string;
  probabilityWeight: number;
  couponCode: string | null;
  type: "coupon" | "points" | "none";
  pointsValue?: number;
}

export const wheelSegments: WheelSegment[] = [
  {
    label: "5% Off",
    color: "#292524",
    textColor: "#ffffff",
    probabilityWeight: 25,
    couponCode: "SPIN5",
    type: "coupon",
  },
  {
    label: "10% Off",
    color: "#44403c",
    textColor: "#ffffff",
    probabilityWeight: 20,
    couponCode: "SPIN10",
    type: "coupon",
  },
  {
    label: "Free Ship",
    color: "#57534e",
    textColor: "#ffffff",
    probabilityWeight: 15,
    couponCode: "SPINSHIP",
    type: "coupon",
  },
  {
    label: "\u20B9100 Off",
    color: "#78716c",
    textColor: "#ffffff",
    probabilityWeight: 12,
    couponCode: "SPIN100",
    type: "coupon",
  },
  {
    label: "\u20B9200 Off",
    color: "#a8a29e",
    textColor: "#292524",
    probabilityWeight: 8,
    couponCode: "SPIN200",
    type: "coupon",
  },
  {
    label: "15% Off",
    color: "#d6d3d1",
    textColor: "#292524",
    probabilityWeight: 5,
    couponCode: "SPIN15",
    type: "coupon",
  },
  {
    label: "Try Again",
    color: "#e7e5e4",
    textColor: "#57534e",
    probabilityWeight: 10,
    couponCode: null,
    type: "none",
  },
  {
    label: "50 Points",
    color: "#f5f5f4",
    textColor: "#292524",
    probabilityWeight: 5,
    couponCode: null,
    type: "points",
    pointsValue: 50,
  },
];

export function spinForPrize(): number {
  const totalWeight = wheelSegments.reduce((sum, s) => sum + s.probabilityWeight, 0);
  let random = Math.random() * totalWeight;

  for (let i = 0; i < wheelSegments.length; i++) {
    random -= wheelSegments[i].probabilityWeight;
    if (random <= 0) return i;
  }

  return 0;
}

export function getRotationForSegment(index: number): number {
  const segmentAngle = 360 / wheelSegments.length;
  // Target the center of the segment, measured from top (12 o'clock position)
  // Segments are drawn clockwise starting from the right (3 o'clock), so we adjust
  const targetAngle = segmentAngle * index + segmentAngle / 2;
  // 5 full rotations + offset so the target ends at the top (pointer position)
  const fullSpins = 5 * 360;
  return fullSpins + (360 - targetAngle);
}
