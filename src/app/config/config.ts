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
    return `${this.server.protocol}://${this.environment.debug ? 
      this.server.testHost+':'+this.server.testPort : this.server.host+':'+this.server.port}`;
  },

};
