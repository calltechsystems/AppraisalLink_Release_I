import GlobalHeroFilter from "../common/GlobalHeroFilter";

const HeroFilter = () => {
    return (
        <div className="home_content">
            <div className="home-text text-center">
                <h2 className="fz55">Brokers Paradise for Appraising the Property</h2>
                <p className="fz18 color-white">
                    From as low as $10 per month with limited time offer
                    discounts.
                </p>
            </div>
            {/* End .home-text */}

            <GlobalHeroFilter />
        </div>
    );
};

export default HeroFilter;
