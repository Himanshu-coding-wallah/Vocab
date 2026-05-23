import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const CreatePhrase = () => {

  const navigate = useNavigate()

  const [add, setAdd] = useState(false)

  const [vocab, setVocab] = useState({
    word: '',
    meaning: [
      {
        definition: '',
        usecase: ''
      }
    ]
  })

  const formHandler = async (e) => {

    e.preventDefault()

    try {

      const response = await fetch(
        "http://localhost:3000/api/vocab/create-phrase",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          credentials: "include",
          body: JSON.stringify(vocab)
        }
      )

      const result = await response.json()

      console.log(result)

      if(response.ok){

        alert("Phrase created successfully")
        navigate("/getPhrase")

      }else{

        alert(result.message)
      }

    } catch (error) {

      console.log(error)
    }
  }

  const changeHandler = (e) => {

    const { name, value } = e.target

    if(name === "word"){

      setVocab((prev) => ({
        ...prev,
        word: value
      }))

    }

    else if(name === "definition1"){

      setVocab((prev) => ({
        ...prev,
        meaning: [
          {
            ...prev.meaning[0],
            definition: value
          },
          ...(prev.meaning[1] ? [prev.meaning[1]] : [])
        ]
      }))
    }

    else if(name === "usecase1"){

      setVocab((prev) => ({
        ...prev,
        meaning: [
          {
            ...prev.meaning[0],
            usecase: value
          },
          ...(prev.meaning[1] ? [prev.meaning[1]] : [])
        ]
      }))
    }

    else if(name === "definition2"){

      setVocab((prev) => ({
        ...prev,
        meaning: [
          prev.meaning[0],
          {
            ...prev.meaning[1],
            definition: value
          }
        ]
      }))
    }

    else if(name === "usecase2"){

      setVocab((prev) => ({
        ...prev,
        meaning: [
          prev.meaning[0],
          {
            ...prev.meaning[1],
            usecase: value
          }
        ]
      }))
    }
  }

  const addMeaningHandler = () => {

    if(add){

      setAdd(false)

      setVocab((prev) => ({
        ...prev,
        meaning: [prev.meaning[0]]
      }))

    }else{

      setAdd(true)

      setVocab((prev) => ({
        ...prev,
        meaning: [
          ...prev.meaning,
          {
            definition: '',
            usecase: ''
          }
        ]
      }))
    }
  }

  return (

    <div className='min-h-screen bg-linear-to-br from-blue-100 via-white to-purple-100 flex items-center justify-center px-4 py-10'>

      <div className='w-full max-w-2xl bg-white shadow-2xl rounded-3xl p-8 border border-gray-200'>

        {/* Heading */}
        <div className='mb-8 text-center'>

          <h1 className='text-4xl font-bold text-blue-700 mb-2'>
            Create Phrase
          </h1>

          <p className='text-gray-500 text-lg'>
            Add a new phrase to your personal dictionary
          </p>

        </div>

        {/* Form */}
        <form
        onSubmit={formHandler}
        className='space-y-6'>

          {/* Word */}
          <div>

            <label className='block text-gray-700 font-semibold mb-2'>
              Word
            </label>

            <input
              name='word'
              type="text"
              value={vocab.word}
              onChange={changeHandler}
              placeholder='Enter word'
              className='w-full px-5 py-3 rounded-xl border border-gray-300 bg-gray-50 text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400'
            />

          </div>

          {/* Meaning 1 */}
          <div>

            <label className='block text-gray-700 font-semibold mb-2'>
              Meaning
            </label>

            <textarea
              name='definition1'
              value={vocab.meaning[0].definition}
              onChange={changeHandler}
              rows="2"
              placeholder='Enter meaning'
              className='w-full px-5 py-3 rounded-xl border border-gray-300 bg-gray-50 text-gray-800 shadow-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-400'
            ></textarea>

          </div>

          {/* Example 1 */}
          <div>

            <label className='block text-gray-700 font-semibold mb-2'>
              Example Sentence
            </label>

            <textarea
              name='usecase1'
              value={vocab.meaning[0].usecase}
              onChange={changeHandler}
              rows="3"
              placeholder='Enter example sentence'
              className='w-full px-5 py-3 rounded-xl border border-gray-300 bg-gray-50 text-gray-800 shadow-sm resize-none focus:outline-none focus:ring-2 focus:ring-purple-400'
            ></textarea>

          </div>

          {/* Meaning 2 */}
          {
            add && (
              <>
                <div>

                  <label className='block text-gray-700 font-semibold mb-2'>
                    Meaning
                  </label>

                  <textarea
                    name='definition2'
                    value={vocab.meaning[1].definition}
                    onChange={changeHandler}
                    rows="2"
                    placeholder='Enter meaning'
                    className='w-full px-5 py-3 rounded-xl border border-gray-300 bg-gray-50 text-gray-800 shadow-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-400'
                  ></textarea>

                </div>

                <div>

                  <label className='block text-gray-700 font-semibold mb-2'>
                    Example Sentence
                  </label>

                  <textarea
                    name='usecase2'
                    value={vocab.meaning[1].usecase}
                    onChange={changeHandler}
                    rows="3"
                    placeholder='Enter example sentence'
                    className='w-full px-5 py-3 rounded-xl border border-gray-300 bg-gray-50 text-gray-800 shadow-sm resize-none focus:outline-none focus:ring-2 focus:ring-purple-400'
                  ></textarea>

                </div>
              </>
            )
          }

          {/* Buttons */}
          <div className='flex gap-4 pt-4'>

            <button
              type='submit'
              className='flex-1 bg-blue-600 hover:bg-blue-700 transition duration-200 text-white py-3 rounded-xl font-semibold shadow-lg'
            >
              Save Phrase
            </button>

            <button
              type='button'
              onClick={addMeaningHandler}
              className='flex-1 bg-blue-600 hover:bg-blue-700 transition duration-200 text-white py-3 rounded-xl font-semibold shadow-lg'
            >
              {add ? 'Remove Meaning' : 'Add Meaning'}
            </button>

            <button
              onClick={() => navigate("/getPhrase")}
              type='button'
              className='flex-1 bg-gray-200 hover:bg-gray-300 transition duration-200 text-gray-700 py-3 rounded-xl font-semibold'
            >
              Cancel
            </button>

          </div>

        </form>

      </div>

    </div>
  )
}

export default CreatePhrase