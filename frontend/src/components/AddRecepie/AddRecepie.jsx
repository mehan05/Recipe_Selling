import React from 'react'

const AddRecepie = () => {
  return (
    <div className='border-2 h-lvh mt-2 rounded-xl p-5'>

      <div className='flex justify-center'>
        <h1 className='text-3xl mt-4 font-semibold underline-offset-3 underline'>Add Recipe</h1>
      </div>

        <div>
              <input type="file" accept='image/' />
        </div>

        <div>
          <form action="">
              <label htmlFor="name">Name</label>
              <input type="text" id='name'/>

              <label htmlFor="name">Price</label>
              <input type="number" id='name'/>

              <label htmlFor="name">Description</label>
              <input type="textarea" id='name'/>

              <label htmlFor="name">Recipe</label>
              <input type="textarea" id='name'/>

              <select name="options" id="">
                    <option value="Indian">Indian</option>
                    <option value="italian">italian</option>
                    <option value="french">french</option>
              </select>
          </form>
        </div>


    </div>
  )
}

export default AddRecepie