import { useEffect } from "react"

const BackToTop = () => {

    const setShowButton = (show) => {
        return false
    }
    useEffect(() => {
        const handleScrollButtonVisibility = () => {
            window.scrollY > 500 ? setShowButton(true) : setShowButton(false);
        };
        window.addEventListener('scroll', handleScrollButtonVisibility);
        return () => {
            window.removeEventListener('scroll', handleScrollButtonVisibility);
        }
    }, [])

    const handleScrollToTop = () => {
        window.scrollTo({top: 0, behavior: 'smooth'})
    }

    return (
        <>
            {
                setShowButton && (
                    <div className={'scrollToTop'}>
                        <button className="position-fixed fixed-bottom w-25 right-7 z-5 cursor-pointer p-4" onClick={handleScrollToTop}>
                            BACK TO TOP ffff
                        </button>
                    </div>
                )
            }
        </>
    )
}

export default BackToTop;