import Products from '../products/Products'
import product from "/spiderman-3.jpeg"

const Dashboard = () => {
  return (
    <div className='bg-[#D8C3A5] rounded-xl mt-3'>
      <section>
        <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
          <header>

            <div className='border-2 m-3 p-4 border-red-600 rounded-xl text-lg'>
              <p className="mt-4 w-full text-black">
                Welcome to DSRW, a vibrant community where food lovers can discover and share delicious recipes from around the world. Explore a diverse collection of dishes, connect with fellow culinary enthusiasts, and contribute your own creations. Join us in celebrating the joy of cooking and savoring new flavors!
              </p>
            </div>
          </header>

          <div className="mt-8 sm:flex sm:items-center sm:justify-between">
            <div className="block sm:hidden">
              <button
                className="flex cursor-pointer items-center gap-2 border-b border-gray-400 pb-1 text-gray-900 transition hover:border-gray-600"
              >
                <span className="text-sm font-medium">Filters & Sorting</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-4 rtl:rotate-180"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </button>
            </div>
            <h2 className="text-xl font-bold text-gray-900 sm:text-3xl">Top Recipes</h2>

            <div className="hidden sm:flex sm:gap-4">
              <div className="relative">
                <details className="group [&_summary::-webkit-details-marker]:hidden">
                  <summary
                    className="flex cursor-pointer items-center gap-2 border-b border-gray-400 pb-1 text-gray-900 transition hover:border-red-600"
                  >
                    <span className="text-lg font-medium">Availability</span>
                    <span className="transition group-open:-rotate-180">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="size-4"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                      </svg>
                    </span>
                  </summary>

                  <div className="z-50 group-open:absolute group-open:top-auto group-open:mt-2 ltr:group-open:start-0">
                    <div className="w-96 rounded border border-gray-200 bg-white">
                      <header className="flex items-center justify-between p-4">
                        <span className="text-sm text-gray-700">0 Selected</span>
                        <button type="button" className="text-sm text-gray-900 underline underline-offset-4">
                          Reset
                        </button>
                      </header>

                      <ul className="space-y-1 border-t border-gray-200 p-4">
                        <li>
                          <label htmlFor="FilterInStock" className="inline-flex items-center gap-2">
                            <input
                              type="checkbox"
                              id="FilterInStock"
                              className="size-5 rounded border-gray-300"
                            />
                            <span className="text-sm font-medium text-gray-700">Indian</span>
                          </label>
                        </li>

                        <li>
                          <label htmlFor="FilterPreOrder" className="inline-flex items-center gap-2">
                            <input
                              type="checkbox"
                              id="FilterPreOrder"
                              className="size-5 rounded border-gray-300"
                            />
                            <span className="text-sm font-medium text-gray-700">Italian</span>
                          </label>
                        </li>

                        <li>
                          <label htmlFor="FilterOutOfStock" className="inline-flex items-center gap-2">
                            <input
                              type="checkbox"
                              id="FilterOutOfStock"
                              className="size-5 rounded border-gray-300"
                            />
                            <span className="text-sm font-medium text-gray-700">Chinese</span>
                          </label>
                        </li>
                      </ul>
                    </div>
                  </div>
                </details>
              </div>

              
            </div>
          </div>

          
         <Products/>
        </div>
      </section>
    </div>
  )
}

export default Dashboard