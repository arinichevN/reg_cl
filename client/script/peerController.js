function PeerController(peer, channels, delay_fts, delay_ini, delay_run) {
    this.peer = peer;
    this.channels = [];
    for(var i=0; i<channels.length; i++){
		if(channels[i].peer === this.peer && channels[i].visu.autoupdate){
			this.channels.push(channels[i]);
		}
	}
	this.delay_fts = delay_fts;
	this.delay_ini = delay_ini;
	this.delay_run = delay_run;
	this.tmr_fts = null;
	this.tmr_ini = null;
	this.tmr_run = null;
	this.addChannel = function(channel){
		var f = false;
		for(var i=0; i<this.channels.length; i++){
			if(this.channels[i] === channel){
				f = true;
				break;
			}
		}
		if(!f){
			this.channels.push(channel);
		}
		
	};
	this.delChannel = function(channel){
		for(var i=0; i<this.channels.length; i++){
			if(this.channels[i] === channel){
				this.channels.splice(i, 1);
			}
		}
	};
	this.setFTS = function(v){
		if(typeof v === 'undefined' || v === null || !v.length){
;
		}else{
			for(var i=0;i<v.length;i++){
				var id = getInt(v[i].id);
				var value = getFloat(v[i].value);
				var state = getInt(v[i].state);
				var ts = getInt(v[i].tv_sec);
				var tns = getInt(v[i].tv_nsec);
				if(id === null || value === null || state === null || ts === null || tns === null){
					continue;
				}
				for(var j=0;j<this.channels.length;j++){
					if(this.channels[j].id === id){
						this.channels[j].visu.startUpdateFTS(value, state, ts, tns);
					}
				}
			}
		}
		for(var j=0;j<this.channels.length;j++){
			this.channels[j].visu.finishUpdateFTS();
		}
	};
	this.setValue = function(t, v){
		if(typeof v === 'undefined' || v === null || !v.length){
			;
		}else{
			for(var i=0;i<v.length;i++){
				var id = getInt(v[i].p0);
				if(id === null){
					continue;
				}
				var vp = v[i].p1;
				for(var j=0;j<this.channels.length;j++){
					if(this.channels[j].id === id){
						switch(t){
							case CMD_GET_GOAL:					this.channels[j].visu.goalE.setValueF(vp);break;
							case CMD_GET_REG_MODE:				this.channels[j].visu.regmodeE.setValueFR(vp, MAP.REG_MODE);break;
							case CMD_GET_REG_METHOD:			this.channels[j].visu.regmethodE.setValueFR(vp, MAP.REG_METHOD);break;
							case CMD_GET_REG_STATE:				this.channels[j].visu.regstateE.setValueFR(vp, MAP.REG_STATE);break;
							case CMD_GET_SEC_STATE:				this.channels[j].visu.secstateE.setValueFR(vp, MAP.SEC_STATE);break;
							case CMD_GET_OUT:					this.channels[j].visu.outE.setValueI(vp);break;
						}
					}
				}
			}
		}
		for(var j=0;j<this.channels.length;j++){
			switch(t){
				case CMD_GET_GOAL:				this.channels[j].visu.goalE.finishUpdate();break;
				case CMD_GET_REG_MODE:			this.channels[j].visu.regmodeE.finishUpdate();break;
				case CMD_GET_REG_METHOD:		this.channels[j].visu.regmethodE.finishUpdate();break;
				case CMD_GET_REG_STATE:			this.channels[j].visu.regstateE.finishUpdate();break;
				case CMD_GET_SEC_STATE:			this.channels[j].visu.secstateE.finishUpdate();break;
				case CMD_GET_OUT:				this.channels[j].visu.outE.finishUpdate();break;
			}
		}
	};
	this.setOutFR = function(v){
		if(typeof v === 'undefined' || v === null){
			return;
		}
		if(!v.length){
			return;
		}
		for(var i=0;i<v.length;i++){
			var id = getInt(v[i].p0);
			if(id === null){
				continue;
			}
			for(var j=0;j<this.channels.length;j++){
				if(this.channels[j].id === id){
					this.channels[j].visu.dcE.setValueI(d[i].p0);
				}
			}
		}
	};
	this.sendRequestFTS = function(){
		sendRequestGetIntA (CMD_GET_FTS, this.peer, this, this.channels, ACT_GET_FTS);
	};
	this.sendRequestIni = function(){
		sendRequestGetIntA (CMD_GET_GOAL, this.peer, this, this.channels, ACT_GET_FLOAT);
		sendRequestGetIntA (CMD_GET_REG_MODE, this.peer, this, this.channels, ACT_GET_INT);
		sendRequestGetIntA (CMD_GET_REG_METHOD, this.peer, this, this.channels, ACT_GET_INT);
	};
	this.sendRequestRun = function(){
		sendRequestGetIntA (CMD_GET_REG_STATE, this.peer, this, this.channels, ACT_GET_INT);
		sendRequestGetIntA (CMD_GET_SEC_STATE, this.peer, this, this.channels, ACT_GET_INT);
		sendRequestGetIntA (CMD_GET_OUT, this.peer, this, this.channels, ACT_GET_INT);
	};
	this.startSendingRequest = function(){
		var self = this;
		if(this.tmr_fts === null){
			this.tmr_fts = setInterval(function () {
	                    self.sendRequestFTS();
	                }, this.delay_fts);
		}
		
		if(this.tmr_ini === null){
			this.tmr_ini= setInterval(function () {
	                    self.sendRequestIni();
	                }, this.delay_ini);
		}
		if(this.tmr_run === null){
			this.tmr_run = setInterval(function () {
	                    self.sendRequestRun();
	                }, this.delay_run);
		}
	};
	this.stopSendingRequest = function(){
		if(this.tmr_fts !== null){
			clearInterval(this.tmr_fts);
			this.tmr_fts = null;
		}
		if(this.tmr_ini !== null){
			clearInterval(this.tmr_ini);
			this.tmr_ini = null;
		}
		if(this.tmr_run !== null){
			clearInterval(this.tmr_run);
			this.tmr_run = null;
		}
	};
	this.confirm = function (action, d, dt_diff) {
		switch (action) {
			case CMD_GET_FTS:			this.setFTS(d);break;
			case CMD_GET_GOAL:			this.setValue(action, d);break;
			case CMD_GET_OUT:			this.setValue(action, d);break;
			case CMD_GET_REG_STATE:		this.setValue(action, d);break;
			case CMD_GET_SEC_STATE:		this.setValue(action, d);break;
			case CMD_GET_REG_MODE:		this.setValue(action, d);break;
			case CMD_GET_REG_METHOD:	this.setValue(action, d);break;
			default:
				console.log("confirm: unknown action: ", action);
				break;
		}
    };
	this.abort = function (action, m, n) {
		switch (action) {
			case CMD_GET_FTS:			this.setFTS(null);break;
			case CMD_GET_GOAL:			this.setValue(action, null);break;
			case CMD_GET_OUT:			this.setValue(action, null);break;
			case CMD_GET_REG_STATE:		this.setValue(action, null);break;
			case CMD_GET_SEC_STATE:		this.setValue(action, null);break;
			case CMD_GET_REG_MODE:		this.setValue(action, null);break;
			case CMD_GET_REG_METHOD:	this.setValue(action, null);break;
			default:
				console.log("abort: unknown action: ", action);
				break;
		}
    };
}
