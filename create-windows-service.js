const Service = require('node-windows').Service

// Create a new service object
const svc = new Service({
  name:'NoRespectBot',
  description: 'All good.',
  script: 'init.js'
});

svc.on('install', () => {
  svc.start()
})

svc.install()
