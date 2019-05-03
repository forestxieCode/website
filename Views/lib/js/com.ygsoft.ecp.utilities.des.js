/**
* TODO DES加密/解密工具.<br>
* @author luli <br>
* @version 1.0.0 2012-10-18<br>
*/

/**
 * DES加密/解密工具
 */
(function ($) {
	var base64EncodeChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";   
	var base64DecodeChars =[
				-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,   
				-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,   
				-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63,   
				52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1,   
				-1,　0,　1,　2,　3,  4,　5,　6,　7,　8,　9, 10, 11, 12, 13, 14,   
				15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1,   
				-1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40,   
				41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1];  
	
	var DES = /**@lends $.ecp.des */{
	
		ENCRYSTRING_HEAD: "ISENCRYSTRING",
			
		ENCRY_FIRST_KEY: "1a8.jf65;j^f2v-0",
		
		ENCRY_SECOND_KEY: "1a8.jf65;j^f2v-1",
		
		ENCRY_THIRD_KEY: "1a8.jf65;j^f2v-2",
			
		/**
		 * 加密(三个密钥)
		 * @param {String} data 需要加密的数据
		 * @param {String} firstKey 密钥1
		 * @param {String} secondKey 密钥2
		 * @param {String} thirdKey 密钥3
		 * @returns {String} 加密后的数据
		 */
		doEncrypt: function(data,firstKey,secondKey,thirdKey) {
			 var leng = data.length;
			 var encData = "";
			 var firstKeyBt,secondKeyBt,thirdKeyBt,firstLength,secondLength,thirdLength;
			 if(firstKey != null && firstKey != ""){    
			   firstKeyBt = getKeyBytes(firstKey);
			   firstLength = firstKeyBt.length;
			 }
			 if(secondKey != null && secondKey != ""){
			   secondKeyBt = getKeyBytes(secondKey);
			   secondLength = secondKeyBt.length;
			 }
			 if(thirdKey != null && thirdKey != ""){
			   thirdKeyBt = getKeyBytes(thirdKey);
			   thirdLength = thirdKeyBt.length;
			 }  
			 
			 if(leng > 0){
			   if(leng < 4){
			     var bt = strToBt(data);      
			     var encByte ;
			     if(firstKey != null && firstKey !="" && secondKey != null && secondKey != "" && thirdKey != null && thirdKey != ""){
			       var tempBt;
			       var x,y,z;
			       tempBt = bt;        
			       for(x = 0;x < firstLength ;x ++){
			         tempBt = enc(tempBt,firstKeyBt[x]);
			       }
			       for(y = 0;y < secondLength ;y ++){
			         tempBt = enc(tempBt,secondKeyBt[y]);
			       }
			       for(z = 0;z < thirdLength ;z ++){
			         tempBt = enc(tempBt,thirdKeyBt[z]);
			       }        
			       encByte = tempBt;        
			     }else{
			       if(firstKey != null && firstKey !="" && secondKey != null && secondKey != ""){
			         var tempBt;
			         var x,y;
			         tempBt = bt;
			         for(x = 0;x < firstLength ;x ++){
			           tempBt = enc(tempBt,firstKeyBt[x]);
			         }
			         for(y = 0;y < secondLength ;y ++){
			           tempBt = enc(tempBt,secondKeyBt[y]);
			         }
			         encByte = tempBt;
			       }else{
			         if(firstKey != null && firstKey !=""){            
			           var tempBt;
			           var x = 0;
			           tempBt = bt;            
			           for(x = 0;x < firstLength ;x ++){
			             tempBt = enc(tempBt,firstKeyBt[x]);
			           }
			           encByte = tempBt;
			         }
			       }        
			     }
			     encData = bt64ToHex(encByte);
			   }else{
			     var iterator = parseInt(leng/4);
			     var remainder = leng%4;
			     var i=0;      
			     for(i = 0;i < iterator;i++){
			       var tempData = data.substring(i*4+0,i*4+4);
			       var tempByte = strToBt(tempData);
			       var encByte ;
			       if(firstKey != null && firstKey !="" && secondKey != null && secondKey != "" && thirdKey != null && thirdKey != ""){
			         var tempBt;
			         var x,y,z;
			         tempBt = tempByte;
			         for(x = 0;x < firstLength ;x ++){
			           tempBt = enc(tempBt,firstKeyBt[x]);
			         }
			         for(y = 0;y < secondLength ;y ++){
			           tempBt = enc(tempBt,secondKeyBt[y]);
			         }
			         for(z = 0;z < thirdLength ;z ++){
			           tempBt = enc(tempBt,thirdKeyBt[z]);
			         }
			         encByte = tempBt;
			       }else{
			         if(firstKey != null && firstKey !="" && secondKey != null && secondKey != ""){
			           var tempBt;
			           var x,y;
			           tempBt = tempByte;
			           for(x = 0;x < firstLength ;x ++){
			             tempBt = enc(tempBt,firstKeyBt[x]);
			           }
			           for(y = 0;y < secondLength ;y ++){
			             tempBt = enc(tempBt,secondKeyBt[y]);
			           }
			           encByte = tempBt;
			         }else{
			           if(firstKey != null && firstKey !=""){                      
			             var tempBt;
			             var x;
			             tempBt = tempByte;
			             for(x = 0;x < firstLength ;x ++){                
			               tempBt = enc(tempBt,firstKeyBt[x]);
			             }
			             encByte = tempBt;              
			           }
			         }
			       }
			       encData += bt64ToHex(encByte);
			     }      
			     if(remainder > 0){
			       var remainderData = data.substring(iterator*4+0,leng);
			       var tempByte = strToBt(remainderData);
			       var encByte ;
			       if(firstKey != null && firstKey !="" && secondKey != null && secondKey != "" && thirdKey != null && thirdKey != ""){
			         var tempBt;
			         var x,y,z;
			         tempBt = tempByte;
			         for(x = 0;x < firstLength ;x ++){
			           tempBt = enc(tempBt,firstKeyBt[x]);
			         }
			         for(y = 0;y < secondLength ;y ++){
			           tempBt = enc(tempBt,secondKeyBt[y]);
			         }
			         for(z = 0;z < thirdLength ;z ++){
			           tempBt = enc(tempBt,thirdKeyBt[z]);
			         }
			         encByte = tempBt;
			       }else{
			         if(firstKey != null && firstKey !="" && secondKey != null && secondKey != ""){
			           var tempBt;
			           var x,y;
			           tempBt = tempByte;
			           for(x = 0;x < firstLength ;x ++){
			             tempBt = enc(tempBt,firstKeyBt[x]);
			           }
			           for(y = 0;y < secondLength ;y ++){
			             tempBt = enc(tempBt,secondKeyBt[y]);
			           }
			           encByte = tempBt;
			         }else{
			           if(firstKey != null && firstKey !=""){            
			             var tempBt;
			             var x;
			             tempBt = tempByte;
			             for(x = 0;x < firstLength ;x ++){
			               tempBt = enc(tempBt,firstKeyBt[x]);
			             }
			             encByte = tempBt;
			           }
			         }
			       }
			       encData += bt64ToHex(encByte);
			     }                
			   }
			 }
			 return encData;
		},
		
		/**
		 * 解密(三个密钥,解密密钥同加密密钥)
		 * @param {String} data 需要解密的数据
		 * @param {String} firstKey 密钥1
		 * @param {String} secondKey 密钥2
		 * @param {String} thirdKey 密钥3
		 * @returns {String} 解密后的数据
		 */
		doDecrypt: function(data,firstKey,secondKey,thirdKey) {
			var leng = data.length;
			 var decStr = "";
			 var firstKeyBt,secondKeyBt,thirdKeyBt,firstLength,secondLength,thirdLength;
			 if(firstKey != null && firstKey != ""){    
			   firstKeyBt = getKeyBytes(firstKey);
			   firstLength = firstKeyBt.length;
			 }
			 if(secondKey != null && secondKey != ""){
			   secondKeyBt = getKeyBytes(secondKey);
			   secondLength = secondKeyBt.length;
			 }
			 if(thirdKey != null && thirdKey != ""){
			   thirdKeyBt = getKeyBytes(thirdKey);
			   thirdLength = thirdKeyBt.length;
			 } 
			 var iterator = parseInt(leng/16);
			 var i=0;  
			 for(i = 0;i < iterator;i++){
			   var tempData = data.substring(i*16+0,i*16+16);    
			   var strByte = hexToBt64(tempData);    
			   var intByte = new Array(64);
			   var j = 0;
			   for(j = 0;j < 64; j++){
			     intByte[j] = parseInt(strByte.substring(j,j+1));
			   }    
			   var decByte;
			   if(firstKey != null && firstKey !="" && secondKey != null && secondKey != "" && thirdKey != null && thirdKey != ""){
			     var tempBt;
			     var x,y,z;
			     tempBt = intByte;
			     for(x = thirdLength - 1;x >= 0;x --){
			       tempBt = dec(tempBt,thirdKeyBt[x]);
			     }
			     for(y = secondLength - 1;y >= 0;y --){
			       tempBt = dec(tempBt,secondKeyBt[y]);
			     }
			     for(z = firstLength - 1;z >= 0 ;z --){
			       tempBt = dec(tempBt,firstKeyBt[z]);
			     }
			     decByte = tempBt;
			   }else{
			     if(firstKey != null && firstKey !="" && secondKey != null && secondKey != ""){
			       var tempBt;
			       var x,y,z;
			       tempBt = intByte;
			       for(x = secondLength - 1;x >= 0 ;x --){
			         tempBt = dec(tempBt,secondKeyBt[x]);
			       }
			       for(y = firstLength - 1;y >= 0 ;y --){
			         tempBt = dec(tempBt,firstKeyBt[y]);
			       }
			       decByte = tempBt;
			     }else{
			       if(firstKey != null && firstKey !=""){
			         var tempBt;
			         var x,y,z;
			         tempBt = intByte;
			         for(x = firstLength - 1;x >= 0 ;x --){
			           tempBt = dec(tempBt,firstKeyBt[x]);
			         }
			         decByte = tempBt;
			       }
			     }
			   }
			   decStr += byteToString(decByte);
			 }      
			 return decStr;
		},
    	/**
    	 * 字符串编码base64编码
    	 * @example
    	 * 
    	 * @param {String} str 原始字符串
    	 * @param {Boolean} hasUTF16 str是否包含中文等utf16字符
    	 * @return {String} str的base64编码
    	 */
    
    	encodeBase64: function (str,hasUTF16) {   
    	　　var out="", 
    	  		i=0, 
    	  		len,  
    	  		CHARS = base64EncodeChars, 
    	　　		c1, c2, c3;   
    	　　	if(hasUTF16	!==false){
    	　　		str = this.utf16to8(str);
    	　　	}
    	　　len = str.length;   
    	　　while(i < len) {   
    			 c1 = str.charCodeAt(i++) & 0xff;   
    			 if(i == len)   
    			 {   
    			　　 out += CHARS.charAt(c1 >> 2);   
    			　　 out += CHARS.charAt((c1 & 0x3) << 4);   
    			　　 out += "==";   
    			　　 break;   
    			 }   
    			 c2 = str.charCodeAt(i++);   
    			 if(i == len)   
    			 {   
    			　　 out += CHARS.charAt(c1 >> 2);   
    			　　 out += CHARS.charAt(((c1 & 0x3)<< 4) | ((c2 & 0xF0) >> 4));   
    			　　 out += CHARS.charAt((c2 & 0xF) << 2);   
    			　　 out += "=";   
    			　　 break;   
    			 }   
    			 c3 = str.charCodeAt(i++);   
    			 out += CHARS.charAt(c1 >> 2);   
    			 out += CHARS.charAt(((c1 & 0x3)<< 4) | ((c2 & 0xF0) >> 4));   
    			 out += CHARS.charAt(((c2 & 0xF) << 2) | ((c3 & 0xC0) >>6));   
    			 out += CHARS.charAt(c3 & 0x3F);   
    	　　}   
    	　　return out;   
    	},   
    	/**
    	 * base64解码码转成字符串
    	 * @example
    	 * 
    	 * @param {String} str  base64字符串
    	 * @param {Boolean} hasUTF16 预期结果中是否包含中文等utf16字符
    	 * @return {String} 解码后的字符串
    	 */	
    	decodeBase64: function (str, hasUTF16) { 
    		function __decode(str){
    		　　var c1, c2, c3, c4, 
    		　　 	i=0,  
    		   	 	out="",
    		   	 	CHARS = base64DecodeChars,
    		　　 	len=str.length; 
    		　 
    		　　while(i < len) {   
    				 /* c1 */   
    				 do {   
    				　　 c1 = CHARS[str.charCodeAt(i++) & 0xff];   
    				 } while(i < len && c1 == -1);   
    				 if(c1 == -1)   
    				　　 break;   
    				 /* c2 */   
    				 do {   
    				　　 c2 = CHARS[str.charCodeAt(i++) & 0xff];   
    				 } while(i < len && c2 == -1);   
    				 if(c2 == -1) {break;}   
    				 out += String.fromCharCode((c1 << 2) | ((c2 & 0x30) >> 4));   
    				 /* c3 */   
    				 do {   
    				　　 c3 = str.charCodeAt(i++) & 0xff;   
    				　　 if(c3 == 61) {return out;}   
    				　　 c3 = CHARS[c3];   
    				 } while(i < len && c3 == -1);   
    				 if(c3 == -1) {break;}   
    				 out += String.fromCharCode(((c2 & 0XF) << 4) | ((c3 & 0x3C) >> 2));   
    				 /* c4 */   
    				 do {   
    				　　 c4 = str.charCodeAt(i++) & 0xff;   
    				　　 if(c4 == 61){return  out;}   
    				　　 c4 = CHARS[c4];   
    				 } while(i < len && c4 == -1);   
    				 if(c4 == -1)   
    				　　 break;   
    				 out += String.fromCharCode(((c3 & 0x03) << 6) | c4);   
    		　　}   
    		　　return out;   
    		}
    		
    		var out = __decode(str);
    		if(hasUTF16!==false){
    			out = this.utf8to16(out);
    		}
    		return out;
    		
    	},   
    	utf16to8: function (str) {   
    	　　var out, i, len, c;   
    	　　out = "";   
    	　　len = str.length;   
    	　　for(i = 0; i < len; i++) {   
    		 c = str.charCodeAt(i);   
    		 if ((c >= 0x0001) && (c <= 0x007F)) {   
    		　　 out += str.charAt(i);   
    		 } else if (c > 0x07FF) {   
    		　　 out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F));   
    		　　 out += String.fromCharCode(0x80 | ((c >>　6) & 0x3F));   
    		　　 out += String.fromCharCode(0x80 | ((c >>　0) & 0x3F));   
    		 } else {   
    		　　 out += String.fromCharCode(0xC0 | ((c >>　6) & 0x1F));   
    		　　 out += String.fromCharCode(0x80 | ((c >>　0) & 0x3F));   
    		 }   
    	　　}   
    	　　return out;   
    	},   
    	utf8to16: function (str) {   
    	　　var out, i, len, c;   
    	　　var char2, char3;   
    	　　out = "";   
    	　　len = str.length;   
    	　　i = 0;   
    		while(i < len) {   
    			 c = str.charCodeAt(i++);   
    			 switch(c >> 4)   
    			 {   
    			　 case 0: case 1: case 2: case 3: case 4: case 5: case 6: case 7:   
    			　　 // 0xxxxxxx   
    			　　 out += str.charAt(i-1);   
    			　　 break;   
    			　 case 12: case 13:   
    			　　 // 110x xxxx　 10xx xxxx   
    			　　 char2 = str.charCodeAt(i++);   
    			　　 out += String.fromCharCode(((c & 0x1F) << 6) | (char2 & 0x3F));   
    			　　 break;   
    			　 case 14:   
    			　　 // 1110 xxxx　10xx xxxx　10xx xxxx   
    			　　 char2 = str.charCodeAt(i++);   
    			　　 char3 = str.charCodeAt(i++);   
    			　　 out += String.fromCharCode(((c & 0x0F) << 12) |   
    			　　　　((char2 & 0x3F) << 6) |   
    			　　　　((char3 & 0x3F) << 0));   
    			　　 break;   
    			 }   
    	　　}   
    	　　return out;   
    	},   		 
    	hashCode: function(str){
    		str=str+""; 
    		var hc = 0; 
    		for(var sz = str.length, i = 0; i < sz; i++){ 
    			hc = 31 * hc + str.charCodeAt(i); 
    			if( hc > 0x7fffffff || hc < 0x80000000){ 
    				hc = hc & 0xffffffff; 
    			} 
    		} 
    		return hc;
    	},
    	md5 : function(str) {
    		return md5Util(str)
    	},
    	doReplace : function(text, key) {
    		return DataReplaceUtil.doReplace(text, key);
    	},
		signData : function(_signURI, _method, _params, isEnc) {
			var isSign = ParamUtil.isSign();
			var isEnc = ParamUtil.isEnc();
			return (isSign || isEnc) && SignUtil.dealwithRequestContent(_signURI, _method, _params, isEnc);
		},
		getCmSign : function() {
			return ParamUtil.isCm() && SignUtil.getCmSign();
		}
	}//end DES
	
	var ParamUtil = {
		secCheck : null,
		signCheck : null,
		cmCheck : null,
		encCheck : null,
		isSec : function() {
			if (this.secCheck === null) {
				this.secCheck = "false" != EcpVersion.getSystemParam("SECURITY_CHECK");
			}
			return this.secCheck;
		},
		isSign : function() {
			if (this.isSec()) {
				if (this.signCheck === null) {
					this.signCheck = "true" == EcpVersion.getSystemParam("SIGN_CHECK");
				}
				return this.signCheck;
			}
			return false;
		},
		isCm : function() {
			if (this.isSec()) {
				if (this.cmCheck === null) {
					this.cmCheck = "false" != EcpVersion.getSystemParam("REPLAY_CHECK");
				}
				return this.cmCheck;
			}
			return false;
		},
		isEnc : function() {
			if (this.isSec()) {
				if (this.encCheck === null) {
					this.encCheck = "true" == EcpVersion.getSystemParam("ENCRYPT_CHECK");
				}
				return this.encCheck;
			}
			return false;
		}
	}
	
	var SignUtil = {
		getEncryKey : function() {
			// 获取指定名称的cookie的值
       		var s_id = EcpCookie.getCookie("sk_id");
       		var key = "cipher";
       		if(s_id && s_id.length == 12) {
       			key = s_id.substring(3, 6) + s_id.substring(9,12);
                key = key.split("").reverse().join("") ;
       		} else {
       			document.cookie = "sk_id=97KrehM41pic;path=/";
       		}
       		return key;
		},
		dealwithRequestContent: function(_signURI, _method, _params, isEnc) {
			var queryContent = {};
			var urlPattern = _signURI.split("?");
			var uri = urlPattern[0];
			var keyVal, paramVal, encryptUrl = "";
			var key =  this.getEncryKey();
			if (urlPattern.length > 1) {
				var params =  urlPattern[1].split("&");
				for ( var i = 0; i < params.length; i++) {
					if ( params[i].indexOf("=") != -1) {
						keyVal = params[i].split("=");
						try {
							paramVal = decodeURIComponent(keyVal[1]);
						} catch(e) {
							paramVal = keyVal[1];
						}
						if (isEnc) {
							//超过4000字符，不加密
							if (paramVal && paramVal.length <=4000) {
								queryContent[keyVal[0]]  = DataReplaceUtil.doReplace(paramVal, key);
							} else {
								queryContent[keyVal[0]] = paramVal;
							}
							if (encryptUrl.length != 0) {
								encryptUrl = encryptUrl + "&";
							}
							encryptUrl = encryptUrl  + keyVal[0] + "=" + encodeURIComponent(queryContent[keyVal[0]]);
						} else {
							queryContent[keyVal[0]] = paramVal;
						}
					}
				}
			}
			if (_params) {
				var encryptedData = {};
				for ( var op in _params) {
					encryptedData[op] = _params[op];
					if (typeof(_params[op]) == 'undefined') continue;
					try {
						paramVal = decodeURIComponent(_params[op]);
					} catch(e) {
						paramVal = _params[op];
					}
					if (isEnc) {
						if (paramVal && paramVal.length <=4000) {
							queryContent[op]  = DataReplaceUtil.doReplace(paramVal, key);
						} else {
							queryContent[op] = paramVal;
						}
						encryptedData[op] = queryContent[op];
					} else {
						queryContent[op] = paramVal;
					}
				}
			}
			var _paramNames = new Array();
			for ( var prop in queryContent) {
				_paramNames.push(prop);
			}
			_paramNames.sort();
			var queryString = "";
			$.each(_paramNames, function(n, value) {
				// 请求参数字符串以&结尾
				if (queryContent[value] != null && queryContent[value] != "undefined") {
					if (queryString.length != 0) {
						queryString = queryString + "&";
					}
					queryString = queryString + value + "=" + queryContent[value];
				}
			});
			if (uri.indexOf("?") > -1) {
				uri = uri + "&";
			} else {
				uri = uri + "?";
			}
			if (encryptUrl.length > 0) {
				encryptUrl = uri + encryptUrl;
				uri = encryptUrl;
			} else {
				encryptUrl = _signURI;
			}
			// 组合最终的待签名字符串
			var _tokenId = EcpCookie.getCookie("ecpDataContext.tokenId") || "";
			var _signString = _method.toUpperCase() + _tokenId + queryString;
			if (_signString.length > 5000) {
				_signString = _signString.substr(0,5000);
			}
			window.console && console.info(_signString);
			return {
				AZ : md5Util(_signString),
				RequestURI: encryptUrl,
				encryptedParam : encryptedData
			};		
		},
		getCmSign: function() {	
			var rand = parseInt(Math.random() * 1000000, 10) + "";
			if (rand.length < 6) {
				for ( var i = rand.length; i < 6; i++) {
					rand += "0";
				}
			}
			var t = (new Date()).getTime();
			var cm = rand + "," + t;
			var key = this.getEncryKey();
			if (key) {
				return DataReplaceUtil.doReplace(cm, key);
			}
		}
	}
	
	var DataReplaceUtil = {
		doReplace : function(text, key) {
			return this.util(text, key);
		},
		util : function(text, key) {
			/**
			 * StringBuffer类.
			 */
			function StringBuffer() {
				this._strings = new Array();
			}
			StringBuffer.prototype.Append = function(_string) {
				this._strings.push(_string);
			};
			StringBuffer.prototype.ToString = function() {
				return this._strings.join("");
			};
			StringBuffer.prototype.Clear = function() {
				this._strings = [];
			};
			/**
			 * 矩阵置换工具类.
			 */
			var DataReplaceUtils = function(text, encryKey) {
				this.groupedSource = null;
				this.text = text;
				this.encryKey = encryKey;
				this.secretMatrix = this.getTheMatrix();
			};
			/**
			 * 根据密钥转换二维矩阵.
			 */
			DataReplaceUtils.prototype.getTheMatrix = function() {
				var secretMatrix = new Array(this.encryKey.length);
				var temp = (new Array()).concat(this.encryKey.split(""));
				temp.sort();
				for ( var i = 0; i < this.encryKey.length; i++) {
					for ( var j = 0; j < this.encryKey.length; j++) {
						if (this.encryKey.split("")[i] == temp[j]) {
							secretMatrix[i] = j;
						}
					}
				}
				return secretMatrix;
			};
			/**
			 * 分组明文.
			 */
			DataReplaceUtils.prototype.groupSourceString = function() {
				var sourceLen = this.text.length;
				// final StringBuilder sb = new StringBuilder(plainText);
				var plaintext = new StringBuffer();
				plaintext.Append(this.text);
				var keyLen = this.encryKey.length;
				this.groupedSource = null;
				if (sourceLen % keyLen != 0) {
					this.groupedSource = new Array(parseInt(sourceLen / keyLen) + 1);
				} else {
					this.groupedSource = new Array(parseInt(sourceLen / keyLen));
				}
				if (sourceLen % keyLen != 0) {
					for ( var i = 0; i < (keyLen - sourceLen % keyLen); i++) {
						plaintext.Append("#");
					}
				}
				sourceLen = plaintext.ToString().length;
				for ( var i = 6, j = 0; i <= sourceLen; i += keyLen, j++) {
					this.groupedSource[j] = (new Array()).concat(plaintext
							.ToString().substring(i - keyLen, i).split(""));
				}
			};
			/**
			 * 明文矩阵置换.
			 */
			DataReplaceUtils.prototype.changeSourceMatix = function() {
				var temp = new Array(this.groupedSource.length);
				for ( var i = 0; i < this.groupedSource.length; i++) {
					temp[i] = new Array(this.encryKey.length);
					for ( var j = 0; j < this.encryKey.length; j++) {
						temp[i][j] = this.groupedSource[i][j];
					}
				}
				for ( var i = 0; i < this.groupedSource.length; i++) {
					for ( var j = 0; j < this.encryKey.length; j++) {
						this.groupedSource[i][j] = temp[i][this.secretMatrix[j]];
					}
				}
			};
			/**
			 * 加密.
			 */
			DataReplaceUtils.prototype.encry = function() {
				this.groupSourceString();
				this.changeSourceMatix();
				this.changeSourceMatix();
				var encrytext = new StringBuffer();
				for ( var j = 0; j < this.encryKey.length; j++) {
					for ( var i = 0; i < this.groupedSource.length; i++) {
						encrytext.Append(this.groupedSource[i][j]);
					}
				}
				encrytext.Append("@");
				encrytext.Append(this.text.length);
				return encrytext.ToString();
			};
			return (new DataReplaceUtils(text, key)).encry();
		}
	}
	
	var md5Util = function(str) {
		var rotateLeft = function(lValue, iShiftBits) {
			return (lValue << iShiftBits) | (lValue >>> (32 - iShiftBits));
		}
		var addUnsigned = function(lX, lY) {
			var lX4, lY4, lX8, lY8, lResult;
			lX8 = (lX & 0x80000000);
			lY8 = (lY & 0x80000000);
			lX4 = (lX & 0x40000000);
			lY4 = (lY & 0x40000000);
			lResult = (lX & 0x3FFFFFFF) + (lY & 0x3FFFFFFF);
			if (lX4 & lY4) return (lResult ^ 0x80000000 ^ lX8 ^ lY8);
			if (lX4 | lY4) {
				if (lResult & 0x40000000) return (lResult ^ 0xC0000000 ^ lX8 ^ lY8);
				else return (lResult ^ 0x40000000 ^ lX8 ^ lY8);
			} else {
				return (lResult ^ lX8 ^ lY8);
			}
		}

		var F = function(x, y, z) {
			return (x & y) | ((~ x) & z);
		}

		var G = function(x, y, z) {
			return (x & z) | (y & (~ z));
		}

		var H = function(x, y, z) {
			return (x ^ y ^ z);
		}

		var I = function(x, y, z) {
			return (y ^ (x | (~ z)));
		}

		var FF = function(a, b, c, d, x, s, ac) {
			a = addUnsigned(a, addUnsigned(addUnsigned(F(b, c, d), x), ac));
			return addUnsigned(rotateLeft(a, s), b);
		};

		var GG = function(a, b, c, d, x, s, ac) {
			a = addUnsigned(a, addUnsigned(addUnsigned(G(b, c, d), x), ac));
			return addUnsigned(rotateLeft(a, s), b);
		};

		var HH = function(a, b, c, d, x, s, ac) {
			a = addUnsigned(a, addUnsigned(addUnsigned(H(b, c, d), x), ac));
			return addUnsigned(rotateLeft(a, s), b);
		};

		var II = function(a, b, c, d, x, s, ac) {
			a = addUnsigned(a, addUnsigned(addUnsigned(I(b, c, d), x), ac));
			return addUnsigned(rotateLeft(a, s), b);
		};
		/**
		 * 转换成单词数组.
		 */
		var convertToWordArray = function(string) {
			var lWordCount;
			var lMessageLength = string.length;
			var lNumberOfWordsTempOne = lMessageLength + 8;
			var lNumberOfWordsTempTwo = (lNumberOfWordsTempOne - (lNumberOfWordsTempOne % 64)) / 64;
			var lNumberOfWords = (lNumberOfWordsTempTwo + 1) * 16;
			var lWordArray = Array(lNumberOfWords - 1);
			var lBytePosition = 0;
			var lByteCount = 0;
			while (lByteCount < lMessageLength) {
				lWordCount = (lByteCount - (lByteCount % 4)) / 4;
				lBytePosition = (lByteCount % 4) * 8;
				lWordArray[lWordCount] = (lWordArray[lWordCount] | (string.charCodeAt(lByteCount) << lBytePosition));
				lByteCount++;
			}
			lWordCount = (lByteCount - (lByteCount % 4)) / 4;
			lBytePosition = (lByteCount % 4) * 8;
			lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80 << lBytePosition);
			lWordArray[lNumberOfWords - 2] = lMessageLength << 3;
			lWordArray[lNumberOfWords - 1] = lMessageLength >>> 29;
			return lWordArray;
		};

		/**
		 * 字母转十六进制.
		 */
		var wordToHex = function(lValue) {
			var WordToHexValue = "", WordToHexValueTemp = "", lByte, lCount;
			for (lCount = 0; lCount <= 3; lCount++) {
				lByte = (lValue >>> (lCount * 8)) & 255;
				WordToHexValueTemp = "0" + lByte.toString(16);
				WordToHexValue = WordToHexValue + WordToHexValueTemp.substr(WordToHexValueTemp.length - 2, 2);
			}
			return WordToHexValue;
		};

		/**
		 * UTF8编码.
		 */
		var uTF8Encode = function(string) {
			string = string.replace(/\x0d\x0a/g, "\x0a");
			var output = "";
			for (var n = 0; n < string.length; n++) {
				var c = string.charCodeAt(n);
				if (c < 128) {
					output += String.fromCharCode(c);
				} else if ((c > 127) && (c < 2048)) {
					output += String.fromCharCode((c >> 6) | 192);
					output += String.fromCharCode((c & 63) | 128);
				} else {
					output += String.fromCharCode((c >> 12) | 224);
					output += String.fromCharCode(((c >> 6) & 63) | 128);
					output += String.fromCharCode((c & 63) | 128);
				}
			}
			return output;
		};
		/**
		 * 生成随机字符串.
		 */
	   var randomString = function(len) {  
	　　len = len || 32;
		 /** **默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1*** */
	　　var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';    
	　　var maxPos = $chars.length;
	　　var pwd = '';
	　　for (i = 0; i < len; i++) {
	　　　　pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
	　　}
	　　return pwd;
	  };
	  /**
		 * 生成MD摘要串.
		 */
		function md5(string) {
			var x = Array();
			var k, AA, BB, CC, DD, a, b, c, d;
			var S11=7, S12=12, S13=17, S14=22;
			var S21=5, S22=9 , S23=14, S24=20;
			var S31=4, S32=11, S33=16, S34=23;
			var S41=6, S42=10, S43=15, S44=21;
			string = uTF8Encode(string);
			x = convertToWordArray(string);
			a = 0x67452301; b = 0xEFCDAB89; c = 0x98BADCFE; d = 0x10325476;
			for (k = 0; k < x.length; k += 16) {
				AA = a; BB = b; CC = c; DD = d;
				a = FF(a, b, c, d, x[k+0],  S11, 0xD76AA478);
				d = FF(d, a, b, c, x[k+1],  S12, 0xE8C7B756);
				c = FF(c, d, a, b, x[k+2],  S13, 0x242070DB);
				b = FF(b, c, d, a, x[k+3],  S14, 0xC1BDCEEE);
				a = FF(a, b, c, d, x[k+4],  S11, 0xF57C0FAF);
				d = FF(d, a, b, c, x[k+5],  S12, 0x4787C62A);
				c = FF(c, d, a, b, x[k+6],  S13, 0xA8304613);
				b = FF(b, c, d, a, x[k+7],  S14, 0xFD469501);
				a = FF(a, b, c, d, x[k+8],  S11, 0x698098D8);
				d = FF(d, a, b, c, x[k+9],  S12, 0x8B44F7AF);
				c = FF(c, d, a, b, x[k+10], S13, 0xFFFF5BB1);
				b = FF(b, c, d, a, x[k+11], S14, 0x895CD7BE);
				a = FF(a, b, c, d, x[k+12], S11, 0x6B901122);
				d = FF(d, a, b, c, x[k+13], S12, 0xFD987193);
				c = FF(c, d, a, b, x[k+14], S13, 0xA679438E);
				b = FF(b, c, d, a, x[k+15], S14, 0x49B40821);
				a = GG(a, b, c, d, x[k+1],  S21, 0xF61E2562);
				d = GG(d, a, b, c, x[k+6],  S22, 0xC040B340);
				c = GG(c, d, a, b, x[k+11], S23, 0x265E5A51);
				b = GG(b, c, d, a, x[k+0],  S24, 0xE9B6C7AA);
				a = GG(a, b, c, d, x[k+5],  S21, 0xD62F105D);
				d = GG(d, a, b, c, x[k+10], S22, 0x2441453);
				c = GG(c, d, a, b, x[k+15], S23, 0xD8A1E681);
				b = GG(b, c, d, a, x[k+4],  S24, 0xE7D3FBC8);
				a = GG(a, b, c, d, x[k+9],  S21, 0x21E1CDE6);
				d = GG(d, a, b, c, x[k+14], S22, 0xC33707D6);
				c = GG(c, d, a, b, x[k+3],  S23, 0xF4D50D87);
				b = GG(b, c, d, a, x[k+8],  S24, 0x455A14ED);
				a = GG(a, b, c, d, x[k+13], S21, 0xA9E3E905);
				d = GG(d, a, b, c, x[k+2],  S22, 0xFCEFA3F8);
				c = GG(c, d, a, b, x[k+7],  S23, 0x676F02D9);
				b = GG(b, c, d, a, x[k+12], S24, 0x8D2A4C8A);
				a = HH(a, b, c, d, x[k+5],  S31, 0xFFFA3942);
				d = HH(d, a, b, c, x[k+8],  S32, 0x8771F681);
				c = HH(c, d, a, b, x[k+11], S33, 0x6D9D6122);
				b = HH(b, c, d, a, x[k+14], S34, 0xFDE5380C);
				a = HH(a, b, c, d, x[k+1],  S31, 0xA4BEEA44);
				d = HH(d, a, b, c, x[k+4],  S32, 0x4BDECFA9);
				c = HH(c, d, a, b, x[k+7],  S33, 0xF6BB4B60);
				b = HH(b, c, d, a, x[k+10], S34, 0xBEBFBC70);
				a = HH(a, b, c, d, x[k+13], S31, 0x289B7EC6);
				d = HH(d, a, b, c, x[k+0],  S32, 0xEAA127FA);
				c = HH(c, d, a, b, x[k+3],  S33, 0xD4EF3085);
				b = HH(b, c, d, a, x[k+6],  S34, 0x4881D05);
				a = HH(a, b, c, d, x[k+9],  S31, 0xD9D4D039);
				d = HH(d, a, b, c, x[k+12], S32, 0xE6DB99E5);
				c = HH(c, d, a, b, x[k+15], S33, 0x1FA27CF8);
				b = HH(b, c, d, a, x[k+2],  S34, 0xC4AC5665);
				a = II(a, b, c, d, x[k+0],  S41, 0xF4292244);
				d = II(d, a, b, c, x[k+7],  S42, 0x432AFF97);
				c = II(c, d, a, b, x[k+14], S43, 0xAB9423A7);
				b = II(b, c, d, a, x[k+5],  S44, 0xFC93A039);
				a = II(a, b, c, d, x[k+12], S41, 0x655B59C3);
				d = II(d, a, b, c, x[k+3],  S42, 0x8F0CCC92);
				c = II(c, d, a, b, x[k+10], S43, 0xFFEFF47D);
				b = II(b, c, d, a, x[k+1],  S44, 0x85845DD1);
				a = II(a, b, c, d, x[k+8],  S41, 0x6FA87E4F);
				d = II(d, a, b, c, x[k+15], S42, 0xFE2CE6E0);
				c = II(c, d, a, b, x[k+6],  S43, 0xA3014314);
				b = II(b, c, d, a, x[k+13], S44, 0x4E0811A1);
				a = II(a, b, c, d, x[k+4],  S41, 0xF7537E82);
				d = II(d, a, b, c, x[k+11], S42, 0xBD3AF235);
				c = II(c, d, a, b, x[k+2],  S43, 0x2AD7D2BB);
				b = II(b, c, d, a, x[k+9],  S44, 0xEB86D391);
				a = addUnsigned(a, AA);
				b = addUnsigned(b, BB);
				c = addUnsigned(c, CC);
				d = addUnsigned(d, DD);
			}
			var tempValue = wordToHex(a) + wordToHex(b) + wordToHex(c) + wordToHex(d);
			// 前后各随机生成四个字符.
			tempValue = randomString(4) + tempValue +randomString(4) ;
			// 字符串倒序.
			tempValue = tempValue.split("").reverse().join("") ;
			return tempValue.toLowerCase();
		}
		return md5(str);
	}
	
	/**
	 * 根据字符串获取二进制码数组
	 * <p>
	 *  chang the string into the bit array<br>
	 *  return bit array(it's length % 64 = 0)
	 * </p>
	 * @ignore
	 * @param {String} key 字符串
	 * @return {String} 二进制码
	 */
	function getKeyBytes(key){
	 var keyBytes = new Array();
	 var leng = key.length;
	 var iterator = parseInt(leng/4);
	 var remainder = leng%4;
	 var i = 0;
	 for(i = 0;i < iterator; i ++){
	   keyBytes[i] = strToBt(key.substring(i*4+0,i*4+4));
	 }
	 if(remainder > 0){
	   keyBytes[i] = strToBt(key.substring(i*4+0,leng));
	 }    
	 return keyBytes;
	}
	
   /**
	* chang the string(it's length <= 4) into the bit array
	* @ignore
	* @param {String} str 字符串
	* @returns {String} bit array(it's length = 64)
	*/
	function strToBt(str){  
	 var leng = str.length;
	 var bt = new Array(64);
	 if(leng < 4){
	   var i=0,j=0,p=0,q=0;
	   for(i = 0;i<leng;i++){
	     var k = str.charCodeAt(i);
	     for(j=0;j<16;j++){      
	       var pow=1,m=0;
	       for(m=15;m>j;m--){
	         pow *= 2;
	       }        
	       bt[16*i+j]=parseInt(k/pow)%2;
	     }
	   }
	   for(p = leng;p<4;p++){
	     var k = 0;
	     for(q=0;q<16;q++){      
	       var pow=1,m=0;
	       for(m=15;m>q;m--){
	         pow *= 2;
	       }        
	       bt[16*p+q]=parseInt(k/pow)%2;
	     }
	   }  
	 }else{
	   for(i = 0;i<4;i++){
	     var k = str.charCodeAt(i);
	     for(j=0;j<16;j++){      
	       var pow=1;
	       for(m=15;m>j;m--){
	         pow *= 2;
	       }        
	       bt[16*i+j]=parseInt(k/pow)%2;
	     }
	   }  
	 }
	 return bt;
	}
	
   /**
	* chang the bit(it's length = 4) into the hex
	* @ignore 
	* @param {String} binary
	* @return {String} hex
	*/
	function bt4ToHex(binary) {
	 var hex;
	 switch (binary) {
	   case "0000" : hex = "0"; break;
	   case "0001" : hex = "1"; break;
	   case "0010" : hex = "2"; break;
	   case "0011" : hex = "3"; break;
	   case "0100" : hex = "4"; break;
	   case "0101" : hex = "5"; break;
	   case "0110" : hex = "6"; break;
	   case "0111" : hex = "7"; break;
	   case "1000" : hex = "8"; break;
	   case "1001" : hex = "9"; break;
	   case "1010" : hex = "A"; break;
	   case "1011" : hex = "B"; break;
	   case "1100" : hex = "C"; break;
	   case "1101" : hex = "D"; break;
	   case "1110" : hex = "E"; break;
	   case "1111" : hex = "F"; break;
	 }
	 return hex;
	}
	
   /**
	* chang the hex into the bit(it's length = 4)
	* @param {String} hex
	* @returns {String} the bit(it's length = 4)
	*/
	function hexToBt4(hex) {
	 var binary;
	 switch (hex) {
	   case "0" : binary = "0000"; break;
	   case "1" : binary = "0001"; break;
	   case "2" : binary = "0010"; break;
	   case "3" : binary = "0011"; break;
	   case "4" : binary = "0100"; break;
	   case "5" : binary = "0101"; break;
	   case "6" : binary = "0110"; break;
	   case "7" : binary = "0111"; break;
	   case "8" : binary = "1000"; break;
	   case "9" : binary = "1001"; break;
	   case "A" : binary = "1010"; break;
	   case "B" : binary = "1011"; break;
	   case "C" : binary = "1100"; break;
	   case "D" : binary = "1101"; break;
	   case "E" : binary = "1110"; break;
	   case "F" : binary = "1111"; break;
	 }
	 return binary;
	}
	
   /**
	* chang the bit(it's length = 64) into the string
	* @ignore
	* @param {String} byteData
	* @returns {String} string
	*/
	function byteToString(byteData){
	 var str="";
	 for(i = 0;i<4;i++){
	   var count=0;
	   for(j=0;j<16;j++){        
	     var pow=1;
	     for(m=15;m>j;m--){
	       pow*=2;
	     }              
	     count+=byteData[16*i+j]*pow;
	   }        
	   if(count != 0){
	     str+=String.fromCharCode(count);
	   }
	 }
	 return str;
	}
	/**
	 * @ignore
	 */
	function bt64ToHex(byteData){
	 var hex = "";
	 for(i = 0;i<16;i++){
	   var bt = "";
	   for(j=0;j<4;j++){    
	     bt += byteData[i*4+j];
	   }    
	   hex+=bt4ToHex(bt);
	 }
	 return hex;
	}
	/**
	 * @ignore
	 */
	function hexToBt64(hex){
	 var binary = "";
	 for(i = 0;i<16;i++){
	   binary+=hexToBt4(hex.substring(i,i+1));
	 }
	 return binary;
	}
	
   /**
	* the 64 bit des core arithmetic
	* @ignore 
	* @param {String} dataByte
	* @param {String} keyByte
	* @returns {String}
	*/
	function enc(dataByte,keyByte){  
	 var keys = generateKeys(keyByte);    
	 var ipByte   = initPermute(dataByte);  
	 var ipLeft   = new Array(32);
	 var ipRight  = new Array(32);
	 var tempLeft = new Array(32);
	 var i = 0,j = 0,k = 0,m = 0, n = 0;
	 for(k = 0;k < 32;k ++){
	   ipLeft[k] = ipByte[k];
	   ipRight[k] = ipByte[32+k];
	 }    
	 for(i = 0;i < 16;i ++){
	   for(j = 0;j < 32;j ++){
	     tempLeft[j] = ipLeft[j];
	     ipLeft[j] = ipRight[j];      
	   }  
	   var key = new Array(48);
	   for(m = 0;m < 48;m ++){
	     key[m] = keys[i][m];
	   }
	   var  tempRight = xor(pPermute(sBoxPermute(xor(expandPermute(ipRight),key))), tempLeft);      
	   for(n = 0;n < 32;n ++){
	     ipRight[n] = tempRight[n];
	   }  
	 }  
	 
	 
	 var finalData =new Array(64);
	 for(i = 0;i < 32;i ++){
	   finalData[i] = ipRight[i];
	   finalData[32+i] = ipLeft[i];
	 }
	 return finallyPermute(finalData);  
	}
	/**
	 * @ignore
	 */
	function dec(dataByte,keyByte){  
	 var keys = generateKeys(keyByte);    
	 var ipByte   = initPermute(dataByte);  
	 var ipLeft   = new Array(32);
	 var ipRight  = new Array(32);
	 var tempLeft = new Array(32);
	 var i = 0,j = 0,k = 0,m = 0, n = 0;
	 for(k = 0;k < 32;k ++){
	   ipLeft[k] = ipByte[k];
	   ipRight[k] = ipByte[32+k];
	 }  
	 for(i = 15;i >= 0;i --){
	   for(j = 0;j < 32;j ++){
	     tempLeft[j] = ipLeft[j];
	     ipLeft[j] = ipRight[j];      
	   }  
	   var key = new Array(48);
	   for(m = 0;m < 48;m ++){
	     key[m] = keys[i][m];
	   }
	   
	   var  tempRight = xor(pPermute(sBoxPermute(xor(expandPermute(ipRight),key))), tempLeft);      
	   for(n = 0;n < 32;n ++){
	     ipRight[n] = tempRight[n];
	   }  
	 }  
	  
	 var finalData =new Array(64);
	 for(i = 0;i < 32;i ++){
	   finalData[i] = ipRight[i];
	   finalData[32+i] = ipLeft[i];
	 }
	 return finallyPermute(finalData);  
	}
	/**
	 * @ignore
	 */
	function initPermute(originalData){
	 var ipByte = new Array(64);
	 for (i = 0, m = 1, n = 0; i < 4; i++, m += 2, n += 2) {
	   for (j = 7, k = 0; j >= 0; j--, k++) {
	     ipByte[i * 8 + k] = originalData[j * 8 + m];
	     ipByte[i * 8 + k + 32] = originalData[j * 8 + n];
	   }
	 }    
	 return ipByte;
	}
	/**
	 * @ignore
	 */
	function expandPermute(rightData){  
	 var epByte = new Array(48);
	 for (i = 0; i < 8; i++) {
	   if (i == 0) {
	     epByte[i * 6 + 0] = rightData[31];
	   } else {
	     epByte[i * 6 + 0] = rightData[i * 4 - 1];
	   }
	   epByte[i * 6 + 1] = rightData[i * 4 + 0];
	   epByte[i * 6 + 2] = rightData[i * 4 + 1];
	   epByte[i * 6 + 3] = rightData[i * 4 + 2];
	   epByte[i * 6 + 4] = rightData[i * 4 + 3];
	   if (i == 7) {
	     epByte[i * 6 + 5] = rightData[0];
	   } else {
	     epByte[i * 6 + 5] = rightData[i * 4 + 4];
	   }
	 }      
	 return epByte;
	}
	/**
	 * @ignore
	 */
	function xor(byteOne,byteTwo){  
	 var xorByte = new Array(byteOne.length);
	 for(i = 0;i < byteOne.length; i ++){      
	   xorByte[i] = byteOne[i] ^ byteTwo[i];
	 }  
	 return xorByte;
	}
	/**
	 * @ignore
	 */
	function sBoxPermute(expandByte){
	 
	   var sBoxByte = new Array(32);
	   var binary = "";
	   var s1 = [
	       [14, 4, 13, 1, 2, 15, 11, 8, 3, 10, 6, 12, 5, 9, 0, 7],
	       [0, 15, 7, 4, 14, 2, 13, 1, 10, 6, 12, 11, 9, 5, 3, 8],
	       [4, 1, 14, 8, 13, 6, 2, 11, 15, 12, 9, 7, 3, 10, 5, 0],
	       [15, 12, 8, 2, 4, 9, 1, 7, 5, 11, 3, 14, 10, 0, 6, 13 ]];
	       /* Table - s2 */
	   var s2 = [
	       [15, 1, 8, 14, 6, 11, 3, 4, 9, 7, 2, 13, 12, 0, 5, 10],
	       [3, 13, 4, 7, 15, 2, 8, 14, 12, 0, 1, 10, 6, 9, 11, 5],
	       [0, 14, 7, 11, 10, 4, 13, 1, 5, 8, 12, 6, 9, 3, 2, 15],
	       [13, 8, 10, 1, 3, 15, 4, 2, 11, 6, 7, 12, 0, 5, 14, 9 ]];
	       /* Table - s3 */
	   var s3= [
	       [10, 0, 9, 14, 6, 3, 15, 5, 1, 13, 12, 7, 11, 4, 2, 8],
	       [13, 7, 0, 9, 3, 4, 6, 10, 2, 8, 5, 14, 12, 11, 15, 1],
	       [13, 6, 4, 9, 8, 15, 3, 0, 11, 1, 2, 12, 5, 10, 14, 7],
	       [1, 10, 13, 0, 6, 9, 8, 7, 4, 15, 14, 3, 11, 5, 2, 12 ]];
	       /* Table - s4 */
	   var s4 = [
	       [7, 13, 14, 3, 0, 6, 9, 10, 1, 2, 8, 5, 11, 12, 4, 15],
	       [13, 8, 11, 5, 6, 15, 0, 3, 4, 7, 2, 12, 1, 10, 14, 9],
	       [10, 6, 9, 0, 12, 11, 7, 13, 15, 1, 3, 14, 5, 2, 8, 4],
	       [3, 15, 0, 6, 10, 1, 13, 8, 9, 4, 5, 11, 12, 7, 2, 14 ]];
	       /* Table - s5 */
	   var s5 = [
	       [2, 12, 4, 1, 7, 10, 11, 6, 8, 5, 3, 15, 13, 0, 14, 9],
	       [14, 11, 2, 12, 4, 7, 13, 1, 5, 0, 15, 10, 3, 9, 8, 6],
	       [4, 2, 1, 11, 10, 13, 7, 8, 15, 9, 12, 5, 6, 3, 0, 14],
	       [11, 8, 12, 7, 1, 14, 2, 13, 6, 15, 0, 9, 10, 4, 5, 3 ]];
	       /* Table - s6 */
	   var s6 = [
	       [12, 1, 10, 15, 9, 2, 6, 8, 0, 13, 3, 4, 14, 7, 5, 11],
	       [10, 15, 4, 2, 7, 12, 9, 5, 6, 1, 13, 14, 0, 11, 3, 8],
	       [9, 14, 15, 5, 2, 8, 12, 3, 7, 0, 4, 10, 1, 13, 11, 6],
	       [4, 3, 2, 12, 9, 5, 15, 10, 11, 14, 1, 7, 6, 0, 8, 13 ]];
	       /* Table - s7 */
	   var s7 = [
	       [4, 11, 2, 14, 15, 0, 8, 13, 3, 12, 9, 7, 5, 10, 6, 1],
	       [13, 0, 11, 7, 4, 9, 1, 10, 14, 3, 5, 12, 2, 15, 8, 6],
	       [1, 4, 11, 13, 12, 3, 7, 14, 10, 15, 6, 8, 0, 5, 9, 2],
	       [6, 11, 13, 8, 1, 4, 10, 7, 9, 5, 0, 15, 14, 2, 3, 12]];
	       /* Table - s8 */
	   var s8 = [
	       [13, 2, 8, 4, 6, 15, 11, 1, 10, 9, 3, 14, 5, 0, 12, 7],
	       [1, 15, 13, 8, 10, 3, 7, 4, 12, 5, 6, 11, 0, 14, 9, 2],
	       [7, 11, 4, 1, 9, 12, 14, 2, 0, 6, 10, 13, 15, 3, 5, 8],
	       [2, 1, 14, 7, 4, 10, 8, 13, 15, 12, 9, 0, 3, 5, 6, 11]];
	   
	   for(m=0;m<8;m++){
	   var i=0,j=0;
	   i = expandByte[m*6+0]*2+expandByte[m*6+5];
	   j = expandByte[m * 6 + 1] * 2 * 2 * 2 
	     + expandByte[m * 6 + 2] * 2* 2 
	     + expandByte[m * 6 + 3] * 2 
	     + expandByte[m * 6 + 4];
	   switch (m) {
	     case 0 :
	       binary = getBoxBinary(s1[i][j]);
	       break;
	     case 1 :
	       binary = getBoxBinary(s2[i][j]);
	       break;
	     case 2 :
	       binary = getBoxBinary(s3[i][j]);
	       break;
	     case 3 :
	       binary = getBoxBinary(s4[i][j]);
	       break;
	     case 4 :
	       binary = getBoxBinary(s5[i][j]);
	       break;
	     case 5 :
	       binary = getBoxBinary(s6[i][j]);
	       break;
	     case 6 :
	       binary = getBoxBinary(s7[i][j]);
	       break;
	     case 7 :
	       binary = getBoxBinary(s8[i][j]);
	       break;
	   }      
	   sBoxByte[m*4+0] = parseInt(binary.substring(0,1));
	   sBoxByte[m*4+1] = parseInt(binary.substring(1,2));
	   sBoxByte[m*4+2] = parseInt(binary.substring(2,3));
	   sBoxByte[m*4+3] = parseInt(binary.substring(3,4));
	 }
	 return sBoxByte;
	}
	/**
	 * @ignore
	 */
	function pPermute(sBoxByte){
	 var pBoxPermute = new Array(32);
	 pBoxPermute[ 0] = sBoxByte[15]; 
	 pBoxPermute[ 1] = sBoxByte[ 6]; 
	 pBoxPermute[ 2] = sBoxByte[19]; 
	 pBoxPermute[ 3] = sBoxByte[20]; 
	 pBoxPermute[ 4] = sBoxByte[28]; 
	 pBoxPermute[ 5] = sBoxByte[11]; 
	 pBoxPermute[ 6] = sBoxByte[27]; 
	 pBoxPermute[ 7] = sBoxByte[16]; 
	 pBoxPermute[ 8] = sBoxByte[ 0]; 
	 pBoxPermute[ 9] = sBoxByte[14]; 
	 pBoxPermute[10] = sBoxByte[22]; 
	 pBoxPermute[11] = sBoxByte[25]; 
	 pBoxPermute[12] = sBoxByte[ 4]; 
	 pBoxPermute[13] = sBoxByte[17]; 
	 pBoxPermute[14] = sBoxByte[30]; 
	 pBoxPermute[15] = sBoxByte[ 9]; 
	 pBoxPermute[16] = sBoxByte[ 1]; 
	 pBoxPermute[17] = sBoxByte[ 7]; 
	 pBoxPermute[18] = sBoxByte[23]; 
	 pBoxPermute[19] = sBoxByte[13]; 
	 pBoxPermute[20] = sBoxByte[31]; 
	 pBoxPermute[21] = sBoxByte[26]; 
	 pBoxPermute[22] = sBoxByte[ 2]; 
	 pBoxPermute[23] = sBoxByte[ 8]; 
	 pBoxPermute[24] = sBoxByte[18]; 
	 pBoxPermute[25] = sBoxByte[12]; 
	 pBoxPermute[26] = sBoxByte[29]; 
	 pBoxPermute[27] = sBoxByte[ 5]; 
	 pBoxPermute[28] = sBoxByte[21]; 
	 pBoxPermute[29] = sBoxByte[10]; 
	 pBoxPermute[30] = sBoxByte[ 3]; 
	 pBoxPermute[31] = sBoxByte[24];    
	 return pBoxPermute;
	}
	/**
	 * @ignore
	 */
	function finallyPermute(endByte){    
	 var fpByte = new Array(64);  
	 fpByte[ 0] = endByte[39]; 
	 fpByte[ 1] = endByte[ 7]; 
	 fpByte[ 2] = endByte[47]; 
	 fpByte[ 3] = endByte[15]; 
	 fpByte[ 4] = endByte[55]; 
	 fpByte[ 5] = endByte[23]; 
	 fpByte[ 6] = endByte[63]; 
	 fpByte[ 7] = endByte[31]; 
	 fpByte[ 8] = endByte[38]; 
	 fpByte[ 9] = endByte[ 6]; 
	 fpByte[10] = endByte[46]; 
	 fpByte[11] = endByte[14]; 
	 fpByte[12] = endByte[54]; 
	 fpByte[13] = endByte[22]; 
	 fpByte[14] = endByte[62]; 
	 fpByte[15] = endByte[30]; 
	 fpByte[16] = endByte[37]; 
	 fpByte[17] = endByte[ 5]; 
	 fpByte[18] = endByte[45]; 
	 fpByte[19] = endByte[13]; 
	 fpByte[20] = endByte[53]; 
	 fpByte[21] = endByte[21]; 
	 fpByte[22] = endByte[61]; 
	 fpByte[23] = endByte[29]; 
	 fpByte[24] = endByte[36]; 
	 fpByte[25] = endByte[ 4]; 
	 fpByte[26] = endByte[44]; 
	 fpByte[27] = endByte[12]; 
	 fpByte[28] = endByte[52]; 
	 fpByte[29] = endByte[20]; 
	 fpByte[30] = endByte[60]; 
	 fpByte[31] = endByte[28]; 
	 fpByte[32] = endByte[35]; 
	 fpByte[33] = endByte[ 3]; 
	 fpByte[34] = endByte[43]; 
	 fpByte[35] = endByte[11]; 
	 fpByte[36] = endByte[51]; 
	 fpByte[37] = endByte[19]; 
	 fpByte[38] = endByte[59]; 
	 fpByte[39] = endByte[27]; 
	 fpByte[40] = endByte[34]; 
	 fpByte[41] = endByte[ 2]; 
	 fpByte[42] = endByte[42]; 
	 fpByte[43] = endByte[10]; 
	 fpByte[44] = endByte[50]; 
	 fpByte[45] = endByte[18]; 
	 fpByte[46] = endByte[58]; 
	 fpByte[47] = endByte[26]; 
	 fpByte[48] = endByte[33]; 
	 fpByte[49] = endByte[ 1]; 
	 fpByte[50] = endByte[41]; 
	 fpByte[51] = endByte[ 9]; 
	 fpByte[52] = endByte[49]; 
	 fpByte[53] = endByte[17]; 
	 fpByte[54] = endByte[57]; 
	 fpByte[55] = endByte[25]; 
	 fpByte[56] = endByte[32]; 
	 fpByte[57] = endByte[ 0]; 
	 fpByte[58] = endByte[40]; 
	 fpByte[59] = endByte[ 8]; 
	 fpByte[60] = endByte[48]; 
	 fpByte[61] = endByte[16]; 
	 fpByte[62] = endByte[56]; 
	 fpByte[63] = endByte[24];
	 return fpByte;
	}
	/**
	 * ignore
	 */
	function getBoxBinary(i) {
	 var binary = "";
	 switch (i) {
	   case  0 :binary = "0000";break;
	   case  1 :binary = "0001";break;
	   case  2 :binary = "0010";break;
	   case  3 :binary = "0011";break;
	   case  4 :binary = "0100";break;
	   case  5 :binary = "0101";break;
	   case  6 :binary = "0110";break;
	   case  7 :binary = "0111";break;
	   case  8 :binary = "1000";break;
	   case  9 :binary = "1001";break;
	   case 10 :binary = "1010";break;
	   case 11 :binary = "1011";break;
	   case 12 :binary = "1100";break;
	   case 13 :binary = "1101";break;
	   case 14 :binary = "1110";break;
	   case 15 :binary = "1111";break;
	 }
	 return binary;
	}
   /**
	* generate 16 keys for xor
	* @ignore
	* @param {String} keyByte
	*/
	function generateKeys(keyByte){    
	 var key   = new Array(56);
	 var keys = new Array();  
	 
	 keys[ 0] = new Array();
	 keys[ 1] = new Array();
	 keys[ 2] = new Array();
	 keys[ 3] = new Array();
	 keys[ 4] = new Array();
	 keys[ 5] = new Array();
	 keys[ 6] = new Array();
	 keys[ 7] = new Array();
	 keys[ 8] = new Array();
	 keys[ 9] = new Array();
	 keys[10] = new Array();
	 keys[11] = new Array();
	 keys[12] = new Array();
	 keys[13] = new Array();
	 keys[14] = new Array();
	 keys[15] = new Array();  
	 var loop = [1,1,2,2,2,2,2,2,1,2,2,2,2,2,2,1];
	
	 for(i=0;i<7;i++){
	   for(j=0,k=7;j<8;j++,k--){
	     key[i*8+j]=keyByte[8*k+i];
	   }
	 }    
	 
	 var i = 0;
	 for(i = 0;i < 16;i ++){
	   var tempLeft=0;
	   var tempRight=0;
	   for(j = 0; j < loop[i];j ++){          
	     tempLeft = key[0];
	     tempRight = key[28];
	     for(k = 0;k < 27 ;k ++){
	       key[k] = key[k+1];
	       key[28+k] = key[29+k];
	     }  
	     key[27]=tempLeft;
	     key[55]=tempRight;
	   }
	   var tempKey = new Array(48);
	   tempKey[ 0] = key[13];
	   tempKey[ 1] = key[16];
	   tempKey[ 2] = key[10];
	   tempKey[ 3] = key[23];
	   tempKey[ 4] = key[ 0];
	   tempKey[ 5] = key[ 4];
	   tempKey[ 6] = key[ 2];
	   tempKey[ 7] = key[27];
	   tempKey[ 8] = key[14];
	   tempKey[ 9] = key[ 5];
	   tempKey[10] = key[20];
	   tempKey[11] = key[ 9];
	   tempKey[12] = key[22];
	   tempKey[13] = key[18];
	   tempKey[14] = key[11];
	   tempKey[15] = key[ 3];
	   tempKey[16] = key[25];
	   tempKey[17] = key[ 7];
	   tempKey[18] = key[15];
	   tempKey[19] = key[ 6];
	   tempKey[20] = key[26];
	   tempKey[21] = key[19];
	   tempKey[22] = key[12];
	   tempKey[23] = key[ 1];
	   tempKey[24] = key[40];
	   tempKey[25] = key[51];
	   tempKey[26] = key[30];
	   tempKey[27] = key[36];
	   tempKey[28] = key[46];
	   tempKey[29] = key[54];
	   tempKey[30] = key[29];
	   tempKey[31] = key[39];
	   tempKey[32] = key[50];
	   tempKey[33] = key[44];
	   tempKey[34] = key[32];
	   tempKey[35] = key[47];
	   tempKey[36] = key[43];
	   tempKey[37] = key[48];
	   tempKey[38] = key[38];
	   tempKey[39] = key[55];
	   tempKey[40] = key[33];
	   tempKey[41] = key[52];
	   tempKey[42] = key[45];
	   tempKey[43] = key[41];
	   tempKey[44] = key[49];
	   tempKey[45] = key[35];
	   tempKey[46] = key[28];
	   tempKey[47] = key[31];
	   switch(i){
	     case 0: for(m=0;m < 48 ;m++){ keys[ 0][m] = tempKey[m]; } break;
	     case 1: for(m=0;m < 48 ;m++){ keys[ 1][m] = tempKey[m]; } break;
	     case 2: for(m=0;m < 48 ;m++){ keys[ 2][m] = tempKey[m]; } break;
	     case 3: for(m=0;m < 48 ;m++){ keys[ 3][m] = tempKey[m]; } break;
	     case 4: for(m=0;m < 48 ;m++){ keys[ 4][m] = tempKey[m]; } break;
	     case 5: for(m=0;m < 48 ;m++){ keys[ 5][m] = tempKey[m]; } break;
	     case 6: for(m=0;m < 48 ;m++){ keys[ 6][m] = tempKey[m]; } break;
	     case 7: for(m=0;m < 48 ;m++){ keys[ 7][m] = tempKey[m]; } break;
	     case 8: for(m=0;m < 48 ;m++){ keys[ 8][m] = tempKey[m]; } break;
	     case 9: for(m=0;m < 48 ;m++){ keys[ 9][m] = tempKey[m]; } break;
	
	     case 10: for(m=0;m < 48 ;m++){ keys[10][m] = tempKey[m]; } break;
	     case 11: for(m=0;m < 48 ;m++){ keys[11][m] = tempKey[m]; } break;
	     case 12: for(m=0;m < 48 ;m++){ keys[12][m] = tempKey[m]; } break;
	     case 13: for(m=0;m < 48 ;m++){ keys[13][m] = tempKey[m]; } break;
	     case 14: for(m=0;m < 48 ;m++){ keys[14][m] = tempKey[m]; } break;
	     case 15: for(m=0;m < 48 ;m++){ keys[15][m] = tempKey[m]; } break;
	   }
	 }
	 return keys;  
	};
    $.extend(/**@lends $.ecp */{
    	/**
    	 * @name $.ecp.des
    	 * @namespace $.ecp.des
    	 */
        des: DES
    });

})(jQuery);

