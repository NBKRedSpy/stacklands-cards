import React from 'react'
import starFilled from '../images/star-filled.svg'
import starEmpty from '../images/star-empty.svg'
import "./Pinned.css"

/**
 * The clickable star icon.  Technically this is a toggle component with a star icon.
 * 
 * @param props 
 * @returns 
 */
export default function Pinned(props: {
    isPinned: boolean, 
    pinnedClick: React.MouseEventHandler | null,
}) {

        function handlePinned(event: React.MouseEvent<HTMLImageElement>) {
                if(props.pinnedClick !== null)
                {
                        props.pinnedClick(event);
                }

                event.preventDefault();
        }
        const pinnedImage = props.isPinned ? starFilled : starEmpty

        return(
                <img className="pinned-image" alt="favorite toggle" src={pinnedImage} width={16} height={16} onClick={handlePinned} />
        )
}