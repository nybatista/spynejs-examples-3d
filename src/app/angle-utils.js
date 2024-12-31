import { lte, findIndex } from 'ramda';
import { MathUtils } from 'three';

export class AngleUtils {
  constructor() {
    this.prevNameIndex = -1;
  }

  /**
   * Given an angle in degrees, returns which index it falls into
   * along with a corresponding "angle name."
   */
  getAngleName(deg) {
    const angleArr = [0, 45, 135, 225, 315, 365];
    const angleNameIndex = ['left', 'left', 'back', 'right', 'front', 'left'];
    // Example: lte(deg) => (x) => deg <= x
    const pred = lte(deg);
    const index = findIndex(pred, angleArr);
    const angleName = angleNameIndex[index];
    console.log("deg ",{deg, angleName})
    return { index, angleName };
  }

  /**
   * Takes an angle in radians, converts it to degrees,
   * offsets by 180, and checks whether the mapped angle name has changed
   * since last call. Returns { index, angleName } or null if unchanged.
   */
  checkAngle(radians) {
    const angleDeg = MathUtils.radToDeg(radians);
    const angleNum = 180 + angleDeg; // shift by 180
    const { index, angleName } = this.getAngleName(angleNum);
    const isNewNameIndex = angleName !== this.prevNameIndex;

    // Update the stored angleName
    if (isNewNameIndex) {
      this.prevNameIndex = angleName;
      return { index, angleName };
    }
    return null;
  }
}
