import { defineStore } from "pinia";
import { ref } from "vue";

interface BoringRoom {
    ElementId: string;
    Name: string;
}

export const useRevitStore = defineStore("revit", () => {

    const roomNames = ref<BoringRoom[]>([])

    async function getRoomNames() {
        const data = await window.chrome.webview.hostObjects.boringBridge.GetAllRoomsNames();
        return JSON.parse(data) as BoringRoom[];
    }

    return { getRoomNames, roomNames }
});