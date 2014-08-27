/**
 * Created by svkior on 27/08/14.
 */
Meteor.publish('firmwares', function(){
    return Firmwares.find();
});


function findInDome(dom, pattern){
    var rv=[];
    _.each(dom, function(element){
        if(element.children){
            var rv1 = findInDome(element.children, pattern);
            if(rv1.length > 0){
                //console.log('Has rv1:', rv1);
                rv = rv.concat(rv1);
                //console.log('Rv: ', rv);
            }
        }
        if(element.name == 'a'){
            //console.log('Element attrs: ',element.attribs.href);
            var hr = element.attribs.href;
            if(hr.search(pattern) != -1){
                //console.log(hr);
                rv.push(hr);
            }
        }
    });
    return rv;
}

function getFileFromDav(url){
    var request = Meteor.require('request'),
        username = "svkior",
        password = "forserveryf[";
    auth = "Basic " + new Buffer(username + ":" + password).toString("base64");
    //console.log(param);

    var result = Async.runSync(function(done){
        request(
            {
                url : url,
                headers : {
                    "Authorization" : auth
                }
            },
            function (error, response, body) {
                // Do more stuff with 'body' here
                //console.log(body);
                done(null, body);
            }
        );

    });
    return result.result;

}

Meteor.methods({
    firmware_prog: function(firmware_id){
        var rec = Firmwares.findOne(firmware_id);
        var fileName = rec.fwname + '.bit';
        var commandLine = 'ffprog -bit=' + fileName;
        var exec = Meteor.require('child_process').exec;
        var child;

        var result = Async.runSync(function(done){
            child = exec(commandLine, function(err, stdout, stderr){
                console.log('stdout: ', stdout);
                console.log('stderr: ', stderr);
                if( err != null){
                    console.log('exec error: ', err);
                    done(err, null);
                } else {
                    done(null, firmware_id);
                }
            });
        });
        return result.result;
    },
    firmware_download: function(param){
        var rec = Firmwares.findOne(param);
        var locUrl = rec.url;
        console.log(locUrl);
        var file = getFileFromDav(locUrl);
        //console.log('Download Firmware: ', body);
        var fs = Meteor.require('fs');
        var fileName = "./" + rec.fwname + '.bit';
        fs.writeFileSync(fileName, file);
        Firmwares.update(param, {$set: {downloaded: true}});
    },
    scan4dav: function(param){

            var request = Meteor.require('request'),
                username = "svkior",
                password = "forserveryf[",
                url = param.dirname;
            auth = "Basic " + new Buffer(username + ":" + password).toString("base64");
            //console.log(param);

            var result = Async.runSync(function(done){
                request(
                    {
                        url : url,
                        headers : {
                            "Authorization" : auth
                        }
                    },
                    function (error, response, body) {
                        // Do more stuff with 'body' here
                        //console.log(body);
                        var htmlparser = Meteor.require('htmlparser');
                        var handler = new htmlparser.DefaultHandler(function (error, dom) {
                            if (error)
                                console.log('Error: ', error);
                            else
                            {
                                var hrefs = findInDome(dom, param.pattern);
                                //console.log('HREFS: ', hrefs);
                                done(null, hrefs);
                            }
                        });
                        var parser = new htmlparser.Parser(handler);
                        parser.parseComplete(body);

                    }
                );

            });
        //console.log('Result: ', result.result);
        var toStructs = {};
        _.each(result.result, function(href){
            if( href.search('.bit') != -1) {
                var nam = href.slice(0, href.search('.bit'));
                if(Firmwares.find({url: href}).count()){
                    console.log("Already finded:" , href);
                } else {
                    Firmwares.insert(
                        {
                            url: url+href,
                            fwname: nam,
                            description: 'Работает хрень',
                            author: "Max",
                            downloaded: false
                        }
                    );
                    console.log('Insert: ', href);
                }
            }
        });

    }
});