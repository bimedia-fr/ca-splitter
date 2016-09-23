# ca-splitter
Split CA chain to array of CA

### Installation

```javascript
npm install ca-splitter --save
```

### Usage

```javascript
var caSplitter = require('ca-splitter');

var caList = caSplitter.parsePathSync([
    'path1/certs_chain.pem',
    'path2/certificate.pem'
]);
```


