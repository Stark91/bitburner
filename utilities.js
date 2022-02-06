/** @param {NS} ns **/
export function getAllServers(ns) {
	var servers = [];
	servers.push("home");

	for (let server of servers) {
		let serversScan = ns.scan(server);
		for (let serverScan of serversScan) {
			if (servers.findIndex(s => s === serverScan) === -1) {
				servers.push(serverScan);
			}
		}
	}

	return servers;
}

export function nukeServer(ns, sServer) {
	if (ns.serverExists(sServer)) {
		if (ns.hasRootAccess(sServer)) {
			ns.tprint("You already have root access to " + sServer);
		} else {
			if (ns.getServer(sServer).requiredHackingSkill <= ns.getHackingLevel()) {
				let iOpenPortsRequired = ns.getServer(sServer).numOpenPortsRequired;
				let iOpenPorts = ns.getServer(sServer).openPortCount;
				if (iOpenPortsRequired <= iOpenPorts) {
					ns.nuke(sServer);
					ns.tprint("Root access granted to " + sServer);
				} else {
					if (ns.fileExists("BruteSSH.exe") && !ns.getServer(sServer).sshPortOpen && iOpenPortsRequired > iOpenPorts) {
						ns.brutessh(sServer);
						iOpenPorts++;
					}
					if (ns.fileExists("FTPCrack.exe") && !ns.getServer(sServer).ftpPortOpen && iOpenPortsRequired > iOpenPorts) {
						ns.ftpcrack(sServer);
						iOpenPorts++;
					}
					if (ns.fileExists("relaySMTP.exe") && !ns.getServer(sServer).smtpPortOpen && iOpenPortsRequired > iOpenPorts) {
						ns.relaysmtp(sServer);
						iOpenPorts++;
					}
					if (ns.fileExists("HTTPWorm.exe") && !ns.getServer(sServer).httpPortOpen && iOpenPortsRequired > iOpenPorts) {
						ns.httpworm(sServer);
						iOpenPorts++;
					}
					if (ns.fileExists("SQLInject.exe") && !ns.getServer(sServer).sqlPortOpen && iOpenPortsRequired > iOpenPorts) {
						ns.sqlinject(sServer);
						iOpenPorts++;
					}
					if (iOpenPortsRequired <= iOpenPorts) {
						ns.nuke(sServer);
						ns.tprint("Root access granted to " + sServer);
					} else {
						ns.tprint("Root access not granted to " + sServer + " - Not enough ports opened : " + iOpenPorts + " opened / " + iOpenPortsRequired + " needed");
					}
				}
			} else {
				ns.tprint("Hacking level is not enough to hack " + sServer);
			}
		}
	} else {
		ns.tprint("Server " + sServer + " does not exist");
	}
}