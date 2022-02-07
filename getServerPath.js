/** @param {NS} ns **/
import {
	getAllServers
} from "utilities.js";

export async function main(ns) {
	var servers = getAllServers(ns);
	var parents = [ns.args[0]];

	for (let parent of parents) {
		if(parent === "home") {
			break;
		} else {
			for (let server of servers) {
				if (server.hostname === parent) {
					parents.push(server.parent);
				}
			}
		}
	}

	let tabulation = "";
	ns.tprint(parents[0]);
	for (let i=1;i<parents.length;i++) {
		tabulation += " ";
		ns.tprint(tabulation + parents[i]);
	}
}
