var builder = {
    pfTitle : "# ",
    pfSubTitle : "## ",
    pfBadge : "!",

    mkTitle : function (title) {
        return this.pfTitle + title;
    },

    mkSubTitle : function(subTitle) {
        return this.pfSubTitle + subTitle;
    },

    mkBadge : function(name, badgeLink) {
        return this.pfBadge + this.mkHyperLink(name, badgeLink);
    },

    mkHyperLink : function(text, link) {
        return `[${text}](${link})`;
    },

    mkLicenseBadge : function(licenseStr) {
        return this.mkBadge(`License: ${licenseStr}`, `https://img.shields.io/badge/License-${licenseStr}-blue.svg`)
    }
}


var factory = {
    title : "",
    comps : {},

    new : function(title) {
        this.title = builder.mkTitle(title)
        for (let member in this.comps) delete this.comps[member];
        return this;
    },

    subTitle : function(string) {
        this.title += `\n\n${string}`
        return this
    },

    addComp : function(subTitle, content) {
        this.comps[subTitle] = { title : builder.mkSubTitle(subTitle), body : content }
        return this;
    },

    appendContent : function(targetComp , content) {
        this.comps[targetComp].body += `\n\n${content}`;
        return this;
    },

    setContent : function(targetComp, content) {
        this.comps[targetComp].body = content;
        return this;
    },

    genTable : function(char="*") {
        let output = "\n## Table of Contents";
        for(const key in this.comps) {
            output += `\n${char} [${key}](#${key.toLowerCase().replaceAll(" ", "-")})`;
        }
        return output
    },

    build : function(toc=true, char="*") {
        let output = this.title += toc ? this.genTable(char) : "";
        for(const key in this.comps) {
            let {title, body} = this.comps[key]
            output += `\n${title}\n${body}`
        }

        return output;
    },
}

module.exports = {
    builder,
    factory
}