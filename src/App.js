import React, { useState, useEffect } from 'react';
import { Icon } from 'react-icons-kit'
import { trash } from 'react-icons-kit/feather/trash'


function App() {

  //get items from Local storage

  const getDatafromLS = () => {
    const data = localStorage.getItem('books');
    if (data) {
      return JSON.parse(data);
    }
    else {
      return []
    }
  }

  const [books, setBooks] = useState(getDatafromLS())

  const [data, setData] = useState({
    name: '',
    address: '',
    city: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault();
    setBooks([...books, data])
    setData({
      name: '',
      address: '',
      city: ''
    })
  }

  const handleDelete = (name) => {
    const rowDelete = books.filter((book) => book.name !== name);
    setBooks(rowDelete)
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  }

  // saving data to local storage
  useEffect(() => {
    localStorage.setItem('books', JSON.stringify(books));
  }, [books])

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <input type='text' value={data.name} name="name" onChange={handleChange} />
        </div>
        <div>
          <label>Address</label>
          <input type='text' value={data.address} name="address" onChange={handleChange} />
        </div>
        <div>
          <label>City</label>
          <input type='text' value={data.city} name="city" onChange={handleChange} />
        </div>
        <div>
          <button>Submit</button>
        </div>
      </form>
      <div>
        <table>
          <thead style={{ paddingLeft: '2px' }}>
            <th>Name</th>
            <th>Address</th>
            <th>City</th>
          </thead>
          <tbody>
            {
              books.length ? (
                books?.map((book) => {
                  return (
                    <>
                      <tr style={{ paddingLeft: '2px' }}>
                        <td>{book.name}</td>
                        <td>{book.address}</td>
                        <td>{book.city}</td>
                        <td style={{ cursor: 'pointer' }} onClick={() => handleDelete(book.name)}><Icon icon={trash} /></td>
                      </tr>
                    </>
                  )
                })
              ) : (
                <h2>  Please add record in the table
                </h2>
              )
            }
          </tbody>
        </table>

      </div>
    </div>
  )
}

export default App
