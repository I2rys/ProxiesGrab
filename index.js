//Dependencies
const I2rys = require("./utils/i2rys")
const Request = require("request")
const Fs = require("fs")

//Variables
const Self_Args = process.argv.slice(2)

//Functions
function HTTP_OR_HTTPS(){
    Request("https://api.proxyscrape.com/v2/?request=displayproxies&protocol=http&timeout=10000&country=all&ssl=all&anonymity=all", function(err, res, body){
        if(err){
            I2rys.log("yellowish", "WARN", "ProxiesGrab Debugger:", "Unable to get HTTP/HTTPS proxies.")
            I2rys.log("yellowish", "INFO", "ProxiesGrab Debugger:", "Skipping...")
            SOCKS4()
            return
        }

        I2rys.log("yellowish", "WARN", "ProxiesGrab Debugger:", `${body.split("\n").length} HTTP/HTTPS proxies found.`)

        Fs.writeFileSync(`${Self_Args}/http_or_https.txt`, body, "utf8")
        I2rys.log("yellowish", "WARN", "ProxiesGrab Debugger:", `HTTP/HTTPS proxies have been saved to ${Self_Args}/http_or_https.txt.`)
        SOCKS4()
        return
    })
}

function SOCKS4(){
    Request("https://api.proxyscrape.com/v2/?request=displayproxies&protocol=socks4&timeout=10000&country=all&ssl=all&anonymity=all", function(err, res, body){
        if(err){
            I2rys.log("yellowish", "WARN", "ProxiesGrab Debugger:", "Unable to get SOCKS4 proxies.")
            I2rys.log("yellowish", "INFO", "ProxiesGrab Debugger:", "Skipping...")
            SOCKS5()
            return
        }

        I2rys.log("yellowish", "WARN", "ProxiesGrab Debugger:", `${body.split("\n").length} SOCKS4 proxies found.`)

        Fs.writeFileSync(`${Self_Args}/socks4.txt`, body, "utf8")
        I2rys.log("yellowish", "WARN", "ProxiesGrab Debugger:", `SOCKS4 proxies have been saved to ${Self_Args}/socks4.txt.`)
        SOCKS5()
        return
    })
}

function SOCKS5(){
    Request("https://api.proxyscrape.com/v2/?request=displayproxies&protocol=socks5&timeout=10000&country=all&ssl=all&anonymity=all", function(err, res, body){
        if(err){
            I2rys.log("yellowish", "WARN", "ProxiesGrab Debugger:", "Unable to get SOCKS5 proxies.")
            I2rys.log("yellowish", "INFO", "ProxiesGrab Debugger:", "Skipping...")
            Done()
            return
        }

        I2rys.log("yellowish", "WARN", "ProxiesGrab Debugger:", `${body.split("\n").length} SOCKS5 proxies found.`)

        Fs.writeFileSync(`${Self_Args}/socks5.txt`, body, "utf8")
        I2rys.log("yellowish", "WARN", "ProxiesGrab Debugger:", `SOCKS5 proxies have been saved to ${Self_Args}/socks5.txt.`)
        Done()
        return
    })
}

function Done(){
    I2rys.log("yellowish", "INFO", "ProxiesGrab Debugger:", "Done gathering some proxies.")
    I2rys.log("yellowish", "INFO", "ProxiesGrab Debugger:", "Exiting...")
    setTimeout(function(){
        process.exit()
    }, 6000)
}

//Main
if(Self_Args.length == 0){
    console.log(`node index.js <output_directory>
Example: node index.js example_directory`)
    process.exit()
}

if(Self_Args[0] == ""){
    I2rys.log("yellowish", "CRITICAL", "ProxiesGrab Debugger:", "Invalid output_directory.")
    process.exit()
}

if(!Fs.existsSync(Self_Args[0])){
    I2rys.log("yellowish", "CRITICAL", "ProxiesGrab Debugger:", "Invalid output_directory.")
    process.exit()
}

HTTP_OR_HTTPS()
