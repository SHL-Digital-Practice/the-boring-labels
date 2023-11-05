import { defineStore } from "pinia";
import { ref } from "vue";

export const useRevitStore = defineStore("revit", () => {

    const roomNames = ref<string[]>([])

    async function getRoomNames() {
        const data = await window.chrome.webview.hostObjects.boringBridge.GetAllRoomsNames();
        return JSON.parse(data);
    }

    return { getRoomNames, roomNames }
});