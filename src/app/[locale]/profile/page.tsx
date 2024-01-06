import avatar from "@/assets/avatar.png";
import banner from "@/assets/group-banner.png";
import { auth } from "@/auth";
import Wrapper from "@/layouts/Wrapper/Wrapper";
import Image from "next/image";
type Props = {};

const page = async (props: Props) => {
    const session = await auth();
    return (
        <div className="sm:mt-[var(--navbar-height)] relative">
            <div className="h-[calc(12.5rem)] w-full  z-[1] absolute top-0 [clip-path:inset(0_0_0_0)]">
                <div
                    className="fixed left-0 w-full h-[calc(12.5rem)]"
                    style={{
                        background: `no-repeat center 25% / cover url(${banner.src}) `,
                    }}
                ></div>
                <div className="sm:hidden absolute w-full h-full top-0 bg-gradient-to-b from-0 via-[56px] to-[50%] from-background via-background/80 to-background/0"></div>
            </div>
            <div
                className="absolute top-0 w-full h-[640px] blur-xl hidden sm:block"
                style={{
                    background: `radial-gradient(circle at top, hsla(var(--background) / 0.8), hsla(var(--background)) 75%), no-repeat top 30% center / 100% url(${banner.src})`,
                }}
            ></div>
            <div className="relative z-[2] ">
                <Wrapper className="gap-x-6 grid grid-cols-[128px_1fr]  sm:grid-cols-[192px_1fr] grid-rows-[auto_auto_auto]">
                    <div className="row-start-2 row-span-2 w-32 h-32 sm:w-48 sm:h-48 mt-[30px] sm:mt-0">
                        <Image
                            className="w-full h-full rounded-full border-2 border-background"
                            src={session?.user.image || avatar}
                            alt="avatar"
                            width={400}
                            height={500}
                        />
                    </div>
                    <div className="h-[calc(12.5rem)] w-full row-span-2"></div>
                    <div className="col-span-2 sm:col-span-1 ">
                        <div className="text-4xl break-all font-bold sm:pt-4 pb-6">
                            {session?.user.username}
                        </div>
                        <div>
                            <div className="font-bold">UserID</div>
                            <div>{session?.user.id}</div>
                        </div>
                        <div className="mt-4">
                            <div className="font-bold">Email</div>
                            <div className="break-all">
                                {hideEmail(session?.user.email || "")}
                            </div>
                        </div>
                    </div>
                </Wrapper>
            </div>
        </div>
    );
};
function hideEmail(email: string) {
    const [username, domain] = email.split("@");
    const hiddenUsername =
        username.slice(0, 3) + "*".repeat(username.length - 3);
    const hiddenDomain = domain.slice(0, 3) + "*".repeat(domain.length - 3);
    return `${hiddenUsername}@${hiddenDomain}`;
}
export default page;
