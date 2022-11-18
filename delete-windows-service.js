const Service = require('node-windows').Service

// Create a new service object
const svc = new Service({
  name:'NoRespectBot',
  description: 'All good.',
  script: 'init.js'
});

svc.on('uninstall', () => {
  console.log('Uninstall complete.')
  console.log('The service exists: ', svc.exists)
})

svc.uninstall()
