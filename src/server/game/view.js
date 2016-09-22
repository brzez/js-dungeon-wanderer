
var View = function(template, data) {
    this.template = template;
    this.data = data || {};
};

View.prototype.toJson = function() {
    return JSON.stringify(this);
};

export default View;
