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

	ns.tprint(parents);
}