    // ==UserScript==
    // @name           Punch-a-user
    // @namespace      Manishearth
    // @description    Allow you to summon Commander Keen and have him punch users
    // @include        http://stackoverflow.com/*
    // @include        http://serverfault.com/*
    // @include        http://superuser.com/*
    // @include        http://meta.stackoverflow.com/*
    // @include        http://meta.serverfault.com/*
    // @include        http://meta.superuser.com/*
    // @include        http://stackapps.com/*
    // @include        http://*.stackexchange.com/*
    // @include        http://askubuntu.com/*
    // @include        http://meta.askubuntu.com/*
    // @include        http://answers.onstartups.com/*
    // @include        http://meta.answers.onstartups.com/*
    // @include        http://mathoverflow.net/*
    // @include        http://area51.stackexchange.com/proposals/*
    // @exclude        http://chat.*/*
    // @author         Manish Goregaokar

    // ==/UserScript==


    function with_jquery(f) {
        var script = document.createElement("script");
        script.type = "text/javascript";
        script.textContent = "(" + f.toString() + ")(jQuery)";
        document.body.appendChild(script);
    };

    with_jquery(function($) {
        
        if(!$('#hlinks-user:has(.mod-flair)')){
            return;
        }
        if($('h1#user-displayname').length){
            var userid=document.location.href.match(/\/users\/(\d+)\//ig)[0].replace("/users/","").replace("/","");
            var str='<a href="/users/history/$id">hist</a><a href="/admin/show-user-ips/$id">IPs</a><a href="/admin/xref-user-ips/$id">xref</a><a href="/admin/users/$id/post-comments">cmts</a><a href="/admin/show-user-votes/$id">votes</a>';
           $(str.replace(/\$id/ig,userid)).insertAfter($('.sub-header-links.fr #my-logins'));
         //   $('.sub-header-links.fr').insertAfter('.subheader');
            $('.subheader').css({'border-bottom':'none','height':'auto'});
        //$('.sub-header-links.fr').css({'border-bottom-width': '1px','border-bottom-style': 'solid','border-bottom-color': '#E5E5E5'});
        }
        
        $('.answer,.question').each(function(){
            var id;
            if($(this).data('questionid')){
                id=$(this).data('questionid');
            }else{
                $(this).data('answerid')
            }
            var links=$(this).find('.post-menu');
            if($(this).find('.post-signature').length>1){ $('<span class="lsep">|</span><a href="/posts/'+id+'/revisions" class="rev-post" title="Revisions">Я</a>').appendTo(links);}
             $('<span class="lsep">|</span><a href="/admin/posts/'+id+'/show-flags" class="flags-post" title="Show flag history">flags</a>').appendTo(links);
             $('<span class="lsep">|</span><a href="/admin/posts/'+id+'/comments" class="cmts-post" title="Show flag history">cmts</a>').appendTo(links);

        
            });
    });
