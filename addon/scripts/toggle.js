import { world, system } from "@minecraft/server";  
import { CONFIG } from "./config.js";  
  
const disabledPlayers = new Set();  
  
// Default Night Vision  
system.runInterval(() => {  
    for (const player of world.getAllPlayers()) {  
        if (disabledPlayers.has(player.id)) continue;  
  
        player.addEffect("minecraft:night_vision", CONFIG.duration, {  
            amplifier: 0,  
            showParticles: CONFIG.showParticles  
        });  
    }  
}, CONFIG.interval);  
  
// Toggle menggunakan Stick  
world.afterEvents.itemUse.subscribe((event) => {  
    const player = event.source;  
    const item = event.itemStack;  
  
    if (!item) return;  
    if (item.typeId !== CONFIG.toggleItem) return;  
  
    if (disabledPlayers.has(player.id)) {  
        disabledPlayers.delete(player.id);  
  
        player.sendMessage("§a Night Vision+ Enabled");  
    } else {  
        disabledPlayers.add(player.id);  
  
        player.removeEffect("minecraft:night_vision");  
  
        player.sendMessage("§c Night Vision+ Disabled");  
    }  
});