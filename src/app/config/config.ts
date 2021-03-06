export const config = {
  environment:{
    debug: true
  },
  server:{
    protocol: 'http',
    host: '123.56.29.170.',
    testHost: '127.0.0.1',
    port: 6607,
    testPort: 5000,
  },
  getApiPrefix: () => {
    return `${config.server.protocol}://${config.environment.debug ? 
      config.server.testHost+':'+config.server.testPort : config.server.host+':'+config.server.port}`;
  },

};
