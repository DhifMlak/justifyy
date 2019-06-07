let assert = require('assert');
let app = require('./api/routes');
var fixture = `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`;
var output =['Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem',
`Ipsum  has been the industry's standard dummy text ever since the 1500s, when an`,
'unknown  printer  took a galley of type and scrambled it to make a type specimen',
'book. It has survived not only five centuries, but also the leap into electronic',
'typesetting,  remaining  essentially  unchanged. It was popularised in the 1960s',
'with  the  release  of Letraset sheets containing Lorem Ipsum passages, and more',
'recently  with  desktop  publishing  software  like  Aldus  PageMaker  including',
'versions of Lorem Ipsum.']


describe('justify', function() {
    it('should justify text for a given N caracters', function() {
        console.log(fixture);
        let current = app.justify(fixture,80);
        assert.deepEqual(current, output.join('\n'));
      });
  });