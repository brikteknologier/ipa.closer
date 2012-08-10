__ipa.client__ is a intermediate library for [IPA](http://www.github.com/brikteknologier/ipa).
It provides an idiomatic node API for calling the functions exposed by IPA's
REST API, along with some convenient shortcuts.

## Usage

```javascript
// Create an client for an ipa server running on localhost:4567
var ipa = require('ipa.client')('http://localhost:4567');

// Send a log message to ipa
ipa.log('Hello!');
```

## Function Overview

* [ipa.log](#log)
* [ipa.logImage(#logImage)

## Function Documentation

<a name="log"/>
### ipa.log(message, [callback]);

Send a string to IPA's log function. This is not escaped, you can send HTML if
you wish.

### ipa.logImage(imageUrl, [callback]);

Send an image to IPA's log function. This just sends an image HTML element. Not
the image data.
