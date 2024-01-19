const os = require("os")

console.log("Free memory", os.freemem() / 1024 / 1024 / 1024)
console.log("Total memory", os.totalmem() / 1024 / 1024 / 1024)

// 1kb => 1024  bytes => 1mb => 1024 kb => 1gb => 1024 mb
console.log("Version", os.version())
console.log("Platform", os.platform())
console.log("Arch", os.arch())
console.log("Cpus", os.cpus())

console.log("Type", os.type())
console.log("Release", os.release())
console.log("Cores", os.cpus().length)
console.log(`Cores, ${os.cpus().length} Core`)
console.log("Cpu speed", os.cpus()[0].speed)