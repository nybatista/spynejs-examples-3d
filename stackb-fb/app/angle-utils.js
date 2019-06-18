import {lte, findIndex} from 'ramda';
export class AngleUtils  {

  constructor(){
    this.debouncer = AngleUtils.angleDebouncer();
    this.angleName = undefined;
    this.prevIndex=-1;

    console.log('ramda is ',this.debouncer);


  }

  getAngleName(n){
    const angleArr = [0,45,135,225,315,365];

    const angleNameIndex = ['R','R','B','L','F','R']
    const pred = lte(n);
    var index =  findIndex(pred,angleArr);
    var angleName = angleNameIndex[index];
    return {index,angleName};


  }

  checkAngle(n){

    let sendEvent = this.debouncer(n);
    if (sendEvent === true) {
      var angle = THREE.Math.radToDeg(n)
      var angleNum = 180+angle;// 360-Math.abs(angle);
      let {index,angleName} = this.getAngleName(angleNum)
      let isNewIndex = index!==this.prevIndex;
      this.prevIndex = index;
      if (isNewIndex===true){
        return {index,angleName};
      }

    }
    return null;

  }

  static angleDebouncer(){
    const debouncer = ()=>{
      let bounceNum = 0;
      let maxBounceNum = 10;
      let prev =  undefined;
      let current = 0;

      const debounce = (n)=>{
        const prevExists = prev!==undefined;
        const current = n;
        const isDif = Math.abs(current-prev)>=.05;
        //const isNewNum = current!==prev && prevExists === true;
        const isNewNum = isDif===true && prevExists === true;
        prev = current;
        if (isNewNum===false){
          bounceNum ++
        } else{
          bounceNum = 0;
        }
        if (bounceNum === maxBounceNum){
          return true;
        }

        return false;

      }

      return debounce;
    }


    return debouncer();

  }





}