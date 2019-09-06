function LevelIndicator(hlevel, llevel, hstyle) {
    this.container = cd();
    this.hlevel = hlevel;
    this.llevel = llevel;
    this.hstyle = hstyle;
    this.blink_delay = 300;
    this.update_success = false;
    this.updateStr = function () {
		;
    };
    this.blinkF = function(){
		blink(this.container, "li_update_failed", this.blink_delay);
	};
	this.blinkS = function(){
		blink(this.container, "li_update_success", this.blink_delay);
	};
	this.setBadVal  = function(){
		this.container.innerHTML = "&empty;";
		this.blinkF();
		cla(this.container, ["reg_dis"]);
	};
	this.setHigh = function(){
		this.container.innerHTML = "H";
		clr(this.container, ["reg_dis"]);
        cla(this.container, [this.hstyle]);
		this.blinkS();
		this.update_success = true;
	};
    this.setLow = function(){
		this.container.innerHTML = "L";
		clr(this.container, ["reg_dis"]);
        clr(this.container, [this.hstyle]);
		this.blinkS();
		this.update_success = true;
	};
	this.setValue = function(v){
		if(typeof v === "undefined" || v === null ){
			this.setBadVal();
		}else{
            var vd = getInt(v);
			if(vd === this.hlevel){
				this.setHigh();
			}else if(vd === this.llevel){
				this.setLow();
			}else{
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
    cla(this.container, ["li_cont"]);
}
