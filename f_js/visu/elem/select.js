function SelectButton(n, sz, slave){
	this.container = c("select");	
	s(this.container, "size", sz);
	this.items = [];
	this.selected = false;
	this.slave = slave;
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
				if(map[i].input === vd){
					this.setGoodVal(map[i].output);
					f = true;
					break;
				}
			}
			if(!f){
				this.setBadVal();
			}
		}
	};
	var self = this;
	this.container.onclick = function(){
		self.selecte();
	};
}
