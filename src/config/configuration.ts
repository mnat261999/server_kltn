export default () => { 
    return ({
      node_env: process.env.NODE_ENV || 'development',
      port: parseInt(process.env.PORT, 10) || 3000
    })
  };