import BackNavigation from "@/components/BackNavigation/BackNavigation";
import PageWrapper from "@/layouts/PageWrapper";
import Wrapper from "@/layouts/Wrapper/Wrapper";
import { getTranslations } from "next-intl/server";
import React from "react";

type Props = { children: React.ReactNode };

const layout = async (props: Props) => {
    const t = await getTranslations("common");
    return (
        <PageWrapper>
            <Wrapper>
                <BackNavigation title={t("settingsPageTitle")} />
                {props.children}
            </Wrapper>
        </PageWrapper>
    );
};

export default layout;
