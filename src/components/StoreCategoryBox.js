import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Case, Motherboard2, Processor, Storage, Memory, VGA, PSU, Monitor, Accessories } from './IconSVG'
import Loading from './Loading'
import { 
    getMostParent,
    selectCat,
    selectFilter,
    setChangeStyle,
    selectChildCat,
    getChildOfMainParent,
    getCountProductByCategoryId,
    getProductByCategoryId 
} from '../redux/actions'

const CategoryBox = () => {
    const dispatch = useDispatch()
    const mostParent = useSelector(({ categories }) => categories.mostParent)
    const selectedCat = useSelector(({ categories }) => categories.selectedCat)
    const changeCategoryBox = useSelector(({ changeStyle }) => changeStyle.changeCategoryBox)

    useEffect(() => {
        dispatch(getMostParent())
    }, [dispatch])

    useEffect(() => {
        window.addEventListener('scroll', positionChange)
        return () => {
            window.removeEventListener('scroll', positionChange)
            dispatch(setChangeStyle('changeCategoryBox', false))
        };
    }, [])

    const positionChange = () => {
        if (window.scrollY >= 0.72 * window.innerHeight) {
            dispatch(setChangeStyle('changeCategoryBox', true))
        } else {
            dispatch(setChangeStyle('changeCategoryBox', false))
        }
    }

    const onCategoryClick = (id) => {
        if (selectedCat === id) {
            window.scrollTo(0, 0)
            dispatch(setChangeStyle('changeBrowseProducts', false))
            dispatch(selectFilter(0))
            dispatch(selectCat(0))
            dispatch(selectChildCat(0))
        } else {
            window.scrollTo(0, 0.725 * window.innerHeight)
            dispatch(setChangeStyle('changeBrowseProducts', true))
            dispatch(selectFilter(0))
            dispatch(selectCat(id))
            setTimeout(async() => {
                await dispatch(getChildOfMainParent(id))
                await dispatch(getCountProductByCategoryId(id))
                await dispatch(getProductByCategoryId(id, 12, 0))
            }, 400);
            dispatch(selectChildCat(0))
        }
    }

    const icon = [
        <Case height='100%' width='100%' color='darkviolet' />,
        <Motherboard2 height='100%' width='100%' color='darkviolet' />,
        <Processor height='100%' width='100%' color='darkviolet' />,
        <Memory height='100%' width='100%' color='darkviolet' />,
        <VGA height='100%' width='100%' color='darkviolet' />,
        <Storage height='100%' width='100%' color='darkviolet' />,
        <PSU height='100%' width='100%' color='darkviolet' />,
        <Monitor height='100%' width='100%' color='darkviolet' />,
        <Accessories height='100%' width='100%' color='darkviolet' />
    ]

    const renderCategoryBox = () => !mostParent ? (
        <div style={{ width: '100%', height: '10vh', backgroundColor: 'rgb(44, 44, 44)' }}><Loading /></div>
    ) : mostParent.map(i => (
        <div key={i.id}
            className={`categoryBox ${selectedCat === i.id ? 'active' : ''}`}
            onClick={() => onCategoryClick(i.id)}
        >
            <div className='iconBox'>
                {icon[i.id - 1]}
            </div>
            <div className='iconText'>{i.category}</div>
        </div>
    ))

    return (
        <div className={`CategoryBoxContainer ${changeCategoryBox ? 'change' : ''}`}>
            <div className='categoryBoxWrapper'>
                {renderCategoryBox()}
            </div>
        </div>
    )
}

export default CategoryBox
