/** @param {NS} ns **/
export async function main(ns) {
	while (true) {

		if (!ns.isBusy()) {
			ns.commitCrime(ns.args[0]);
		}

		await ns.sleep(1);
	}
}