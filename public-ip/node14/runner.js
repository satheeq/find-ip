const publicIp = require('public-ip');

(async () => {
  console.log('IPv4:', await publicIp.v4());
  console.log('IPv6:', await publicIp.v6());
})();