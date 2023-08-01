/** @param {NS} ns **/
export async function main(ns) {
	if (ns.gang.inGang()) {
		let gangInformation = ns.gang.getGangInformation();

		while (true) {
			let gangMembers = ns.gang.getMemberNames();

			if (gangMembers.length === 0) {
				ns.print("No members");
				if (ns.gang.canRecruitMember()) {
					ns.gang.recruitMember("N0");
					gangMembers.push("N0");
					ns.gang.setMemberTask("N0", "Train Combat");
				}
			} else {
				if (gangMembers.length < 12) {
					if (ns.gang.canRecruitMember()) {
						let iGangMembers = gangMembers.length;
						ns.gang.recruitMember("N" + iGangMembers);
						gangMembers.push("N" + iGangMembers);
						ns.gang.setMemberTask("N" + iGangMembers, "Train Combat");
					}
				}

				for (const member of gangMembers) {
					let memberInformation = ns.gang.getMemberInformation(member);
					if (ns.gang.getAscensionResult(member) !== undefined) {
						let bAscendAgi = ns.gang.getAscensionResult(member).agi >= 1.1 && memberInformation.agi_asc_mult < 100;
						let bAscendCha = ns.gang.getAscensionResult(member).cha >= 1.1 && memberInformation.cha_asc_mult < 100;
						let bAscendDef = ns.gang.getAscensionResult(member).def >= 1.1 && memberInformation.def_asc_mult < 100;
						let bAscendDex = ns.gang.getAscensionResult(member).dex >= 1.1 && memberInformation.dex_asc_mult < 100;
						let bAscendHack = ns.gang.getAscensionResult(member).hack >= 1.1 && memberInformation.hack_asc_mult < 100;
						let bAscendStr = ns.gang.getAscensionResult(member).str >= 1.1 && memberInformation.str_asc_mult < 100;

						let bTraining = memberInformation.task.includes("Train");

						if (bTraining && (bAscendAgi || bAscendCha || bAscendDef || bAscendDex || bAscendHack || bAscendStr)) {
							ns.print("Ascending " + member + "...");
							ns.gang.ascendMember(member);
							ns.print(member + " ascended");
						}
					}
				}
			}

			await ns.sleep(10000);
			ns.clearLog();
		}
	}
}