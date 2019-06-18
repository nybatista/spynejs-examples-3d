import {lte, findIndex} from 'ramda';
export class AngleUtils  {

  constructor(){
    this.angleName = undefined;
    this.prevNameIndex=-1;
  }

  getAngleName(n){
    const angleArr = [0,45,135,225,315,365];
    const angleNameIndex = ['right','right','back','left','front','right']
    const pred = lte(n);
    const index =  findIndex(pred,angleArr);
    const angleName = angleNameIndex[index];
    return {index,angleName};


  }

  checkAngle(n){
    const angle = THREE.Math.radToDeg(n)
    const angleNum = 180+angle;// 360-Math.abs(angle);
      let {index,angleName} = this.getAngleName(angleNum)
      let isNewNameIndex = angleName!==this.prevNameIndex;
      this.prevNameIndex = angleName;
      if (isNewNameIndex===true){
        return {index,angleName};
      }
    return null;

  }






}