import React, { useEffect, useState } from 'react'
import './ProgressBar.css'
const ProgressBar = ({ index, activeIndex, duration }) => {

    const isActive = index === activeIndex;

    const [progress, setProgress] = useState()

    useEffect(() => {

        const IntervalId = setInterval(() => {
            setProgress((prev) => {

                if (prev < 100) {
                    return prev + 1
                }
                clearInterval(IntervalId)
                return prev
            })

        }, duration / 100)
    }, [activeIndex, duration])


    useEffect(() => {
        setProgress(0)
    }, [activeIndex])

    return (
        <div className={`progress-bar-container ${isActive ? "active" : ""}`}>
            <div className={`${isActive ? "progress-bar" : ""}`} style={{ width: `${progress}%` }}>

            </div>
        </div>
    )
}

export default ProgressBar