import TrackItem from "../TrackItem";

function Track() {
    return (
        <section>
            <div className=" container mx-auto px-5 py-10 md:py-14">
                {/* main  */}
                <div className="flex flex-wrap -m-4 text-center">
                    <TrackItem title="Premium Tshirts" content="Our T-Shirts are 100% made of cotton." />
                    <TrackItem title="Premium Tshirts" content="Our T-Shirts are 100% made of cotton." />
                    <TrackItem title="Premium Tshirts" content="Our T-Shirts are 100% made of cotton." />
                </div>
            </div>
        </section>
    );
}

export default Track;