// ==UserScript==
// @name           MSE Skin
// @namespace      Manishearth
// @description    Use the new Meta Stack Exchange skin on MSO
// @include        http://meta.stackoverflow.com/*
// @author         Manish Goregaokar
// @author         nhahtdh

// ==/UserScript==
// See http://meta.stackoverflow.com/questions/158762/whats-up-with-the-new-css

document.querySelector('[rel=stylesheet]').href="https://dev.stackoverflow.com/content/stackexchangemeta/all.css";