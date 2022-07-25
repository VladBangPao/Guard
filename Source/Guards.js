export class Guards{
    constructor(){
    }

    isNKeys(obj, n){
        return (Object.keys(obj).length==n)
    }

    greaterThanNKeys(obj, n){
        return (Object.keys(obj).length>n)
    }

    isArr(v){ return ((Array.isArray(v)) && v.length) }

    isStr(v){
        return (typeof v === 'string' || v instanceof String)
    }

    isStrArr(v){
        if(!this.isArr(v)){ return }
        v.forEach( (e) => { if( !this.isStr(e) ) { return } } );
        return true
    }

    isEnc(v){
        return Buffer.isEncoding(v);
    }

    isEncArr(v){
        if(!this.isArr(v)) {return}
        v.forEach( (e) => { if( !Buffer.isEncoding(e) ) { return } } );
        return true

    }

    isObj(v){ 
        return (typeof v === 'object')    
    }

    isObjArr(v){
        if(!this.isArr(v)) {return}
        v.forEach( (e) => { if( !this.isObj(e) ) { return } } );
        return true
    }

    isEmptyObj(obj){
        return Object.keys(obj).length === 0;
    }

    isInt(v){
        var x;
        return isNaN(value) ? !1 : (x = parseFloat(value), (0 | x) === x); //
    }

    isIntArr(v){
        if(!this.isArr(v)) {return}
        v.forEach( (e) => { if( !this.isInt(e) ) { return } } );
        return true
    }

    isBuff(v){ return Buffer.isBuffer(v); }

    isBuffArr(v){
          if(!this.isArr(v)) { return }
          v.forEach((e)=>{ if(!Buffer.isBuffer(e)){ return } })
          return true
    }

    isNull(v){ return (v==null || v===null) }

    isUndef(v){ return (typeof v === "undefined" || v===undefined) }

    isReg(v){ return (v instanceof RegExp || v.constructor == RegExp) }

    isArrReg(v){
        if(!this.isArr(v)) { return }
        v.forEach((e)=>{ if(!this.isReg(e)){ return } })
        return true
    }

}
