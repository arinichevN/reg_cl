function Control() {
    this.type = VISU_TYPE.MAIN;
    this.container = {};
    this.channels = [
        {name: "канал 1", mu: "&deg;C", peer_id: 'reg_1', id: 1, group_id: 1},
        {name: "канал 2", mu: "&deg;C", peer_id: 'reg_1', id: 2, group_id: 1},
        {name: "канал 3", mu: "&deg;C", peer_id: 'reg_1', id: 3, group_id: 1}
    ];
    this.peers = [
        {id: 'reg_1', address: '127.0.0.1', port: 49188, timeout: 3, name: "регулятор 1"},
        //{id: 'reg_2', address: '192.168.0.103', port: 49176, timeout: 3, name: "регулятор 2"}
    ];
    this.groups = [
        {id: 1, name: 'регулятор1'}
    ];

    this.DELAY_FACTOR = 2000000;//factor
    this.UPDATE_DELAY_FTS = 1000;
    this.UPDATE_DELAY_INI = 1000;
    this.UPDATE_DELAY_RUN = 1000;
    this.sleep = false;
    this.ACTION =
            {
			CHANNEL: {
					GET_DATA_RUNTIME: 74,
					GET_DATA_INIT: 75
				}
            };
    this.CATCH = {
        REGB: 1,
        EDIT: 2,
        PAGE_BLOCKER: 3
    };
    this.initialized = false;
    this.update = true; //editor will make it false
    this.visible = false;
    this.dataE = null;
    this.helpB = null;
    this.settingsB = null;
    this.bcont = null;
    this.init = function () {
		var self = this;
		this.makeData();
		this.container = cvis();
		this.helpB = new NavigationButton(vhelp_regsmp, "f_js/image/help.png");
		this.settingsB = cb();
		this.dataE = cd();
		this.bcont = cd();
		
		this.settingsB.onclick = function () {
			var arr=[];
			for(var i=0;i<self.channels.length;i++){
				if(self.channels[i].visu.selected || self.channels[i].visu.selected_get){
					arr.push(self.channels[i]);
				}
			}
			if(arr.length){
				vprog_edit.prep(arr, self);
	            showV(vprog_edit);
			}
		};
		a(this.bcont, [this.settingsB, this.helpB]);
		a(this.container, [this.dataE, this.bcont]);
		var self = this;
		for (var i = 0; i < this.groups.length; i++) {
			this.groups[i].visu = new GroupElem2(this.groups[i].name);
			a(this.dataE, this.groups[i].visu);
		}
		for (var i = 0; i < this.channels.length; i++) {
			this.channels[i].visu = new RegChannelElem(this.channels[i], self);
			this.channels[i].visu.updateHead(this.channels[i]);
			var group = this.getGroupById(this.channels[i].group_id);
			a(group.visu.content, this.channels[i].visu);
		}
		for (var i = 0; i < this.peers.length; i++) {
			this.peers[i].controller = new PeerController(this.peers[i], this.channels, this.UPDATE_DELAY_FTS, this.UPDATE_DELAY_INI, this.UPDATE_DELAY_RUN );
		}
		cla([this.dataE], ["cn_dcont"]);
		cla([this.helpB, this.settingsB], ["cn_button2", "f2"]);
		cla([this.bcont], ["cn_bcont"]);
		this.settingsB.disabled = true;
		this.initialized = true;
    };
    this.getName = function () {
        return trans.get(400);
    };
    this.updateStr = function () {
		document.title = this.getName();
		this.helpB.updateStr();
		this.settingsB.innerHTML = trans.get(61);
		for(var i=0;i<this.channels.length;i++){
			this.channels[i].visu.updateStr();
		}
    };
	this.controlSettingsB = function(){
		for(var i=0;i<this.channels.length;i++){
			if(this.channels[i].visu.selected || this.channels[i].visu.selected_get){
				this.settingsB.disabled = false;
				return;
			}
		}
		this.settingsB.disabled = true;
	};
	this.channelSelectedGet = function(){
		for(var i=0;i<this.channels.length;i++){
			if(this.channels[i].visu.selected_get){
				this.channels[i].visu.unselectGet();
			}
		}
	};
    this.getDataById = function (id) {
		for (var i = 0; i < this.channels.length; i++) {
			if (this.channels[i].id === id) {
				return this.channels[i];
			}
		}
		return null;
    };
    this.getDataIndById = function (id) {
		for (var i = 0; i < this.channels.length; i++) {
			if (this.channels[i].id === id) {
				return i;
			}
		}
		return null;
    };
    this.getGroupById = function (id) {
		for (var i = 0; i < this.groups.length; i++) {
			if (this.groups[i].id === id) {
				return this.groups[i];
			}
		}
		return null;
    };
    this.getPeerById = function (id) {
		for (var i = 0; i < this.peers.length; i++) {
			if (this.peers[i].id === id) {
				return this.peers[i];
			}
		}
		return null;
    };
    this.getSelectedDataItem = function () {
		for (var i = 0; i < this.channels.length; i++) {
			if (this.channels[i].visu.isSelected()) {
				return this.channels[i];
			}
		}
		return null;
    };
    this.enableController = function (arr) {
		for (var i = 0; i < arr.length; i++) {
			arr[i].controller.startSendingRequest();
		}
		return null;
    };
    this.disableController = function (arr) {
		for (var i = 0; i < arr.length; i++) {
			arr[i].controller.stopSendingRequest();
		}
		return null;
    };
	this.getParams = function(){
		for(var i = 0;i<this.channels.length;i++){
			var channel = this.channels[i].elem;
			channel.getParams();
		}
	};
    this.makeData = function () {
        for (var i = 0; i < this.groups.length; i++) {
            this.groups[i].visu = null;
        }
        for (var i = 0; i < this.peers.length; i++) {
            this.peers[i].sent = false;
            this.peers[i].active = false;
           // this.peers[i].controller = null;
        }
        for (var i = 0; i < this.channels.length; i++) {
            this.channels[i].peer = this.getPeerById(this.channels[i].peer_id),
            this.channels[i].updatedi = false;
			this.channels[i].updatedr = false;
			this.channels[i].updatedf = false;
			this.channels[i].updateinit = false;
            this.channels[i].value = {
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
			};
        }
        // console.log(this.channels);
    };
    this.getModeStr = function (value) {
        if (value === app.MODE.RETURN.PID) {
            return app.MODE.DB.PID;
        } else if (value === app.MODE.RETURN.ONF) {
            return app.MODE.DB.ONF;
        }
    };
    //this.confirm = function (action, d, dt_diff) {
        //try {
            //switch (action) {
                //case this.ACTION.CONTROLLER.CHANNEL.GET_DATA_RUNTIME:
                    //if (typeof d[0] !== 'undefined') {
                        //var id = parseInt(d[0].id);
                        //if (this.curr_item.prog_id !== id) {
                            ////   console.log("bad reg prog id recieved: " + id + " expected: " + this.curr_item.id);
                            //logger.err(269);
                            //this.doAfterRegRuntime();
                            //return;
                        //}
                        //this.curr_item.reg.sensor.value = parseFloat(d[0].sensor_value);
                        //this.curr_item.reg.sensor.state = parseInt(d[0].sensor_state);
                        //this.curr_item.reg.state = d[0].state; //INIT REG OFF
                        //this.curr_item.reg.state_r = d[0].state_r; //HEATER COOLER
                        //this.curr_item.reg.heater.output = parseFloat(d[0].output_heater);
                        //this.curr_item.reg.cooler.output = parseFloat(d[0].output_cooler);
                        //this.curr_item.reg.change_tm_rest = parseInt(d[0].change_tm_rest);
                    //} else {
                        //this.curr_item.reg.sensor.value = null;
                        //this.curr_item.reg.sensor.state = null;
                        //this.curr_item.reg.state = null; //INIT REG OFF
                        //this.curr_item.reg.state_r = null; //HEATER COOLER
                        //this.curr_item.reg.heater.output = null;
                        //this.curr_item.reg.cooler.output = null;
                        //this.curr_item.reg.change_tm_rest = null;
                    //}
                    //this.doAfterRegRuntime();
                    //break;
                //case this.ACTION.CONTROLLER.CHANNEL.GET_DATA_INIT:
                    //if (typeof d[0] !== 'undefined') {
                        //var id = parseInt(d[0].id);
                        //if (this.curr_item.prog_id !== id) {
                            ////  console.log("bad reg prog id recieved: " + id + " expected: " + this.curr_item.id);
                            //logger.err(269);
                            //this.doAfterRegInit();
                            //return;
                        //}
                        //this.curr_item.reg.goal = parseFloat(d[0].goal);
                        //this.curr_item.reg.change_gap = parseInt(d[0].change_gap);
                        //var use = 0;
                        //use = parseInt(d[0].heater_use);
                        //if (use === 1) {
                            //this.curr_item.reg.heater.use = true;
                        //} else {
                            //this.curr_item.reg.heater.use = false;
                        //}
                        //this.curr_item.reg.heater.output_max = Math.round(parseFloat(d[0].heater_output_max));
                        //this.curr_item.reg.heater.output_min = Math.round(parseFloat(d[0].heater_output_min));
                        //this.curr_item.reg.heater.mode = d[0].heater_mode;
                        //this.curr_item.reg.heater.delta = parseFloat(d[0].heater_delta);
                        //this.curr_item.reg.heater.kp = parseFloat(d[0].heater_kp);
                        //this.curr_item.reg.heater.ki = parseFloat(d[0].heater_ki);
                        //this.curr_item.reg.heater.kd = parseFloat(d[0].heater_kd);
                        //use = parseInt(d[0].cooler_use);
                        //if (use === 1) {
                            //this.curr_item.reg.cooler.use = true;
                        //} else {
                            //this.curr_item.reg.cooler.use = false;
                        //}
                        //this.curr_item.reg.cooler.output_max = Math.round(parseFloat(d[0].cooler_output_max));
                        //this.curr_item.reg.cooler.output_min = Math.round(parseFloat(d[0].cooler_output_min));
                        //this.curr_item.reg.cooler.mode = d[0].cooler_mode;
                        //this.curr_item.reg.cooler.delta = parseFloat(d[0].cooler_delta);
                        //this.curr_item.reg.cooler.kp = parseFloat(d[0].cooler_kp);
                        //this.curr_item.reg.cooler.ki = parseFloat(d[0].cooler_ki);
                        //this.curr_item.reg.cooler.kd = parseFloat(d[0].cooler_kd);
                    //} else {
                        //this.curr_item.reg.goal = null;
                        //this.curr_item.reg.change_gap = null;
                        //this.curr_item.reg.heater.use = null;
                        //this.curr_item.reg.heater.output_max = null;
                        //this.curr_item.reg.heater.output_min = null;
                        //this.curr_item.reg.heater.mode = null;
                        //this.curr_item.reg.heater.delta = null;
                        //this.curr_item.reg.heater.kp = null;
                        //this.curr_item.reg.heater.ki = null;
                        //this.curr_item.reg.heater.kd = null;

                        //this.curr_item.reg.cooler.use = null;
                        //this.curr_item.reg.cooler.output_max = null;
                        //this.curr_item.reg.cooler.output_min = null;
                        //this.curr_item.reg.cooler.mode = null;
                        //this.curr_item.reg.cooler.delta = null;
                        //this.curr_item.reg.cooler.kp = null;
                        //this.curr_item.reg.cooler.ki = null;
                        //this.curr_item.reg.cooler.kd = null;

                    //}
                    //// console.log(this.curr_item.reg);
                    //this.doAfterRegInit();
                    //break;
                //case this.ACTION.CONTROLLER.CHANNEL.RESET:
                    //cursor_blocker.disable();
                    //break;
                //case this.ACTION.CONTROLLER.PROGRAM.SET_VALUE:
                    //break;
                //case this.ACTION.CONTROLLER.CHANNEL.START:
                //case this.ACTION.CONTROLLER.CHANNEL.STOP:
                //case this.ACTION.CONTROLLER.CHANNEL.RESET:
                //case this.ACTION.CONTROLLER.CHANNEL.DISABLE:
                //case this.ACTION.CONTROLLER.CHANNEL.ENABLE:
                    //cursor_blocker.disable();
                    //break;
                //default:
                    //console.log("confirm: unknown action: ", action);
                    //break;
            //}

        //} catch (e) {
            //alert("control: confirm: " + e.message);
        //}
    //};
    //this.abort = function (action, m, n) {
        //try {
            //switch (action) {
                //case this.ACTION.CONTROLLER.CHANNEL.GET_DATA_RUNTIME:
                    //this.curr_item.reg.sensor.value = null;
                    //this.curr_item.reg.sensor.state = null;
                    //this.curr_item.reg.state = null; //INIT BUSY OFF
                    //this.curr_item.reg.state_r = null; //HEATER COOLER
                    //this.curr_item.reg.heater.output = null;
                    //this.curr_item.reg.cooler.output = null;
                    //this.curr_item.reg.change_tm_rest = null;
                    //this.doAfterRegRuntime();
                    //break;
                //case this.ACTION.CONTROLLER.CHANNEL.GET_DATA_INIT:
                    //this.curr_item.reg.goal = null;
                    //this.curr_item.reg.change_gap = null;

                    //this.curr_item.reg.heater.use = null;
                    //this.curr_item.reg.heater.output_max = null;
                    //this.curr_item.reg.heater.output_min = null;
                    //this.curr_item.reg.heater.mode = null;
                    //this.curr_item.reg.heater.delta = null;
                    //this.curr_item.reg.heater.kp = null;
                    //this.curr_item.reg.heater.ki = null;
                    //this.curr_item.reg.heater.kd = null;

                    //this.curr_item.reg.cooler.use = null;
                    //this.curr_item.reg.cooler.output_max = null;
                    //this.curr_item.reg.cooler.output_min = null;
                    //this.curr_item.reg.cooler.mode = null;
                    //this.curr_item.reg.cooler.delta = null;
                    //this.curr_item.reg.cooler.kp = null;
                    //this.curr_item.reg.cooler.ki = null;
                    //this.curr_item.reg.cooler.kd = null;
                    //this.doAfterRegInit();
                    //break;
                //case this.ACTION.CONTROLLER.CHANNEL.DISABLE:
                    //logger.err(264);
                    //break;
                //case this.ACTION.CONTROLLER.CHANNEL.ENABLE:
                    //logger.err(263);
                    //break;
                //case this.ACTION.CONTROLLER.PROGRAM.SET_VALUE:
                    //logger.err(270);
                    //break;
                //default:
                    //console.log("abort: unknown action: ", action);
                    //break;
            //}
        //} catch (e) {
            //alert("control: abort: " + e.message);
        //}
    //};
    this.show = function () {
		document.title = this.getName();
		clr(this.container, "hdn");
		this.visible = true;
		this.enableController(this.peers);
		
	//	this.delaySleep();
    };
    this.hide = function () {
		cla(this.container, "hdn");
		this.disableController(this.peers);
		this.visible = false;
    };
}
var vcontrol = new Control();
visu.push(vcontrol);
