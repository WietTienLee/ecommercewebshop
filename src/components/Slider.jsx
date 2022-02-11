import PropTypes from 'prop-types';
import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from './Button';

const Slider = (props) => {
    const { data } = props
    const [activeSlide, setActiveSlide] = useState(0)

    const timeOut = props.timeOut ? props.timeOut : 3000


    const nextSlide = useCallback(
        () => {
            const index = activeSlide + 1 === data.length ? 0 : activeSlide + 1
            setActiveSlide(index)
        }, [activeSlide, data],
    )
    const prevSlide = () => {
        const index = activeSlide - 1 < 0 ? data.length - 1 : activeSlide - 1
        setActiveSlide(index)
    }
    useEffect(() => {
        if (props.auto) {
            const slideAuto = setInterval(() => {
                nextSlide()
            }, timeOut);
            return () => {
                clearInterval(slideAuto)

            }
        }
    }, [nextSlide, timeOut, props])
    return <div className="slider">
        {
            data.map((item, index) => (
                <SliderItem key={index} item={item} active={index === activeSlide} />
            ))
        }{
            props.control ? (
                <div className='slider_control'>
                    <div className="slider_control_item" onClick={() => prevSlide()}>
                        <i className='bx bx-chevron-left'></i>
                    </div>
                    <div className="slider_control_item" >
                        <div className="index">
                            {activeSlide + 1}/{data.length}
                        </div>
                    </div>
                    <div className="slider_control_item" onClick={() => nextSlide()}>
                        <i className='bx bx-chevron-right'></i>
                    </div>

                </div>
            ) : null
        }
    </div>;
};

Slider.propTypes = {
    data: PropTypes.array.isRequired,
    control: PropTypes.bool,
    auto: PropTypes.bool,
    timeOut: PropTypes.number,
};
const SliderItem = props => (
    < div className={`slider_item ${props.active ? 'active' : ''}`} >
        <div className="slider_item_info">
            <div className={`slider_item_info_title color-${props.item.color}`}>
                <span>{props.item.title}</span>
            </div>
            <div className="slider_item_info_description">
                <span>{props.item.description}</span>
            </div>
            <div className="slider_item_info_btn">
                <Link to={props.item.path}>
                    <Button
                        backgroundColor={props.item.color}
                        icon="bx bx-cart"
                        animate={true}
                        size="sm"
                    >Xem chi tiết</Button>
                </Link>
            </div>
        </div>
        <div className="slider_item_image">
            <div className={`shape bg-${props.item.color}`}>

            </div>
            <img src={props.item.img} alt="" />
        </div>
    </div >
)

export default Slider;
