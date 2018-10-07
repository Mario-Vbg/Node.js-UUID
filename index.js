'use strict';

const crypto = require('crypto');
const networkInterfaces = require('os').networkInterfaces();

const uuidHelpers = {
    pid: () => {
        let id = (process && process.pid) ? process.pid.toString(36) : '';
        return id;
    },
    now: () => {
        let ts = Date.now() + 1;
        return ts.toString(36);
    },
    mac: () => {
        let address = '';
        let mac = '';
        for(let key in networkInterfaces) {
            let netwInterface = networkInterfaces[key];
            for(let i = 0; i < netwInterface.length; i++){
                if(netwInterface[i].mac && netwInterface[i].mac != '00:00:00:00:00:00') {
                    mac = netwInterface[i].mac; 
                    break;
                }
            }
        }
        address = mac ? parseInt(mac.replace(/\:|\D+/gi, '')).toString(36) : '' ;
        return address;
    }
};

const uniqid = (prefix = '') => {
    return prefix + uuidHelpers.pid() + uuidHelpers.now() + uuidHelpers.mac();
};

const uuid = (prefix = '') => {
    let chars = crypto.createHash('md5').update(uniqid()).digest('hex');
    let uid = chars.substring(0, 8) + '-';
    uid += chars.substring(8, 4) + '-';
    uid += chars.substring(12, 4) + '-';
    uid += chars.substring(16, 4) + '-';
    uid += chars.substring(20, 12);
    return prefix + uid;
};

module.exports = uuid;