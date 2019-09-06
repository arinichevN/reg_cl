function ValElem(precision, minv, maxv, slave, set_cmd, get_cmd, kind) {
    this.container = cd();
    this.descrE = cd();
    this.valE = cd();
    this.selected = false;
    this.value = 0.0;
    this.precision = precision;
    this.minv = minv;
    this.maxv = maxv;
    this.slave = slave;
    this.set_cmd = set_cmd;
    this.get_cmd = get_cmd;
    this.kind = kind;
    this.channel_id = null;
    this.updateStr = function (str, title) {
		this.container.title = title;
		this.descrE.innerHTML = str;
    };
    this.blinkFailed = function(){
		blink(this.valE, "val_update_failed", 300);
	};
	this.blinkSuccess = function(){
		blink(this.valE, "val_update_success", 300);
	};
	this.setBadVal = function(){
		this.value = null;
		this.valE.innerHTML = NO_DATA_STR;
		this.blinkFailed();
	};
	this.setGoodVal = function(v){
		this.value = v;
		this.valE.innerHTML = this.value.toFixed(this.precision);
		this.blinkSuccess();
	};
    this.updateVal = function(v){
		var vt = null;
		if(v === null){
			vt = 0.0;
		}else{
			vt = v;
		}
		this.value = vt;
		this.valE.innerHTML = this.value.toFixed(this.precision);
	};
	this.incVal = function(dif){
		if(this.selected){
			var v = this.value + dif;
			if(v >= (this.minv - 0.0001) && v <= (this.maxv + 0.0001)){
				this.setGoodVal(v);
			}else{
				this.blinkFailed();
			}
		}
	};
	this.setValue = function(v){
		if(this.selected){
			var vd = getFloat(v);
			if(vd === null){
				return;
			}
			if(vd >= (this.minv - 0.0001) && vd <= (this.maxv + 0.0001)){
				this.setGoodVal(vd);
			}else{
				this.blinkFailed();
			}
		}
	};
	this.setValueF = function(v){
		if(typeof v === "undefined" || v === null ){
			this.setBadVal();
		}else{
			var vd = getFloat(v);
			if(vd === null){
				this.setBadVal();
			}else{
				this.setGoodVal(vd);
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
    this.setValueR = function(v){
        if(typeof v === 'undefined' || v === null || !v.length){
			this.setBadVal();
		}else{
			var id = getInt(v[0].p0);
			if(id === null){
				console.log("failed to get id");
				return;
			}
			var vp = v[0].p1;
			if(this.channel_id === id){
                switch(this.kind){
                    case KIND.DBL:
                        this.setValueF(vp);
                        break;
                    case KIND.INTG:
                        this.setValueI(vp);
                        break;
                }
			}
		}
    };
	this.select = function(){
		if(this.selected){
			this.selected = false;
			clr(this.container, ["reg_selected"]);
		}else{
			this.selected = true;
			cla(this.container, ["reg_selected"]);
		}
		this.slave.valElemSelect();
	};
    this.sendData = function(peer, channels){
		if(!this.selected) return;
		 switch (this.kind){
            case KIND.INTG:
                sendRequestSetIntA (this.set_cmd, peer, this, channels, this.value);
                break;
            case KIND.DBL:
                sendRequestSetFloatA (this.set_cmd, peer, this, channels, this.value);
                break;
            default:
                return;
        }
	};
    this.recieveData = function(channel){
        if(!this.selected) return;
		if(channel === null) return;
        var act = null;
        switch (this.kind){
            case KIND.INTG:
                act = ACT_GET_INT;
                break;
            case KIND.DBL:
                act = ACT_GET_FLOAT;
                break;
            default:
                return;
        }
        this.channel_id = channel.id;
		if(sendRequestGetIntA (this.get_cmd, channel.peer, this, [channel], act)){
			cursor_blocker.enable();
		}else{
			console.log("   where cmd = ", cmd);
		}
    };
    this.confirm = function (action, d, dt_diff) {
		switch (action) {
			case this.get_cmd:	
				this.setValueR(d);
				cursor_blocker.disable();
				break;
			case this.set_cmd:
				break;
			default:
				console.log("confirm: unknown action: ", action);
				break;
		}
    };
    this.abort = function (action, m, n) {
		switch (action) {
			case this.get_cmd:
                this.setValueR(null);cursor_blocker.disable();break;
			case this.set_cmd:
				break;
			default:
				console.log("abort: unknown action: ", action);
				break;
		}
    };
    a(this.container, [this.descrE, this.valE]);
    cla(this.container, ["val_cont", "val_interactive"]);
    cla(this.descrE, ["val_descr"]);
    cla(this.valE, ["val_val"]);
    var self = this;
	this.container.onclick = function(){
		self.select();
	};
}
