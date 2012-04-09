// ==UserScript==
// @name           stackoverflow-comment-reply (Lix Style!)
// @namespace      stackoverflow
// @description    Add "reply" links to comments--three letters ONLY
// @include        http://stackoverflow.com/*
// @include        http://serverfault.com/*
// @include        http://superuser.com/*
// @include        http://meta.stackoverflow.com/*
// @include        http://meta.serverfault.com/*
// @include        http://meta.superuser.com/*
// @include        http://*.stackexchange.com/*
// @include        http://askubuntu.com/*
// @include        http://meta.askubuntu.com/*
// @include        http://answers.onstartups.com/*
// @include        http://meta.answers.onstartups.com/*
// @include        http://mathoverflow.net/*
// @include        http://area51.stackexchange.com/proposals/*
// @author         Benjamin Dumke (Modified by Manishearth)
// ==/UserScript==

//Copied and slightly modified from http://stackapps.com/questions/2051/reply-links-on-comments by Manishearth



// Thanks to Shog9 for this idea for making the script work in both
// Chrome and Firefox:
// http://meta.stackoverflow.com/questions/46562
function with_jquery(f) {
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.textContent = "(" + f.toString() + ")(jQuery)";
    document.body.appendChild(script);
};

with_jquery(function($) {
        
    $(document).ajaxComplete(function(){
        $(".comments").each(put_reply_links);
    });
        
    // event handler for a click on the reply links
    function reply() {
        var commentlink = $(this).closest(".comments").next();
        var commentlinkId = commentlink.attr("id");
        var clone = $("#clone-of-" + commentlinkId);
        var username = goodify($(this).prev().text().replace(/♦/, "")).substr(0,3).toLowerCase();
        clone.hide();
        commentlink.click();
        var formid = commentlinkId.replace(/^.*-(\d+)$/, "add-comment-$1");
        var ta = $("#" + formid + " textarea")[0];
        var start = ta.selectionStart;
        var end = ta.selectionEnd;
        var shift = username.length + 3;
        ta.value = "@" + username + " " + ta.value;
        ta.focus();
        ta.selectionStart = start + shift;
        ta.selectionEnd = end + shift;
    };

    function put_reply_links() {
        $(this).find(".comment:not(:has(.reply-link)) .comment-user").each(function () {
            $("<span class='reply-link' style='cursor:pointer;' title='reply'> &crarr;</span>").click(reply).insertAfter(this);
        });
    }
    function hijacked() {
        $(this).hide();
        var original_id = $(this).attr("id").replace("clone-of-", "");
        var original = $("#" + original_id);
        original.click();
        $(this).closest(".comments").each(put_reply_links);
    }
            
    $(".comments").each(put_reply_links);
    
    $(".comments-link").each(function(){
        var clone = $(this).clone().click(hijacked);
        clone.attr("id", "clone-of-" + clone.attr("id"));
        $(this).hide().after(clone);
    })

    // taken from kip's http://userscripts.org/scripts/review/62163
    var goodletters = Array('\u00c0','\u00c1','\u00c2','\u00c3','\u00c4','\u00c5','\u00c6','\u00c7'
                            ,'\u00c8','\u00c9','\u00ca','\u00cb','\u00cc','\u00cd','\u00ce','\u00cf'
                            ,'\u00d1','\u00d2','\u00d3','\u00d4','\u00d5','\u00d6'         
                            ,'\u00d8','\u00d9','\u00da','\u00db','\u00dc','\u00dd'                  
                            ,'\u00e0','\u00e1','\u00e2','\u00e3','\u00e4','\u00e5','\u00e6','\u00e7'
                            ,'\u00e8','\u00e9','\u00ea','\u00eb','\u00ec','\u00ed','\u00ee','\u00ef'
                            ,'\u00f1','\u00f2','\u00f3','\u00f4','\u00f5','\u00f6'         
                            ,'\u00f8','\u00f9','\u00fa','\u00fb','\u00fc','\u00fd'         ,'\u00ff').join('');

    var bad = new RegExp("[^" + goodletters + "\\w.'-]", "ig");
    
    function goodify(s) {
        return s.replace(bad, "");
    }  
    
});