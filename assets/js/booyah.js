/**
 * Booyah!
 */
;this.Booyah = (function() {
    Booyah.prototype.templateTagKeys = [];
    Booyah.prototype.templateTagValues = [];
    Booyah.prototype.templateArray = [];
    Booyah.prototype.templateString = '';

    function Booyah() {
        this.templateTagKeys = [];
        this.templateTagValues = [];
        this.templateArray = [];
        this.templateString = '';
    }

    Booyah.prototype.ready = function() {
        this.templateString = this.templateArray.join('');
        this.replaceTags();
        return this.templateString;
    };

    Booyah.prototype.addTag = function(key, value) {
        this.templateTagKeys.push(key);
        this.templateTagValues.push(value);
        return this;
    };

    Booyah.prototype.addTemplate = function(string) {
        this.templateArray.push(string);
        return this;
    };

    Booyah.prototype.replaceTags = function() {
        var i, replaceTag, tagCount, withThisValue;
        tagCount = this.templateTagKeys.length;
        i = 0;
        while (tagCount > i) {
            replaceTag = this.templateTagKeys[i];
            withThisValue = this.templateTagValues[i];
            this.templateString = this.templateString.replace(new RegExp(replaceTag), withThisValue);
            i++;
        }
    };

    return Booyah;

})();

