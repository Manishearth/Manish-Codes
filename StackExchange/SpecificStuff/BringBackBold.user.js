// ==UserScript==
// @name           Bring Back Bold!
// @namespace      Manishearth
// @description    Brings back the bold reputation counter/post scores!
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
// @author         nhahtdh

// ==/UserScript==
// See http://meta.stackoverflow.com/questions/158762/whats-up-with-the-new-css

function with_jquery(f) {
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.textContent = "(" + f.toString() + ")(jQuery)";
    document.body.appendChild(script);
};

with_jquery(function ($) {
    $('head').append(
        $(
            '<style>' +
            // Vote count in question list: http://stackoverflow.com/questions
            // Answer count in question list
            '.vote-count-post strong, .answered strong { \
                font-weight: bold; \
            }' +
            // Vote count in question list and in post
            '.vote-count-post { \
                font-weight: bold !important; \
                font-size: 240%; \
            }' +
            // Answer count in question list: http://stackoverflow.com/questions
            '.status strong { \
                font-size: 150%; \
            }' +
            // High score post
            '.question-page .high-scored-post, .review-task-pane .high-scored-post { \
                font-size: 26px; \
            } \
            .vote-count-post.high-scored-post strong { \
                font-size: 26px; \
            }' +
            // Tag count
            '.item-multiplier { \
                font-weight: bold; \
                font-size: 15px; \
                color: rgb(68, 68, 68); \
            }' +
            // Tabs (main page and question list)
            '#tabs { \
                font-weight: bold; \
            }' +
            // Bold the relative time stamp
            '.relativetime { \
                font-weight: bold; \
            }' +
            // Bold the reputation score
            '.reputation-score {\
                font-weight: bold; \
                font-size: 120%; \
            }' +
            '</style>'
        )
    );
    
    // Many sites don't bold the counters in the main page originally
    // If a site was bolded originally, add it here
    if (window.location.host.match(/stackoverflow.com/i)) {
        $('head').append(
            $(
                '<style>' +
                // Counters in main page: e.g. http://stackoverflow.com/
                '.mini-counts { \
                    font-weight: bold; \
                    font-size: 180%; \
                }' +
                '.answered-accepted .mini-counts, .answered .mini-counts, .unanswered .mini-counts { \
                    font-size: 180%; \
                }' +
                '</style>'
            )
        );
    }
    
});
