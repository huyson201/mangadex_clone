import LatestUpdateItem from "./LatestUpdateItem"



type Props = {}

function LatestUpdateList({ }: Props) {
    return (
        <div className="mt-2 md:mt-4 grid md:grid-cols-2 gap-x-4 ">
            <div className="md:bg-customs-accent md:px-4 py-4 space-y-4">
                {
                    Array.from({ length: 5 }).map((_, index) => <LatestUpdateItem key={`${index}`} />)
                }
            </div>
            <div className="hidden md:block md:bg-customs-accent md:px-4 py-4 space-y-4">
                {
                    Array.from({ length: 5 }).map((_, index) => <LatestUpdateItem key={`${index}`} />)
                }
            </div>
        </div>
    )
}

export default LatestUpdateList