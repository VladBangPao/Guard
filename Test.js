import {Guard} from './Guard.js'
import {Guards} from './Source/Guards.js'
import * as assert from "node:assert"
import * as util from "node:util"

class TestObj{
    constructor(v, expectedResult){
        this.expectedResult=expectedResult
		new Guard(new Guards(), v, GUARD,  this)
    }

    isString(v){
        assert.equal("isString", this.expectedResult[0])
        assert.deepEqual(v, this.expectedResult[1])
        console.log("isString("+ this.expectedResult[1]+')', 'PASSES')
    }

    isStringIsString(v){
        assert.equal("isStringIsString", this.expectedResult[0])
        assert.deepEqual(v, this.expectedResult[1])
        console.log("isStringIsString("+ this.expectedResult[1]+')', 'PASSES')
    }

    isStringIsStringIsInteger(v){
        assert.equal("isStringIsStringIsInteger", this.expectedResult[0])
        assert.deepEqual(v, this.expectedResult[1])
        console.log("isStringIsStringIsInteger("+ this.expectedResult[1]+')', 'PASSES')   
    }

    isStringIsIntegerIsString(v){
        assert.equal("isStringIsIntegerIsString", this.expectedResult[0])
        assert.deepEqual(v, this.expectedResult[1])
        console.log("isStringIsIntegerIsString("+ this.expectedResult[1]+')', 'PASSES')    

    }

    isStringIsIntegerIsInteger(v){
        assert.equal("isStringIsIntegerIsInteger", this.expectedResult[0])
        assert.deepEqual(v, this.expectedResult[1])
        console.log("isStringIsIntegerIsInteger("+ this.expectedResult[1]+')', 'PASSES')    
    }
    

    isInteger(v){
        assert.equal("isInteger", this.expectedResult[0])
        assert.deepEqual(v, this.expectedResult[1])
        console.log("isInteger("+ this.expectedResult[1]+')', 'PASSES')     
    }
    isIntegerIsInteger(v){
        assert.equal("isIntegerIsInteger", this.expectedResult[0])
        assert.deepEqual(v, this.expectedResult[1])
        console.log("isIntegerIsInteger("+ this.expectedResult[1]+')', 'PASSES') 
    }

    isIntegerIsString(v){
        assert.equal("isIntegerIsString", this.expectedResult[0])
        assert.deepEqual(v, this.expectedResult[1])
        console.log("isIntegerIsString("+ this.expectedResult[1]+')', 'PASSES') 
    }

    isIntegerIsIntegerArray(v){
        assert.equal("isIntegerIsIntegerArray", this.expectedResult[0])
        assert.deepEqual(v, this.expectedResult[1])
        console.log("isIntegerIsIntegerArray("+ this.expectedResult[1]+')', 'PASSES')    
    }
    isIntegerIsArray(v){
        assert.equal("isIntegerIsArray", this.expectedResult[0])
        assert.deepEqual(v, this.expectedResult[1])
        console.log("isIntegerIsArray("+ this.expectedResult[1]+')', 'PASSES')
    }
    isStringIsEncodingIsInteger(v){
        assert.equal("isStringIsEncodingIsInteger", this.expectedResult[0])
        assert.deepEqual(v, this.expectedResult[1])
        console.log("isStringIsEncodingIsInteger("+ this.expectedResult[1]+')', 'PASSES')
    }

	isArrayIsArrayIsArrayIsArray(v){
		assert.equal("isArrayIsArrayIsArrayIsArray", this.expectedResult[0])
        assert.deepEqual(v, this.expectedResult[1])
        console.log("isArrayIsArrayIsArrayIsArray("+ JSON.stringify(this.expectedResult[1])+')', 'PASSES')
	}

	isArrayIsIntegerIsArrayIsArray(v){
		assert.equal("isArrayIsIntegerIsArrayIsArray", this.expectedResult[0])
        assert.deepEqual(v, this.expectedResult[1])
        console.log("isArrayIsIntegerIsArrayIsArray("+ JSON.stringify(this.expectedResult[1])+')', 'PASSES')
	}

	isArrayIsStringIsIntegerIsArray(v){
		assert.equal("isArrayIsStringIsIntegerIsArray", this.expectedResult[0])
        assert.deepEqual(v, this.expectedResult[1])
        console.log("isArrayIsStringIsIntegerIsArray("+ JSON.stringify(this.expectedResult[1])+')', 'PASSES')
	}

	isObjectIsObjectIsStringIsInteger(v){
		assert.equal("isObjectIsObjectIsStringIsInteger", this.expectedResult[0])
        assert.deepEqual(v, this.expectedResult[1])
        console.log("isObjectIsObjectIsStringIsInteger("+ JSON.stringify(this.expectedResult[1])+')', 'PASSES')
	}

	isObjectIsObjectIsStringIsObject(v){
		assert.equal("isObjectIsObjectIsStringIsObject", this.expectedResult[0])
        assert.deepEqual(v, this.expectedResult[1])
        console.log("isObjectIsObjectIsStringIsObject("+ JSON.stringify(this.expectedResult[1])+')', 'PASSES')
	}

	isObjectIsObjectIsObjectIsInteger(v){
		assert.equal("isObjectIsObjectIsObjectIsInteger", this.expectedResult[0])
        assert.deepEqual(v, this.expectedResult[1])
        console.log("isObjectIsObjectIsObjectIsInteger("+ JSON.stringify(this.expectedResult[1])+')', 'PASSES')
	}
	
	isObjectIsObjectIsObjectIsString(v){
		assert.equal("isObjectIsObjectIsObjectIsString", this.expectedResult[0])
        assert.deepEqual(v, this.expectedResult[1])
        console.log("isObjectIsObjectIsObjectIsString("+ JSON.stringify(this.expectedResult[1])+')', 'PASSES')
	}

	isObjectIsObjectIsArray(v){
		assert.equal("isObjectIsObjectIsArray", this.expectedResult[0])
        assert.deepEqual(v, this.expectedResult[1])
        console.log("isObjectIsObjectIsArray("+ JSON.stringify(this.expectedResult[1])+')', 'PASSES')
	}
}
//new TestObj(['someString'], ['isString', ['someString']])

class GookUtils{   
    constructor(pk, rkp, bp){
        //payload key
        this.pk=pk
        //recursive key pattern
        this.rkp=rkp
        //base case pattern
        this.bp=bp
    }
    getPayload(obj){if(obj[this.pk]){return {[this.pk]:obj[this.pk]}}}

    getRecursive(obj){
        //do a regex match on the key space to get the recursive object
        for(var i = 0; i< Object.keys(obj).length; i++){
            var match = Object.keys(obj)[i].match(this.rkp)
            if(match[0]){
                return {[match[0]]:obj[match[0]]}
            }
        }
    }
    
    getBase(obj){
        //returns base case if present
        // a base has a key pattern or a association pattern
        //the pattern is described in an object
        //{
        //  'key':/regex/
        //}
        //or
        //its arbitrary what a base can be represented as, so that can have its own recursion
        //base case is a lookahead function that tries to match the base case if its a subset of the
        //recursion 
        //{
        //  'association':{
        //      'key':/regex/
        //      'n':someInteger   
        //  } 
        //}
        //{
        //  'array':{
        //      'types':['0-100', /strRegex/, {'key':/regex/}, {'association':{'key':/regex/, 'n':someInteger}}]
        //      'n':numberOfItems
        //         
        //  } 
        //}
        //
        //

    }
}

class GookWalk{
    constructor(pk, rkp, bp){
        this.gut=new GookUtils(pk, rkp, bp)
    }
    walk(gook){
        //identify if the next recursive case is an object or array or base case


    }
}

class GaurdWalk{
    constructor(){
        this.g=new Guards()
        this.r=new RandGen()
        this.u=new GookUtils()
    }
    walk(guard){
        var arr = []
        for(var i = 0; i<gook.length; i++){
            var arr=[]
            arr.push(this._walk(guard[i], arr))
        }
        return arr
    }
    _walk(guard, arr){
        for(var i = 0; i<guard[this.getGuardKey(guard)].length; i++){
            if(this.isBaseStep(guard[this.getGuardKey(guard)][i])){
                console.log("IS BASE STEP")
                arr.push(guard[this.getGuardKey(guard)][i])
            }else if(this.isGeneralStep(guard[this.getGuardKey(guard)][i])){
                console.log("IS GENERAL STEP")

                if(this.isGeneralDefStep(guard[this.getGuardKey(guard)][i])){
                    //if it has a default key
                    //we need to add default association to the array alongside the other
                    //key without its association
                    var obj = {
                        '~DEFAULT~':guard[this.getGuardKey(guard)][i]['~DEFAULT~'],
                        'GUARD':guard[this.getGuardKey(guard)][i][this.getGuardKey(guard[this.getGuardKey(guard)])]
                    }
                    arr.push(obj)
                    this._walk(guard[this.getGuardKey(guard)][i], arr)
                }else{
                    //if it does not have a default key
                    //just add the key to the array
                    var obj = {
                        'GUARD':guard[this.getGuardKey(guard)][i][Object.keys(guard[this.getGuardKey(guard)])[0]]
                    }
                    arr.push(obj)
                    this._walk(guard[this.getGuardKey(guard)][i], arr)
                }
            }
        }
        return arr
    }

}

class RandGen{
    randStr(){return this.genStr(this.randRange(0, 3))}
    randInt(){return this.randRange(0,3)}
    randArr(n){var arr=[]; for(var i=0;i<n;i++){arr.push(this.rand())}; return arr}
    rand(){
        return[
            this.randIntArr, this.randStr, this.randInt, this.randEnc, this.randEncArr, this.randStrArr,
            this.randObj, this.randObjArr, this.randBuff,this.randBuffArr, this.randReg, this.randRegArr
        ].sample()()
    }
    randIntArr(n=this.randInt()){var arr=[]; for(var i=0;i<n;i++){arr.push(this.randInt())}; return arr}
    randEnc(){return "utf8"}
    randEncArr(){return ['utf8']}
    randStrArr(n=this.randInt()){var arr=[]; for(var i=0;i<n;i++){arr.push(this.randStr())}; return arr}
    randObj(n=this.randInt()){if(n){return {[this.randStr()]:this.randObj(n-1)}}};
    randObjArr(n=this.randInt()){var arr=[]; for(var i=0;i<n;i++){arr.push(this.randObj())}; return arr}
    randKey(bag){
        return bag[Math.floor(Math.random() * bag.length)];
    }
    randRange(min, max){
        return Math.floor(Math.random()*(max-min+1)+min)
    }
    genStr(len, chars='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'){
        //programiz.com
        var str='';
        for (var i = 0; i<len; i++){str+=chars.charAt(Math.floor(Math.random()*chars.length))}
        return str;
    }
    randMod10(){
        return Math.floor(Math.random()*(100-0+1)+0)%2
    }
}

class TestGook{
    testGook(){
        return (test_case, gook, func, expectedResult)=>{
            eval(
                `class TestGen{
                    constructor(test_case, gook, expected_result){
                        this.expectedResult=expected_result
                        new Guard(new Guards(), test_case, gook,  this)
                        //console.log(${func})
                    }
                    ${func}(v){
                        assert.deepEqual(v, this.expectedResult[1])
                        console.log(func+"("+ JSON.stringify(this.expectedResult[1])+')', 'PASSES')
                    }
                } 
                new TestGen(${test_case}, ${gook}, ${expectedResult})
                `
            )
        }
    }
}
class Gobbledy{
    constructor(h, w, bag){
        this.paths=[]
        this.tests=[]
        this.h=h
        this.w=w
        this.g=new Guards()
        this.r=new RandGen()
        this.gook = this.gook(h, w, bag, "")
    }
    
    gook(h, w, bag, funcStr){
        var gook=[]
        for(var i = 0; i<w; i++){
            gook.push(this._gook(h, this.r.randRange(1, w), bag, funcStr))
        }
        return gook
    }
    _gook(h, w, bag, funcStr){
        var arrKeyObj;
        if(h==0){
                //if we have a function string context we simply return it
            if(this.r.randMod10()){
                return this.func(bag, funcStr)
            }else{
                return this.funcDef(bag, funcStr)
            }
        }else{
            if(this.r.randMod10()){
                //if we have a default/function context we simply build and return it
                var key = this.r.randKey(bag)
                funcStr+=key
                arrKeyObj=this.objKeyArrDef(key, bag)
                for(var i=0; i<w;i++){
                    arrKeyObj[key].push(this._gook(h-1, this.r.randRange(1, w), bag, funcStr))
                }
            }else{
                var key = this.r.randKey(bag)
                funcStr+=key
                arrKeyObj=this.objKeyArr(key)
                for(var i=0; i<w;i++){
                    arrKeyObj[key].push(this._gook(h-1, this.r.randRange(1, w), bag, funcStr))
                }
            }
        }
        //trailing construction case
        return arrKeyObj;
    }
    log(obj){
        if(obj){
            console.log(util.inspect(obj, false, null, true /* enable colors */))
        }else{
            console.log(util.inspect(this.gook, false, null, true /* enable colors */))
        }
    }
    objKeyArrDef(key, bag){
        var defaultVal=this.defaultVal(key)
        return {
            '~DEFAULT~':defaultVal,
            [key]:[]
        }
    }
    objKeyArr(key){
        return {
            [key]:[]
        }
    } 
    funcDef(bag, funcStr){
        var key = this.r.randKey(bag)
        var defaultVal=this.defaultVal(key)
        this.paths.push(funcStr+key)
        return {
            '~DEFAULT~':defaultVal,
            [key]:funcStr+key
        }
    }
    func(bag, funcStr){
        var key = this.r.randKey(bag)
        this.paths.push(funcStr+key)
        return {
            [key]:funcStr+key
        }
    }
    defaultVal(key){
        //generate a random value with the type in question and return it
        if(key=='isStr'){
            return this.r.randStr()
        }else if(key=='isInt'){
            return this.r.randInt()
        }else if(key=='isArr'){
            return this.r.randArr()
        }else if(key=='isIntArr'){
            return this.r.randIntArr()
        }else if(key=='isEnc'){
            return this.r.randEnc()
        }else if(key=='isEncArr'){
            return this.r.randEncArr()
        }else if(key=='isStrArr'){
            return this.r.randStrArr()
        }else if(key=='isObj'){
            return this.r.randObj()
        }else if(key=='isObjArr'){
            return this.r.randObjArr()
        }
    }

}

var h=3;
var w=3;
var bag=['isStr', 'isInt', 'isArr', 'isIntArr', 'isEnc', 'isEncArr', 'isStrArr', 'isObj', 'isObjArr']//, 'isBuff', 'isBuffArr', 'isReg', 'isRegArr']
var gobbledy = new Gobbledy(h, w, bag)

//gobbledy.log(gobbledy.gook)
// gobbledy.log(gobbledy.gook)
// var guardWalk = new GuardWalk()
// guardWalk.walk(gobbledy.gook)