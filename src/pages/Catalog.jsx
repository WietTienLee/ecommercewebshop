import React, { useCallback, useEffect, useState, useRef } from 'react';
import Helmet from './../components/Helmet';
import productData from './../assets/fake-data/products';
import category from '../assets/fake-data/category';
import productColor from '../assets/fake-data/product-color';
import productSize from '../assets/fake-data/product-size';
import CheckBox from '../components/CheckBox';
import Button from '../components/Button';
import InfinityList from '../components/InfinityList';
const Catalog = () => {
    const initFilter = {
        category: [],
        color: [],
        size: []
    }
    const productList = productData.getAllProducts()
    const [products, setProducts] = useState(productList)
    const [filter, setFilter] = useState(initFilter)

    const filterSelected = (type, checked, item) => {
        if (checked) {
            switch (type) {
                case "CATEGORY":
                    setFilter({ ...filter, category: [...filter.category, item.categorySlug] })
                    break;
                case "COLOR":
                    setFilter({ ...filter, color: [...filter.color, item.color] })
                    break;
                case "SIZE":
                    setFilter({ ...filter, size: [...filter.size, item.size] })
                    break;
                default:
            }
        }
        else {
            switch (type) {
                case "CATEGORY":
                    const newCategory = filter.category.filter(e => e !== item.categorySlug)
                    setFilter({ ...filter, category: newCategory })
                    break;
                case "COLOR":
                    const newColor = filter.color.filter(e => e !== item.color)
                    setFilter({ ...filter, color: newColor })
                    break;
                case "SIZE":
                    const newSize = filter.size.filter(e => e !== item.size)
                    setFilter({ ...filter, size: newSize })
                    break;
                default:
            }
        }
    }
    const clearFilter = () => {
        if (filter.category.length < 1 && filter.color.length < 1 && filter.size.length < 1) return
        setFilter(initFilter)
    }
    const updateProducts = useCallback(() => {
        let temp = productList
        if (filter.category.length > 0) {
            temp = temp.filter(e => filter.category.includes(e.categorySlug))

        }
        if (filter.color.length > 0) {
            temp = temp.filter(e => {
                const check = e.colors.find(color => filter.color.includes(color))
                return check !== undefined
            })

        }
        if (filter.size.length > 0) {
            temp = temp.filter(e => {
                const check = e.size.find(size => filter.size.includes(size))
                return check !== undefined
            })

        }
        setProducts(temp)

    }, [filter, productList])

    useEffect(() => {
        updateProducts()
    }, [updateProducts])
    const filterRef = useRef(null)

    const showHideFilter = () => filterRef.current.classList.toggle('active')
    return <Helmet title="Sản Phẩm">
        <div className="catalog">
            <div className="catalog_filter" ref={filterRef}>
                <div className="catalog_filter_close" onClick={() => showHideFilter()}>
                    <i className='bx bx-left-arrow-alt'></i>
                </div>
                <div className="catalog_filter_widget">
                    <div className="catalog_filter_widget_title">
                        Danh mục sản phẩm
                    </div>
                    <div className="catalog_filter_widget_content">
                        <ul>
                            {

                                category.map((item, index) => (
                                    <li className='catalog_filter_widget_content_item' key={item.categorySlug}>
                                        <CheckBox
                                            label={item.display}
                                            onChange={(input) => filterSelected("CATEGORY", input.checked, item)}
                                            checked={filter.category.includes(item.categorySlug)}
                                        />
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                </div>
                <div className="catalog_filter_widget">
                    <div className="catalog_filter_widget_title">
                        Màu sắc
                    </div>
                    <div className="catalog_filter_widget_content">
                        <ul>
                            {

                                productColor.map((item, index) => (
                                    <li className='catalog_filter_widget_content_item' key={item.color}>
                                        <CheckBox
                                            label={item.display}
                                            onChange={(input) => filterSelected("COLOR", input.checked, item)}
                                            checked={filter.color.includes(item.color)}
                                        />
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                </div>
                <div className="catalog_filter_widget">
                    <div className="catalog_filter_widget_title">
                        Kích cỡ
                    </div>
                    <div className="catalog_filter_widget_content">
                        <ul>
                            {

                                productSize.map((item, index) => (
                                    <li className='catalog_filter_widget_content_item' key={item.size}>
                                        <CheckBox
                                            label={item.display}
                                            onChange={(input) => filterSelected("SIZE", input.checked, item)}
                                            checked={filter.size.includes(item.size)}

                                        />
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                </div>
                <div className="catalog_filter_widget">
                    <div className="catalog_filter_widget_content">
                        <Button size="sm" onClick={clearFilter}>Xóa bộ lọc</Button>
                    </div>
                </div>
            </div>
            <div className="catalog_filter_toggle">
                <Button size="sm" onClick={() => showHideFilter()}>Bộ Lọc</Button>
            </div>
            <div className="catalog_content">
                <InfinityList data={products} />
            </div>
        </div>
    </Helmet >;
};

export default Catalog;
