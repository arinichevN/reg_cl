function SelectButton(n, sz, slave, set_cmd, get_cmd, map){
	this.container = c("select");	
	s(this.container, "size", sz);
	this.items = [];
	this.selected = false;
	this.slave = slave;
    this.set_cmd = set_cmd;
    this.get_cmd = get_cmd;
    this.map = map;
    this.channel_id = null;
	for(var i=0;i<n;i++){
		var o = c("option");
		if(i===0){
			o.selected = true;
		}
		a(this.container, o);
		this.items.push(o);
	}
	this.blinkFailed = function(){
		blink(this.container, "val_update_failed", 300);
	};
	this.blinkSuccess = function(){
		blink(this.container, "val_update_success", 300);
	};
	this.setBadVal = function(){
		if(this.items.length){
			this.items[0].selected = true;
			this.blinkFailed();
		}
		
	};
	this.getSelectedIndex = function(){
		return this.container.selectedIndex;
	};
	this.updateStr=function(items, title){
		for(var i=0;i<this.items.length;i++){
			this.items[i].innerHTML = items[i];
		}
		this.container.title = title;
	};
	this.select = function(ind){
		if(ind < this.items.length){
			this.items[ind].selected = true;
		}
	};
	this.selecte = function(){
		if(this.selected){
			this.selected = false;
			clr(this.container, ["reg_selected"]);
		}else{
			this.selected = true;
			cla(this.container, ["reg_selected"]);
		}
		this.slave.valElemSelect();
	};
	this.setGoodVal = function(v){
		this.select(v);
		this.blinkSuccess();
	};
	this.setValueR = function(v){
        if(typeof v === 'undefined' || v === null || !v.length){
			this.setBadVal();
		}else{
			var id = getInt(v[0].p0);
			if(id === null){
				this.setBadVal();
				return;
			}
			if(this.channel_id === id){
                var vd = getInt(v[0].p1);
                if(vd === null){
                    this.setBadVal();
                }else{
                    var vi = this.getInnerValue(vd);
                    if(vi === null){
                        this.setBadVal();
                    }else{
                        this.setGoodVal(vi);
                    }
                }
			}
		}
	};
    this.getOuterValue = function(v){
        for(var i =0;i<this.map.length;i++){
            if(this.map[i].inner === v){
                return this.map[i].outer;
            }
        }
        return null;
    };
    this.getInnerValue = function(v){
        for(var i =0;i<this.map.length;i++){
            if(this.map[i].outer === v){
                return this.map[i].inner;
            }
        }
        return null;
    };
    this.sendData = function (peer, channels){
        if(!this.selected) return;
		var v = this.getSelectedIndex();
		sendRequestSetIntA (this.set_cmd, peer, this, channels, this.getOuterValue(v)) ;
    };
    this.recieveData = function(channel){
        if(!this.selected) return;
		if(channel === null) return;
        this.channel_id = channel.id;
		if(sendRequestGetIntA (this.get_cmd, channel.peer, this, [channel], ACT_GET_INT)){
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
	var self = this;
	this.container.onclick = function(){
		self.selecte();
	};
}
