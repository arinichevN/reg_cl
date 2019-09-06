function GroupElem1() {
    this.container = cd();
    this.headerE = cd();
    this.itemCont = cd();

    this.updateStr = function (v) {
		this.headerE.innerHTML = v;
    };
    this.a = function(v){
		a(this.itemCont, v);
	}
    a(this.container, [this.headerE, this.itemCont]);
    cla(this.headerE, ["pre_group_header"]);
    cla(this.itemCont, ["pre_group_itemcont"]);
    cla(this.container, ["pre_group_cont"]);
}
