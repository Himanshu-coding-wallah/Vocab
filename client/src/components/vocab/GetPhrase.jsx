import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const GetPhrase = () => {

    const navigate = useNavigate()
    const [allVocab, setAllVocab] = useState([])
    const [filteredVocab, setFilteredVocab] = useState([])
    const [ logout, setLogout] = useState(false)
    const [search, setSearch] = useState('')

    useEffect(() => {

        async function fetchData() {

            try {
                const response = await fetch(
                    'http://localhost:3000/api/vocab/get-phrase',
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        credentials: "include",
                    }
                )
                
                const result = await response.json()
                console.log(result)
                const sortedData = result.allPhrase.sort((a, b) =>
                    a.word.localeCompare(b.word)
                )

                setAllVocab(sortedData)
                setFilteredVocab(sortedData)

            } catch (error) {
                console.log(error)
            }
        }

        fetchData()

    }, [])

    const handleSearch = (e) => {

        const value = e.target.value

        setSearch(value)

        const filteredData = allVocab.filter((item) =>
            item.word.toLowerCase().includes(value.toLowerCase())
        )

        setFilteredVocab(filteredData)
        console.log(filteredVocab)
    }

    const logoutFunc = async () => {

    try {

        const response = await fetch(
            "http://localhost:3000/api/auth/logout",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include"
            }
        )

        const result = await response.json()

        console.log(result)

        if(response.ok){

            alert("Logged out successfully")

            navigate("/login")
        }
        else{

            alert(result.message)
        }

    } catch (error) {

        console.log(error)
    }
    }

    const selectOpt = (e)=>{
        const value = e.target.value

        if(value === "vocabulary"){
            navigate("/getVocab")
        }else{
            navigate("/getPhrase")
        }
    }

    

    return (
        <div className=' min-h-screen bg-linear-to-br from-slate-100 to-blue-100'>

            <div>
                {/* Navbar */}
                <nav className='w-full h-16 bg-white shadow-md flex items-center justify-between px-6 sticky top-0 z-50'>

                    <h1 className='text-2xl font-bold text-blue-700 tracking-wide'>
                        My Dictionary
                    </h1>

                    <div className='flex gap-3'>

                        <button
                        onClick={()=>(navigate('/createPhrase'))}
                        className='bg-blue-600 hover:bg-blue-700 transition text-white px-5 py-2 rounded-lg shadow'>
                            Add
                        </button>

                        <button 
                        onClick={()=>setLogout(!logout)}
                        className='bg-red-500 hover:bg-red-600 transition text-white px-5 py-2 rounded-lg shadow'>
                            Logout
                        </button>

                    </div>

                </nav>  

                {/* Main Content */}
                <div className='max-w-6xl mx-auto px-6 py-8'>

                    {/* Header */}
                    <div className=' flex flex-col md:flex-row md:items-center gap-4 mb-8'>

                        <div className='w-full'>
                            <input 
                            name = 'search'
                            value={search}
                            onChange={handleSearch}
                            className='w-full text-gray-800 bg-white border border-gray-300 rounded-lg px-4 py-3 shadow-sm focus:outline-blue-400 '
                            type="text" placeholder='Search' />
                        </div>

                        <select
                            onChange={selectOpt}
                            className='bg-white border border-gray-300 rounded-lg px-4 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400'
                        >
                            <option value="phrase">Phrase</option>
                            <option value="vocabulary">Vocabulary</option>
                        </select>

                    </div>

                    {/* Cards */}
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>

                        {filteredVocab.map((item) => (

                            <div
                                key={item._id}
                                className='bg-white rounded-2xl shadow-lg hover:shadow-2xl transition duration-300 p-6 border border-gray-100'
                            >

                                {/* Word */}
                                <div className='flex items-center justify-between mb-4'>

                                    <h2 className='text-3xl font-bold text-blue-700 capitalize'>
                                        {item.word}
                                    </h2>

                                    <span className='bg-blue-100 text-blue-700 text-sm px-3 py-1 rounded-full'>
                                        Word
                                    </span>

                                </div>

                                {/* Meanings */}
                                <div className='space-y-4'>

                                    {item.meaning.map((meaningItem, index) => (

                                        <div
                                            key={meaningItem._id || index}
                                            className='bg-slate-50 rounded-xl p-4 border border-slate-200'
                                        >

                                            <h3 className='font-semibold text-gray-700 mb-2'>
                                                Meaning {index + 1}
                                            </h3>

                                            <p className='text-gray-800 leading-relaxed'>
                                                {meaningItem.definition}
                                            </p>

                                            <div className='mt-3 bg-blue-50 border-l-4 border-blue-400 p-3 rounded'>

                                                <p className='text-sm text-gray-700 italic'>
                                                    "{meaningItem.usecase}"
                                                </p>

                                            </div>

                                        </div>

                                    ))}

                                </div>

                                {/* Footer */}
                                {/* <div className='mt-5 flex justify-end gap-3'>

                                    <button className='bg-yellow-400 hover:bg-yellow-500 transition text-white px-4 py-2 rounded-lg text-sm font-medium'>
                                        Edit
                                    </button>

                                    <button className='bg-red-500 hover:bg-red-600 transition text-white px-4 py-2 rounded-lg text-sm font-medium'>
                                        Delete
                                    </button>

                                </div> */}

                            </div>

                        ))}

                    </div>

                    {/* Empty State */}
                    {allVocab.length === 0 && (
                        <div className='text-center mt-20'>

                            <h2 className='text-3xl font-bold text-gray-700 mb-3'>
                                No Phrases Found
                            </h2>

                            <p className='text-gray-500'>
                                Start adding phrases to build your personal dictionary.
                            </p>

                        </div>
                    )}

                </div>
            </div>

            {logout &&
            
            <>

            <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm'>

                <div className='bg-white rounded-2xl shadow-2xl p-8 w-[90%] max-w-md'>

                    <h2 className='text-2xl font-bold text-gray-800 mb-4 text-center'>
                        Logout
                    </h2>

                    <p className='text-gray-600 text-center mb-6'>
                        Are you sure you want to logout?
                    </p>

                    <div className='flex justify-center gap-4'>

                        <button
                        onClick={logoutFunc}
                        className='w-24 bg-red-500 hover:bg-red-700 transition text-white px-5 py-2 rounded-lg shadow'
                        >
                            Yes
                        </button>

                        <button
                        onClick={() => setLogout(false)}
                        className='w-24 bg-blue-600 hover:bg-blue-800 transition text-white px-5 py-2 rounded-lg shadow'
                        >
                            No
                        </button>

                    </div>

                </div>

            </div>
            
            
            </>
            // <div className='relative min-h-screen bg-linear-to-br flex items-center justify-center from-slate-100 to-blue-100'>
            //     <div className='bg-white rounded-2xl shadow-lg hover:shadow-2xl transition duration-300 p-6 border border-gray-100'>
            //         <h2 className='mb-4'>Are you sure you want to logout ?</h2>
                    
            //         <div className='text-center space-x-3'>
            //             <button
            //             onClick={logoutFunc}
            //             className='w-20 bg-red-500 hover:bg-red-800 transition text-white px-5 py-2 rounded-lg shadow'
            //             >Yes</button>

            //             <button
            //             onClick={()=>(setLogout(!logout))}
            //             className='w-20 bg-blue-600 hover:bg-blue-800 transition text-white px-5 py-2 rounded-lg shadow'
            //             >No</button>
            //         </div>
            //     </div>
            // </div>
            }
        </div>
    )
}

export default GetPhrase