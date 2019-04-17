import {Helpers} from "./Objects/Helpers"
export class Context {
    static setupAds()
    {
        //sdkbox.PluginSdkboxAds.init();
    }
    init () {

    }

    static resetCharacter()
    {
        localStorage.clear();
        Helpers.clearAll();
    }
}
