import { useEffect } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleUp } from "@fortawesome/free-solid-svg-icons";

const BackToTop = () => {

    const setShowButton = (show) => {
        return false
    }
    useEffect(() => {
        const handleScrollButtonVisibility = () => {
            console.log(window.scrollY)
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
                    <div className={'scrollToTop'} id="back_to_top_container">
                        <button id="back_to_top" class="btn-secondary" onClick={handleScrollToTop}>
                            <FontAwesomeIcon icon={faAngleUp  } />
                        </button>
                    </div>
                )
            }
        </>
    )
}

export default BackToTop;