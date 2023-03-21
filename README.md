# Notify on Google Doc View

## Overview
A userscript that sends a web notification when a new viewer has joined your Google Doc.

### Notes:

* Requires [Tampermonkey](https://www.tampermonkey.net/)
* Google Doc must be open in a browser

### Development Notes

#### 3/21
Appears that the script is getting invoked twice.  I checked the document.location.href, thinking that we were maybe in an iframe, but both return the same value (the URL of the Google Doc).  To combat this, I check to see if the DOM element we're looking for is present in the page.
