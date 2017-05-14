function EMEdit() {
    this.type = VISU_TYPE.DIAL;
    this.container = null;
    this.header = null;
    this.deltaH = null;
    this.deltaB = null;
    this.kpH = null;
    this.kpB = null;
    this.kiH = null;
    this.kiB = null;
    this.kdH = null;
    this.kdB = null;
    this.useB = null;
    this.signB = null;
    this.incB = null;
    this.applyB = null;
    this.canceB = null;
    this.saveB = null;
    this.slave = null;
    this.kind = null;
    this.initialized = false;
    this.current_row = null;
    this.minv = INT32_MIN;
    this.maxv = INT32_MAX;
    this.mode = null;
    this.inc = 1;
    this.sign = 1;
    this.value = {modeArr: [[app.MODE.RETURN.PID, true], [app.MODE.RETURN.ONF, false]], mode: null, delta: null, kp: null, ki: null, kd: null, use: null};
    this.MODE = {
        DELTA: 1,
        KP: 2,
        KI: 3,
        KD: 4,
        MODE: 5
    };
    this.FLOAT_PRES = 2;
    this.init = function () {
        var self = this;
        this.container = cvis();
        this.header = cd();
        this.deltaH = cd();
        this.deltaB = cb("");
        this.kpH = cd();
        this.kpB = cb("");
        this.kiH = cd();
        this.kiB = cb("");
        this.kdH = cd();
        this.kdB = cb("");
        this.gapB = cb("");
        this.useB = cb("");
        this.signB = cb("");
        this.incB = cb("");
        this.cancelB = new CancelButton(self, 1);
        this.applyB = new ApplyButton(self, 1);
        this.modeE = new ToggleButtonArray(this.value.modeArr, trans.get(328), 'pre_ems_header', 'pre_ems_dis', 'pre_ems_en', 'pre_ems_icont', 'pre_ems_cont', 'pre_ems_item');
        this.deltaB.onmousedown = function () {
            self.mode = self.MODE.DELTA;
            inc.down(self);
        };
        this.kpB.onmousedown = function () {
            self.mode = self.MODE.KP;
            inc.down(self);
        };
        this.kiB.onmousedown = function () {
            self.mode = self.MODE.KI;
            inc.down(self);
        };
        this.kdB.onmousedown = function () {
            self.mode = self.MODE.KD;
            inc.down(self);
        };
        this.useB.onclick = function () {
            if (self.value.use) {
                self.value.use = false;
                clr(self.useB, "pre_active");
            } else {
                self.value.use = true;
                cla(self.useB, "pre_active");
            }
        };
        this.updSign();
        this.signB.onclick = function () {
            self.chSign();
        };
        this.incB.innerHTML = this.inc;
        this.incB.onclick = function () {
            self.updInc();
        };
        this.cancelB.onclick = function () {
            self.cancel();
        };
        var rd = cd();
        var rkp = cd();
        var rki = cd();
        var rkd = cd();
        var c1 = cd();
        var c2 = cd();
        var c3 = cd();
        var c4 = cd();
        var c5 = cd();
        var c6 = cd();
        var c7 = cd();
        var c8 = cd();
        var r1 = cd();
        a(rd, [this.deltaH, this.deltaB]);
        a(rkp, [this.kpH, this.kpB]);
        a(rki, [this.kiH, this.kiB]);
        a(rkd, [this.kdH, this.kdB]);
        a(c1, [rd]);
        a(c2, [rkp]);
        a(c3, [rki]);
        a(c4, [rkd]);
        a(c5, [this.signB]);
        a(c6, [this.incB]);
        a(c7, [this.applyB]);
        a(c8, [this.cancelB]);
        a(r1, [this.useB]);
        a(this.container, [this.header, c1, c2, c3, c4, c5, c6, this.modeE, r1, c7, c8]);
        cla([this.header], "pre_header");
        cla([c1, c2, c3, c4, c5, c6, c7, c8], "pre_cell4");
        cla([r1], "pre_row4");
        cla([rd, rkp, rki, rkd, this.signB, this.incB, this.applyB, this.cancelB], "pre_icell");
        cla([this.deltaB, this.kpB, this.kiB, this.kdB], "pre_hbtn");
        cla([this.deltaH, this.kpH, this.kiH, this.kdH], "pre_btnH");
        cla([this.signB, this.incB, this.deltaB, this.kpB], "pre_interactive");
        cla([this.deltaB, this.kpB, this.cancelB, this.applyB, this.signB, this.incB], ["f1"]);
        cla([this.useB], ["pre_toggle", "pre_em_mode", "f1"]);
        this.initialized = true;
    };
    this.getName = function () {
        return trans.get(312);
    };
    this.incCB = function () {
        switch (this.mode) {
            case this.MODE.DELTA:
                var r = this.value.delta + this.inc * this.sign;
                if (r >= this.minv && r <= this.maxv) {
                    this.value.delta = this.value.delta + (this.inc * this.sign);
                    this.deltaB.innerHTML = this.value.delta.toFixed(this.FLOAT_PRES);
                }
                break;
            case this.MODE.KP:
                var r = this.value.kp + this.inc * this.sign;
                if (r >= this.minv && r <= this.maxv) {
                    this.value.kp = this.value.kp + (this.inc * this.sign);
                    this.kpB.innerHTML = this.value.kp.toFixed(this.FLOAT_PRES);
                }
                break;
            case this.MODE.KI:
                var r = this.value.ki + this.inc * this.sign;
                if (r >= this.minv && r <= this.maxv) {
                    this.value.ki = this.value.ki + (this.inc * this.sign);
                    this.kiB.innerHTML = this.value.ki.toFixed(this.FLOAT_PRES);
                }
                break;
            case this.MODE.KD:
                var r = this.value.kd + this.inc * this.sign;
                if (r >= this.minv && r <= this.maxv) {
                    this.value.kd = this.value.kd + (this.inc * this.sign);
                    this.kdB.innerHTML = this.value.kd.toFixed(this.FLOAT_PRES);
                }
                break;
        }
    };
    this.chSign = function () {
        this.sign *= -1;
        this.updSign();
    };
    this.updSign = function () {
        if (this.sign > 0) {
            this.signB.innerHTML = "+";
        } else {
            this.signB.innerHTML = "-";
        }
    };
    this.updInc = function () {
        switch (this.inc) {
            case 0.01:
                this.inc = 0.1;
                break;
            case 0.1:
                this.inc = 1;
                break;
            case 1:
                this.inc = 10;
                break;
            case 10:
                this.inc = 100;
                break;
            case 100:
                this.inc = 0.01;
                break;
        }
        this.incB.innerHTML = this.inc;
    };
    this.cancel = function (id) {

        this.slave.catchEdit(this.value, this.kind, 0);
        goBack();
    };
    this.apply = function (id) {
        var ind = this.modeE.getActiveElemInd();
        if (ind === null) {
            this.value.mode = null;
        } else {
            this.value.mode = this.value.modeArr[ind][0];
        }
        this.slave.catchEdit(this.value, this.kind, 1);
        goBack();
    };
    this.updateStr = function () {
        this.deltaH.innerHTML = trans.get(319);
        this.kpH.innerHTML = "Kp";
        this.kiH.innerHTML = "Ki";
        this.kdH.innerHTML = "Kd";
        var modeName = [];
        for (var i = 0; i < this.value.modeArr.length; i++) {
            modeName.push(this.value.modeArr[i][0]);
        }
        this.modeE.updateStr(trans.get(328), modeName);
        this.useB.innerHTML = trans.get(329);
        this.cancelB.innerHTML = trans.get(5);
        this.applyB.innerHTML = trans.get(2);
    };
    this.prep = function (data, slave, kind, t) {
        // console.log("input: ", data);
        try {
            this.header.innerHTML = t;
            this.slave = slave;
            this.kind = kind;
            this.value.mode = data.mode;
            this.value.delta = data.delta;
            this.value.kp = data.kp;
            this.value.ki = data.ki;
            this.value.kd = data.kd;
            this.value.use = data.use;
            var v = null;

            this.deltaB.disabled = false;
            if (this.value.delta === null) {
                v = "";
                this.deltaB.disabled = true;
            } else {
                v = this.value.delta.toFixed(this.FLOAT_PRES);
            }
            this.deltaB.innerHTML = v;

            this.kpB.disabled = false;
            if (this.value.kp === null) {
                v = "";
                this.kpB.disabled = true;
            } else {
                v = this.value.kp.toFixed(this.FLOAT_PRES);
            }
            this.kpB.innerHTML = v;

            this.kiB.disabled = false;
            if (this.value.ki === null) {
                v = "";
                this.kiB.disabled = true;
            } else {
                v = this.value.ki.toFixed(this.FLOAT_PRES);
            }
            this.kiB.innerHTML = v;

            this.kdB.disabled = false;
            if (this.value.kd === null) {
                v = "";
                this.kdB.disabled = true;
            } else {
                v = this.value.kd.toFixed(this.FLOAT_PRES);
            }
            this.kdB.innerHTML = v;

            var found = 0;
            for (var i = 0; i < this.value.modeArr.length; i++) {
                if (this.value.mode === this.value.modeArr[i][0]) {
                    this.modeE.selectItem(i);
                    found = 1;
                    break;
                }
            }
            if (!found) {
                this.modeE.disable();
            }
            if (this.value.use === true) {
                cla(this.useB, "pre_active");
                this.useB.disabled = false;
            } else if (this.value.use === false) {
                clr(this.useB, "pre_active");
                this.useB.disabled = false;
            } else if (this.value.use === null) {
                clr(this.useB, "pre_active");
                this.useB.disabled = true;
            }

            this.slave.update = false;
        } catch (e) {
            alert("emEdit: prep: " + e.message);
        }
    };
    this.show = function () {
        clr(this.container, "hdn");
    };
    this.hide = function () {
        cla(this.container, "hdn");
    };
}
var vem_edit = new EMEdit();
visu.push(vem_edit);