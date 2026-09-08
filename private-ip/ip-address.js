const ip = exports;
const os = require('node:os');

function _fromLong(ipl) {
    return `${ipl >>> 24}.${(ipl >> 16) & 255}.${(ipl >> 8) & 255}.${ipl & 255}`;
}

function _isLoopback(addr) {
    // If addr is an IPv4 address in long integer form (no dots and no colons), convert it
    if (!/\./.test(addr) && !/:/.test(addr)) {
        addr = _fromLong(Number(addr));
    }

    return (
            /^(::f{4}:)?127\.([0-9]{1,3})\.([0-9]{1,3})\.([0-9]{1,3})/.test(addr) ||
            /^0177\./.test(addr) ||
            /^0x7f\./i.test(addr) ||
            /^fe80::1$/i.test(addr) ||
            /^::1$/.test(addr) ||
            /^::$/.test(addr)
    );
}

ip.address = function () {
    const interfaces = os.networkInterfaces();

    const all = Object.values(interfaces)
            .flatMap((nic) => {
                const addresses = nic.filter((details) => {
                    return !_isLoopback(details.address) && details.family === 'IPv4';
                });

                return addresses.length ? addresses[0].address : undefined;
            })
            .filter(Boolean);

    return !all.length ? '192.168.0.1' : all[0];
};


console.log('IP: ', ip.address());