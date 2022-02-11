/** @param {NS} ns **/
import {
	getAllServers,
	nukeServer
} from "utilities.js";

export async function main(ns) {

	var servers = getAllServers(ns);

	for (let server of servers) {
		nukeServer(ns, server.hostname);
	}
}
