import { publicIpv4, publicIpv6 } from 'public-ip';

console.log('IPv4:', await publicIpv4());
console.log('IPv6:', await publicIpv6());