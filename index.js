/* This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0. If a copy of the MPL was not distributed with this file, You can obtain one at http://mozilla.org/MPL/2.0/. */

if (typeof Ashley === "undefined") {
  var Ashley = {};
}
Ashley.dntEnabled = function (dnt, ua) {
  "use strict";
  var dntStatus =
    dnt || navigator.doNotTrack || window.doNotTrack || navigator.msDoNotTrack;
  var userAgent = ua || navigator.userAgent;
  var anomalousWinVersions = [
    "Windows NT 6.1",
    "Windows NT 6.2",
    "Windows NT 6.3",
  ];
  var fxMatch = userAgent.match(/Firefox\/(\d+)/);
  var ieRegEx = /MSIE|Trident/i;
  var isIE = ieRegEx.test(userAgent);
  var platform = userAgent.match(/Windows.+?(?=;)/g);
  if (isIE && typeof Array.prototype.indexOf !== "function") {
    return false;
  } else if (fxMatch && parseInt(fxMatch[1], 10) < 32) {
    dntStatus = "Unspecified";
  } else if (
    isIE &&
    platform &&
    anomalousWinVersions.indexOf(platform.toString()) !== -1
  ) {
    dntStatus = "Unspecified";
  } else {
    dntStatus = { 0: "Disabled", 1: "Enabled" }[dntStatus] || "Unspecified";
  }
  return dntStatus === "Enabled" ? true : false;
};
// only load if DNT is not enabled
if (Ashley && !Ashley.dntEnabled()) {
 // put your telemetry stuff here
}
