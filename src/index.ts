import { after, instead } from "@vendetta/patcher";
import { findByName, findByProps } from "@vendetta/metro";
import { storage } from "@vendetta/plugin";
import { FluxDispatcher } from "@vendetta/metro/common";
import { findInReactTree } from "@vendetta/utils";
import { NoTypingIcon } from "./icon";

const ChatInput = findByName("ChatInput");
const Typing = findByProps("startTyping");
const patches = ["startTyping"].map((k) => instead(k, Typing, ([channelId]) => {
    if (storage.noTyping_enabled) return;
    FluxDispatcher.dispatch({ type: "TYPING_START_LOCAL", channelId });
}));
patches.push(after("render", ChatInput.prototype, (_, ret) => {
    const actions = findInReactTree(
        ret,
        (x) => "forceAnimateButtons" in x.props && x.props.actions
    ).props.actions;
    const noTypingAction = {
        IconComponent: NoTypingIcon,
        active: false,
        disabled: false,
    };
    actions.push(noTypingAction);
}));

export const onUnload = () => patches.forEach((unpatch) => unpatch());
