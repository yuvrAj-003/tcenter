// category 
import { graphic, tie_dye, plain, stripped } from '../../Assets'
import React from 'react'
import CategoryProduct from '../CategoryProduct'
const category = [
    {
        image: {graphic},
        name: 'graphic'
    },
    {
        image: {plain},
        name: 'plain'
    },
    {
        image: {stripped},
        name: 'stripped'
    },
    {
        image: {tie_dye},
        name: 'tie dye'
    },
]


const Category = () => {

    return (
        <div>
            <div className="flex flex-col mt-5">
                {/* main 1 */}
                <div className="flex overflow-x-scroll justify-center hide-scroll-bar">
                    {/* main 2  */}
                    <div className="flex">
                        {/* category  */}
                        {category.map((item, index) => {
                            return (
                                <div key={index} className="px-3 lg:px-10">
                                   <CategoryProduct index={index} name={item.name} img={Object.values(item.image)} />
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>

            {/* style  */}
            <style dangerouslySetInnerHTML={{ __html: ".hide-scroll-bar {  -ms-overflow-style: none;  scrollbar-width: none;}.hide-scroll-bar::-webkit-scrollbar {  display: none;}" }} />
        </div>
    );
}

export default Category;