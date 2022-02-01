/** @param {NS} ns **/
export async function main(ns) {
	ns.disableLog("ALL");
	var sServer = ns.args[0];
	var sServer = "n00dles";
	var iServerMaxMoney = ns.getServerMaxMoney(sServer);
	var runningScriptInformations = ns.getRunningScript();
	var homeInformations = ns.getServer("home");

	while (true) {
		var iServerMoneyAvailable = ns.getServerMoneyAvailable(sServer);
		var iServerSecurityLevel = ns.getServerSecurityLevel(sServer);
		ns.print("Server " + sServer + " - Money : " + ns.nFormat(iServerMoneyAvailable, "$0,0[.]00a") + " / " + ns.nFormat(iServerMaxMoney, "$0,0[.]00a") + " - Security : " + ns.nFormat(iServerSecurityLevel, "0[.]0") + " / 100");

		if (iServerSecurityLevel > Math.min(35, Math.max(1, ns.getServer(sServer).baseDifficulty / 3, ns.weakenAnalyze(runningScriptInformations.threads, homeInformations.cpuCores)))) {
		if (iServerSecurityLevel > 5) {
			ns.print("Weakening... " + ns.nFormat(ns.getWeakenTime(sServer) / 1000, "00:00:00"));
			ns.print("Security decrease by " + await ns.weaken(sServer));
			await ns.weaken(sServer);
		} else {
			if (iServerMoneyAvailable === iServerMaxMoney) {
				ns.print("Hacking... " + ns.nFormat(ns.getHackTime(sServer) / 1000, "00:00:00"));
				ns.print("Hack " + ns.nFormat(await ns.hack(sServer), "$0,0[.]00a"));
				await ns.hack(sServer);
			} else {
				ns.print("Growing... " + ns.nFormat(ns.getGrowTime(sServer) / 1000, "00:00:00"));
				ns.print("Grow " + ns.nFormat(await ns.grow(sServer), "0,0[.]00%"));
				await ns.grow(sServer);
			}
		}
	}
}
