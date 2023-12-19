import { getAssetIDByName } from "@vendetta/ui/assets";
import { storage } from "@vendetta/plugin";
import { findByName, findByProps } from "@vendetta/metro";
import { React, ReactNative } from "@vendetta/metro/common";
const Icon = findByName("Icon") ?? findByProps("Sizes", "compare") as unknown as React.ElementType;

const { Pressable } = findByProps("Button", "Text", "View");

export const NoTypingIcon = () => {
    const [curr, setCurr] = React.useState(0);
    return <Pressable onPress={() => {
        storage.noTyping_enabled = (storage.noTyping_enabled == undefined ? false : !storage.noTyping_enabled);
        setCurr(curr + 1);
    }}>
        <Icon source={storage.noTyping_enabled ? getAssetIDByName("ic_noise_cancellation_disabled") : getAssetIDByName("ic_noise_cancellation_active")} />
    </Pressable >;
}
