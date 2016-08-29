# simple-gps

Get a list of the gps and absolute path from the file location. This plugin reading all the files in a file location recursively.

## Installation

``` bash
$ npm install simple-gps --save
```

## Usage

For example. If you want to read the image file.

``` javascript
var gps = require("simple-gps");

gps.read("./image-file-folder",function(err,data){
  if(!err){
    console.log(data);
  }else{
    console.log(err);
  }
});
```

It will be in the following such a results.

``` bash
[
	{
		path: '/path-to/image-file-folder/tokyo-sky-tree.jpg',
	    GPSLatitude: 35.710054,
	    GPSLongitude: 139.810690,
	    GPSLatitudeRef: 'N',
	    GPSLongitudeRef: 'E'
	},
  	{
  		path: '/path-to/image-file-folder/tokyo-akihabara.jpg',
	    GPSLatitude: 35.702130,
	    GPSLongitude: 139.774845,
	    GPSLatitudeRef: 'N',
	    GPSLongitudeRef: 'E'
	},
	
    ...
]
```

## License

MIT