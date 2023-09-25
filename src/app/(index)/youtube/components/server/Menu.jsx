import { Data } from "@/data/data/data";
import React from "react";

const Menu = () => {
    return (
        <div className="absolute -right-60 top-7 bg-black text-white z-10 flex flex-col divide-y-2 divide-white rounded-lg">
            {
                Data.youtube.allVideos.menu.map((item, index) => {
                    return <div key={index} className='py-2 text-xs'>
                        {
                            item.map((item, index) => {
                                return <div key={index} className='hover:bg-gray-500 px-4 py-2 flex items-center gap-2'>
                                    <div className='text-xl'>
                                        {item.icon}
                                    </div>
                                    <div>
                                        {item.title}
                                    </div>
                                </div>
                            })
                        }
                    </div>
                })
            }
        </div>
    )
}

export default Menu