import React from 'react';
import Slider from '../components/Slider';
import Helmet from './../components/Helmet';
import heroSliderData from './../assets/fake-data/hero-slider';
import Section, { SectionBody } from '../components/Section';
import policy from './../assets/fake-data/policy';
import PolicyCard from '../components/PolicyCard';
import Grid from './../components/Grid';
import { Link } from 'react-router-dom';
import { SectionTitle } from './../components/Section';
import productData from './../assets/fake-data/products';
import ProductCard from '../components/ProductCard';
import banner from '../assets/images/banner.png'

const Home = () => {
    return (
        <Helmet title="Trang chủ">
            {/*Slider */}
            <Slider data={heroSliderData} control={true} auto={true} />
            {/* End Silder */}
            {/* Policy section */}
            <Section>
                <SectionBody>
                    <Grid col={4} mdCol={2} smCol={1} gap={20}>
                        {
                            policy.map((item, index) => (
                                <Link key={index} to="/policy">
                                    <PolicyCard
                                        name={item.name}
                                        description={item.description}
                                        icon={item.icon} />
                                </Link>

                            ))
                        }
                    </Grid>
                </SectionBody>
            </Section>
            {/* End policy section */}

            {/* Best selling section */}
            <Section>
                <SectionTitle>
                    Top sản phẩm bán chạy
                </SectionTitle>
                <SectionBody>
                    <Grid col={4} mdCol={2} smCol={1} gap={20}>
                        {productData.getProducts(12).map((item, index) => (
                            <ProductCard key={index}
                                img01={item.image01}
                                img02={item.image02}
                                name={item.title}
                                price={item.price}
                                slug={item.slug}
                            />
                        ))}
                    </Grid>
                </SectionBody>
            </Section>
            {/* End Best selling section */}
            {/* Banner */}
            <Section>
                <SectionBody>
                    <Link to="/catalog">
                        <img src={banner} alt="" />
                    </Link>
                </SectionBody>
            </Section>
            {/* End Banner */}
            {/* New arrival section */}
            <Section>
                <SectionTitle>
                    Sản phẩm mới
                </SectionTitle>
                <SectionBody>
                    <Grid col={4} mdCol={2} smCol={1} gap={20}>
                        {productData.getProducts(8).map((item, index) => (
                            <ProductCard key={index}
                                img01={item.image01}
                                img02={item.image02}
                                name={item.title}
                                price={item.price}
                                slug={item.slug}
                            />
                        ))}
                    </Grid>
                </SectionBody>
            </Section>

            {/* End New arrival section */}

        </Helmet>
    );
};

export default Home;
