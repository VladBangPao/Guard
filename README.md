# Guard
Guard is an interface impression/expression and protection mechanism. What it means for an interface to be impressive is how much context you can impress upon the function with the variable variables. Variable variables are variables that represent different variables based upon the context of the previous variables. The expression of the function is what you get out of the function, which is a one to one relationship with the impression mechanism.

The gurard protection mechanism is the automatic type guards generated by guard that keeps the impression/expression one to one relationship

This allows programmers to "milk the namespace" for their functions, as opposed to writing a huge set of exposed api functions that deal with the same variables and slightly different function names.

		An example schema from one of my programs:
		const GUARD_MAP={
		    'Strofr':{
			'isStringArray':{
				'isEncodingArray':'_stringEncodedArrayOrStringArrayEncodedArray',
				//This subschema means accept an encoding
				//or use this default
				//isEncoding acts as a switch that calls the same
				//function using the variable passed as encoding
				//or default variable passed below
				'isEncoding':{
				    //class needs three constructor
				    //variables because we are three
				    //layers deep
				    'DEFAULT':'utf-32',
				    'FUNCTION':'_stringArrayEncodedOrStringEncoded'
				}
				//if there was no default behavior, guard implicitly calls else
				//with general error message, unless provided with an error message
			}, 

			'isString':{
				'isSeparator':{

				    'isEncoding': {

					'DEFAULT':'utf-32',
					'FUNCTION': '_stringSeparated'
				    }                    
				}, 
				'isEncoding':{
				    'DEFAULT':'utf-32',
				    'FUNCTION': '_stringSeparated'
				},

				'isEncodingArray':'_stringEncodedArrayOrStringArrayEncodedArray'

			}, 
			"isBufferArray":{
				'isEncodingArray':'_bufferArrayEncodedArray', 
				'isEncoding':{
				    'DEFAULT':'utf-32',
				    'FUNCTION': '_bufferArrayEncoded'
				}
			},
			"isBuffer":{
					'isSeparator':'_bufferSeparated', 
				'isEncodingArray':'_bufferEncodedArray', 
				'isEncoding':{
				    'DEFAULT':'utf-32',
				    'FUNCTION': '_bufferEncoded'
				}
			}
			"isCell":{
			    'isEncoding':{
				'DEFAULT':'utf-32',
				'FUNCTION': '_cellEncoding'
			    }
			}
			"isRow":{
			    'isEncoding':{
				'DEFAULT':'utf-32',
				'FUNCTION': '_rowEncoding'
			    },

			    'isEncodingArray':'_rowEncodedArray'

			}
		    }
		}
