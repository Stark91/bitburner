/** @param {NS} ns **/
export async function main(ns) {
	var iNumHacknetNodes = ns.hacknet.numNodes();

	while (true) {
		if (iNumHacknetNodes > 0) {
			var iPrice = ns.hacknet.getPurchaseNodeCost();
			ns.print("iPrice=" + iPrice);
			var iBestProdByPrice = ns.hacknet.getPurchaseNodeCost() / (1.5 * ns.getHacknetMultipliers().production);
			var iNodeToUpgrade = 0;
			var iUpgradeType = 3;
			for (var i = 0; i < iNumHacknetNodes; i++) {
				var iLevel = ns.hacknet.getNodeStats(i).level;
				var iRam = ns.hacknet.getNodeStats(i).ram;
				var iCores = ns.hacknet.getNodeStats(i).cores;
				if ((ns.hacknet.getCoreUpgradeCost(i, 1) > 0) && (iCores < 16)) {
					var iGain = (iLevel * 1.5 * Math.pow(1.035, iRam - 1) * ((iCores + 6) / 6) * ns.getHacknetMultipliers().production) - ns.hacknet.getNodeStats(i).production;
					var iProdByPrice = ns.hacknet.getCoreUpgradeCost(i, 1) / iGain;
					if (iBestProdByPrice > iProdByPrice) {
						iBestProdByPrice = iProdByPrice;
						iPrice = ns.hacknet.getCoreUpgradeCost(i, 1);
						iNodeToUpgrade = i;
						iUpgradeType = 0;
					}
				}
				if ((ns.hacknet.getLevelUpgradeCost(i, 1) > 0) && (iLevel < 200)) {
					var iGain = ((iLevel + 1) * 1.5 * Math.pow(1.035, iRam - 1) * ((iCores + 5) / 6) * ns.getHacknetMultipliers().production) - ns.hacknet.getNodeStats(i).production;
					var iProdByPrice = ns.hacknet.getLevelUpgradeCost(i, 1) / iGain;
					if (iBestProdByPrice > iProdByPrice) {
						iBestProdByPrice = iProdByPrice;
						iPrice = ns.hacknet.getLevelUpgradeCost(i, 1);
						iNodeToUpgrade = i;
						iUpgradeType = 1;
					}
				}
				if ((ns.hacknet.getRamUpgradeCost(i, 1) > 0) && (iRam < 64)) {
					var iGain = (iLevel * 1.5 * Math.pow(1.035, iRam * 2 - 1) * ((iCores + 5) / 6) * ns.getHacknetMultipliers().production) - ns.hacknet.getNodeStats(i).production;
					var iProdByPrice = ns.hacknet.getRamUpgradeCost(i, 1) / iGain;
					if (iBestProdByPrice > iProdByPrice) {
						iBestProdByPrice = iProdByPrice;
						iPrice = ns.hacknet.getRamUpgradeCost(i, 1);
						iNodeToUpgrade = i;
						iUpgradeType = 2;
					}
				}
				ns.print("Best ratio : " + iBestProdByPrice);
			}
			if (iUpgradeType === 3 && iNumHacknetNodes > 23) {
				ns.exit();
			}
			if (iPrice <= ns.getServerMoneyAvailable("home")) {
				if (iUpgradeType === 0) {
					ns.hacknet.upgradeCore(iNodeToUpgrade, 1);
					ns.print("Node " + iNodeToUpgrade + " core upgraded to " + ns.hacknet.getNodeStats(iNodeToUpgrade).cores);
				}
				if (iUpgradeType === 1) {
					ns.hacknet.upgradeLevel(iNodeToUpgrade, 1);
					ns.print("Node " + iNodeToUpgrade + " level upgraded to " + ns.hacknet.getNodeStats(iNodeToUpgrade).level);
				}
				if (iUpgradeType === 2) {
					ns.hacknet.upgradeRam(iNodeToUpgrade, 1);
					ns.print("Node " + iNodeToUpgrade + " RAM upgraded to " + ns.hacknet.getNodeStats(iNodeToUpgrade).ram);
				}
				if (iUpgradeType === 3) {
					ns.hacknet.purchaseNode();
					ns.print("New node purchased");
					iNumHacknetNodes++;
				}
			} else {
				var sType = "";
				switch (iUpgradeType) {
					case 0:
						sType = "core upgrade";
					case 1:
						sType = "level upgrade";
					case 2:
						sType = "RAM upgrade";
					case 3:
						sType = "new node";
				}

				ns.print("Not enough money to buy " + sType + " (" + iPrice + "$ needed - " + ns.getServerMoneyAvailable("home") + "$ available)");
			}
		} else {
			if (ns.hacknet.getPurchaseNodeCost() < ns.getServerMoneyAvailable("home")) {
				ns.hacknet.purchaseNode();
				iNumHacknetNodes++;
			}
		}

		await ns.sleep(1);
	}
}