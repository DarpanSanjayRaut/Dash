'use strict';
const express = require('express');
const router = express.Router();
const sock = require('../app.js')
var path = require('path');
var fs = require('fs');

var data = '';

router.get('/list', (req, res, next) => {
    // console.log("here")
    // service.getAllUsers()
    //     .then((users) => {
    // sock.emit("uploaded", {})
    res.status(200).send({ status: "", data: [] });

    // })
    // .catch((err) => {
    return next({ err: "err" });
    // });
});


var async = require("async");

var worker_number = 1;

var queue = async.queue(function (obj,callback) {
	
	try {
        let array = []
        array = obj.arr
		// console.log(JSON.stringify(array) + "::::::::::::::::::::::")
	// array = JSON.parse(array)
	// console.log(typeof array)
	// console.log("LLLLLL")
    var date = new Date();
    var time = date.toTimeString();
    // console.log("Start task " + JSON.stringify(array) + " at " + time);
    for (var i = 0; i < array.length; i++) {
        // console.log(array[i])
        console.log("here")
      

        setTimeout(function(){
            console.log(this.el)
            sock.emit('uploaded', this.el);
        }.bind({"el" : array[i]}), i * 10000)
    }

    setTimeout(()=>{
        console.log("callback")
    	callback();
    }, 5500)
	} catch(e) {
		// console.log(e)
	}
    

},worker_number)


var multer = require('multer');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname)
    }
})

var upload = multer({ //multer settings
    storage: storage
}).single('file');


router.post('/upload', upload, (req, res, next) => {
    // console.log("upload" + req.file + req.file.fieldname)
    const file = req.file

    let readStream = fs.createReadStream(path.join('./uploads/' + req.file.fieldname), 'utf8');

    readStream.on('data', async function (chunk) {
        data += chunk;

        streamData(chunk);
    }).on('end', function () {
        // var obj = JSON.parse(data)
        // // console.log("done" + JSON.stringify(obj));
        // // console.log("done")
        // for (var i = 0; i < obj.length; i++) {
        //     setTimeout(function () {
        //         // console.log(JSON.stringify(this.obj) + "ok")
        //         sock.emit('uploaded', this.obj);
        //     }.bind({ obj: obj[i] }), i * 3000)
    });


    if (!file) {
        const error = new Error('Please upload a file')
        error.httpStatusCode = 400
        return next(error)
    }
    res.send(file)

})



var rem = ''

function streamData(chunck) {
	// // console.log(rem)
	// // console.log("||||||||||||||||")
	chunck = chunck.replace('[', '')
	if(rem)
	{
		chunck =rem.concat(chunck)	
	}
	// // console.log(chunck)
	let send = chunck.substring(0, chunck.lastIndexOf('},') + 1) 
	let index =''
	
	index = chunck.lastIndexOf('},') + 2
	let keep = chunck.substring(index, chunck.length) 
	rem = keep
	// filedata([send])
	// console.log(send)
	let arr = []
	arr = '[' + send + ']'
	arr = JSON.parse(arr)
	// arr.push(se)
	// console.log(arr)
	queue.push({"arr" : arr},function (err) {
	    // console.log(err);
	})

	return [send]
}



// function filedata(data){
//     // console.log("file data" + JSON.stringify(data))
//     // var obj = JSON.parse(data)
//     // console.log("done" + JSON.stringify(obj));
//     // console.log("done")
//     for (var i = 0; i < obj.length; i++) {
//         setTimeout(function () {
//             // console.log(JSON.stringify(this.obj) + "ok")
//             sock.emit('uploaded', this.obj);
//         }.bind({ obj: obj[i] }), i * 3000)
//     }
// }


module.exports = router;
