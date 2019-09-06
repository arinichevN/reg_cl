function ProgEdit() {
    this.type = VISU_TYPE.DIAL;
    this.container = null;
    this.header = null;
    this.goalB = null;
    this.deltaB = null;
    this.ominB = null;
    this.omaxB = null;
    this.kpB = null;
    this.kiB = null;
    this.kdB = null;
    this.powerB = null;
    this.periodB = null;
    this.rslB = null;
    this.dcminB = null;
    this.dcmaxB = null;
    this.methodE = null;
    this.modeE = null;
    this.regB = null;
    this.sH = null;
    this.soutB = null;
    this.stmB = null;
    this.sstB = null;
    this.pwmcont = null;
	this.dpscont = null;
	this.pidcont = null;
	this.seccont = null;
	this.spscont = null;
    this.valbs = [];
    this.parambs = [];
    
    this.getB = null;
    this.applyB = null;
    this.canceB = null;
    this.slave = null;
    this.kind = null;
    this.initialized = false;
    this.apply_active = false;
    this.current_row = null;
    this.minv = INT32_MIN;
    this.maxv = INT32_MAX;
    this.mode = null;
    this.FLOAT_PRECISION = 3;
    this.value = null;
    this.MAP = {
	    ONF:[{outer:REG_OUT.ON, inner:IND.ON},{outer:REG_OUT.OFF, inner:IND.OFF}],
	    REG_MODE:[{outer:REG_OUT.HEATER, inner:IND.HEATER},{outer:REG_OUT.COOLER, inner:IND.COOLER}],
	    REG_METHOD:[{outer:REG_OUT.PID, inner:IND.PID},{outer:REG_OUT.POS2, inner:IND.POS2},{outer:REG_OUT.POS1, inner:IND.POS1}]
    };
    this.FLOAT_PRES = 1;
    this.channels = [];
    this.getchannel = null;
    this.init = function () {
        var self = this;
        this.container = cvis();
        this.header = cd();
        
        this.goalB = new ValElem(this.FLOAT_PRECISION, MIN_FLOAT, MAX_FLOAT, self, CMD_SET_GOAL, CMD_GET_GOAL, KIND.DBL);
        
        this.methodcont = new GroupElem1();
        this.spscont = new GroupElem1();
        this.powerB = new ValElem(0, 0, MAX_UI16, self, CMD_SET_SPS_OUT, CMD_GET_SPS_OUT, KIND.INTG);
        
		this.dpscont = new GroupElem1();
        this.deltaB = new ValElem(this.FLOAT_PRECISION, 0.0, MAX_FLOAT, self, CMD_SET_DPS_HYS, CMD_GET_DPS_HYS, KIND.DBL);
        this.ominB = new ValElem(0, 0, MAX_UI16, self, CMD_SET_DPS_OUT_MIN, CMD_GET_DPS_OUT_MIN, KIND.INTG);
        this.omaxB = new ValElem(0, 0, MAX_UI16, self, CMD_SET_DPS_OUT_MAX, CMD_GET_DPS_OUT_MAX, KIND.INTG);
        
        this.pidcont = new GroupElem1();
        this.kpB = new ValElem(this.FLOAT_PRECISION, 0.0, MAX_FLOAT, self, CMD_SET_PID_KP, CMD_GET_PID_KP, KIND.DBL);
        this.kiB = new ValElem(this.FLOAT_PRECISION, 0.0, MAX_FLOAT, self, CMD_SET_PID_KI, CMD_GET_PID_KI, KIND.DBL);
        this.kdB = new ValElem(this.FLOAT_PRECISION, 0.0, MAX_FLOAT, self, CMD_SET_PID_KD, CMD_GET_PID_KD, KIND.DBL);
        
        this.pwmcont = new GroupElem1();
        this.periodB = new ValElem(0, 0, MAX_MSECONDS, self, CMD_SET_PWM_PERIOD, CMD_GET_PWM_PERIOD, KIND.INTG);
        this.rslB = new ValElem(0, 0, MAX_UI16, self, CMD_SET_PWM_RESOLUTION, CMD_GET_PWM_RESOLUTION, KIND.INTG);
        this.dcminB = new ValElem(0, 0, MAX_MSECONDS, self, CMD_SET_PWM_DUTY_CYCLE_MIN, CMD_GET_PWM_DUTY_CYCLE_MIN, KIND.INTG);
        this.dcmaxB = new ValElem(0, 0, MAX_MSECONDS, self, CMD_SET_PWM_DUTY_CYCLE_MAX, CMD_GET_PWM_DUTY_CYCLE_MAX, KIND.INTG);
        
        this.seccont = new GroupElem1();
	    this.soutB = new ValElem(0, 0, MAX_UI16, self, CMD_SET_SEC_OUT, CMD_GET_SEC_OUT, KIND.INTG);
	    this.stmB = new ValElem(0, 0, MAX_TIME_S, self, CMD_SET_SEC_TM, CMD_GET_SEC_TM, KIND.INTG);
	    this.sstB = new SelectButton(3, 1, self, CMD_SET_SEC_ENABLE, CMD_GET_SEC_ENABLE, this.MAP.ONF);
        
        this.fe = new FloatEdit(self);
        
        this.regB = new SelectButton(3, 1, self, CMD_SET_REG_ENABLE, CMD_GET_REG_ENABLE, this.MAP.ONF);
        this.methodE = new SelectButton(4, 1, self, CMD_SET_REG_METHOD, CMD_GET_REG_METHOD, this.MAP.REG_METHOD);
        this.modeE = new SelectButton(3, 1, self, CMD_SET_REG_MODE, CMD_GET_REG_MODE, this.MAP.REG_MODE);
        
        this.getB = cb("");
        this.backB = new BackButton(self, 1);
        this.applyB = new ApplyButton(self, 1);
        this.applyB.disable();
        this.getB.onclick = function(){
			self.sendGetInit();
		};
        var r2 = cd();
        
		var c11 = cd();
		var c12 = cd();
		var c13 = cd();
		var c14 = cd();
		var c15 = cd();
		var c16 = cd();
		var c17 = cd();
		var c18 = cd();
		var c19 = cd();
		var ce = cd();
		var dcont = cd();
		var bcont = cd();
		this.pwmcont.a([this.periodB, this.rslB, this.dcminB, this.dcmaxB]);
		this.dpscont.a([this.deltaB, this.ominB, this.omaxB]);
		this.pidcont.a([this.kpB,this.kiB,this.kdB]);
		this.seccont.a([this.soutB, this.stmB, this.sstB]);
		this.spscont.a([this.powerB]);
		this.methodcont.a([this.pidcont,this.dpscont, this.spscont]);
		
        a(dcont, [this.goalB,this.methodE,this.modeE,this.regB, this.methodcont, this.pwmcont, this.seccont]);
		
		a(c11, [this.fe.valB]);
        a(c12, [this.fe.setB]);
        a(c13, [this.fe.downB]);
        a(c14, [this.fe.upB]);
        a(c15, [this.fe.fractB]);
        a(c16, [this.fe.wholeB]);
        a(c17, [this.applyB]);
        a(c18, [this.backB]);
        a(c19, [this.getB]);
        a(bcont, [c11,c12,c13,c14,c15,c16,c19,c17,c18]);
        
        a(this.container, [this.header, dcont, bcont]);
        cla([this.header], "pre_header");
        cla([dcont], "pre_dcont");
        cla([bcont], "pre_bcont");
        cla([ c11, c12, c13, c14, c15, c16,c17,c18], "pre_cell2");
        cla([ c19], "pre_cell3w");
        cla([this.fe.valB, this.fe.setB, this.fe.upB, this.fe.downB, this.fe.fractB, this.fe.wholeB, this.getB, this.applyB, this.backB], "pre_icell");
        cla([this.methodE, this.modeE, this.regB, this.sstB], ["pre_hbtn"]);
        cla([ this.fe.setB, this.fe.upB, this.fe.downB, this.fe.fractB, this.fe.wholeB, this.fe.fractB, this.fe.wholeB, this.goalB, this.deltaB, this.ominB, this.omaxB, this.kpB, this.kiB, this.kdB, this.powerB, this.periodB, this.rslB, this.dcminB,this.dcmaxB, this.soutB, this.stmB], "pre_interactive");
        cla([this.backB, this.applyB, this.getB, this.fe.valB, this.fe.setB, this.fe.upB, this.fe.downB, this.fe.fractB, this.fe.wholeB], ["f1"]);
        this.valbs = [this.goalB,this.deltaB,this.ominB,this.omaxB,this.kpB,this.kiB,this.kdB,this.powerB,this.rslB,this.periodB,this.dcminB,this.dcmaxB,this.soutB,this.stmB];
        this.parambs = [
	        this.goalB, this.deltaB, this.ominB, this.omaxB, this.kpB, this.kiB,
	        this.kdB, this.powerB, this.rslB, this.periodB, this.dcminB, this.dcmaxB,
	        this.soutB, this.stmB, this.sstB, this.regB, this.methodE, this.modeE
        ];
        this.initialized = true;
    };
    this.getName = function () {
        return trans.get(312);
    };
    this.incCB = function (kind, out) {
        for(var i=0;i<this.valbs.length;i++){
            this.valbs[i].incVal(out);
        }
    };
    this.setCB = function(out){
        for(var i=0;i<this.valbs.length;i++){
            this.valbs[i].setValue(out);
        }
	};
    this.anyParambSelected = function(){
        for(var i = 0;i<this.parambs.length;i++){
			if(this.parambs[i].selected){
				return true;
			}
		}
        return false;
    };
    this.anyValbSelected = function(){
        for(var i = 0;i<this.valbs.length;i++){
			if(this.valbs[i].selected){
				return true;
			}
		}
        return false;
    };
	this.updateApplyB = function(){
		if(this.apply_active && this.anyParambSelected()){
			this.applyB.enable();
		}else{
			this.applyB.disable();
		}
	};
	this.updateGetB = function(btarr){
		if(this.getchannel == null){
			this.getB.disabled = true;
			return;
		}
		if(this.anyParambSelected()){
			this.getB.disabled = false;
		}else{
			this.getB.disabled = true;
		}
	};
    this.valElemSelect = function(){
        if(this.anyValbSelected()){
            this.fe.setB.disabled = false;
			this.fe.upB.disabled = false;
			this.fe.downB.disabled = false;
			this.fe.setB.disabled = false;
		}else{
			this.fe.setB.disabled = true;
			this.fe.upB.disabled = true;
			this.fe.downB.disabled = true;
			this.fe.setB.disabled = true;
		}
		this.updateApplyB();
		this.updateGetB();
	};
    this.getUniquePeers = function(){
		var out = [];
		for(var i=0;i<this.channels.length;i++){
			var found = false;
			for(var p=0;p<out.length;p++){
				if(out[p] === this.channels[i].peer){
					found = true;
					break;
				}
			}
			if(!found){
				out.push(this.channels[i].peer);
			}
		}
		return out;
	};
	this.getPeerSelectedChannels = function(peer){
		var out = [];
		for(var i=0;i<this.channels.length;i++){
			if(this.channels[i].peer === peer && this.channels[i].visu.selected){
				out.push(this.channels[i]);
			}
		}
		return out;
	};
	
	this.sendData = function(){
		var upeers = this.getUniquePeers();
		for(var i = 0;i<upeers.length;i++){
            var peer = upeers[i];
            var channels = this.getPeerSelectedChannels(peer);
            for(var j = 0;j<this.parambs.length;j++){
                this.parambs[j].sendData(peer, channels);
            }
		}
	};
	this.sendGetInit = function () {    
        for(var i = 0;i<this.parambs.length;i++){
            this.parambs[i].recieveData(this.getchannel);
        }  
    };
    this.apply = function (id) {
		this.sendData();
    };
    this.updateStr = function () {
        this.goalB.updateStr(trans.get(318), trans.get(318));
        this.deltaB.updateStr("hys", trans.get(335));
        this.ominB.updateStr("OFF out", trans.get(356));
        this.omaxB.updateStr("ON out", trans.get(355));
        this.kpB.updateStr("Kp", trans.get(336));
        this.kiB.updateStr("Ki", trans.get(337));
        this.kdB.updateStr("Kd", trans.get(338));
        this.powerB.updateStr("out", trans.get(334));
        this.periodB.updateStr("period", trans.get(340));
        this.rslB.updateStr("rsl", trans.get(341));
        this.dcminB.updateStr("min", trans.get(365));
        this.dcmaxB.updateStr("max", trans.get(366));
        
        this.soutB.updateStr("out", trans.get(334));
        this.stmB.updateStr("timeout", trans.get(345));
        
        this.methodE.updateStr([NO_DATA_STR, trans.get(354), trans.get(353), trans.get(359)], trans.get(328));
        this.modeE.updateStr([NO_DATA_STR,trans.get(315), trans.get(316)], trans.get(333));
        this.regB.updateStr([NO_DATA_STR,trans.get(330), trans.get(331)], trans.get(332));
        this.sstB.updateStr([NO_DATA_STR,trans.get(330), trans.get(331)], trans.get(300));
        
        this.methodcont.updateStr(trans.get(328));
        this.seccont.updateStr(trans.get(357));
        this.pwmcont.updateStr(trans.get(347));
        this.dpscont.updateStr(trans.get(353));
        this.pidcont.updateStr(trans.get(354));
        this.spscont.updateStr(trans.get(359));
        
      //  this.powerB.innerHTML = trans.get(325);
		this.getB.innerHTML = trans.get(351);
		this.getB.title = trans.get(364);
        this.applyB.innerHTML = trans.get(2);
        this.applyB.container.title = trans.get(339);
        
    };

	this.setHeader = function(channels){
		clearCont(this.header);
		for(var i=0;i<channels.length;i++){
			var elem = c("span");
			cla(elem, "pre_header_elem");
			if(channels[i].visu.selected_get){
				cla(elem, "pre_header_selget");
			}
			if(channels[i].visu.selected){
				cla(elem, "pre_header_sel");
			}
			elem.innerHTML = channels[i].name;
			a(this.header, elem);
		}
	};
	this.setValue = function(channels){
		var i0=-1;
		if(channels.length){
			i0 = 0;
			dt = channels[0].visu.selection_date;
		}
		for(var i=1;i<channels.length;i++){
			if(channels[i].visu.selection_data < dt){
				dt = channels[i].visu.selection_date;
				i0 = i;
			}
		}
		if(i0 >= 0){
			this.value = channels[i0].value;
		}else{
			this.value = null;
		}
		
	};
	this.getChannelSG = function(channels){
		for(var i=0;i<channels.length;i++){
			if(channels[i].visu.selected_get){
				return channels[i];
			}
		}
		return null;
	};

    this.prep = function (channels, slave) {
		this.channels = channels;
		this.slave = slave;
		this.setHeader(this.channels);
		this.getchannel = this.getChannelSG(channels);
		var f = false;
		for(var i=0;i<channels.length;i++){
			if(channels[i].visu.selected){
				f = true;
				break;
			}
		}
		this.apply_active = f;
		this.updateGetB();
		this.updateApplyB();
		this.slave.update = false;

    };
    this.show = function () {
        clr(this.container, "hdn");
    };
    this.hide = function () {
        cla(this.container, "hdn");
    };
	
}
var vprog_edit = new ProgEdit();
visu.push(vprog_edit);
