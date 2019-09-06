var MAX_ULONG = 4294967295;
var MAX_SECONDS = 4000000;
var MAX_MSECONDS = 4000000;
var MAX_UI16 = 65535;
var MAX_FLOAT = 3.4028235E+38;
var MIN_FLOAT = -3.4028235E+38;
var MAX_TIME_S = 65530;
var NO_DATA_STR = "&empty;";
var ACT_GET_FLOAT = ['channel','get_c2'];
var ACT_GET_INT = ['channel','get_c2'];
var ACT_GET_FTS = ['channel','get_fts'];
var MAP = {
    REG_MODE:[{id:1, str:"HEAT"},{id:0, str:"COOL"}],
    REG_METHOD:[{id:0, str:"PID"},{id:1, str:"POS2"},{id:2, str:"POS1"}],
    REG_STATE:[{id:21, str:"INIT"},{id:22, str:"OFF"},{id:23, str:"DISABLE"},{id:24, str:"FAIL"},{id:25, str:"PID"},{id:26, str:"POS2"},{id:27, str:"POS1"}],
    ALM_STATE:[{id:11, str:"INIT"},{id:12, str:"OFF"},{id:13, str:"DISABLE"},{id:14, str:"FAIL"},{id:15, str:"RUN"},{id:16, str:"BLOCK"}],
    SEC_STATE:[{id:31, str:"INIT"},{id:32, str:"OFF"},{id:35, str:"DISABLE"},{id:33, str:"DO"},{id:34, str:"WAIT"}]
};
var IND = {
	NO:0,
	PID:1,
	POS2:2,
	POS1:3,
	HEATER:1,
	COOLER:2,
	ON:1,
	OFF:2
};
var REG_OUT = {
	PID:0,
	POS2:1,
	POS1:2,
	HEATER:1,
	COOLER:0,
	ON:1,
	OFF:0,
	ALM_LEVEL_HIGH:42,
	ALM_LEVEL_LOW:43
};
var KIND = {
    INTG: 1,
    DBL:2
};
function sendRequestGetFloat (cmd, peer, caller, channel_ids) {
	var data = [
		{
			action: ['channel', 'get_float'],
			param: {address: peer.address, port: peer.port, cmd:cmd, item: channel_ids}
		}
	];
	sendTo(caller, data, cmd, 'json_dss');
}

function sendRequestSetFloat (cmd, peer, caller, channel_id, v) {
	if(v == null){
		console.log("failed: null value");
		return;	
	}
	var v1 = parseFloat(v);
	if(isNaN(v1) || !isFinite(v1)){
		console.log("failed: float expected");
		return;
	}
	var data = [
		{
			action: ['channel', 'setf'],
			param: {address: peer.address, port: peer.port, cmd:cmd, item: [{p0:channel_id, p1:v1}]}
		}
	];
	sendTo(caller, data, cmd, 'json_dss');
}

function sendRequestSetFloatA (cmd, peer, caller, channels, v) {
	if(v == null){
		console.log("failed: null value");
		return;	
	}
	if(channels.length <= 0){
		return;
	}
	var v1 = getFloat(v);
	if(v1 === null){
		console.log("failed: float expected");
		return;
	}
	var va =[];
	for(var i =0;i<channels.length;i++){
		va.push({p0:channels[i].id, p1:v1});
	}
	var data = [
		{
			action: ['channel', 'setf'],
			param: {address: peer.address, port: peer.port, cmd:cmd, item: va}
		}
	];
	sendTo(caller, data, cmd, 'json_dss');
}

function sendRequestSetIntA (cmd, peer, caller, channels, v) {
	if(v == null){
		console.log("failed: null value");
		return;	
	}
	if(channels.length <= 0){
		return;
	}
	var v1 = getInt(v);
	if(v1 === null){
		return;
	}
	var va =[];
	for(var i =0;i<channels.length;i++){
		va.push({p0:channels[i].id, p1:v1});
	}
	var data = [
		{
			action: ['channel', 'seti'],
			param: {address: peer.address, port: peer.port, cmd:cmd, item: va}
		}
	];
	sendTo(caller, data, cmd, 'json_dss');
}

function sendRequestGetIntA (cmd, peer, caller, channels, act) {
	if(channels.length <= 0){
		return 0;
	}
	var va =[];
	for(var i =0;i<channels.length;i++){
		va.push(channels[i].id);
	}
	var data = [
		{
			action: act,
			param: {address: peer.address, port: peer.port, cmd:cmd, item: va}
		}
	];
	sendTo(caller, data, cmd, 'json_dss');
	return 1;
}
var app = {
    LIMIT: {
        GET_DATA: 3
    },
    NAME_SIZE: 32,
    controller_state: null,
    version: 1,
    controller_version: null,
    METHOD:{
      RETURN:{
          PID:'PID',
          ONF:'ONF'
      },
      DB:{
          PID:'pid',
          ONF:'onf'
      }  ,
      SET:{
		  PID:1,
		  ONF:2
	  }
    },
    MODE:{
      RETURN:{
          HEATER:'HEATER',
          COOLER:'COOLER'
      },
      SET:{
		  HEATER:1,
		  COOLER:2
	  }
    },
    ENABLE:{
		RETURN:{
			YES:1,
			NO:0
		},
		SET:{
			YES:1,
			NO:0
		}
	},
	null_value: {
		reg:{
			goal:null,
			mode:null,
			method:null,
			secure_out:null,
			state:null,
			onf:{
				hys:null
			},
			pid:{
				kp:null,
				ki:null,
				kd:null
			}
		},
		alarm:{
			min_value:null,
			max_value:null,
			hys:null,
			block_tm:null,
			state:null,
			high:null,
			low:null
		},
		pwm:{
			period:null,
			duty_cycle_min:null,
			duty_cycle_max:null
		}
	},
    version_acceptable: {
        controller: [1],
        f_php: [2],
        f_js: [2]
    },
    init: function () {
        trans.active_lang=1;
    },
    update: function () {
        this.sendU();
    }
};
elem.push(app);
