import { useState } from "react";
import { FaStar } from "react-icons/fa";

const createArray = (length) => [
    ...Array(length)
]
  
function Star( {selected = false, onSelect}  ) {
    console.log(selected)
    return <FaStar color={selected ? "green" : "grey"} onClick={onSelect}/>;
}
  
function StarRating({totalStars = 5}) {
    const [selectedStars, setSelectedStars] = useState(0)
    return (
        <>
            {
                createArray(totalStars).map((n, i) => (
                    <Star 
                        key={i} 
                        selected={selectedStars > i} 
                        onSelect={() => setSelectedStars(i + 1)}
                    />
                ))
            }
            <p>
                {selectedStars} of {totalStars}
            </p>
        </>
    )
  
}

const HookTest = () =>
(
    <div>
        <StarRating totalStars={5} />
    </div>
)


export default HookTest;