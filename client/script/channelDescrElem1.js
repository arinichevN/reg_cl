function ChannelDescrElem1() {
    this.container = cd();
    this.container.innerHTML = NO_DATA_STR;
    this.blink_delay = 300;
    this.precision = 2;
    this.update_success = false;
    this.updateStr = function (title) {
		this.container.title = title;
    };
    this.blinkF = function(){
		blink(this.container, "d1e_update_failed", this.blink_delay);
	};
	this.blinkS = function(){
		blink(this.container, "d1e_update_success", this.blink_delay);
	};
	this.setBadVal  = function(){
		this.container.innerHTML = "&empty;";
		this.blinkF();
		cla(this.container, ["reg_dis"]);
	};
	this.setGoodVal = function(v){
		this.container.innerHTML = v;
		this.blinkS();
		clr(this.container, ["reg_dis"]);
		this.update_success = true;
	};
	this.setValueF = function(v){
		if(typeof v === "undefined" || v === null ){
			this.setBadVal();
		}else{
			var vd = getFloat(v);
			if(vd === null){
				this.setBadVal();
			}else{
				this.setGoodVal(vd.toFixed(this.precision).toString());
			}
		}
	};
	this.setValueI = function(v){
		if(typeof v === "undefined" || v === null ){
			this.setBadVal();
		}else{
			var vd = getInt(v);
			if(vd === null){
				this.setBadVal();
			}else{
				this.setGoodVal(vd);
			}
		}
	};
	this.setValueFR = function(v, map){
		if(typeof v === 'undefined' || v === null){
			this.setBadVal();
			return;
		}
		var vd = getInt(v);
		if(vd === null){
			this.setBadVal();
		}else{
			var f = false;
			for(var i =0;i<map.length;i++){
				if(map[i].id === vd){
					this.setGoodVal(map[i].str);//console.log("found", v, map, this.container);
					f = true;
					break;
				}
			}
			if(!f){
				this.setBadVal();
			}
		}
	};
	this.finishUpdate = function(){
		if(!this.update_success){
			this.setBadVal();
		}
		this.update_success = false;
	};
    cla(this.container, ["reg_descr1", "reg_dis"]);
}
