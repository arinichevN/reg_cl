function RegChannelElem(channel, slave) {
    this.channel = channel;
    this.slave = slave;
    this.container = cd();
    this.done = false;
    this.selected = false;
    this.selected_get = false;
    this.mdown = false;
    this.inchk = false;
    this.block_select = false;
    this.FLOAT_PRES = 1;
    this.FLOAT_PRES_OUT = 0;
    this.BLINK_DELAY_MS = 100;
    this.DELAY_SELECT_MS = 500;
    this.DELAY_UNPDATE_MS = 3000;
    this.value_update_success = false;
    this.autoupdate = null;
    this.uchk = c("input");
    this.uchk.type = "checkbox";
    if(this.uchk.checked){
		this.autoupdate = true;
	}else{
		this.autoupdate = false;
	}
    this.valueE = cd();
    this.valueE.innerHTML = NO_DATA_STR;
    this.descrE = cd();
    this.stateRE = cd();
    this.stateAE = cd();
    
    this.muE = cd();
    
    this.goalE = new ChannelDescrElem1();
    this.regmodeE = new ChannelDescrElem1();
    this.regmethodE = new ChannelDescrElem1();
    this.regstateE = new ChannelDescrElem1();
    this.secstateE = new ChannelDescrElem1();
    this.outE = new ChannelDescrElem1();

    this.RETRY = 7;
    this.uf_count = 0;//number of bad updates

    this.muE.innerHTML = "";
    this.updateStr = function () {
		this.uchk.title = trans.get(358);
		this.goalE.updateStr(trans.get(318));
	    this.regmodeE.updateStr(trans.get(333));
	    this.regmethodE.updateStr(trans.get(328));
	    this.regstateE.updateStr(trans.get(360));
	    this.secstateE.updateStr(trans.get(362));
	    this.outE.updateStr(trans.get(363));
	    this.muE.title = trans.get(367);
	    this.valueE.title = trans.get(368);
    };
    this.select = function () {
		if(this.inchk || this.mdown){
			return;		
		}
		if(this.block_select){
			this.block_select = false;
			return;
		}
        if (this.selected) {
            clr(this.container, "reg_selected");
            this.selected = false;
        } else {
			this.selected = true;
            cla(this.container, "reg_selected");
        }
        this.slave.controlSettingsB();
    };
    this.unselectGet = function(){
		this.selected_get = false;
		clr(this.container, "reg_selected_get");
	};
    this.selectGet = function(){
		if(this.inchk){
			return;		
		}
		if(this.mdown){
			if(this.selected_get){
				this.unselectGet();
			}else{
				this.slave.channelSelectedGet();
				this.selected_get = true;
				cla(this.container, "reg_selected_get");
			}
			this.slave.controlSettingsB();
			this.block_select = true;
		}
	};
    this.mdownf = function(){
		this.mdown = true;
		var self = this;
		var tmr1 = window.setTimeout(function () {
                    self.selectGet();
                }, this.DELAY_SELECT_MS);
	};
	this.mupf = function(){
		this.mdown = false;
		this.select();
	};
	this.chkin = function(){
		this.inchk = true;
	};
	this.chkout = function(){
		this.inchk = false;
	};
    this.blink = function (style) {
		blink(this.container, style, this.BLINK_DELAY_MS);
    };
    this.updateHead = function (item) {
        var v = "";
        if (item.name === null || typeof item.name === 'undefined') {
            cla(this.descrE, "reg_dis");
            v = NO_DATA_STR;
        } else {
            v = item.name;
            clr(this.descrE, "reg_dis");
        }
        this.descrE.innerHTML = v;
        //this.descrE.innerHTML = '';

        v = "";
        if (item.mu === null || typeof item.mu === 'undefined') {
            cla(this.muE, "reg_dis");
            v = NO_DATA_STR;
        } else {
            v = item.mu;
            clr(this.muE, "reg_dis");
        }
        this.muE.innerHTML = v;
        
       
        
        this.blink('reg_updated_init');
    };
    this.startUpdateFTS = function(value, state, ts, tns){
		if(value === null || state === null || ts === null || tns === null) {
            this.valueE.innerHTML = '&empty;';
            cla(this.valueE, 'reg_dis');
            blink(this.valueE, 'reg_update_failure', this.BLINK_DELAY_MS);
        }else{
			if(state === 1){
				this.valueE.innerHTML = value.toFixed(this.FLOAT_PRES);
				clr(this.valueE, 'reg_dis');
				blink(this.valueE, 'reg_update_success', this.BLINK_DELAY_MS);
				this.value_update_success = true;
			}else{
				this.valueE.innerHTML = '&empty;';
	            cla(this.valueE, 'reg_dis');
	            blink(this.valueE, 'reg_update_failure', this.BLINK_DELAY_MS);
			}
		}
	};
	this.finishUpdateFTS = function(){
		if(!this.value_update_success) {
            this.valueE.innerHTML = '&empty;';
            cla(this.valueE, 'reg_dis');
            blink(this.valueE, 'reg_update_failure', this.BLINK_DELAY_MS);
        }
        this.value_update_success = false;
	};
	this.setAutoUpdate = function(){
		if(this.uchk.checked){
			this.autoupdate = true;
			this.channel.peer.controller.addChannel(this.channel);
		}else{
			this.autoupdate = false;
			this.channel.peer.controller.delChannel(this.channel);
		}
	};
    var hcont = cd();
    var valcont = cd();
    var inicont = cd();
    var runcont = cd();
    var utilcont = cd();
    
    a(hcont, [this.descrE, this.uchk]);
    a(valcont, [this.valueE, this.muE]);
    a(inicont, [this.goalE, this.regmodeE, this.regmethodE]);
    a(runcont, [this.regstateE, this.secstateE, this.outE]);
    a(utilcont, [inicont, runcont]);
    a(this.container, [ hcont, valcont, utilcont]);
    cla(this.uchk, ["reg_uchk"]);
    cla(hcont, ["reg_hcont"]);
    cla(inicont, ["reg_inicont"]);
    cla(runcont, ["reg_runcont"]);
    cla(utilcont, ["reg_utilcont"]);
    cla(valcont, ["reg_valcont"]);
    cla(this.valueE, ["reg_value"]);
    cla([this.stateRE, this.stateAE], ["reg_state"]);
    cla(this.descrE, ["reg_descr"]);
    cla(this.goalE, ["reg_goal"]);
    cla(this.muE, ["reg_mu"]);
    cla([this.valueE, this.descrE], ["reg_dis"]);
    cla([this.valueE], ["reg_value"]);
    cla([this.valueE], 'reg_dis');
    cla(this.container, ["reg_block", "reg_interactive"]);
    var self = this;
    this.uchk.onmouseenter = function () {
        self.chkin();
    };
    this.uchk.onmouseleave = function () {
        self.chkout();
    };
    this.uchk.onchange = function () {
        self.setAutoUpdate();
    };
    this.container.onmousedown = function () {
        self.mdownf();
    };
    this.container.onmouseup = function () {
        self.mupf();
    };
    this.container.title = this.channel.peer.address + " : " + this.channel.peer.port + " : " + this.channel.id;
}

