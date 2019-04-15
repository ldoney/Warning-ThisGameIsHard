declare module sdkbox {     module ReviewListener {        /**        * trigger when alert prompt show        */        export function onDisplayAlert() : object;
        /**        * trigger when user refuse to rate        */        export function onDeclineToRate() : object;
        /**        * trigger when user want to rate        */        export function onRate() : object;
        /**        * trigger when user want to remind later        */        export function onRemindLater() : object;
    }     module PluginReview {        /**        *  initialize the plugin instance.        */        export function init(jsonconfig : object) : boolean;
        /**        * Set listener to listen for adcolony events        */        export function setListener(listener : object) : object;
        /**        * Get the listener        */        export function getListener() : object;
        /**        * Remove the listener, and can't listen to events anymore        */        export function removeListener() : object;
        /**        * Tells 'SDKBox review plugin' to try and show the prompt (a rating alert).        * if you call `show` with `false` or null params,        * the prompt will be showed if there is connection available,        * the user hasn't declined to rate or hasn't rated current version.        * if the item `tryPromptWhenInit` in sdkbox.config is false, you can call this try to show prompt        * if you call `show` with `true` params        * the prompt will be showed without checks (the prompt is always displayed).        * The case where you should call this is if your app has an        * explicit "Rate this app" command somewhere. This is similar to rateApp,        * but instead of jumping to the review directly, an intermediary prompt is displayed.        * another case is for debug        */        export function show(force : boolean) : object;
        /**        * goto rating page directly        */        export function rate() : object;
        export function userDidSignificantEvent(canPromptForRating : boolean) : object;
        export function rateInAppstore(yes : boolean) : object;
        export function SDKBOX_DEPRECATED(setTitle(conststd::string&title : object) : object;
        export function SDKBOX_DEPRECATED(setMessage(conststd::string&message : object) : object;
        export function SDKBOX_DEPRECATED(setCancelButtonTitle(conststd::string&cancelTitle : object) : object;
        export function SDKBOX_DEPRECATED(setRateButtonTitle(conststd::string&rateTitle : object) : object;
        export function SDKBOX_DEPRECATED(setRateLaterButtonTitle(conststd::string&rateLaterTitle : object) : object;
    }}